import React, { useEffect, useState } from "react"
import {
  findOptionFromTranslations,
  findPageFromTranslations,
  findTranslationFromData,
} from "../../../../util/functions"
import ScrollContainer from "react-indiana-drag-scroll"

const TableRadioSelectOpenable = ({
  data,
  answers,
  handleAnswer,
  currentPage,
  setAnswers,
  selectedLanguageId,
  initData,
}) => {
  const [checkedValues, setCheckedValues] = useState(
    answers.filter((i) => i.page_id === currentPage[0].id) || []
  )
  const [checkedOptions, setCheckedOptions] = useState(
    answers.filter((i) => i.page_id === currentPage[0].id) || []
  )
  const [checkedDepartments, setCheckedDepartments] = useState(
    answers.filter((i) => i.page_id === currentPage[0].id) || []
  )
  useEffect(() => {
    setCheckedOptions(
      answers.filter((i) => i.page_id === currentPage[0].id) || []
    )
  }, [currentPage])
  useEffect(() => {
    let pageAnswers = answers.filter(
      (i) => i.page_id === currentPage[0].id || []
    )
    setCheckedOptions(pageAnswers)
  }, [answers])

  useEffect(() => {
    console.log(checkedOptions)
  }, [checkedOptions])

  function onChange(e) {
    let arr = checkedValues
    let val = e.target.value
    if (arr.includes(parseInt(val))) {
      arr = arr.filter((i) => parseInt(i) !== parseInt(val))
      setAnswers(
        answers.filter(
          (i) => !(i.page_id === currentPage[0].id && i.question_id === val)
        )
      )
    } else {
      arr.push(parseInt(val))
      handleAnswer({
        module_id: currentPage[0].survey_module_id,
        page_group_id: currentPage[0].page_group_id,
        survey_page_id: currentPage[0].survey_page_id,
        type: currentPage[0].type,
        page_id: currentPage[0].id,
        question_id: parseInt(e.target.value),
        option_id: null,
      })
    }
    setCheckedValues([...arr])
  }
  function onChangeDepartments(e) {
    let arr = checkedDepartments
    let val = e.target.value
    if (arr.includes(parseInt(val))) {
      arr = arr.filter((i) => parseInt(i) !== parseInt(val))
      setAnswers(
        answers.filter(
          (i) => !(i.page_id === currentPage[0].id && i.department_id === val)
        )
      )
    } else {
      arr.push(parseInt(val))
      handleAnswer({
        module_id: currentPage[0].survey_module_id,
        page_group_id: currentPage[0].page_group_id,
        survey_page_id: currentPage[0].survey_page_id,
        type: currentPage[0].type,
        page_id: currentPage[0].id,
        department_id: parseInt(e.target.value),
        option_id: null,
      })
    }
    setCheckedDepartments([...arr])
  }

  useEffect(() => {
    setCheckedValues(
      answers
        ?.filter((i) => i.page_id === currentPage[0].id)
        .map((i) => i.question_id)
    )
    setCheckedDepartments(
      answers
        ?.filter((i) => i.page_id === currentPage[0].id)
        .map((i) => i.department_id)
    )
  }, [data, answers])

  const handle = (question_id, option_id) => {
    setAnswers(
      answers.filter(
        (i) =>
          !(
            i.page_id === currentPage[0].id &&
            i.question_id === question_id &&
            !i.option_id
          )
      )
    )
    handleAnswer({
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      survey_page_id: currentPage[0].survey_page_id,
      type: currentPage[0].type,
      page_id: currentPage[0].id,
      question_id: question_id,
      option_id: option_id,
    })
  }
  const handleDepartment = (department_id, option_id) => {
    setAnswers(
      answers.filter(
        (i) =>
          !(
            i.page_id === currentPage[0].id &&
            i.department_id === department_id &&
            !i.option_id
          )
      )
    )
    handleAnswer({
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      survey_page_id: currentPage[0].survey_page_id,
      type: currentPage[0].type,
      page_id: currentPage[0].id,
      department_id: department_id,
      option_id: option_id,
    })
  }

  return (
    <>
      <div className="question_div" id="scroll__that">
        {/* Question Title */}
        <h3 className="main_question">
          {findTranslationFromData(
            currentPage[0].id,
            currentPage[0].heading,
            selectedLanguageId,
            initData
          )}
        </h3>

        {/* Answers */}
        <ScrollContainer
          id="tableSC"
          className={`responsive-survey-table table--_radio  ${
            data?.hoverStates.length > 4 ? " scroll__table" : " "
          }`}
          hideScrollbars={false}
        >
          <table
            className={`survey-table-matrix table-check tt custom-_head nn_table long__txt ${
              data?.hoverStates.length > 4 ? " wide_it" : " "
            }`}
            border="1"
            cellSpacing="0"
          >
            {/* HEAD */}
            <thead>
              <tr className="head-style-2 hide_first-border-2">
                <th valign="top" className="no_border">
                  <h4></h4>
                </th>
                {data.hoverStates
                  .sort((a, b) => a.position - b.position)
                  .map((o) => {
                    return (
                      <th className="colored-th minus-3-color">
                        <p>
                          {findTranslationFromData(
                            o.option_id,
                            o.option_label,
                            selectedLanguageId,
                            initData
                          )}
                        </p>
                      </th>
                    )
                  })}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {/* List 1 */}
              {data?.questions[0].label === "departments"
                ? initData?.departments
                    ?.filter((i) => i.parent_id == null)
                    .sortAlphabetically("label")
                    .map((q) => {
                      return (
                        <>
                          {" "}
                          <tr className="hide_in-mobile">
                            <td></td>
                            <td colSpan={data?.hoverStates.length}>
                              <label className="container_check version_2">
                                <input
                                  type="checkbox"
                                  name="q1"
                                  value={q.id}
                                  checked={checkedDepartments.includes(q.id)}
                                  onChange={onChangeDepartments}
                                />
                                <span className="label-_text">{q.label}</span>
                                <span className="checkmark"></span>
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="show_in-mobile">
                              <label className="container_check version_2">
                                <input
                                  checked={checkedDepartments.includes(q.id)}
                                  type="checkbox"
                                  name="q1"
                                  value={q.id}
                                  onChange={onChangeDepartments}
                                />
                                <span className="label-_text">
                                  {findTranslationFromData(
                                    q.id,
                                    q.label,
                                    selectedLanguageId,
                                    initData
                                  )}
                                </span>
                                <span className="checkmark"></span>
                              </label>
                            </td>
                            {checkedDepartments.includes(q.id) ? (
                              <>
                                {data.hoverStates
                                  .sort((a, b) => a.position - b.position)
                                  .map((o) => {
                                    return (
                                      <td className="middle_it">
                                        <label className="container_radio">
                                          <input
                                            type="radio"
                                            name={
                                              "single-table-colored-nc-4 " +
                                              q.id
                                            }
                                            onChange={() => {
                                              handleDepartment(
                                                q.id,
                                                o.option_id
                                              )
                                            }}
                                            checked={
                                              answers.filter(
                                                (i) =>
                                                  i.page_id ===
                                                    currentPage[0].id &&
                                                  i.department_id === q.id &&
                                                  i.option_id === o.option_id
                                              )?.length > 0
                                            }
                                          />
                                          <span className="checkmark"></span>
                                        </label>
                                      </td>
                                    )
                                  })}
                              </>
                            ) : (
                              <></>
                            )}
                          </tr>
                        </>
                      )
                    })
                : data.questions
                    .sort((a, b) => a.position - b.position)
                    .map((q) => {
                      return (
                        <>
                          {" "}
                          <tr className="hide_in-mobile">
                            <td></td>
                            <td colSpan={data?.hoverStates.length}>
                              <label className="container_check version_2">
                                <input
                                  type="checkbox"
                                  name="q1"
                                  value={q.id}
                                  checked={checkedValues.includes(q.id)}
                                  onChange={onChange}
                                />
                                <span className="label-_text">{q.label}</span>
                                <span className="checkmark"></span>
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="show_in-mobile">
                              <label className="container_check version_2">
                                <input
                                  checked={checkedValues.includes(q.id)}
                                  type="checkbox"
                                  name="q1"
                                  value={q.id}
                                  onChange={onChange}
                                />
                                <span className="label-_text">
                                  {findTranslationFromData(
                                    q.id,
                                    q.label,
                                    selectedLanguageId,
                                    initData
                                  )}
                                </span>
                                <span className="checkmark"></span>
                              </label>
                            </td>
                            {checkedValues.includes(q.id) ? (
                              <>
                                {data.hoverStates
                                  .sort((a, b) => a.position - b.position)
                                  .map((o) => {
                                    return (
                                      <td className="middle_it">
                                        <label className="container_radio">
                                          <input
                                            type="radio"
                                            name={
                                              "single-table-colored-nc-4 " +
                                              q.id
                                            }
                                            onChange={() => {
                                              handle(q.id, o.option_id)
                                            }}
                                            checked={
                                              checkedOptions.filter(
                                                (i) =>
                                                  i.page_id ===
                                                    currentPage[0].id &&
                                                  i.question_id === q.id &&
                                                  i.option_id === o.option_id
                                              )?.length > 0
                                            }
                                          />
                                          <span className="checkmark"></span>
                                        </label>
                                      </td>
                                    )
                                  })}
                              </>
                            ) : (
                              <></>
                            )}
                          </tr>
                        </>
                      )
                    })}
            </tbody>
          </table>
        </ScrollContainer>
      </div>
    </>
  )
}

export default TableRadioSelectOpenable
