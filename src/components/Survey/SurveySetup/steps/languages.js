import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { LanguagesContent } from "../../../HOC/components/info_contents"
import { Popover } from "antd"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const Languages = ({
  skipEmail,
  checkedLanguages,
  setLangages,
  removeLanguage,
}) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "7." : "6."} Let us know{" "}
              <strong>which languages</strong> you would like to be activated in
              your survey by selecting them in the list below. When responding
              to the survey, your employees will be able to choose to fill in
              the survey in any of the activated languages. *
            </h3>
            <Popover content={LanguagesContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> More info
              </h4>
            </Popover>

            {/* Actions */}
            <button
              onClick={() => setLangages(true)}
              className="bordered_survey_btn"
            >
              Select language(s) <span className="iconx-chevron-right1"></span>
            </button>

            <ul className="selected-_languages">
              {checkedLanguages.length > 0 &&
                checkedLanguages.map((i, index) => {
                  return (
                    <li key={index}>
                      <span
                        onClick={() => removeLanguage(i)}
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

export default Languages
