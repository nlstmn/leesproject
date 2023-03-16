import React, { useEffect, useState } from "react"
import { Popover } from "antd"
import InfoPopupContent from "../layouts/info_popup_content"
import reactStringReplace from "react-string-replace"
import {
  findOptionFromTranslations,
  findQuestionFromTranslations,
  findTextFromTranslations,
  findTranslationFromData,
  findHelpTextFromTranslations,
  findHelpText2FromTranslations,
  replaceJSX,
} from "../../../../util/functions"

const DropdownSelect = ({
  item,
  i,
  arr,
  currentPage,
  handleAnswer,
  answers,
  data,
  initData,
  selectedLanguageId,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Please select")
  const [isClassSelect, setClassSelect] = useState(false)

  const modifyHelpText = (question, text) => {
    console.log(question, text)
    if (data?.help_text && data?.label?.includes("*")) {
      text = reactStringReplace(text, "* ", (match, i) => {
        return (
          <Popover
            content={() =>
              InfoPopupContent(
                findHelpTextFromTranslations(
                  data?.id,
                  data?.help_text,
                  selectedLanguageId,
                  initData?.questionTranslations
                )
              )
            }
            overlayClassName="maxt popup_i"
          >
            <span className="iconx-help-with-circle"></span>
          </Popover>
        )
      })
    }
    if (data?.help_text_2 && data?.label?.includes("**")) {
      text = reactStringReplace(text, "**", (match, i) => {
        return (
          <Popover
            content={() =>
              InfoPopupContent(
                findHelpText2FromTranslations(
                  data?.id,
                  data?.help_text_2,
                  selectedLanguageId,
                  initData?.questionTranslations
                )
              )
            }
            overlayClassName="maxt popup_i"
          >
            <span className="iconx-help-with-circle"></span>
          </Popover>
        )
      })
    }
    return text
  }
  useEffect(() => {
    let selectedOptionId = answers?.filter(
      (i) => i.page_id === currentPage[0].id && i.question_id === data.id
    )[0]?.option_id
    console.log(
      selectedOptionId,
      answers?.filter((i) => i.page_id === currentPage[0].id)
    )

    setSelectedOption(
      data?.options?.filter((i) => i?.option_id === selectedOptionId)[0]
        ?.option_label
    )
  }, [item, i, arr, currentPage, answers, data])

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const isAdditional = (id) => {
    return initData?.additional?.map((i) => i.id).includes(id)
  }

  const setSelectedThenCloseDropdown = (index, option) => {
    setSelectedOption(option)
    setIsOptionsOpen(false)
    let answer = {
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      page_id: currentPage[0].id,
      survey_page_id: currentPage[0].survey_page_id,
      type:
        currentPage[0]?.name === "DEMOGRAPHICS"
          ? item?.label?.toLowerCase()
          : currentPage[0]?.section_position === 100
          ? "additional"
          : currentPage[0]?.name,
      question_id: data.id,
      option_id: data?.options?.filter((i) => i.option_label === option)[0]
        ?.option_id,
      value: null,
    }
    handleAnswer(answer)
  }

  const handleKeyDown = (index, option) => (e) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault()
        setSelectedThenCloseDropdown(index, option)
        break
      default:
        break
    }
  }

  return (
    <>
      <div
        className={`survey-dropdown_select-container lss_c ${
          i === 0 ? " first-_itm" : " "
        } ${arr?.length - 1 === i ? " last-_itm" : ""}`}
        id={item?.id}
      >
        <label className={isOptionsOpen ? "expanded" : ""}>
          <m>
            {modifyHelpText(
              data,
              findTranslationFromData(
                item?.id,
                item?.label,
                selectedLanguageId,
                initData
              )
            )}
          </m>
        </label>
        <div
          className={`survey-dropdown_select ${
            selectedOption === "Please select" ? " color-_mt" : ""
          } `}
        >
          <div className="dropdown_select__items">
            <button
              id="hover-_hand"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOptionsOpen}
              className={isOptionsOpen ? "expanded" : ""}
              onClick={toggleOptions}
            >
              {findTranslationFromData(
                data?.options?.filter((i) =>
                  i.option_label?.includes(selectedOption)
                )[0]?.option_id,
                selectedOption,
                selectedLanguageId,
                initData
              ) ||
                findTextFromTranslations(
                  "Please select",
                  selectedLanguageId,
                  initData?.customisations
                )}
            </button>
            <ul
              className={`options ${isOptionsOpen ? "show" : ""}`}
              role="listbox"
              aria-activedescendant={selectedOption}
              tabIndex={0}
            >
              {item?.options?.map((option, index) => (
                <li
                  id={option}
                  role="option"
                  aria-selected={selectedOption === option}
                  className={index === -1 ? "dp-none" : " "}
                  tabIndex={0}
                  onKeyDown={handleKeyDown(index, option)}
                  onClick={() => {
                    setSelectedThenCloseDropdown(index, option)
                  }}
                >
                  {findTranslationFromData(
                    data?.options?.filter((i) =>
                      i.option_label?.includes(option)
                    )[0]?.option_id,
                    option,
                    selectedLanguageId,
                    initData
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default DropdownSelect
