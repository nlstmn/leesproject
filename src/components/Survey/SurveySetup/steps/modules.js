import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { ModulesContent } from "../../../HOC/components/info_contents"
import { Popover } from "antd"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const Modules = ({ skipEmail, setModules, removeModule, checkedModules }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "10." : "9."} Would you like to add any{" "}
              <strong>additional module</strong>? *
            </h3>
            <Popover content={ModulesContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> More info
              </h4>
            </Popover>

            {/* Actions */}
            <button
              onClick={() => setModules(true)}
              className="bordered_survey_btn"
            >
              Select module(s) <span className="iconx-chevron-right1"></span>
            </button>

            <ul className="selected-_languages">
              {checkedModules.length > 0 &&
                checkedModules.map((i, index) => {
                  return (
                    <li key={index}>
                      <span
                        onClick={() => removeModule(i)}
                        className="iconx-circle-with-cross"
                      ></span>
                      {i}
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default Modules
