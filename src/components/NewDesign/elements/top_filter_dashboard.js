import React, { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { DatePicker, Space, Button } from "antd"
import moment from "moment"
import { DeleteOutlined } from "@ant-design/icons"
import DropMenuCheckbox from "../elements/drop_menu_checkbox"
import DropMenuExport from "../elements/drop_menu_export"
import CascadingMenuCheckbox from "../elements/cascading_menu_checkbox "
import CustomSelect from "../elements/custom_select"
import TopRightInfo from "./top_right_info"
import { clientsManagementAction } from "../../../actions/adminActions"
import { useDispatch } from "react-redux"
import {
  createNewClient,
  initRowData,
  saveClientIdForSurveys,
  saveMenuIndex,
  saveMenuIndexSub,
} from "../../../actions/clientManagement"
import { useSelector } from "react-redux"

const { RangePicker } = DatePicker

const TopFilter = ({
  setVisibleLeftDrawer,
  setVisibleRightDrawer,
  setDatasetModal,
  setTopSelectFlag,
  isTopSelectFlag,
  setSurveyType,
  isFilter,
  isRegions,
  isIndustry,
  isClients,
  isDate,
  isOfficeData,
  isExport,
  isAllResults,
  isRefresh,
  isComparison,
  isReview,
  isQuestionSet,
  isSearchClients,
  isSearchAlphabetical,
  isCreateNew,
  isClosedSurveys,
  AllLiveSurveys,
  isClosedCampaigns,
  AllLiveCampaigns,
  isClientPage,
  isSearch,
  setLetterOne,
  setLetterTwo,
  searchText,
  setSearchText,
  totalClientsCount,
  clientsCountWithParameter,
  surveyRef,
  isNewSurvey,
}) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isNewOrEditClient = useSelector((store) => store.saveEditOrCreateClient)
  const totalSurveyData = useSelector(
    (store) => store.getSurveysMetrics.payload.totalSurveysCount
  )
  const filteredSurveys = useSelector(
    (store) => store.surveysManagement.totalSurveysCount
  )

  // Refresh Animation
  const [isRefreshing, setRefreshing] = useState(false)
  const startRefreshing = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1800)
  }
  // Refresh Animation

  // Alphabetic Filter
  const [isAlphabeticSelect, setAlphabeticSelect] = useState("") // Alphabetic Filter

  useEffect(() => {
    if (setLetterOne && setLetterTwo) {
      if (isAlphabeticSelect) {
        setLetterOne(isAlphabeticSelect[0])
        setLetterTwo(isAlphabeticSelect[2])
      } else {
        setLetterOne("")
        setLetterTwo("")
      }
    }
  }, [isAlphabeticSelect])

  const dateFormat = "DD / MM / YYYY"

  const data_filters4 = [
    {
      id: 2,
      label: "Office data",
      options: [
        "Office data",
        "Home data",
        "Campus data",
        "Retail data",
        "Lab data",
        "Student data",
      ],
    },
  ]

  const data_filters5 = {
    id: 2,
    label: "Comparison datasets",
    options: [
      "Leesman+",
      "Leesman Benchmark",
      "Leesman Home",
      "New dataset",
      "Dataset 05",
    ],
  }

  const select_items = [
    {
      id: 1,
      options: [
        "Live Surveys",
        "Closed Surveys",
        "In Build Surveys",
        "Closing Today",
        "Closing Tomorrow",
        "Demo Surveys",
        "Suspended Surveys",
      ],
    },
  ]

  const select_items_2 = [
    {
      id: 1,
      options: [
        "All live surveys",
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]

  const select_items_3 = [
    {
      id: 1,
      options: [
        "Closed campaigns",
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]

  const select_items_4 = [
    {
      id: 1,
      options: [
        "All live campaigns",
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]

  const treeDataRegions = [
    {
      title: "0-0",
      key: "0-0",
      children: [
        {
          title: "0-0-0",
          key: "0-0-0",
          children: [
            {
              title: "0-0-0-0",
              key: "0-0-0-0",
            },
            {
              title: "0-0-0-1",
              key: "0-0-0-1",
            },
            {
              title: "0-0-0-2",
              key: "0-0-0-2",
            },
          ],
        },
        {
          title: "0-0-1",
          key: "0-0-1",
          children: [
            {
              title: "0-0-1-0",
              key: "0-0-1-0",
            },
            {
              title: "0-0-1-1",
              key: "0-0-1-1",
            },
            {
              title: "0-0-1-2",
              key: "0-0-1-2",
            },
          ],
        },
        {
          title: "0-0-2",
          key: "0-0-2",
        },
      ],
    },
    {
      title: "0-1",
      key: "0-1",
      children: [
        {
          title: "0-1-0-0",
          key: "0-1-0-0",
        },
        {
          title: "0-1-0-1",
          key: "0-1-0-1",
        },
        {
          title: "0-1-0-2",
          key: "0-1-0-2",
        },
      ],
    },
    {
      title: "0-2",
      key: "0-2",
    },
  ]

  const treeDataIndustry = [
    {
      title: "0-0",
      key: "0-0",
    },
    {
      title: "0-1",
      key: "0-1",
    },
    {
      title: "0-3",
      key: "0-3",
    },
    {
      title: "0-4",
      key: "0-4",
    },
    {
      title: "0-5",
      key: "0-5",
    },
    {
      title: "0-6",
      key: "0-6",
    },
  ]

  const treeDataClients = [
    {
      title: "0-0",
      key: "0-0",
    },
    {
      title: "0-1",
      key: "0-1",
    },
    {
      title: "0-3",
      key: "0-3",
    },
    {
      title: "0-4",
      key: "0-4",
    },
    {
      title: "0-5",
      key: "0-5",
    },
    {
      title: "0-6",
      key: "0-6",
    },
  ]

  return (
    <>
      <div className="top__filter-dashboard b-t-b">
        {/* Left */}
        <div className="left__side">
          {isSearchClients && (
            <>
              <div className="left__item">
                <div className="n_input_control has_icon">
                  <span className="cxv-search-l-icn icn"></span>
                  <input
                    placeholder="Search..."
                    type="text"
                    className="n_input"
                    value={searchText}
                    onChange={(e) => {
                      let searchTextVal = e.target.value
                      setSearchText(searchTextVal)
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {isSearch && (
            <>
              <div className="left__item">
                <div className="n_input_control has_icon">
                  <span className="cxv-search-l-icn icn"></span>
                  <input
                    placeholder="Search.."
                    type="text"
                    className="n_input"
                  ></input>
                </div>
              </div>
            </>
          )}

          {isSearchAlphabetical && (
            <>
              <div className="left__item">
                <div className="alfabetik_filter">
                  <span
                    onClick={() => setAlphabeticSelect("A-C")}
                    className={`${
                      isAlphabeticSelect === "A-C" ? " active" : ""
                    }`}
                  >
                    A-C
                  </span>
                  <span
                    onClick={() => setAlphabeticSelect("D-F")}
                    className={`${
                      isAlphabeticSelect === "D-F" ? " active" : ""
                    }`}
                  >
                    D-F
                  </span>
                  <span
                    onClick={() => setAlphabeticSelect("G-I")}
                    className={`${
                      isAlphabeticSelect === "G-I" ? " active" : ""
                    }`}
                  >
                    G-I
                  </span>
                  <span
                    onClick={() => setAlphabeticSelect("J-L")}
                    className={`${
                      isAlphabeticSelect === "J-L" ? " active" : ""
                    }`}
                  >
                    J-L
                  </span>
                  <span
                    onClick={() => setAlphabeticSelect("M-O")}
                    className={`${
                      isAlphabeticSelect === "M-O" ? " active" : ""
                    }`}
                  >
                    M-O
                  </span>
                  <span
                    onClick={() => setAlphabeticSelect("P-R")}
                    className={`${
                      isAlphabeticSelect === "P-R" ? " active" : ""
                    }`}
                  >
                    P-R
                  </span>
                  <span
                    onClick={() => setAlphabeticSelect("S-U")}
                    className={`${
                      isAlphabeticSelect === "S-U" ? " active" : ""
                    }`}
                  >
                    S-U
                  </span>
                  <span
                    onClick={() => setAlphabeticSelect("V-X")}
                    className={`${
                      isAlphabeticSelect === "V-X" ? " active" : ""
                    }`}
                  >
                    V-X
                  </span>
                  <span
                    onClick={() => setAlphabeticSelect("Y-Z")}
                    className={`${
                      isAlphabeticSelect === "Y-Z" ? " active" : ""
                    }`}
                  >
                    Y-Z
                  </span>
                </div>
              </div>
            </>
          )}

          {isFilter && (
            <>
              <div className="left__item">
                <button
                  onClick={() => setVisibleLeftDrawer(true)}
                  className="btn-dash dark has-icn"
                >
                  Filter
                  <span className="cxv-filter-l-icn"></span>
                </button>
              </div>
              <div className="h_divider qq"></div>
            </>
          )}

          {isClosedSurveys && (
            <>
              <div className="left__item">
                {select_items.map((item, i, arr) => (
                  <CustomSelect
                    item={item}
                    i={i}
                    arr={arr}
                    key={item.options[i]}
                    setSurveyType={setSurveyType}
                  />
                ))}
              </div>
              <div className="h_divider qq"></div>
            </>
          )}

          {/* {AllLiveSurveys && <>
              <div className="h_divider qq"></div>
            <div className="left__item">
              {select_items_2.map((item, i, arr) => (
                <CustomSelect item={item} i={i} arr={arr} />
              ))}
            </div>
          </>} */}

          {isClosedCampaigns && (
            <>
              <div className="left__item">
                {select_items_3.map((item, i, arr) => (
                  <CustomSelect item={item} i={i} arr={arr} />
                ))}
              </div>
              <div className="h_divider qq"></div>
            </>
          )}

          {AllLiveCampaigns && (
            <>
              <div className="left__item">
                {select_items_4.map((item, i, arr) => (
                  <CustomSelect item={item} i={i} arr={arr} />
                ))}
              </div>
            </>
          )}

          {isRegions && (
            <>
              <div className="left__item">
                <CascadingMenuCheckbox
                  data={treeDataRegions}
                  setTopSelectFlag={setTopSelectFlag}
                  isTopSelectFlag={isTopSelectFlag}
                  label="Regions"
                  id="cascading1"
                />
              </div>
              <div className="h_divider qq"></div>
            </>
          )}

          {isIndustry && (
            <>
              <div className="left__item">
                <CascadingMenuCheckbox
                  data={treeDataIndustry}
                  setTopSelectFlag={setTopSelectFlag}
                  isTopSelectFlag={isTopSelectFlag}
                  label="Industry"
                  id="cascading1"
                />
              </div>
              <div className="h_divider qq"></div>
            </>
          )}

          {isClients && (
            <>
              <div className="left__item">
                <CascadingMenuCheckbox
                  data={treeDataClients}
                  setTopSelectFlag={setTopSelectFlag}
                  isTopSelectFlag={isTopSelectFlag}
                  label="Clients"
                  id="cascading1"
                />
              </div>
              <div className="h_divider qq"></div>
            </>
          )}

          {/* <div className="left__item">
                <DropMenuCheckbox data={data_filters2} setTopSelectFlag={setTopSelectFlag} isTopSelectFlag={isTopSelectFlag}/>
            </div> */}

          {isReview && (
            <>
              <div className="left__item">
                <button className="btn-dash drop has-icn">
                  Review
                  <span className="cxv-edit-l-icn"></span>
                </button>
              </div>
            </>
          )}

          {isRefresh && (
            <>
              <div className="left__item">
                <button
                  onClick={startRefreshing}
                  className={`btn-dash drop has-icn refresh ${
                    isRefreshing ? " refreshing" : " "
                  } `}
                >
                  Refresh
                  <span className="cxv-refresh-l-icn"></span>
                </button>
              </div>
              <div className="h_divider qq"></div>
            </>
          )}

          {isDate && (
            <>
              <div className="left__item">
                <div className="n_calendar_select">
                  <RangePicker
                    format={"DD / MM / YYYY"}
                    getCalendarContainer={(triggerNode) => {
                      return triggerNode.parentNode
                    }}
                    defaultValue={[
                      moment("25 / 09 / 2022", dateFormat),
                      moment("01 / 10 / 2022", dateFormat),
                    ]}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right */}
        <div className="right__side">
          {isComparison && (
            <>
              <div className="right__item">
                <DropMenuCheckbox
                  data={data_filters5}
                  setTopSelectFlag={setTopSelectFlag}
                  isTopSelectFlag={isTopSelectFlag}
                  isComparison={true}
                  setDatasetModal={setDatasetModal}
                />
              </div>
              <div className="h_divider"></div>
            </>
          )}

          {isOfficeData && (
            <>
              <div className="right__item">
                {data_filters4.map((item, i, arr) => (
                  <CustomSelect item={item} i={i} arr={arr} bordered={true} />
                ))}
              </div>
              <div className="h_divider"></div>
            </>
          )}
          <span className="text-table-info total-c_span-ab">
            {location.pathname.match(/\/clients-management$/g) &&
              `Total: ${totalClientsCount} clients - ${clientsCountWithParameter} filtered`}
            {location.pathname.match(/\/surveys-management$/g) &&
              `Total: ${totalSurveyData} surveys - ${filteredSurveys} filtered`}
          </span>
          {/* This code provides clearing the alphabetic filter */}
          {isClientPage && (
            <div className="right__item">
              <Button
                onClick={() => {
                  setAlphabeticSelect("")
                  setSearchText("")
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  opacity:
                    isAlphabeticSelect !== "" || searchText !== "" ? "1" : "0",
                }}
              >
                <DeleteOutlined /> Clear Filter
              </Button>
            </div>
          )}
          <div className="h_divider"></div>
          {isCreateNew && (
            <>
              <div className="right__item">
                {isClientPage ? (
                  <NavLink
                    to="/client-settings"
                    onClick={() => {
                      dispatch(saveClientIdForSurveys(null))
                      dispatch(saveMenuIndex("Main"))
                      dispatch(saveMenuIndexSub(null))
                      dispatch(initRowData())
                      dispatch(createNewClient())
                    }}
                    className="btn-dash drop has-icn"
                  >
                    Create new
                    <span className="cxv-create-l-icn"></span>
                  </NavLink>
                ) : (
                  <button className="btn-dash drop has-icn">
                    Create new
                    <span className="cxv-create-l-icn"></span>
                  </button>
                )}
              </div>
              <div className="h_divider"></div>
            </>
          )}

          {isExport && (
            <>
              <div className="right__item">
                <DropMenuExport
                  setTopSelectFlag={setTopSelectFlag}
                  isTopSelectFlag={isTopSelectFlag}
                />
              </div>
              <div className="h_divider"></div>
            </>
          )}

          {isAllResults && (
            <>
              <div className="right__item">
                <NavLink to="/analytics-results" className="btn-dash has-icn">
                  All results
                  <span className="cxc-all-results"></span>
                </NavLink>
              </div>
            </>
          )}

          {isQuestionSet && (
            <>
              <div className="right__item">
                <button
                  onClick={() => setVisibleRightDrawer(true)}
                  className="btn-dash"
                >
                  Question type
                </button>
              </div>
            </>
          )}
        </div>

        {/* For Client */}
        {/* Right Top Info */}
        <TopRightInfo />
        {/* For Client */}
      </div>
    </>
  )
}

export default TopFilter
