import React, { useEffect, useState } from "react"
import { Popover } from "antd"
import InfoPopupContent from "../layouts/info_popup_content"
import {
  findHelpTextFromOptionTranslations,
  findHelpTextFromTranslations,
  findTextFromTranslations,
  findTranslationFromData,
} from "../../../../util/functions"

const CheckboxSelect = ({
  answers,
  currentPage,
  arr,
  setAnswers,
  hideButtonGroups,
  setHideButtonGroups,
  setPage,
  isPage,
  selectedLanguageId,
  initData,
  textModifier,
}) => {
  const [values, setValues] = useState(
    answers
      .filter(
        (i) =>
          i.page_id === currentPage[0]?.id &&
          isPage === currentPage[0]?.position
      )
      .filter((i) => i.option_id).length > 0
      ? answers
          .filter((i) => i.page_id === currentPage[0]?.id)
          .map((i) => i.option_id)
      : answers
          .filter((i) => i.page_id === currentPage[0]?.id)
          .map((i) => i.question_id) || []
  )

  const gotoTop = () => {
    document.getElementById("survey-_scroll").scroll(0, 0, "smooth")
    document.getElementById("middle-wizard") &&
      document.getElementById("middle-wizard").scroll(0, 0, "smooth")
    document.getElementById("scroll__that") &&
      document.getElementById("scroll__that").scroll(0, 0, "smooth")
  }

  const [stages, setStages] = useState([])
  const [currentStage, setCurrentStage] = useState(0)
  const handleValues = (id) => {
    if (arr[0].type === "option" && currentPage[0].type === "tick_m") {
      let optionalIds = arr.filter((i) => i.optional).map((i) => i.id)
      if (optionalIds.includes(id)) {
        setValues([id])
      } else {
        let arr = values.filter((i) => !optionalIds.includes(i))
        if (arr.includes(id)) {
          arr = arr.filter((i) => i !== id)
        } else {
          arr.push(id)
        }
        setValues([...arr])
      }
    } else {
      let arr = values
      if (arr.includes(id)) {
        arr = arr.filter((i) => i !== id)
      } else {
        arr.push(id)
      }
      setValues([...arr])
    }
  }
  useEffect(() => {
    let arr_ = answers
    if (currentPage && answers) {
      arr_ = arr_?.filter((i) => i.page_id !== currentPage[0]?.id)
      let val = values
      val = val.filter(
        (i) =>
          currentPage[0].questions.map((q) => q.id).includes(i) ||
          currentPage[0].questions[0].options
            .map((q) => q.option_id)
            .includes(i)
      )
      val.forEach((v) => {
        arr_.push({
          module_id: currentPage[0].survey_module_id,
          page_group_id: currentPage[0].page_group_id,
          page_id: currentPage[0].id,
          survey_page_id: currentPage[0].survey_page_id,
          type: currentPage[0].type,
          question_id:
            arr[0] && arr[0]?.type === "question"
              ? v
              : currentPage[0]?.questions[0]?.id,
          option_id: arr[0] && arr[0]?.type === "option" ? v : null,
        })
      })

      setAnswers(arr_)
    }
  }, [values])

  useEffect(() => {
    currentPage[0]?.page_group_name !== "HOME" &&
      setStages([...new Set(arr.map((i) => i.question_group_name))])
  }, [arr])

  useEffect(() => {
    if (stages.length > 0) {
      if (currentStage === stages?.length - 1) {
        setHideButtonGroups(false)
      } else {
        setHideButtonGroups(true)
      }
    }
  }, [stages, currentStage])

  useEffect(() => {
    let PageAnswers = answers
      ?.filter((i) => i.page_id === currentPage[0].id)
      .map((i) => i.question_id)
  }, [answers])

  return (
    <div className="question_div" id="scroll__that">
      <h3 className="main_question">
        {textModifier(
          currentPage[0]?.heading
            ? findTranslationFromData(
                currentPage[0]?.id,
                currentPage[0]?.heading,
                selectedLanguageId,
                initData
              )
            : findTranslationFromData(
                currentPage[0]?.questions[0]?.id,
                currentPage[0]?.questions[0]?.label,
                selectedLanguageId,
                initData
              )
        )}
      </h3>
      <div
        className={`form-group right-_bordered ${
          currentPage[0]?.page_group_name !== "HOME" &&
          stages?.length > 0 &&
          stages[currentStage]
            ? " has__title"
            : ""
        } `}
      >
        {currentPage[0]?.page_group_name !== "HOME" &&
        stages?.length > 0 &&
        stages[currentStage] ? (
          <>
            <h2 className="answer-_title mb__10">
              {findTextFromTranslations(
                stages[currentStage],
                selectedLanguageId,
                initData?.customisations
              )}
            </h2>
            {arr
              ?.filter((i) => i.question_group_name === stages[currentStage])
              ?.sort((a, b) => a.position - b.position)
              ?.map((q) => {
                return (
                  <label
                    className="container_check version_2 survey gg"
                    key={q.id}
                  >
                    <input
                      type="checkbox"
                      name={q.type + "-" + q.id}
                      checked={values.includes(q.id)}
                      onChange={(e) => {
                        handleValues(q.id)
                      }}
                    />
                    <span className="label-_text">
                      {findTranslationFromData(
                        q?.id,
                        q?.label,
                        selectedLanguageId,
                        initData
                      )}
                      {q?.help_text && (
                        <div id="has_info_popup">
                          <Popover
                            content={() =>
                              InfoPopupContent(
                                findHelpTextFromTranslations(
                                  q.id,
                                  q?.help_text,
                                  selectedLanguageId,
                                  initData.questionTranslations
                                )
                              )
                            }
                            overlayClassName="maxt popup_i"
                          >
                            <span className="iconx-help-with-circle"></span>
                          </Popover>
                        </div>
                      )}
                    </span>
                    <span className="checkmark"></span>
                  </label>
                )
              })}
          </>
        ) : (
          arr
            ?.sort((a, b) => a.position - b.position)
            .map((q) => {
              q?.help_text && console.log(q.help_text, arr[0].type)
              return (
                <label
                  className="container_check version_2 survey gg"
                  key={q.id}
                >
                  <input
                    type="checkbox"
                    name={q.type + "-" + q.id}
                    checked={
                      answers
                        ?.filter((i) => i.page_id === currentPage[0].id)
                        .map((i) => i.question_id)
                        .includes(q.id) ||
                      answers
                        ?.filter((i) => i.page_id === currentPage[0].id)
                        .map((i) => i.option_id)
                        .includes(q.id)
                    }
                    onChange={(e) => {
                      handleValues(q.id)
                    }}
                  />
                  <span className="label-_text">
                    {findTranslationFromData(
                      q?.id,
                      q?.label,
                      selectedLanguageId,
                      initData
                    )}

                    {q?.help_text && (
                      <div id="has_info_popup">
                        <Popover
                          content={() =>
                            InfoPopupContent(
                              arr[0].type === "question"
                                ? findHelpTextFromTranslations(
                                    q.id,
                                    q?.help_text,
                                    selectedLanguageId,
                                    initData.questionTranslations
                                  )
                                : findHelpTextFromOptionTranslations(
                                    q.id,
                                    q?.help_text,
                                    selectedLanguageId,
                                    initData.optionTranslations
                                  )
                            )
                          }
                          overlayClassName="maxt popup_i"
                        >
                          <span className="iconx-help-with-circle"></span>
                        </Popover>
                      </div>
                    )}
                  </span>

                  <span className="checkmark"></span>
                </label>
              )
            })
        )}{" "}
        {hideButtonGroups && (
          <>
            {" "}
            <div id="bottom-wizard">
              <button
                id="hover-_hand"
                onClick={() => {
                  if (currentStage !== 0) {
                    setCurrentStage(currentStage - 1)
                    gotoTop()
                  } else {
                    setHideButtonGroups(false)
                    setPage(isPage - 1)
                    gotoTop()
                  }
                }}
                className={`btn_2 mr-3 validate ${
                  currentStage === 0 ? " disable_it" : " "
                }`}
              >
                {findTextFromTranslations(
                  "Back",
                  selectedLanguageId,
                  initData?.customisations
                )}
              </button>
              <button
                id="hover-_hand"
                onClick={() => {
                  currentStage !== stages?.length - 1 &&
                    setCurrentStage(currentStage + 1)
                  gotoTop()
                }}
                className={`btn_1 validate ${
                  currentStage === stages?.length - 1 ? " disable_it" : " "
                }`}
              >
                {findTextFromTranslations(
                  "Next",
                  selectedLanguageId,
                  initData?.customisations
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CheckboxSelect
