import React, { useEffect, useState } from "react"
import {
  findLocationFromTranslations,
  findOptionFromTranslations,
  findQuestionFromTranslations,
  findTextFromTranslations,
  findTranslationFromData,
} from "../../../../util/functions"

const RadioSelect = ({
  data,
  answers,
  setAnswers,
  handleAnswer,
  currentPage,
  textModifier,
  initData,
  hideButtonGroups,
  setHideButtonGroups,
  isPage,
  setPage,
  userInfo,
  setUserInfo,
  sentPageAnswers,
  locationGroupLevel,
  setLocationGroupLevel,
  selectedLanguageId,
}) => {
  //locationGroup,location,floor
  //0             ,1        ,2
  const [labels, setLabels] = useState([])
  const [selectedLocationId, setSelectedLocationId] = useState(
    answers?.filter((i) => i.location_id)[0]?.location_id
  )
  const [selectedLocationGroupId, setSelectedLocationGroupId] = useState()
  const [selectedFloor, setSelectedFloor] = useState()
  const [allLocations, setAllLocations] = useState([])
  const [bufferLocations, setBufferLocations] = useState([])
  const [locationGroups, setLocationGroups] = useState([])
  const [bufferLocationGroups, setBufferLocationGroups] = useState([])
  const [currentItemCount, setCurrentItemCount] = useState(0)
  const [noMatch, setNoMatch] = useState(false)
  const [floors, setFloors] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    setLabels(
      initData?.locationLabels
        .sort((a, b) => a.level - b.level)
        .map((i) => i.label)
    )
    setAllLocations([...initData?.locations])
    setBufferLocations([...initData?.locations])
    let locationGroupIds = initData?.locations?.map((i) => i.location_group_id)
    locationGroupIds = [...new Set(locationGroupIds)].filter((i) => i)
    let floorIds = initData?.locations?.map((i) => i.parent_id)
    floorIds = [...new Set(floorIds)]
    setLocationGroups(
      locationGroupIds.map((i) => {
        return {
          id: i,
          label: initData?.locations?.filter(
            (o) => o.location_group_id === i
          )[0].location_group_name,
        }
      })
    )
    setBufferLocationGroups(
      locationGroupIds.map((i) => {
        return {
          id: i,
          label: initData?.locations?.filter(
            (o) => o.location_group_id === i
          )[0].location_group_name,
        }
      })
    )
    if (locationGroupIds.length === 0) {
      setLocationGroupLevel(1)
    }
    setFloors(initData?.locations?.filter((o) => o.parent_id))
  }, [initData])

  useEffect(() => {
    let data = initData?.locationLabels
      .filter((i) => i.language_id === selectedLanguageId)
      .sort((a, b) => a.level - b.level)
      .map((i) => i.label)
    //if not includes all translations show english

    if (data.length !== 3) {
      data = initData?.locationLabels
        .filter((i) => i.language_id === 12)
        .sort((a, b) => a.level - b.level)
        .map((i) => i.label)
    }
    console.log("labels", data)
    setLabels(data)
  }, [selectedLanguageId])

  useEffect(() => {
    console.log(userInfo)
    if (
      userInfo?.location_id &&
      !isSelectedLocationGroup(userInfo.location_id)
    ) {
      userInfo?.location_id !== initData?.otherOptions?.other_location?.id &&
        setSelectedLocationId(userInfo.location_id)

      if (userInfo.floor) {
        setLocationGroupLevel(2)
      } else if (userInfo?.location_id) {
        if (
          userInfo?.parent_location ===
          initData?.otherOptions?.other_location?.id
        ) {
          setLocationGroupLevel(0)
        } else {
          setLocationGroupLevel(1)
        }
      } else {
        setLocationGroupLevel(0)
      }
      //setLocationGroupLevel(userInfo?.location_id == initData?.otherOptions?.other_location?.id ? 0 : 1);
      handleAnswer({
        module_id: currentPage[0].survey_module_id,
        page_group_id: currentPage[0].page_group_id,
        page_id: currentPage[0].id,
        survey_page_id: currentPage[0].survey_page_id,
        type: "location",
        question_id: data.id,
        option_id: userInfo?.location_id,
        parent: userInfo?.parent_location,
        floor: userInfo?.floor,
      })
    }
  }, [userInfo])

  const filterData = (e, level) => {
    let data = level === 0 ? bufferLocationGroups : bufferLocations
    let buffer = []
    data.forEach((item) => {
      if (String(item.label).toLowerCase().includes(e.toLowerCase())) {
        buffer.push(item)
      }
    })

    if (e.length > 0 && buffer.length > 0) {
      setNoMatch(false)
      level === 0
        ? setBufferLocationGroups(buffer?.sortAlphabetically("label"))
        : setBufferLocations(buffer?.sortAlphabetically("label"))
    } else {
      if (buffer.length === 0 && e.length > 0) {
        setNoMatch(true)
      }
      setBufferLocationGroups(locationGroups)
      setBufferLocations(allLocations)
    }
  }
  useEffect(() => {
    filterData(query, locationGroupLevel)
  }, [query, locationGroupLevel, allLocations, locationGroups])

  const handle = (e, level) => {
    let data_ = {}
    switch (level) {
      case 0:
        setSelectedLocationId(e)
        setUserInfo((pre) => {
          return { ...pre, parent_location: e, location_id: null, floor: null }
        })
        data_ = {
          module_id: currentPage[0].survey_module_id,
          page_group_id: currentPage[0].page_group_id,
          page_id: currentPage[0].id,
          survey_page_id: currentPage[0].survey_page_id,
          type: "location",
          parent: null,
          question_id: data.id,
          option_id: e,
          floor: null,
        }
        break
      case 1:
        setSelectedLocationId(e)
        setUserInfo((pre) => {
          return { ...pre, location_id: e, floor: null }
        })
        data_ = {
          module_id: currentPage[0].survey_module_id,
          page_group_id: currentPage[0].page_group_id,
          page_id: currentPage[0].id,
          survey_page_id: currentPage[0].survey_page_id,
          type: "location",
          parent: userInfo?.parent_location,
          question_id: data.id,
          option_id: e,
          floor: null,
        }
        break
      case 2:
        setSelectedFloor(e)
        setUserInfo((pre) => {
          return { ...pre, floor: e }
        })
        data_ = {
          module_id: currentPage[0].survey_module_id,
          page_group_id: currentPage[0].page_group_id,
          page_id: currentPage[0].id,
          survey_page_id: currentPage[0].survey_page_id,
          type: "location",
          parent: userInfo?.parent_location,
          question_id: data.id,
          option_id: userInfo.location_id,
          floor: e,
        }
        break
    }

    handleAnswer(data_)
  }
  useEffect(() => {
    console.log(
      answers.filter(
        (i) =>
          i.page_id === currentPage[0].id &&
          ((locationGroupLevel === 2 &&
            i.floor === initData?.otherOptions?.other_location?.id) ||
            (locationGroupLevel === 0 &&
              i.parent === initData?.otherOptions?.other_location?.id) ||
            (locationGroupLevel === 1 &&
              i.option_id === initData?.otherOptions?.other_location?.id))
      ).length
    )
  }, [answers])
  const gotoTop = () => {
    document.getElementById("survey-_scroll").scroll(0, 0, "smooth")
    document.getElementById("middle-wizard") &&
      document.getElementById("middle-wizard").scroll(0, 0, "smooth")
    document.getElementById("scroll__that") &&
      document.getElementById("scroll__that").scroll(0, 0, "smooth")
  }
  useEffect(() => {
    console.log("locationGroupLevel", locationGroupLevel, userInfo)
    gotoTop()
    setQuery("")
  }, [locationGroupLevel])
  const sortBySelection = (data, type) => {
    switch (type) {
      case "alphabetical":
        return data.sortAlphabetically("label")
      case "id":
        return data.sort((a, b) => a.id - b.id)
      case "setup":
        return data.sort((a, b) => a.position - b.position)
      case "client":
        return data.sort(
          (a, b) => a.client_setup_position - b.client_setup_position
        )
      default:
        return data.sortAlphabetically("label")
    }
  }
  const question = (locations) => {
    //setCurrentItemCount(locations?.length);
    let currentCount =
      locationGroupLevel === 0
        ? locationGroups?.length
        : allLocations?.filter(
            (i) => i.location_group_id === selectedLocationId
          )?.length

    return locations?.length > 0 ? (
      <>
        {" "}
        {currentCount > 15 && (
          <div className="n_input_control has_icon survey_search_container">
            {noMatch && <span className="warning">No match found!</span>}

            <span className="cxv-search-l-icn icn"></span>

            <input
              placeholder="Search..."
              type="text"
              className={`n_input survey_search mb-5`}
              name="specify"
              id="specify"
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              value={query}
            ></input>
          </div>
        )}
        <div className="form-group right-_bordered">
          {sortBySelection(locations, initData?.general?.location_sort)?.map(
            (o) => {
              return (
                <label className="container_radio version_2 survey ss">
                  <input
                    type="radio"
                    onChange={() => {
                      handle(o.id, locationGroupLevel)
                    }}
                    checked={
                      answers.filter(
                        (i) =>
                          i.page_id === currentPage[0].id &&
                          ((locationGroupLevel === 2 &&
                            i.floor ===
                              initData?.otherOptions?.other_location?.id) ||
                            (locationGroupLevel === 0 &&
                              i.parent ===
                                initData?.otherOptions?.other_location?.id) ||
                            (locationGroupLevel === 1 &&
                              i.option_id ===
                                initData?.otherOptions?.other_location?.id))
                      ).length === 0 &&
                      (o.id ===
                        allLocations.filter(
                          (i) => i.id === selectedLocationId
                        )[0]?.location_group_id ||
                        answers.filter(
                          (i) =>
                            i.page_id === currentPage[0].id &&
                            i.option_id === o.id
                        ).length > 0 ||
                        answers.filter(
                          (i) =>
                            i.page_id === currentPage[0].id && i.parent === o.id
                        ).length > 0 ||
                        answers.filter(
                          (i) =>
                            i.page_id === currentPage[0].id && i.floor === o.id
                        ).length > 0)
                    }
                    name={`${data.id}-${o.id}`}
                    value={o.id}
                  />
                  <span className="label-_text">
                    {findLocationFromTranslations(
                      o.id,
                      o.label,
                      selectedLanguageId,
                      initData?.locationTranslations
                    )}
                  </span>
                  <span className="checkmark"></span>
                </label>
              )
            }
          )}
          {((locationGroupLevel === 1 &&
            initData?.general?.enable_other_location) ||
            (locationGroupLevel === 0 &&
              initData?.general?.enable_other_location_group) ||
            (locationGroupLevel === 2 &&
              initData?.general?.enable_other_floor)) && (
            <label className="container_radio version_2 survey ss">
              <input
                type="radio"
                onChange={() => {
                  let data_ = {}
                  console.log(locationGroupLevel, data)

                  switch (locationGroupLevel) {
                    case 0:
                      setUserInfo((pre) => {
                        return {
                          ...pre,
                          parent_location:
                            initData?.otherOptions?.other_location?.id,
                          location_id: null,
                          floor: null,
                        }
                      })
                      //setSelectedLocationId(initData?.otherOptions?.other_location?.id);
                      data_ = {
                        module_id: currentPage[0].survey_module_id,
                        page_group_id: currentPage[0].page_group_id,
                        page_id: currentPage[0].id,
                        survey_page_id: currentPage[0].survey_page_id,
                        type: "location",
                        parent: initData?.otherOptions?.other_location?.id,
                        question_id: data.id,
                        option_id: initData?.otherOptions?.other_location?.id,
                        floor: null,
                      }
                      break
                    case 1:
                      setUserInfo((pre) => {
                        return {
                          ...pre,
                          location_id:
                            initData?.otherOptions?.other_location?.id,
                          floor: null,
                        }
                      })
                      //setSelectedLocationId(initData?.otherOptions?.other_location?.id);

                      data_ = {
                        module_id: currentPage[0].survey_module_id,
                        page_group_id: currentPage[0].page_group_id,
                        page_id: currentPage[0].id,
                        survey_page_id: currentPage[0].survey_page_id,
                        type: "location",
                        parent: userInfo?.parent_location,
                        question_id: data.id,
                        option_id: initData?.otherOptions?.other_location?.id,
                        floor: null,
                      }
                      break
                    case 2:
                      setUserInfo((pre) => {
                        return {
                          ...pre,
                          floor: initData?.otherOptions?.other_location?.id,
                        }
                      })
                      setSelectedFloor(
                        initData?.otherOptions?.other_location?.id
                      )

                      data_ = {
                        module_id: currentPage[0].survey_module_id,
                        page_group_id: currentPage[0].page_group_id,
                        page_id: currentPage[0].id,
                        survey_page_id: currentPage[0].survey_page_id,
                        type: "location",
                        parent: userInfo?.parent_location,
                        question_id: data.id,
                        option_id: initData?.otherOptions?.other_location?.id,
                        floor: initData?.otherOptions?.other_location?.id,
                      }
                      break
                  }

                  handleAnswer(data_)
                }}
                checked={
                  answers.filter(
                    (i) =>
                      i.page_id === currentPage[0].id &&
                      ((locationGroupLevel === 2 &&
                        i.floor ===
                          initData?.otherOptions?.other_location?.id) ||
                        (locationGroupLevel === 0 &&
                          i.parent ===
                            initData?.otherOptions?.other_location?.id) ||
                        (locationGroupLevel === 1 &&
                          i.option_id ===
                            initData?.otherOptions?.other_location?.id))
                  ).length > 0
                }
                name={`${data.id}-${initData?.otherOptions?.other_location?.id}`}
                value={initData?.otherOptions?.other_location?.id}
              />
              <span className="label-_text">
                {findTextFromTranslations(
                  "Other",
                  selectedLanguageId,
                  initData?.customisations
                )}
              </span>
              <span className="checkmark"></span>
            </label>
          )}
        </div>
      </>
    ) : (
      <></>
    )
  }

  const decideQuestion = () => {
    switch (locationGroupLevel) {
      case 0:
        locationGroups.length === 0 && setLocationGroupLevel(1)
        return question(bufferLocationGroups)
      case 1:
        //setCurrentItemCount(bufferLocations?.filter((i) => i.location_group_id == selectedLocationId).length);

        console.log(
          "case 1 selected location id:",
          selectedLocationId,
          userInfo.parent_location,
          bufferLocations.filter(
            (i) => i.location_group_id === userInfo.parent_location
          ),
          bufferLocations
        )
        if (selectedLocationId) {
          if (
            allLocations.filter((i) => i.id === selectedLocationId).length === 0
          ) {
            return question(
              bufferLocations?.filter(
                (i) =>
                  i.location_group_id === selectedLocationId && !i.parent_id
              )
            )
          } else {
            return question(
              bufferLocations.filter(
                (i) =>
                  i.location_group_id ===
                    allLocations.filter((i) => i.id === selectedLocationId)[0]
                      .location_group_id && !i.parent_id
              )
            )
          }
        } else {
          return question(
            bufferLocations.filter(
              (i) =>
                i.location_group_id === userInfo.parent_location && !i.parent_id
            )
          )
        }

      case 2:
        //setCurrentItemCount(bufferLocations?.filter((i) => i.parent_id == selectedLocationId).length);

        //bufferLocations?.filter((i) => i.parent_id == selectedLocationId).length == 0 && setPage(isPage + 1);
        return question(
          bufferLocations?.filter((i) => i.parent_id === selectedLocationId)
        )
      default:
        return <></>
    }
  }
  const isSelectedLocationGroup = (id) => {
    return locationGroups.filter((i) => i.id === id).length > 0
  }

  return (
    <>
      {allLocations?.length && (
        <div className="question_div single-_select" id="scroll__that">
          {/* Question Title */}
          <h3 className="main_question">
            {locationGroupLevel === 1
              ? findTranslationFromData(
                  data.id,
                  labels[locationGroupLevel],
                  selectedLanguageId,
                  initData
                )
              : labels[locationGroupLevel]}
          </h3>
          {/* Answers */}

          {decideQuestion()}
        </div>
      )}
      <></>
    </>
  )
}

export default RadioSelect
