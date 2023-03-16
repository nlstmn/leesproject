import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { SignContent } from "../../../HOC/components/info_contents"
import { Popover } from "antd"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const Signature = ({ skipEmail }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "14." : "13."} The screenshot next shows the Leesman
              standard <strong>signature</strong>.
            </h3>
            <h3 className="main_question">
              Please let us know whether you would prefer to keep the Leesman
              standard, provide us with your own signature, or remove any
              signature. *
            </h3>
            <Popover content={SignContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> Leesman
                standard signature
              </h4>
            </Popover>

            {/* Actions */}
            <div className="form-group for-setup-survey">
              <label className="container_radio version_2">
                Use the Leesman standard
                <input type="radio" name="q882" value="1" />
                <span className="checkmark"></span>
              </label>
              <label className="container_radio version_2">
                I will provide with my own intro text
                <input type="radio" name="q882" value="2" />
                <span className="checkmark"></span>
              </label>
              <label className="container_radio version_2">
                I don't want any signature
                <input type="radio" name="q882" value="3" />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default Signature
