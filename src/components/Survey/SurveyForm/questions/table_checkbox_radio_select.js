import React, { useEffect, useState } from "react"
import {
  findOptionFromTranslations,
  findQuestionFromTranslations,
  findTextFromTranslations,
  findTranslationFromData,
} from "../../../../util/functions"

const TableCheckboxRadioSelect = ({
  data,
  handleAnswer,
  answers,
  currentPage,
  setAnswers,
  selectedLanguageId,
  initData,
  textModifier,
}) => {
  const [values, setValues] = useState(
    answers
      .filter(
        (i) => i.page_id === currentPage[0].id && i.open_value === "other"
      )
      .map((i) => i.option_id)
  )
  const [value, setValue] = useState(
    answers.filter(
      (i) => i.page_id === currentPage[0].id && i.open_value === "main"
    )[0]?.option_id
  )

  const handleRadio = (id) => {
    setValue(id)
    if (values.includes(id)) {
      setValues(values.filter((i) => i !== id))
    }
  }
  const handleCheckbox = (id) => {
    if (value !== id) {
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
      arr_ = arr_?.filter(
        (i) => !(i.page_id === currentPage[0]?.id && i.open_value === "main")
      )
      ;[value].forEach((v) => {
        arr_.push({
          module_id: currentPage[0].survey_module_id,
          page_group_id: currentPage[0].page_group_id,
          page_id: currentPage[0].id,
          survey_page_id: currentPage[0].survey_page_id,
          type: currentPage[0].type,
          question_id: currentPage[0]?.questions[0]?.id,
          option_id: v,
          open_value: "main",
        })
      })

      setAnswers(arr_)
    }
  }, [value])

  useEffect(() => {
    let arr_ = answers
    if (currentPage && answers) {
      arr_ = arr_?.filter(
        (i) => !(i.page_id === currentPage[0]?.id && i.open_value === "other")
      )
      values.forEach((v) => {
        arr_.push({
          module_id: currentPage[0].survey_module_id,
          page_group_id: currentPage[0].page_group_id,
          page_id: currentPage[0].id,
          survey_page_id: currentPage[0].survey_page_id,
          type: currentPage[0].type,
          question_id: currentPage[0]?.questions[0]?.id,
          option_id: v,
          open_value: "other",
        })
      })

      setAnswers(arr_)
    }
  }, [values])

  return (
    <>
      <div className="question_div" id="scroll__that">
        {/* Question Title */}
        <h3 className="main_question">
          {textModifier(
            findTranslationFromData(
              data.questions[0].id,
              data.questions[0].label,
              selectedLanguageId,
              initData
            )
          )}
        </h3>

        {/* Answers */}
        <div className="responsive-survey-table table--_radio">
          <table
            className="survey-table-matrix check-radio nn_table"
            border="1"
            cellSpacing="0"
          >
            {/* HEAD */}
            <thead>
              <tr className="head-style-2 hide_first-border-1">
                {/* Title */}
                <th valign="top" className="no_border">
                  <h4></h4>
                </th>

                {/* Head Values */}
                <th className="colored-th none-color">
                  <p>
                    {findTextFromTranslations(
                      "Main mode",
                      selectedLanguageId,
                      initData?.customisations
                    )}
                  </p>
                </th>
                <th className="colored-th none-color">
                  <p>
                    {findTextFromTranslations(
                      "Other modes",
                      selectedLanguageId,
                      initData?.customisations
                    )}
                  </p>
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {/* List 1 */}
              {data?.questions[0]?.options
                .sort((a, b) => a.position - b.position)
                .map((o) => {
                  return (
                    <>
                      {" "}
                      <tr className="hide_in-mobile">
                        {" "}
                        {/* Eğer seçim gerçekleşirse hide_in-mobile ekstra "selected" class ı alacak */}
                        <td></td>
                        <td colSpan="2">
                          {findTranslationFromData(
                            o.option_id,
                            o.option_label,
                            selectedLanguageId,
                            initData
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="show_in-mobile">
                          {findTranslationFromData(
                            o.option_id,
                            o.option_label,
                            selectedLanguageId,
                            initData
                          )}
                        </td>{" "}
                        {/* Eğer seçim gerçekleşirse show_in-mobile ekstra "selected" class ı alacak */}
                        {/* Radio */}
                        <td className="middle_it none-td">
                          <label className="container_radio">
                            <input
                              type="radio"
                              name={"single-table-colored-nc-11"}
                              onChange={() => handleRadio(o.option_id)}
                              checked={value === o.option_id}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        {/* Checkbox */}
                        <td className="middle_it none-td">
                          <label className="container_check survey__v3">
                            <input
                              type="checkbox"
                              name={"single-table-colored-nc-4 " + o.option_id}
                              onChange={() => {
                                handleCheckbox(o.option_id)
                              }}
                              checked={values.includes(o.option_id)}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                      </tr>
                    </>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TableCheckboxRadioSelect
