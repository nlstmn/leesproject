import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { RolesContent } from "../../../HOC/components/info_contents"
import { Popover } from "antd"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const JobRole = ({ skipEmail }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "9." : "8."} Would you like to use the{" "}
              <strong>Leesman standard job role</strong> options?
            </h3>
            <Popover content={RolesContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> Leesman
                standard job role
              </h4>
            </Popover>

            {/* Actions */}
            <div className="form-group for-setup-survey">
              <label className="container_radio version_2">
                Yes
                <input type="radio" name="q2332" value="1" />
                <span className="checkmark"></span>
              </label>
              <label className="container_radio version_2">
                No
                <input type="radio" name="q2332" value="2" />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default JobRole
