import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const LoginType = ({ handleEmailCodeChange }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              5. Respondents will log in to the survey by using their own{" "}
              <strong>email address</strong> or{" "}
              <strong>unique provided codes.</strong>
            </h3>
            <h3 className="main_question">
              We do not need a list of these email addresses, but we will
              restrict the login to the specific email domains used by your
              employees. Alternatively, you can select the unique generated code
              option. *
            </h3>

            {/* Actions */}
            <div className="form-group add_bottom_30">
              <div className="styled-select clearfix">
                <div className="fl-wrap fl-wrap-select fl-is-required">
                  <select
                    className="form-control required fl-select"
                    name="EmailCodeChange"
                    id="EmailCodeChange"
                    onChange={(e) => handleEmailCodeChange(e)}
                  >
                    <option value="">Please select</option>
                    <option value="Email">Email domain</option>
                    <option value="Access">Access code</option>
                    <option value="Later">
                      I would like to discuss that later with you
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default LoginType
