import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { CloseContent } from "../../../HOC/components/info_contents"
import { Popover } from "antd"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const ClosingText = ({ skipEmail }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "15." : "14."} The screenshot next shows the Leesman
              standard <strong>closing text</strong>.
            </h3>
            <h3 className="main_question">
              Please let us know whether you would prefer to keep the Leesman
              standard or provide us with your own closing text. *
            </h3>
            <Popover content={CloseContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> Leesman
                standard closing text
              </h4>
            </Popover>

            {/* Actions */}
            <div className="form-group for-setup-survey">
              <label className="container_radio version_2">
                Use the Leesman standard
                <input type="radio" name="q562" value="1" />
                <span className="checkmark"></span>
              </label>
              <label className="container_radio version_2">
                I will provide with my own intro text
                <input type="radio" name="q562" value="2" />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default ClosingText
