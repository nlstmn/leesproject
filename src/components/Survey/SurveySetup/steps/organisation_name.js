import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const OrganisationName = ({ clientName }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              2. Nice to meet you, {clientName}. Now, let's get into it!
            </h3>
            <h3 className="main_question">
              Please provide us with the{" "}
              <strong>name of your organisation</strong> as you would like it to
              appear in the survey. *{" "}
            </h3>

            {/* Actions */}
            <div className="form-group add_bottom_30">
              <div className="fl-wrap fl-wrap-input fl-is-required">
                <input
                  type="text"
                  name="organisation"
                  id="organisation"
                  className="form-control required fl-input"
                  placeholder="Type your answer here..."
                />
              </div>
            </div>
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default OrganisationName
