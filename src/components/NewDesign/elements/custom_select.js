import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

const CustomSelect = ({
  item,
  i,
  arr,
  bordered,
  isSelectChartType,
  setSelectChartType,
  setSurveyType,
  rightAreaCount,
}) => {
  const location = useLocation()
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0)

  const itemData = useSelector((store) => store.getSurveysMetrics)
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }
  const setSelectedThenCloseDropdown = (index) => {
    setSelectedOption(index)
    setIsOptionsOpen(false)
    location.pathname.match(/\/surveys-management$/g) && setSurveyType(index)
    if (isSelectChartType !== undefined) {
      setSelectChartType(index)
    }
  }
  const getSurveyCount = (index, itemData) => {
    const surveyCounts = itemData?.payload?.surveyCountsByStatuses

    if (!surveyCounts) return 0

    switch (index) {
      case 0:
        return surveyCounts?.live || 0
      case 1:
        return surveyCounts?.closed || 0
      case 2:
        return surveyCounts?.inBuild || 0
      case 3:
        return surveyCounts?.endingToday || 0
      case 4:
        return surveyCounts?.endingTomorrow || 0
      case 5:
        return surveyCounts?.demo || 0
      default:
        return 0
    }
  }

  const handleKeyDown = (index) => (e) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault()
        setSelectedThenCloseDropdown(index)
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

  const ref_dropdown_toggle_select = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.classList.contains("dropdown_toggle_select")) {
        setIsOptionsOpen(false)
      }
    }

    // When buttons dynamic
    // var ignoreClickOnMeElement = document.getElementById(item.id);
    // var isClickInsideElement = ignoreClickOnMeElement.contains(e.target);
    // if (!e.target.classList.contains('dropdown_toggle_select') || !isClickInsideElement) {
    //   setIsOptionsOpen(false);
    // }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [setIsOptionsOpen])

  return (
    <>
      <div
        className={`dash-dropdown_select-container ${
          bordered && bordered ? " bordered" : " "
        } ${i === 0 ? " first-_itm" : " "} ${
          arr.length - 1 === i ? " last-_itm" : ""
        }`}
        id={item.id}
      >
        <div
          className={`dash-dropdown_select ${
            item.options[selectedOption] === item.options[0] ? " color-_mt" : ""
          } `}
        >
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOptionsOpen}
            className={`dropdown_toggle_select ${
              isOptionsOpen ? "expanded" : ""
            }`}
            onClick={() => {
              toggleOptions()
            }}
            onKeyDown={handleListKeyDown}
            ref={ref_dropdown_toggle_select}
            id={item.id}
          >
            {item.options[selectedOption]}
          </button>
          <ul
            className={`options light-dropdown-menu ${
              isOptionsOpen ? "show" : ""
            }`}
            role="listbox"
            aria-activedescendant={item.options[selectedOption]}
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
          >
            {item.options.map((option, index) => (
              <li
                id={option}
                role="option"
                aria-selected={selectedOption === index}
                key={item.options[index]}
                // className={index === 0 ? "dp-none" : " "}
                tabIndex={0}
                onKeyDown={handleKeyDown(index)}
                onClick={() => {
                  setSelectedThenCloseDropdown(index)
                }}
                className="dropdown_item"
              >
                {option}
                &nbsp;
                {location.pathname.match(/\/surveys-management$/g) &&
                  itemData.payload !== undefined && (
                    <span className="survey_count_badge">
                      {getSurveyCount(index, itemData)}
                    </span>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CustomSelect
