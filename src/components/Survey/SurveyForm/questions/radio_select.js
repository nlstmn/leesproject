import React, { useEffect, useState } from "react"
import {
  findOptionFromTranslations,
  findQuestionFromTranslations,
  findTranslationFromData,
} from "../../../../util/functions"

const RadioSelect = ({
  data,
  answers,
  handleAnswer,
  currentPage,
  textModifier,
  selectedLanguageId,
  initData,
}) => {
  const handle = (e) => {
    handleAnswer({
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      page_id: currentPage[0].id,
      survey_page_id: currentPage[0].survey_page_id,
      type: currentPage[0].name === "LOCATION" ? "location" : "radio",
      question_id: data.id,
      option_id: e,
    })
  }

  return (
    <>
      {data?.options?.length && (
        <div className="question_div single-_select" id="scroll__that">
          {/* Question Title */}
          <h3 className="main_question">
            {textModifier(
              findTranslationFromData(
                data.id,
                data.label,
                selectedLanguageId,
                initData
              ) || ""
            )}
          </h3>
          {/* Answers */}
          <div className="form-group right-_bordered">
            {data?.options
              ?.sort((a, b) => a.position - b.position)
              .map((o) => {
                return (
                  <label className="container_radio version_2 survey ss">
                    <input
                      type="radio"
                      onChange={() => {
                        handle(o.option_id)
                      }}
                      checked={
                        answers.filter(
                          (i) =>
                            i.page_id === currentPage[0].id &&
                            i.option_id === o.option_id
                        ).length > 0
                      }
                      name={`${data.id}-${o.option_id}`}
                      value={o.option_id}
                    />
                    <span className="label-_text">
                      {findTranslationFromData(
                        o.option_id,
                        o.option_label,
                        selectedLanguageId,
                        initData
                      )}
                    </span>
                    <span className="checkmark"></span>
                  </label>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}

export default RadioSelect
