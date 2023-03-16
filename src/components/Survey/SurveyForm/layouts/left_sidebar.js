import React, { useEffect, useState } from "react"
import { findTextFromTranslations, truncate } from "../../../../util/functions"
const LeftSidebar = ({
  initData,
  setPage,
  pages,
  saveLater,
  isLater,
  isPage,
  currentPage,
  setCheckedMenu,
  selectedLanguageId,
}) => {
  const [navigations, setNavigations] = useState([])
  const [selectedParent, setSelectedParent] = useState([])
  const [isJourney, setJourney] = useState(true)

  useEffect(() => {
    setNavigations(
      pages
        .filter((i) => i.position > 5 && i.name !== "LOCATION")
        .map((i) => {
          return {
            position: i.position,
            parent_name: i.module_client_id
              ? i.module_description
              : i?.page_group_name
              ? i?.page_type
              : "Additional questions",
          }
        })
        .filter((i) => i.parent_name)
    )
  }, [pages, isPage, currentPage, selectedLanguageId])

  return (
    <>
      <div className="dropdown_-progress">
        <input
          id="surveyJourney"
          name="checkbox"
          type="checkbox"
          checked={isJourney}
          onChange={(e) => setJourney(e.target.checked)}
        />
        <label htmlFor="surveyJourney" className="drop-_item" id="hover-_hand">
          <span>
            {findTextFromTranslations(
              "Survey journey",
              selectedLanguageId,
              initData?.customisations
            )}
          </span>
          <div className="lil_arrow"></div>
          <div className="bar"></div>
        </label>
        <div
          className={`dropdown_-progress__content ${
            isJourney ? " active_it" : ""
          } `}
        >
          <ul>
            {[...new Set(navigations?.map((i) => i.parent_name))].map((i) => {
              return (
                // Mevcut soru ekranında ise ise "active",
                // Tamamlandı ise "completed"
                <li
                  className={
                    navigations?.filter((n) => n.parent_name === i)?.length >
                      0 &&
                    `has_sub ${isPage === i.position && " active "} ${
                      navigations
                        .filter((o) => o.parent_name === i)
                        .map((o) => o.position)
                        .includes(isPage) && "opened"
                    }  }`
                  }
                  onClick={() => {
                    setSelectedParent(i)
                  }}
                  // Clicking the li element with the class name "has_sub" gets the class name "opened", if clicked again, remove it.
                  // Opens or closes the list of questions this element has.
                  // Clicked: "has_sub opened",
                  // Clicked again: "has_sub"

                  id="hover-_hand"
                >
                  {truncate(
                    findTextFromTranslations(
                      i?.capitalize(),
                      selectedLanguageId,
                      initData?.customisations
                    ),
                    20
                  )}
                  {/* Şuan mevcut soruda (devam ediyor) ise "active" class ı,
                        Soru tamamlandı ve geçildi ise "completed" class ı,
                        Alt basamaklara sahip ise ekstra mevcut class ın yanına "has_sub" class ı 
                    */}
                  <ul>
                    {/* Alt sorular / basamaklar var ise */}
                    {navigations
                      ?.filter((n) => n.parent_name === i)
                      ?.map((p, index) => {
                        return (
                          <li
                            className={`${
                              isPage === p.position
                                ? "sub_active"
                                : isPage > p.position
                                ? "sub_completed"
                                : ""
                            }`}
                            id="hover-_hand"
                          >
                            {findTextFromTranslations(
                              "Question (X) of (Y)",
                              selectedLanguageId,
                              initData?.customisations
                            )
                              .replace("X", index + 1)
                              .replace(
                                "Y",
                                navigations?.filter((n) => n.parent_name === i)
                                  .length
                              )}
                          </li>
                        )
                      })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
        <input
          id="saveForLater"
          name="checkbox"
          type="checkbox"
          onChange={() => {
            saveLater(!isLater)
            setCheckedMenu(false)
          }}
        />
        <label
          htmlFor="saveForLater"
          className="drop-_item save_later"
          id="hover-_hand"
        >
          <span>
            {findTextFromTranslations(
              "Save for later",
              selectedLanguageId,
              initData?.customisations
            )}
          </span>
          <div className="lil_plus">
            <i className="iconx-plus"></i>
          </div>
          <div className="bar"></div>
        </label>
      </div>
    </>
  )
}

export default LeftSidebar
