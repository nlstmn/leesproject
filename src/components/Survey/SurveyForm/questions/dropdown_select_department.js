import React, { useEffect, useState } from "react"
import {
  findDepartmentFromTranslations,
  findTextFromTranslations,
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
  userInfo,
  setUserInfo,
  selectedLanguageId,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState([])
  const [level, setLevel] = useState(0)
  const [selectedDeparmentPath, setSelectedDepartmentPath] = useState([])
  const [lastParent, setLastParent] = useState([])

  const toggleOptions = (level) => {
    let openedLevels = isOptionsOpen
    if (openedLevels?.includes(level)) {
      openedLevels = openedLevels?.filter((i) => i !== level)
    } else {
      openedLevels.push(level)
    }
    setIsOptionsOpen([...openedLevels])
  }
  const findCascadePath = (id, data, other_id) => {
    let path = [id]
    const getParent = (data_id) => {
      const parent_id = data?.filter((i) => i.id === data_id)[0]?.parent_id
      path.push(parent_id)
      if (parent_id) {
        getParent(parent_id)
      }
    }
    getParent(id)
    path = path.filter((i) => i).reverse()

    return path
  }
  useEffect(() => {
    let path = []
    if (
      userInfo?.parent_department &&
      userInfo?.department_id === initData?.otherOptions?.other_department?.id
    ) {
      path = [
        ...findCascadePath(userInfo?.parent_department, initData?.departments),
        userInfo?.department_id,
      ]
    } else if (
      userInfo?.department_id !== initData?.otherOptions?.other_department?.id
    ) {
      path = findCascadePath(userInfo?.department_id, initData?.departments)
    } else {
      path = [
        ...findCascadePath(userInfo?.parent_department, initData?.departments),
        initData?.otherOptions?.other_department?.id,
      ]
    }
    setSelectedDepartmentPath(
      userInfo?.department_id
        ? userInfo?.department_id ===
          initData?.otherOptions?.other_department?.id
          ? [
              ...findCascadePath(
                userInfo?.parent_department,
                initData?.departments
              ),
              initData?.otherOptions?.other_department?.id,
            ]
          : findCascadePath(userInfo?.department_id, initData?.departments)
        : []
      //path
    )
    let answer = {
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      page_id: currentPage[0].id,
      survey_page_id: currentPage[0].survey_page_id,
      type: item?.label?.toLowerCase(),
      question_id: data.id,
      type: "department",
      parent:
        userInfo?.department_id === initData?.otherOptions?.other_department?.id
          ? selectedDeparmentPath[selectedDeparmentPath?.length - 2]
          : selectedDeparmentPath[selectedDeparmentPath?.length - 1],

      option_id: userInfo?.department_id,
      value: null,
    }

    handleAnswer(answer)
  }, [userInfo])

  const setSelectedThenCloseDropdown = (index, option, level, id) => {
    let openedLevels = isOptionsOpen
    openedLevels = openedLevels.filter((i) => i !== level)
    setIsOptionsOpen(openedLevels)

    let selectedId =
      option === "Other" ? initData?.otherOptions?.other_department?.id : id

    console.log(selectedId, id)

    let arr_ = selectedDeparmentPath
    arr_[level] = selectedId
    arr_.length = level + 1
    console.log(arr_)

    setSelectedDepartmentPath(arr_)

    setUserInfo((pre) => {
      return {
        ...pre,
        department_id: selectedId,
        parent_department: arr_[arr_?.length - 2],
      }
    })

    let answer = {
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      page_id: currentPage[0].id,
      survey_page_id: currentPage[0].survey_page_id,
      type: item?.label?.toLowerCase(),
      question_id: data.id,
      parent: arr_[arr_?.length - 2],
      type: "department",
      option_id: selectedId,
      value: null,
    }
    handleAnswer(answer)
  }

  const handleKeyDown = (index, option, level, id) => (e) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault()

        setSelectedThenCloseDropdown(index, option, level, id)
        break
      default:
        break
    }
  }
  const sortBySelection = (data, type) => {
    switch (type) {
      case "alphabetical":
        return data.sortAlphabetically("label")
      case "id":
        return data.sort((a, b) => a.id - b.id)
      case "setup":
        return data.sort((a, b) => a.position - b.position)
      default:
        return data.sortAlphabetically("label")
    }
  }
  const question = (departments_, selection, level, tailoredName) => {
    return (
      departments_.length > 0 && (
        <>
          {" "}
          <div
            className={`survey-dropdown_select-container ${
              i === 0 ? " first-_itm" : " "
            } ${arr?.length - 1 === i ? " last-_itm" : ""}`}
            id={item?.id}
          >
            {" "}
            <label className={isOptionsOpen?.includes(level) ? "expanded" : ""}>
              {tailoredName}
            </label>
            <div
              className={`survey-dropdown_select ${
                selection === "Please select" ? " color-_mt" : ""
              } `}
            >
              <div className="dropdown_select__items">
                <button
                  id="hover-_hand"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isOptionsOpen?.includes(level)}
                  className={isOptionsOpen?.includes(level) ? "expanded" : ""}
                  onClick={() => toggleOptions(level)}
                >
                  {findTextFromTranslations(
                    selection,
                    selectedLanguageId,
                    initData?.customisations
                  ) ||
                    findTextFromTranslations(
                      "Please select",
                      selectedLanguageId,
                      initData?.customisations
                    )}
                </button>
                <ul
                  className={`options ${
                    isOptionsOpen?.includes(level) ? "show" : ""
                  }`}
                  role="listbox"
                  aria-activedescendant={selection}
                  tabIndex={0}
                >
                  {sortBySelection(
                    departments_,
                    initData?.general?.department_sort
                  )?.map((option, index) => (
                    <li
                      id={option?.label}
                      role="option"
                      aria-selected={selection === option?.label}
                      className={index === -1 ? "dp-none" : " "}
                      tabIndex={0}
                      onKeyDown={handleKeyDown(index, option?.label, level)}
                      onClick={() => {
                        setSelectedThenCloseDropdown(
                          index,
                          option?.label,
                          level,
                          option.id
                        )
                      }}
                    >
                      {findDepartmentFromTranslations(
                        option?.id,
                        option?.label,
                        selectedLanguageId,
                        initData?.departmentTranslations
                      )}
                    </li>
                  ))}
                  {initData?.general?.enable_other_department && (
                    <li
                      id={"Other"}
                      role="option"
                      aria-selected={selection === "Other"}
                      className={" "}
                      tabIndex={0}
                      onKeyDown={handleKeyDown(0, "Other", level)}
                      onClick={() => {
                        setSelectedThenCloseDropdown(
                          0,
                          "Other",
                          level,
                          initData?.otherOptions?.other_department?.id
                        )
                      }}
                    >
                      {findTextFromTranslations(
                        "Other",
                        selectedLanguageId,
                        initData?.customisations
                      )}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )
    )
  }
  const findDepartmentLabel = (id) => {
    return id !== initData?.otherOptions?.other_department?.id
      ? initData?.departments.filter((i) => i.id === id)[0]?.label
      : "Other"
  }
  const findDepartmentId = (label) => {
    return (
      initData?.departments?.filter((i) => i.label === label) &&
      initData?.departments.filter((i) => i.label === label)[0]?.id
    )
  }

  const handleCascadingDepartments = (path) => {
    //render first level no matter what
    //if selected level has sub, render next level
    return (
      <>
        {question(
          initData?.departments?.filter((i) => !i.parent_id),
          findDepartmentLabel(path[0]),
          0,
          (initData?.departmentLabels &&
            initData?.departmentLabels.filter(
              (i) => i.language_id === selectedLanguageId
            )[0]?.label) ||
            findTextFromTranslations(
              "Department",
              selectedLanguageId,
              initData?.customisations
            )
        )}
        {selectedDeparmentPath.map((department, index) => {
          return question(
            initData?.departments?.filter(
              (i) => parseInt(i.parent_id) === selectedDeparmentPath[index]
            ),
            findDepartmentLabel(selectedDeparmentPath[index + 1]),
            index + 1,
            (initData?.departmentLabels &&
              initData?.departmentLabels.filter(
                (i) => i.language_id === selectedLanguageId
              )[index + 1]?.label) ||
              findTextFromTranslations(
                "Sub department",
                selectedLanguageId,
                initData?.customisations
              )
          )
        })}

        {/* {selectedDeparmentPath?.length >= 1 &&
          question(
            initData?.departments?.filter((i) => parseInt(i.parent_id) == selectedDeparmentPath[0]),
            findDepartmentLabel(selectedDeparmentPath[1]),
            1,
            (initData?.departmentLabels && initData?.departmentLabels[1]?.label) || "Sub department"
          )}
        {selectedDeparmentPath?.length >= 2 &&
          question(
            initData?.departments?.filter((i) => i.parent_id == selectedDeparmentPath[1]),
            findDepartmentLabel(selectedDeparmentPath[2]),
            2,
            (initData?.departmentLabels && initData?.departmentLabels[2]?.label) || "Sub department"
          )} */}
      </>
    )
  }

  return <>{handleCascadingDepartments(selectedDeparmentPath)}</>
}

export default DropdownSelect
