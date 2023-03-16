import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { ModulesContent } from "../../../HOC/components/info_contents"
import { Popover } from "antd"
import AddDropQuestion from "../layouts/add_drop_question"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const Dropdown = ({ skipEmail }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "11." : "10."} Is there any{" "}
              <strong>additional dropdown question</strong> you would like to
              add to your survey?
            </h3>
            <Popover content={ModulesContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> More info
              </h4>
            </Popover>

            {/* Actions */}
            <AddDropQuestion />
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default Dropdown
