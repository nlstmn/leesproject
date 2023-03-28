import React, { useEffect, useLayoutEffect, useState, useContext } from "react"
import "react-toastify/dist/ReactToastify.css"
import { Table, Space, Button, Input, Tag } from "antd"
import Highlighter from "react-highlight-words"
import { SearchOutlined } from "@ant-design/icons"
import moment from "moment"
import { connect } from "react-redux"
import * as settingsActions from "../../../../../actions/settingsAction"
import CreateSurvey from "../create-survey/index"
import axios from "axios"
import TableLoader from "../../../../common/TableLoader"
import {
  customfilter,
  generateExcelByDataAndName,
} from "../../../../../util/functions"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../../../../context/auth"
import Tabs from "../../Tabs"

const Surveys = ({ isCreateSurvey, setCreateSurvey, setSurveyId }) => {
  var searchInput = React.createRef()
  const search = window.location.search
  const params = new URLSearchParams(search)
  const { role } = useContext(AuthContext)
  const [searchText, setSearchText] = useState("")
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  const [bufferData, setBufferData] = useState([])
  const [loading, setLoading] = useState(true)
  const [clientId, setClientId] = useState(
      params.get("client_id") ? params.get("client_id") : "0"
  )
  const history = useHistory()

  //const clientId = params.get("client_id") ? params.get("client_id") : "0";
  const surveyId = params.get("survey_id")

  useEffect(() => {
    data &&
    customfilter(
        query,
        data,
        [
          "id",
          "client",
          "status",
          "title",
          "name",
          "description",
          "survey_type",
        ],
        setBufferData
    )
  }, [query])
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
  }
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText("")
  }
  useLayoutEffect(() => {
    getData()
    surveyId && setCreateSurvey(true)
    setCreateSurvey(false)
  }, [])

  const getData = () => {
    axios.get(`/admin/clients/${clientId}/surveys`).then((res) => {
      setData(res.data)
      setBufferData(res.data)
      setLoading(false)
    })
  }

  const getReport = (type, survey_id) => {
    let url = ""
    switch (type) {
      case "location":
        url = `/admin/clients/${clientId}/surveys/${survey_id}/locationreport`
        break
      case "department":
        url = `/admin/clients/${clientId}/surveys/${survey_id}/departmentreport`
        break
      case "delete":
        url = `/admin/clients/${clientId}/surveys/${survey_id}/deletesurveyreport`
        break
      default:
        break
    }
    axios.get(url).then((res) => {
      res.data?.length &&
      generateExcelByDataAndName(
          `survey_${survey_id}_${type}_export`,
          res.data
      )
      getData()
    })
  }

  const getSurveyReport = async (survey_id) => {
    axios
        .get(`/admin/clients/${clientId}/surveys/${survey_id}/surveyreport`)
        .then((res) => {
          console.log(res, res.data.url)
          if (res.data.url) {
            window.open(res.data.url, "_blank", "noopener,noreferrer")
          } else {
            res.data?.data &&
            generateExcelByDataAndName(
                `survey_${survey_id}_general_export`,
                res.data.data
            )
            getData()
          }
        })
  }

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a className="s-a-font">Previous</a>
    }
    if (type === "next") {
      return <a className="s-a-font">Next</a>
    }
    return originalElement
  }

  const columns = [
    {
      title: "Unique Id",
      dataIndex: "id",
      render: (text) => <span>{`${text}`}</span>,
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: "Client",
      dataIndex: "client",
      render: (text) => <a className="light-black">{text}</a>,
      sorter: {
        compare: (a, b) => a.client.localeCompare(b.client),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: {
        compare: (a, b) => a?.status?.localeCompare(b?.status),
      },
      render: (text, record) => (
          <a
              className={`
            ${text === "CLOSED" && "closed-_-tag"}
            ${text === "ACTIVE" && "active-_-tag"}
            ${text === "DRAFT" && "draft-_-tag"}
            ${text === "PENDING" && "pending-_-tag"}
            `}
          >
            <Tag>
              {record.status === "live" &&
              moment(record?.end_date).isBefore(moment())
                  ? "Closed"
                  : text?.capitalize()}
            </Tag>
          </a>
      ),
    },
    {
      title: "Survey",
      dataIndex: "title",
      filterIcon: (filtered) => (
          <SearchOutlined style={{ color: filtered ? "#2793ff" : undefined }} />
      ),
      onFilter: (value, record) =>
          record.title.toString().toLowerCase().includes(value.toLowerCase()),
      render: (text, go) => (
          <span className="text-white">
          <Highlighter
              highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ""}
          />
        </span>
      ),
      onFilterDropdownVisibleChange: (visible) =>
          visible && setTimeout(() => searchInput.select(), 100),
      filterDropdown: ({
                         setSelectedKeys,
                         selectedKeys,
                         confirm,
                         clearFilters,
                       }) => (
          <div style={{ padding: 8 }}>
            <Input
                ref={(node) => {
                  searchInput = node
                }}
                placeholder="Search"
                value={selectedKeys[0]}
                onChange={(e) =>
                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => handleSearch(selectedKeys, confirm)}
                style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                  onClick={() => handleReset(clearFilters)}
                  size="small"
                  style={{ width: 90 }}
              >
                Reset
              </Button>
            </Space>
          </div>
      ),
    },

    {
      title: "Start date",
      dataIndex: "start_date",
      render: (text) => (
          <a>{text ? moment(text?.split("T")[0]).format("DD MMM YYYY") : ""}</a>
      ),
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
    },
    {
      title: "End date",
      dataIndex: "end_date",
      render: (text) => (
          <a>{text ? moment(text?.split("T")[0]).format("DD MMM YYYY") : ""}</a>
      ),
      sorter: (a, b) => new Date(a.end_date) - new Date(b.end_date),
    },
    {
      title: "Survey type",
      dataIndex: "survey_type",
      render: (text) => <a>{text?.capitalize()}</a>,
    },
    {
      title: "User count",
      dataIndex: "users_count",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 200,
      render: (record) => (
          <>
            {
              <>
                <a
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      height: "30px",
                      padding: "5px",
                    }}
                    href={`#!`}
                    className="btn btn-sm btn-liste cursorp"
                    title="Edit"
                    onClick={() => {
                      history.push(
                          `/create-edit-survey?survey_id=${record.id}&client_id=${record.client_id}`
                      )
                    }}
                >
                  Edit survey
                </a>
                <a
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      height: "30px",
                      padding: "5px",
                    }}
                    href={`#!`}
                    className="btn btn-sm btn-liste cursorp"
                    title="location report"
                    onClick={() => {
                      getReport("location", record.id)
                    }}
                >
                  Location report
                </a>{" "}
                <a
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      height: "30px",
                      padding: "5px",
                    }}
                    href={`#!`}
                    className="btn btn-sm btn-liste cursorp"
                    title="department report"
                    onClick={() => {
                      getReport("department", record.id)
                    }}
                >
                  Department report
                </a>
                <a
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      height: "30px",
                      padding: "5px",
                    }}
                    href={`#!`}
                    className="btn btn-sm btn-liste cursorp"
                    title="survey report"
                    onClick={() => {
                      getSurveyReport(record.id)
                    }}
                >
                  Survey report
                </a>{" "}
                {record.cache_id && (
                    <a
                        style={{
                          width: "100%",
                          marginBottom: "5px",
                          height: "30px",
                          padding: "5px",
                        }}
                        href={`#!`}
                        className="btn btn-sm btn-liste cursorp"
                        title="delete report"
                        onClick={() => {
                          getReport("delete", record.id)
                        }}
                    >
                      Delete report
                    </a>
                )}
              </>
            }
          </>
      ),
    },
  ]

  return (
      <>
        {" "}
        <div className="container-fluid new-2022_class">
          <div className="row clearfix">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <h1>Survey management</h1>
              {(role !== "Admin" && clientId !== "0") && <Tabs />}
              <div className="row mb-4 page-__header">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <h2 className="card-title">
                    {!isCreateSurvey ? "Surveys" : "Create - Edit Survey"}
                  </h2>
                </div>

                {!isCreateSurvey ? (
                    <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                      {clientId !== "0" && (
                          <a
                              onClick={() =>
                                  history.push(
                                      `/create-edit-survey?client_id=${clientId}`
                                  )
                              }
                              className="btn btn-primary ml-3"
                              href="#!"
                          >
                            New survey
                          </a>
                      )}

                      <div className="input-group ml-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-search"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            onChange={(e) => {
                              setQuery(e.target.value)
                            }}
                            value={query}
                            className="form-control"
                            placeholder="Search"
                        />
                      </div>
                    </div>
                ) : (
                    <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                      <a
                          onClick={() => {
                            setCreateSurvey(false)
                            setSurveyId()
                          }}
                          className="btn btn-default ml-3"
                          href="#!"
                      >
                        Close
                      </a>
                    </div>
                )}
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12">
              {!isCreateSurvey ? (
                  <div className="card">
                    <Table
                        pagination={
                          ({ position: ["none", "bottomLeft"] },
                              (itemRender = { itemRender }))
                        }
                        columns={columns}
                        rowKey={(x) => x.id}
                        dataSource={bufferData}
                        loading={tableLoading}
                    />
                  </div>
              ) : (
                  <CreateSurvey />
              )}
            </div>
          </div>
        </div>
      </>
  )
}

const mapStateToProps = (state) => ({
  isCreateSurvey: state.settings.isCreateSurvey,
})

const mapDispatchToProps = (dispatch) => ({
  setCreateSurvey: (e) => dispatch(settingsActions.setCreateSurvey(e)),
  setSurveyId: (e) => dispatch(settingsActions.setSurveyId(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Surveys)
