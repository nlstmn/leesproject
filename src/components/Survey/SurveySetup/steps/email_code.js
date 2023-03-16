import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import AddDomains from "../layouts/add_domains"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const EmailOrCode = () => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              6. Please provide a list of all email domains that are used in
              your organisation (e.g.@leesmanindex.com, @leesman.co.uk) *
            </h3>

            {/* Actions */}
            <AddDomains />
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default EmailOrCode
