import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { QuestionContent } from "../../../HOC/components/info_contents"
import { Popover } from "antd"
import AddCommentQuestion from "../layouts/add_comment_question"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const CommentBox = ({ skipEmail }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "12." : "11."} Is there any{" "}
              <strong>open comment box question</strong> you would like to add
              to your survey?
            </h3>
            <Popover content={QuestionContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> More info
              </h4>
            </Popover>

            {/* Actions */}
            <AddCommentQuestion />
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default CommentBox
