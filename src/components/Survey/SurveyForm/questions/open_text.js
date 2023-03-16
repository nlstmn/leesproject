import React, { useEffect, useState } from "react"
import { findTranslationFromData } from "../../../../util/functions"

const Opentext = ({
  data,
  currentPage,
  handleAnswer,
  answers,
  selectedLanguageId,
  initData,
}) => {
  const [text, setText] = useState(
    answers?.filter((i) => i.open_value && i.question_id == data.id)[0]
      ?.open_value
  )
  useEffect(() => {
    let answer = {
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      page_id: currentPage[0].id,
      survey_page_id: currentPage[0].survey_page_id,
      type: "additional",
      question_id: data.id,
      open_value: text,
    }
    handleAnswer(answer)
  }, [text])
  return (
    <>
      <div className="question_div" id="scroll__that">
        {/* Question Title */}
        <h3 className="main_question">
          {findTranslationFromData(
            data.questions[0].id,
            data.questions[0].label,
            selectedLanguageId,
            initData
          )}
        </h3>

        {/* Answers */}
        <div className="responsive-survey-table table--_radio open__txt">
          <textarea
            onChange={(e) => setText(e.target.value)}
            name="specify"
            id="specify"
            className="form-control fl-textarea"
            placeholder=""
          >
            {text}
          </textarea>
        </div>
      </div>
    </>
  )
}

export default Opentext
