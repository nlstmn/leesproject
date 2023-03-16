import React from "react"
import SSO from "./sso_table"

const IdentitySettings = ({ isMenuSub }) => {
  return (
    <>
      <div className="n__card hast__table mt-0">
        <div className="n__body">
          <h3 className="">{isMenuSub === "sso" ? "SAML" : ""}</h3>
          <br />

          {isMenuSub === "sso" && (
            <div className="fixed_infos mb-2">
              <span className="card_desc info">
                <strong>
                  <span className="iconx-info-with-circle"></span> Entity Id:
                </strong>
                <span className="text-muted">
                  urn:amazon:cognito:sp:eu-west-1_cDJdEAoOr
                </span>
              </span>
              <span className="card_desc info">
                <strong>
                  <span className="iconx-info-with-circle"></span> Reply URL
                  (Assertion Consumer Service URL)
                </strong>
                <span className="text-muted">
                  https://auth.development.leesmanindex.co.uk/saml2/idpresponse
                </span>
              </span>
            </div>
          )}

          <div className="row">
            <div className="col-lg-12">
              <div className="n_table center_labels first_not_center second_not_center respo">
                {isMenuSub === "sso" && <SSO />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IdentitySettings
