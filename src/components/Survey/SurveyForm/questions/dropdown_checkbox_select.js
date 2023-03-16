import React, { useEffect, useState } from "react"

const DropdownSelect = ({
  item,
  i,
  arr,
  currentPage,
  handleAnswer,
  answers,
  data,
  selectedLanguageId,
  initData,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(-1)
  const [isClassSelect, setClassSelect] = useState(false)

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const setSelectedThenCloseDropdown = (index, option) => {
    setSelectedOption(index)
    // setIsOptionsOpen(false);
    let answer = {
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      page_id: currentPage[0].id,
      survey_page_id: currentPage[0].survey_page_id,

      question_id: data.id,
      option_id: data.options.filter((i) => i.option_label.includes(option))[0]
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

  const handleListKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault()
        setIsOptionsOpen(false)
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedOption(
          selectedOption - 1 >= 0 ? selectedOption - 1 : item.options.length - 1
        )
        break
      case "ArrowDown":
        e.preventDefault()
        setSelectedOption(
          selectedOption === item.options.length - 1 ? 0 : selectedOption + 1
        )
        break
      default:
        break
    }
  }

  return (
    <>
      <div
        className={`survey-dropdown_select-container ${
          i === 0 ? " first-_itm" : " "
        } ${arr?.length - 1 === i ? " last-_itm" : ""}`}
        id={item?.id}
      >
        <label className={isOptionsOpen ? "expanded" : ""}>{item?.label}</label>
        <div
          className={`survey-dropdown_select ${
            selectedOption === -1 ? " color-_mt" : ""
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
              onKeyDown={handleListKeyDown}
            >
              {"Please select…"}
            </button>
            <ul
              className={`options ${isOptionsOpen ? "show" : ""}`}
              role="listbox"
              aria-activedescendant={item?.options[selectedOption]}
              tabIndex={0}
              onKeyDown={handleListKeyDown}
            >
              {item?.options?.map((option, index) => (
                <li
                  id={option}
                  role="option"
                  aria-selected={(selectedOption = index)}
                  className={index === -1 ? "dp-none" : " "}
                  tabIndex={0}
                >
                  <div className="labeled_custom_select default dropdown">
                    <label className="dashboard_check">
                      <input
                        type="checkbox"
                        name={option}
                        value={option}
                        onChange={() => {
                          setSelectedThenCloseDropdown(index, option)
                        }}
                        onKeyDown={() => {
                          handleKeyDown(index, option)
                        }}
                      />
                      <span className="label-_text">{option}</span>
                      <span className="checkmark"></span>
                    </label>
                  </div>
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
