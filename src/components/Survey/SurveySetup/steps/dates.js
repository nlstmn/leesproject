import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { StartEndSurveyContent } from "../../../HOC/components/info_contents"
import { Popover, DatePicker } from "antd"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const { RangePicker } = DatePicker

const Dates = () => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              4. When would you like to{" "}
              <strong>launch & close the survey</strong>?
            </h3>
            <Popover content={StartEndSurveyContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> More info
              </h4>
            </Popover>

            {/* Actions */}
            <div className="form-group add_bottom_30">
              <div className="fl-wrap fl-wrap-input fl-is-required">
                <RangePicker />
              </div>
            </div>
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default Dates
