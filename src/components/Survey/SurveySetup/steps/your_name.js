import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const YourName = ({ clientName, handleClientName }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              1. Please enter <strong>your name</strong>: *
            </h3>

            {/* Actions */}
            <div className="form-group add_bottom_30">
              <div className="fl-wrap fl-wrap-input fl-is-required">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control required fl-input"
                  value={clientName}
                  onChange={handleClientName}
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

export default YourName
