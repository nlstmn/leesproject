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

const PrimaryLanguage = ({ skipEmail, checkedLanguages }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "8." : "7."} If you would like one particular
              language to appear as the <strong>default language</strong> for
              all respondents, please indicate that below *
            </h3>
            <Popover content={LanguagesContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> More info
              </h4>
            </Popover>

            {/* Actions */}
            <div className="form-group for-setup-survey">
              {checkedLanguages.length > 0 &&
                checkedLanguages.map((i, index) => {
                  return (
                    <label key={index} className="container_radio version_2">
                      {i}
                      <input type="radio" name="q2442" value={index} />
                      <span className="checkmark"></span>
                    </label>
                  )
                })}
            </div>
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default PrimaryLanguage
