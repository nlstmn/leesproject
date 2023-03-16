import React, { useEffect, useState } from "react"
import {
  findOptionFromTranslations,
  findPageFromTranslations,
  findTranslationFromData,
} from "../../../../util/functions"
import ScrollContainer from "react-indiana-drag-scroll"

const TableCheckboxSelectOpenable = ({
  data,
  answers,
  handleAnswer,
  currentPage,
  setAnswers,
  selectedLanguageId,
  initData,
  selectAll,
}) => {
  useEffect(() => {
    console.log(selectAll)
    if (selectAll) {
      setCheckedValues(data.questions.map((i) => i.id))
      data.questions.forEach((q) => {
        handleAnswer({
          module_id: currentPage[0].survey_module_id,
          page_group_id: currentPage[0].page_group_id,
          type: currentPage[0].type,
          survey_page_id: currentPage[0].survey_page_id,

          page_id: currentPage[0].id,
          question_id: parseInt(q.id),
          option_id: null,
        })
      })
    }
  }, [selectAll])

  const [checkedValues, setCheckedValues] = useState(
    answers
      .filter((i) => (i.page_id = currentPage[0].id))
      .map((i) => i.question_id) || []
  )

  function onChange(e) {
    let arr = checkedValues
    let val = e.target.value
    if (!selectAll) {
      if (arr.includes(parseInt(val))) {
        arr = arr.filter((i) => parseInt(i) !== parseInt(val))
        setAnswers(
          answers.filter(
            (i) =>
              !(
                i.page_id === currentPage[0].id &&
                i.question_id === parseInt(val)
              )
          )
        )
      } else {
        arr.push(parseInt(val))
        handleAnswer({
          module_id: currentPage[0].survey_module_id,
          page_group_id: currentPage[0].page_group_id,
          type: currentPage[0].type,
          survey_page_id: currentPage[0].survey_page_id,

          page_id: currentPage[0].id,
          question_id: parseInt(e.target.value),
          option_id: null,
        })
      }
      setCheckedValues([...arr])
    }
  }
  useEffect(() => {}, [data, answers])
  const handle = (question_id, option_id) => {
    //if already selected remove
    //if not add
    if (
      answers.filter(
        (i) =>
          i.page_id === currentPage[0].id &&
          i.question_id === question_id &&
          i.option_id === option_id &&
          i.option_id
      ).length > 0
    ) {
      setAnswers(
        answers.filter(
          (i) =>
            !(
              i.page_id === currentPage[0].id &&
              i.question_id === question_id &&
              i.option_id === option_id
            )
        )
      )
    } else {
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
        type: currentPage[0].type,
        survey_page_id: currentPage[0].survey_page_id,

        page_id: currentPage[0].id,
        question_id: question_id,
        option_id: option_id,
      })
    }
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
              {/* <tr className="head-style-2 hide_first-border-2">
                            <th valign="top" className="no_border">
                                <h4></h4>
                            </th>
                            <th className="colored-th">
                                <p>Sed ut perspiciatis unde omnis</p>
                            </th>
                            <th className="colored-th">
                                <p>Nisi aliquid ex commodi consequatur</p>
                            </th>
                            <th className="colored-th">
                                <p>Ut enim minima veniam</p>
                            </th>
                            <th className="colored-th">
                                <p>Quis nostrum exercitationem ullam</p>
                            </th>
                            <th className="colored-th">
                                <p>Et harum quidem rerum facilis est</p>
                            </th>
                            <th className="colored-th">
                                <p>Nomnis voluptas assumenda</p>
                            </th>
                        </tr> */}
            </thead>

            {/* BODY */}
            <tbody>
              {data.questions
                .sort((a, b) => a.position - b.position)
                .map((q) => {
                  return (
                    <>
                      <tr className="hide_in-mobile">
                        <td></td>
                        <td colSpan={data?.hoverStates.length}>
                          <label className="container_check version_2">
                            <input
                              type="checkbox"
                              name="q1"
                              checked={checkedValues.includes(q.id)}
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
                      </tr>
                      <tr className="show_in-mobile">
                        <td>
                          <label className="container_check version_2">
                            <input
                              type="checkbox"
                              name="q1"
                              checked={checkedValues.includes(q.id)}
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
                          data.hoverStates
                            .sort((a, b) => a.position - b.position)
                            .map((o) => {
                              return (
                                <>
                                  <td className="middle_it">
                                    <label className="container_check survey__v3">
                                      <input
                                        type="checkbox"
                                        name={
                                          "single-table-colored-nc-4 " +
                                          o.option_id
                                        }
                                        value="-3"
                                        onChange={() => {
                                          handle(q.id, o.option_id)
                                        }}
                                        checked={
                                          answers.filter(
                                            (i) =>
                                              i.page_id === currentPage[0].id &&
                                              i.question_id === q.id &&
                                              i.option_id === o.option_id
                                          )?.length > 0
                                        }
                                      />
                                      <span className="checkmark"></span>
                                    </label>
                                  </td>
                                </>
                              )
                            })
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

export default TableCheckboxSelectOpenable
