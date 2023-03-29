import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import { Link } from "react-router-dom"
import CustomSelect from "../../../elements/custom_select"
import DeleteModal from "../../../elements/modal_delete"
import LoaderPage from "../../../elements/loader_page"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import TopFilter from "../../../elements/top_filter_dashboard"
import { useDispatch } from "react-redux"
import { AuthContext } from "../../../../../context/auth"
import {
  getSurveysMetrics,
  surveysManagementAction,
} from "../../../../../actions/adminActions"
import { useSelector } from "react-redux"
import moment from "moment"
import {
  saveClientName,
  saveSurveyId,
} from "../../../../../actions/surveysManagement"
import { saveClientIdForSurveys } from "../../../../../actions/clientManagement"

const SurveysManagement = () => {
  const dispatch = useDispatch()
  const [surveyType, setSurveyType] = useState(0)
  const surveysData = useSelector((store) => store.surveysManagement)
  const surveyMetrics = useSelector((store) => store.getSurveysMetrics)

  // HOOKS
  const [pageNumber, setPageNumber] = useState(1)
  const [surveyStatus, setSurveyStatus] = useState("live")
  const surveyRef = useRef(0)
  const { role } = useContext(AuthContext)
  const surveyId = useSelector((store) => store.saveSurveyId)

  // Getting surveys data from the server
  const getSurveysData = (tablePageNumber) => {
    dispatch(
      surveysManagementAction({
        surveyStatus: surveyStatus,
        // TODO: clientId has to be dynamic
        clientId: "0",
        pageNumber: tablePageNumber,
      })
    )
    dispatch(getSurveysMetrics())
  }

  // This switch case structure below this comment controls the survey types and gives values that send to server.
  // More information, you can look at the Confluence Documenation's Developer
  // Notes Section (Surveys Management Page)
  // https://leesmanindex.atlassian.net/wiki/spaces/DEVELOPMEN/pages/895025153/Surveys+management+page+surveys-management

  const determineSurveyStatus = (surveyTypeStr) => {
    /* TODO: Add other cases */
    switch (surveyTypeStr) {
      case 0:
        setSurveyStatus("live")
        break
      case 1:
        setSurveyStatus("closed")
        break
      case 2:
        setSurveyStatus("in build")
        break
      case 3:
        setSurveyStatus("")
        break
      case 4:
        setSurveyStatus("")
        break
      case 5:
        setSurveyStatus("")
        break
      default:
        setSurveyType("")
        break
    }
  }

  useLayoutEffect(() => {
    determineSurveyStatus(surveyType)
    console.log(surveyStatus)
    console.log("METRICS", surveyMetrics)
  }, [surveyType])

  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  // For initial page fetching
  useLayoutEffect(() => {
    getSurveysData(pageNumber)
  }, [surveyType])

  // Table Drop Functions
  const [actionKey, setActionKey] = useState("")
  const isAction = (record) => record.id === actionKey
  const openDrop = (record) => {
    setActionKey(record.id)
  }
  const ref_surveys_table_drop = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.classList.contains("surveys_table_drop")) {
        setActionKey("")
      }
    }
    document.addEventListener("click", handleClick)
    console.log("Total surveys count is ", surveysData.totalSurveysCount)
    return () => document.removeEventListener("click", handleClick)
  }, [setActionKey])

  const [deleteModal, setDeleteModal] = useState(false)

  const select_items_3 = [
    {
      id: 1,
      options: [
        "Contains",
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]

  //   Custom ANT Filter
  const [searchText, setSearchText] = useState("")
  const [searchedColumn, setSearchedColumn] = useState("")
  const searchInput = useRef(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText("")
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <>
        <h3>Show items with a value that:</h3>
        <Input
          ref={searchInput}
          placeholder={`Type...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        />
        {select_items_3.map((item, i, arr) => (
          <CustomSelect item={item} i={i} arr={arr} key={item.options[i]} />
        ))}

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          >
            Filter
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)}>
            Clear
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </>
    ),
    filterIcon: (filtered) => (
      <i
        className="cxv-expand-more-l-icn"
        style={{
          color: filtered ? "#4793F8" : "#1E1E1E",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  })
  //   Custom ANT Filter

  const columns = [
    role === "Leesman Admin"
      ? {
          title: "ID",
          dataIndex: "id",
          key: "id",
          ellipsis: true,
          width: "50px",
        }
      : { className: "d-none" },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
    },
    {
      title: "Survey",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: "15%",
    },
    {
      title: "Agent",
      dataIndex: "agent_name",
      key: "agent_name",
      ellipsis: true,
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      ellipsis: true,
    },
    {
      title: "Building",
      dataIndex: "building_location",
      key: "building_location",
      ellipsis: true,
    },
    {
      title: "Core modules",
      dataIndex: "core_modules",
      key: "core_modules",
      ellipsis: true,
      width: "8%",
      ...getColumnSearchProps("core_modules"),
    },
    {
      title: "Add modules",
      dataIndex: "add_modules",
      key: "add_modules",
      width: "8%",
    },
    {
      title: "Completed",
      dataIndex: "complete_rate",
      key: "complete_rate",
      render: (text, _) => (
        <>{text === null ? "0 %" : `${text?.toFixed(2)} %`}</>
      ),
    },
    {
      title: "Response rate",
      dataIndex: "response_rate",
      key: "response_rate",
      render: (text, _) => (
        <>{text === null ? "0 %" : `${text?.toFixed(2)} %`}</>
      ),
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      key: "start_date",
      render: (text, _) => {
        return <>{moment(new Date(text)).format("YYYY-MM-DD")}</>
      },
    },
    {
      title: "End date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text, _) => {
        return <>{moment(new Date(text)).format("YYYY-MM-DD")}</>
      },
    },
    {
      title: "Lmi",
      dataIndex: "lmi",
      key: "lmi",
    },
    {
      title: "Action",
      key: "action",
      width: "150px",
      render: (_, record) => {
        const action = isAction(record)
        return (
          <div className="action_btns" style={{marginRight: "10px"}}>
            <div className={`drop__btn ${action ? " show" : ""} `}>
              <button
                className="icon__btn"
                onClick={
                  action
                    ? () => setActionKey("")
                    : () => {
                        openDrop(record)
                      }
                }
              >
                <span
                  ref={ref_surveys_table_drop}
                  className="cxv-action-l-icn surveys_table_drop"
                ></span>
              </button>
              <div className="drop__menu">
                <ul style={{border:"1px solid", paddingLeft:"4px", borderRadius:"9px"}}>
                  {surveyType === 0 && (
                    <li>
                      <button>Survey link</button>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/create-survey"
                      onClick={() => {
                        dispatch(saveSurveyId(record.id))
                        dispatch(saveClientName(record.title))
                        dispatch(saveClientIdForSurveys(record.client_id))
                      }}
                    >
                      Edit
                    </Link>
                  </li>
                  {surveyType === 0 && (
                    <li>
                      <button>Respondent info</button>
                    </li>
                  )}
                  {surveyType === 1 && (
                    <li>
                      <button>Exports</button>
                    </li>
                  )}
                  {surveyType === 1 && (
                    <li>
                      <button>Edit Leesman+</button>
                    </li>
                  )}
                  {surveyType !== 0 && (
                    <li>
                      <button>Copy</button>
                    </li>
                  )}
                  {surveyType === 2 && (
                    <li>
                      <button>Notify agent/client</button>
                    </li>
                  )}
                  <li>
                    <button>View results</button>
                  </li>
                  <li>
                    <button>Bespoke setup</button>
                  </li>
                  {(surveyType === 2 || surveyType === 5) && (
                    <li>
                      <button onClick={() => setDeleteModal(true)}>
                        Delete
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <DeleteModal
        visibleDatasetModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
      <LoaderPage />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard isShow={false} />
            <h1>Survey management</h1>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12">
            <TopFilter
              // Filter items
              surveyRef={surveyRef}
              setSurveyType={setSurveyType}
              isClosedSurveys={true}
              AllLiveSurveys={true}
            />
          </div>

          <div className="col-lg-12">
            <div className="n_table pd_table has__filter">
              <Table
                columns={columns}
                scroll={{ x: 1000 }}
                ellipsis
                dataSource={surveysData.surveysList}
                onChange={(pagination, _) => {
                  setPageNumber(pagination.current)
                  dispatch(
                    surveysManagementAction({
                      surveyStatus: "live",
                      // TODO: clientId has to be dynamic
                      clientId: "0",
                      pageNumber: pagination.current,
                    })
                  )
                }}
                pagination={{
                  current: pageNumber,
                  pageSize: 10,
                  total: surveysData.totalSurveysCount,
                  showSizeChanger: false,
                }}
                loading={surveysData.loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SurveysManagement
