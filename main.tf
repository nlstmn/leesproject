terraform {
  backend "s3" {
    bucket = "leesman-terraform-state"
    key    = "ao-frontend/terraform.tfstate"
    region = "eu-west-1"
  }
}

provider "aws" {
  # No credentials explicitly set here because they come from either the
  # environment or the global credentials file.
  # added version becuase new one does break the pipeline
  version = "~> 3.7"
  assume_role {
    role_arn = local.role
  }
  region = "eu-west-1"
}

# Used to fetch ssl certificates for global endpoints (must be defined in us east 1)
provider "aws" {
  alias = "useast1"
  assume_role {
    role_arn = local.role
  }
  region = "us-east-1"
}

####################### Variables #######################

variable "api_url" {
  type    = string
  default = ""
}

locals {
  account_name = contains(keys(local.account_id_map), terraform.workspace) ? terraform.workspace : "development"
  r53_zone = terraform.workspace == "production" ? "app.leesmaninside.com" : "${local.account_name}.app.leesmaninside.com"
  analytics_r53_zone = terraform.workspace == "production" ? "leesmanindex.co.uk" : "${local.account_name}.leesmanindex.co.uk"

  account_id_map = {
    development = "836263696447"
    staging     = "395526924801"
    production  = "867213857120"
    demo        = "695212533175"
  }

  account_id  = try(local.account_id_map[terraform.workspace], local.account_id_map.development)
  role = "arn:aws:iam::${local.account_id}:role/Deployment"
  
  suffix = contains(keys(local.account_id_map), terraform.workspace) ? "" : "-${terraform.workspace}"
  site_prefix = "ao-frontend${local.suffix}"
}

data "aws_route53_zone" "main_zone" {
  name = local.r53_zone
}

data "aws_route53_zone" "analytics_zone" {
  name = local.analytics_r53_zone
}

data "aws_acm_certificate" "cert" {
  provider = aws.useast1
  domain   = local.r53_zone
  statuses = ["ISSUED"]
}

data "aws_wafv2_web_acl" "admin" {
  provider = aws.useast1
  name  = "Admin"
  scope = "CLOUDFRONT"
}

data "aws_cognito_user_pools" "main" {
  name = "Leesman"
}

data "aws_apigatewayv2_apis" "main" {
  count = var.api_url == "" ? 1 : 0
  name = "ao-core-api"
}

data "aws_apigatewayv2_api" "main" {
  count = var.api_url == "" ? 1 : 0
  api_id = element(tolist(data.aws_apigatewayv2_apis.main[0].ids), 0)
  # api_id = data.aws_apigatewayv2_apis.main.ids[0]
}

####################### Resources #######################
########################## S3 ###########################

resource "aws_s3_bucket" "main" {
  bucket = "leesman-index-${local.site_prefix}-${terraform.workspace}"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm     = "AES256"
      }
    }
  }
}

resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data "aws_iam_policy_document" "bucket_policy" {
  statement {
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.main.iam_arn]
    }

    actions = ["s3:GetObject"]
    resources = [
      "${aws_s3_bucket.main.arn}/*"
    ]
  }
}


resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.main.id

  policy = data.aws_iam_policy_document.bucket_policy.json
}


###################### Cloudfront #######################

resource "aws_cloudfront_origin_access_identity" "main" {
  comment = aws_s3_bucket.main.id
}

locals {
  firewall_enabled = {
    default = true
    production = false
    demo = false
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  aliases             = [ local.r53_zone ]

  web_acl_id          = try(local.firewall_enabled[terraform.workspace], local.firewall_enabled.default) ? data.aws_wafv2_web_acl.admin.arn : null

  origin {
    domain_name = aws_s3_bucket.main.bucket_regional_domain_name
    origin_id   = "S3-Website-${aws_s3_bucket.main.website_endpoint}"
    
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.main.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-Website-${aws_s3_bucket.main.website_endpoint}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = terraform.workspace == "production" ? 3600 : 0
    max_ttl                = terraform.workspace == "production" ? 86400 : 0
  }
  
  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = data.aws_acm_certificate.cert.arn
    cloudfront_default_certificate = false
    minimum_protocol_version       = "TLSv1.2_2019"
    ssl_support_method             = "sni-only"
  }
}


####################### Route 53 ########################

resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.main_zone.id
  name    = local.r53_zone
  type    = "A"

  alias {
    name    = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

######################## Cognito ########################

resource "aws_cognito_user_pool_client" "frontend" {
  name = "Frontend"
  user_pool_id = element(tolist(data.aws_cognito_user_pools.main.ids), 0)
  
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows = [
    "code",
  ]
  callback_urls = [
    "https://${aws_route53_record.main.fqdn}/"
  ]
  logout_urls = [
    "https://${aws_route53_record.main.fqdn}/"
  ]
  allowed_oauth_scopes = [
    "aws.cognito.signin.user.admin",
    "email",
    "openid",
    "profile",
  ]
  explicit_auth_flows = [
    "ALLOW_CUSTOM_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH",
  ]
  supported_identity_providers = [ "COGNITO" ]
  read_attributes = [
    "address", "birthdate", "email", "email_verified", "family_name", "gender",
    "given_name", "locale", "middle_name", "name", "nickname", "phone_number",
    "phone_number_verified", "picture", "preferred_username", "profile",
    "updated_at", "website", "zoneinfo",
  ]
  write_attributes = [
    "address", "birthdate", "email", "family_name", "gender", "given_name", 
    "locale", "middle_name", "name", "nickname", "phone_number", "picture", 
    "preferred_username", "profile", "updated_at", "website", "zoneinfo",
  ]

  lifecycle {
    ignore_changes = [supported_identity_providers]
  }
}

######################## Outputs ########################

output "BUCKET_NAME" {
  value = aws_s3_bucket.main.id
}

output "REACT_APP_APP_HOST" {
  value = "https://${aws_route53_record.main.fqdn}/"
}

output "REACT_APP_API_URL" {
  # value = "https://jkpmynp79f.execute-api.eu-west-1.amazonaws.com"
  value = var.api_url != "" ? var.api_url : data.aws_apigatewayv2_api.main[0].api_endpoint
}

output "REACT_APP_AUTH_DOMAIN" {
  value = "auth.${local.analytics_r53_zone}"
}

output "REACT_APP_COGNITO_USER_POOL_ID" {
  value = element(tolist(data.aws_cognito_user_pools.main.ids), 0)
}

output "REACT_APP_COGNITO_WEB_CLIENT_ID" {
  value = aws_cognito_user_pool_client.frontend.id
}

output "REACT_APP_ENVIRONMENT" {
  value = terraform.workspace
}


