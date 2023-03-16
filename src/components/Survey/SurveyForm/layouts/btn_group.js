import React, { useEffect, useState } from "react"
import { Popconfirm } from "antd"
import { notification } from "antd"
import axios from "axios"
import { data } from "jquery"
import { findTextFromTranslations } from "../../../../util/functions"

const BtnGroup = ({
  isPage,
  setPage,
  prev,
  next,
  submit,
  pageCount,
  nextButtonDisabled,
  backButtonDisabled,
  pages,
  answers,
  currentPage,
  code,
  userInfo,
  initData,
  selectedLanguageId,
  locationGroupLevel,
  setLocationGroupLevel,
}) => {
  const [timeSpendOnPage, setTimeSpendOnPage] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeSpendOnPage(timeSpendOnPage + 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeSpendOnPage])

  const sentPageAnswers = () => {
    let pageData = answers.filter((i) => i.page_id === currentPage?.id)

    if (pageData.length > 0) {
      axios
        .put(`/survey/answer/${code}`, {
          data: pageData,
          user: userInfo,
          position: currentPage.position,
          time_spend_on_page: timeSpendOnPage,
        })
        .then((res) => {
          setTimeSpendOnPage(0)

          next()
        })
        .catch((err) => {
          console.log(err)
          setTimeout(function () {
            sentPageAnswers()
          }, 1000)
        })
    } else {
      next()
    }
  }
  const checkPages = (direction) => {
    console.log(userInfo)
    switch (direction) {
      case "next":
        if (
          currentPage?.name === "LOCATION" &&
          (locationGroupLevel === 0 ||
            (locationGroupLevel === 1 &&
              initData?.locations?.filter(
                (i) => i.parent_id === userInfo.location_id
              ).length > 0)) &&
          answers.filter((i) => i.type === "location")[0]?.option_id !==
            initData?.otherOptions?.other_location?.id
        ) {
          setLocationGroupLevel(locationGroupLevel + 1)
        } else {
          sentPageAnswers()
        }

        break
      case "back":
        if (
          currentPage?.name === "LOCATION" &&
          (locationGroupLevel === 1 || locationGroupLevel === 2)
        ) {
          setLocationGroupLevel(locationGroupLevel - 1)
        } else {
          prev()
        }

        break
      default:
        break
    }
  }
  return (
    <>
      <div id="bottom-wizard">
        {/* {isPage > 1 && (
          <button onClick={prev} type="button" name="backward" className="backward mr-2">
            Back
          </button>
        )}

          <button onClick={next} type="button" name="forward" className="forward mr-2">
            Next
          </button> */}

        {!(
          backButtonDisabled &&
          ((currentPage?.name === "LOCATION" && locationGroupLevel === 0) ||
            (currentPage?.name === "LOCATION" &&
              locationGroupLevel === 1 &&
              initData?.locations?.filter((i) => i.location_group_id !== null)
                .length === 0))
        ) && (
          <button
            id="hover-_hand"
            onClick={() => {
              if (currentPage?.name === "LOCATION") {
                {
                  !backButtonDisabled ||
                    (!(
                      currentPage?.name === "LOCATION" &&
                      locationGroupLevel === 0
                    ) &&
                      checkPages("back"))
                }
              } else {
                !backButtonDisabled && checkPages("back")
              }
            }}
            className={`btn_2 mr-3 validate ${
              backButtonDisabled ? " disable_it" : " "
            }`}
          >
            {findTextFromTranslations(
              "Back",
              selectedLanguageId,
              initData?.customisations
            )}
          </button>
        )}

        <button
          id="hover-_hand"
          onClick={() => !nextButtonDisabled && checkPages("next")}
          className={`btn_1 validate ${
            nextButtonDisabled ? " disable_it" : " "
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
  )
}

export default BtnGroup
