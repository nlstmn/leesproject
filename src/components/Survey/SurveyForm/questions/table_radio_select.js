import React, { useEffect, useState, useRef, useCallback } from "react"
import {
  findHelpTextFromTranslations,
  findPageFromTranslations,
  findQuestionFromTranslations,
  findTextFromTranslations,
  findTranslationFromData,
} from "../../../../util/functions"
import { Popover } from "antd"
import InfoPopupContent from "../layouts/info_popup_content"

const TableRadioSelect = ({
  data,
  answers,
  handleAnswer,
  currentPage,
  setAnswers,
  selectedLanguageId,
  initData,
  textModifier,
}) => {
  //   Disagree slightly -- colored-th minus-1-color -- middle_it minus-1-td
  //   Agree slightly -- colored-th plus-1-color -- middle_it plus-1-td
  const [selectedValues, setSelectedValues] = useState(
    answers.filter((i) => i.page_id === currentPage[0].id) || []
  )

  // Table breadcrump fixed
  const [isFixedBrd, setFixedBrd] = useState(false)

  const onScroll = (e) => {
    setFixedBrd(e.target.scrollTop > 198 ? true : false)
  }
  // Table breadcrump fixed

  useEffect(() => {
    setSelectedValues(
      answers.filter((i) => i.page_id === currentPage[0].id) || []
    )
  }, [currentPage])
  useEffect(() => {
    let pageAnswers = answers.filter((i) => i.page_id === currentPage[0].id)

    setSelectedValues(pageAnswers)
  }, [answers])

  const handle = (id, value) => {
    handleAnswer({
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      page_id: currentPage[0].id,
      survey_page_id: currentPage[0].survey_page_id,

      type: "scale",
      question_id: id,
      option_id: null,
      value: value,
    })
  }
  return (
    <>
      <div className="question_div" id="scroll__that" onScroll={onScroll}>
        {/* Question Title */}
        <h3 className="main_question">
          {" "}
          {textModifier(
            findTranslationFromData(
              currentPage[0].id,
              currentPage[0].heading,
              selectedLanguageId,
              initData
            ),
            ""
          )}
        </h3>

        {/* Answers */}
        <div className="responsive-survey-table table--_radio has__breadcrump">
          <table
            className="survey-table-matrix nn_table"
            border="1"
            cellSpacing="0"
          >
            {/* HEAD */}
            <thead>
              {isFixedBrd && <div className="space__div"></div>}
              <div
                className={`table-_breadcrump 
              ${data?.x_option ? " has__cancel" : " "} 
              ${data?.neutral ? " has__zero" : ""}
              ${data?.lower_limit === -3 ? " has__-3" : ""}
              ${data?.upper_limit === 3 ? " has___3" : ""}
              ${isFixedBrd ? " fixed__brd" : ""}
              `}
              >
                <ul>
                  <li className="red">
                    {findTextFromTranslations(
                      data?.hover_negative,
                      selectedLanguageId,
                      initData?.customisations
                    ) === data?.hover_negative
                      ? data?.hover_negative
                      : data?.lower_limit +
                        " = " +
                        findTextFromTranslations(
                          data?.hover_negative,
                          selectedLanguageId,
                          initData?.customisations
                        )?.capitalize()}
                  </li>
                  {data.neutral && (
                    <li className="muted">
                      {findTextFromTranslations(
                        data?.hover_neutral,
                        selectedLanguageId,
                        initData?.customisations
                      ) === data?.hover_neutral
                        ? data?.hover_neutral
                        : "0 = " +
                          findTextFromTranslations(
                            data?.hover_neutral,
                            selectedLanguageId,
                            initData?.customisations
                          )?.capitalize()}
                    </li>
                  )}
                  <li className="green">
                    {findTextFromTranslations(
                      data?.hover_positive,
                      selectedLanguageId,
                      initData?.customisations
                    ) === data?.hover_positive
                      ? data?.hover_positive
                      : "+" +
                        data?.upper_limit +
                        " = " +
                        findTextFromTranslations(
                          data?.hover_positive,
                          selectedLanguageId,
                          initData?.customisations
                        )?.capitalize()}
                  </li>
                </ul>
              </div>
              <tr className="head-style-2 hide_first-border-1">
                {/* Title */}
                <th valign="top" className="no_border">
                  <h4></h4>
                </th>

                {/* Head Values */}
                {data?.x_option && (
                  <th className="colored-th none-color">
                    <p>
                      <span className="iconx-cancel"></span>
                    </p>
                  </th>
                )}
                {data?.lower_limit === -3 && (
                  <th className="colored-th minus-3-color">
                    <p>-3</p>
                  </th>
                )}
                <th className="colored-th minus-3-color">
                  <p>-2</p>
                </th>
                <th className="colored-th minus-2-color">
                  <p>-1</p>
                </th>
                {data?.neutral && (
                  <th className="colored-th neutral-color">
                    <p>0</p>
                  </th>
                )}
                <th className="colored-th plus-2-color">
                  <p>+1</p>
                </th>
                <th className="colored-th plus-3-color">
                  <p>+2</p>
                </th>
                {data?.upper_limit === 3 && (
                  <th className="colored-th plus-3-color">
                    <p>+3</p>
                  </th>
                )}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {/* List 1 */}
              {answers?.length &&
                data?.options?.map((o) => {
                  return (
                    <>
                      <tr
                        className={`hide_in-mobile ${
                          answers
                            .filter((i) => i.page_id === currentPage[0].id)
                            .map((i) => i.question_id)
                            .includes(o.option_id) && "selected"
                        }`}
                      >
                        {" "}
                        {/* Eğer seçim gerçekleşirse hide_in-mobile ekstra "selected" class ı alacak */}
                        <td></td>
                        <td
                          colSpan={`${
                            4 +
                            (data?.upper_limit === 3 && +1) +
                            (data?.neutral && +1) +
                            (data?.lower_limit === -3 && +1) +
                            (data?.x_option && +1)
                          }`}
                        >
                          {findTranslationFromData(
                            o.option_id,
                            o.option_label,
                            selectedLanguageId,
                            initData
                          )}
                          {o?.help_text && (
                            <div id="has_info_popup">
                              <Popover
                                content={() =>
                                  InfoPopupContent(
                                    findHelpTextFromTranslations(
                                      o.option_id,
                                      o?.help_text,
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
                        </td>
                      </tr>
                      <tr>
                        <td
                          className={`show_in-mobile ${
                            answers
                              .filter((i) => i.page_id === currentPage[0].id)
                              .map((i) => i.question_id)
                              .includes(o.option_id) && "selected"
                          }`}
                        >
                          {findTranslationFromData(
                            o.option_id,
                            o.option_label,
                            selectedLanguageId,
                            initData
                          )}
                          {o?.help_text && (
                            <div id="has_info_popup">
                              <Popover
                                content={() =>
                                  InfoPopupContent(
                                    findHelpTextFromTranslations(
                                      o.option_id,
                                      o?.help_text,
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
                        </td>{" "}
                        {/* Eğer seçim gerçekleşirse show_in-mobile ekstra "selected" class ı alacak */}
                        {/* Not Available */}
                        {data.x_option && (
                          <td className="middle_it none-td">
                            <label className="container_radio cancel">
                              <input
                                type="radio"
                                name={
                                  "single-table-colored-nc-11-" +
                                  o.option_id +
                                  "-" +
                                  data.id
                                }
                                value="n/a"
                                onChange={() => {
                                  handle(o.option_id, -4)
                                }}
                                checked={
                                  selectedValues.filter(
                                    (i) =>
                                      i.question_id === o.option_id &&
                                      i.value === -4
                                  )?.length > 0
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                        )}
                        {/* -2 */}
                        {data?.lower_limit === -3 && (
                          <td className="middle_it minus-3-td">
                            <label className="container_radio">
                              <input
                                type="radio"
                                name={
                                  "single-table-colored-nc-11-" +
                                  o.option_id +
                                  "-" +
                                  data.id
                                }
                                value="-3"
                                onChange={() => {
                                  handle(o.option_id, -3)
                                }}
                                checked={
                                  selectedValues.filter(
                                    (i) =>
                                      i.question_id === o.option_id &&
                                      i.value === -3
                                  )?.length > 0
                                }
                              />

                              <span className="checkmark"></span>
                            </label>
                          </td>
                        )}
                        {/* -1 */}
                        <td className="middle_it minus-2-td">
                          <label className="container_radio">
                            <input
                              type="radio"
                              name={
                                "single-table-colored-nc-11-" +
                                o.option_id +
                                "-" +
                                data.id
                              }
                              value="-2"
                              onChange={() => {
                                handle(o.option_id, -2)
                              }}
                              checked={
                                selectedValues.filter(
                                  (i) =>
                                    i.question_id === o.option_id &&
                                    i.value === -2
                                )?.length > 0
                              }
                            />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        <td className="middle_it minus-1-td">
                          <label className="container_radio">
                            <input
                              type="radio"
                              name={
                                "single-table-colored-nc-11-" +
                                o.option_id +
                                "-" +
                                data.id
                              }
                              value="-1"
                              onChange={() => {
                                handle(o.option_id, -1)
                              }}
                              checked={
                                selectedValues.filter(
                                  (i) =>
                                    i.question_id === o.option_id &&
                                    i.value === -1
                                )?.length > 0
                              }
                            />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        {/* 0 */}
                        {data.neutral && (
                          <td className="middle_it neutral-td">
                            <label className="container_radio">
                              <input
                                type="radio"
                                name={
                                  "single-table-colored-nc-11-" +
                                  o.option_id +
                                  "-" +
                                  data.id
                                }
                                value="0"
                                onChange={() => {
                                  handle(o.option_id, 0)
                                }}
                                checked={
                                  selectedValues.filter(
                                    (i) =>
                                      i.question_id === o.option_id &&
                                      i.value === 0
                                  )?.length > 0
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                        )}
                        <td className="middle_it plus-1-td">
                          <label className="container_radio">
                            <input
                              type="radio"
                              name={
                                "single-table-colored-nc-11-" +
                                o.option_id +
                                "-" +
                                data.id
                              }
                              value="1"
                              onChange={() => {
                                handle(o.option_id, 1)
                              }}
                              checked={
                                selectedValues.filter(
                                  (i) =>
                                    i.question_id === o.option_id &&
                                    i.value === 1
                                )?.length > 0
                              }
                            />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        {/* +1 */}
                        <td className="middle_it plus-2-td">
                          <label className="container_radio">
                            <input
                              type="radio"
                              name={
                                "single-table-colored-nc-11-" +
                                o.option_id +
                                "-" +
                                data.id
                              }
                              value="2"
                              onChange={() => {
                                handle(o.option_id, 2)
                              }}
                              checked={
                                selectedValues.filter(
                                  (i) =>
                                    i.question_id === o.option_id &&
                                    i.value === 2
                                )?.length > 0
                              }
                            />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        {/* +2 */}
                        {data?.upper_limit === 3 && (
                          <td className="middle_it plus-3-td">
                            <label className="container_radio">
                              <input
                                type="radio"
                                name={
                                  "single-table-colored-nc-11-" +
                                  o.option_id +
                                  "-" +
                                  data.id
                                }
                                value="3"
                                onChange={() => {
                                  handle(o.option_id, 3)
                                }}
                                checked={
                                  selectedValues.filter(
                                    (i) =>
                                      i.question_id === o.option_id &&
                                      i.value === 3
                                  )?.length > 0
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                        )}
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

export default TableRadioSelect
