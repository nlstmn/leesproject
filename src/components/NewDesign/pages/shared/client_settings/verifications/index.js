import React from "react"
import Domains from "./domains_table"
import Emails from "./emails_table"

const VerificationSettings = ({ isMenuSub }) => {
  return (
    <>
      <div className="n__card hast__table mt-0">
        <div className="n__body">
          <h3 className="">{isMenuSub === "Domains" ? "Domains" : "Emails"}</h3>
          <span className="card_desc">
            Total:{" "}
            <strong>11 {isMenuSub === "Domains" ? "domains" : "emails"}</strong>
          </span>
          <br />
          <br />
          {isMenuSub === "Emails" && (
            <span className="card_desc info">
              <strong>
                <span className="iconx-info-with-circle"></span> Please add the
                token in a TXT record to your domain under the name _leesman
              </strong>
              <span className="text-muted">For example:</span>
            </span>
          )}

          <div className="row">
            <div className="col-lg-12">
              <div className="n_table center_labels first_not_center second_not_center respo">
                {isMenuSub === "Domains" && <Domains />}

                {isMenuSub === "Emails" && <Emails />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerificationSettings
