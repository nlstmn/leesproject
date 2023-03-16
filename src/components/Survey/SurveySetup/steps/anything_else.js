import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const AnyThingElse = ({ skipEmail }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "17." : "16."} Is there{" "}
              <strong>anything else</strong> you would like to share before to
              submit this form?
            </h3>

            {/* Actions */}
            <div className="form-group add_bottom_30">
              <div className="fl-wrap fl-wrap-input fl-is-required">
                <input
                  type="text"
                  name="anything"
                  id="anything"
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

export default AnyThingElse
