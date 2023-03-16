import React, { useEffect, useState } from "react"
import { Table, Tag, notification } from "antd"
import QuestionModal from "./modals/QuestionModal"
import axios from "axios"
import SectionModuleModal from "./modals/SectionModuleModal"
import Tabs from "./Tabs"
import ImportExport from "../../common/ImportExport"
import TableLoader from "../../common/TableLoader"
import { customfilter } from "../../../util/functions"
const Questions = (props) => {
  const [state, setState] = useState({
    openModal: "",
  })
  const [questions, setQuestions] = useState([])
  const [buffer, setBuffer] = useState([])
  const [val, setVal] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState({})
  const [modules, setModules] = useState([])
  const [selectedModule, setSelectedModule] = useState([])
  const [selectedTab, setSelectedTab] = useState("questions")
  const [commonLocations, setCommonLocations] = useState([])
  const [selectedSection, setSelectedSection] = useState("")
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }

  const search = window.location.search
  const params = new URLSearchParams(search)
  const urlParam = params.get("client_id")
  const clientId = urlParam ? urlParam : 0

  console.log(clientId)
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    getData()
  }, [props.location.scope])

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a className="s-a-font">Previous</a>
    }
    if (type === "next") {
      return <a className="s-a-font">Next</a>
    }
    return originalElement
  }

  function getData() {
    Promise.all([
      axios.get(`/admin/clients/${clientId}/questions`),
      axios.get(`/admin/clients/${clientId}/questions/0`),
    ])
      .then((value) => {
        console.log(value)
        let q = []
        let m = []
        let s = []
        if (!urlParam) {
          q = value[0].data.filter((i) => !i.client_id)
          m = value[1].data.modules.filter((i) => !i.client_id)
          s = value[1].data.sections.filter((i) => !i.client_id)
        } else {
          q = value[0].data.filter((i) => String(i.client_id) === clientId)
          m = value[1].data.modules.filter(
            (i) => String(i.client_id) === clientId
          )
          s = value[1].data.sections.filter(
            (i) => String(i?.client_id) === clientId
          )
        }
        setQuestions(q)
        setBuffer(q)
        setModules(m)
        setSections(s)
        setCommonLocations(value[1].data.commonLocations)

        setLoading(false)
        val.length > 0 &&
          customfilter(
            val,
            questions,
            ["heading", "section", "rule"],
            setBuffer
          )
        selectedSection.length > 0 &&
          filterQuestionsBasedOnSection(selectedSection)
      })
      .catch((err) => {
        console.log(err)
        notification.warning({ message: "No client found!" })
      })
  }

  useEffect(() => {
    customfilter(val, questions, ["heading", "section", "rule"], setBuffer)
  }, [val])
  useEffect(() => {
    filterQuestionsBasedOnSection(selectedSection)
  }, [selectedSection])

  const change = (e) => {
    const { value } = e.target
    setVal(value)
  }

  const closeGroups = () => {
    getData()
    setState((pre) => {
      return {
        ...pre,
        openModal: "",
      }
    })
  }
  function filterQuestionsBasedOnSection(s) {
    let arr = questions

    if (s !== "") {
      arr = arr.filter((i) => i.section_id === parseInt(s))
    }
    setBuffer(arr)
  }

  const columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      key: "heading",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
      width: "12%",
    },

    {
      title: "Question type",
      dataIndex: "type",
      width: "10%",
      key: "type",
      render: (text) => text.replace("_", " ").capitalize(),
    },
    {
      title: "Rule group",
      dataIndex: "rule",
      width: "5%",
      key: "rule",
    },
    {
      title: "Neutral",
      dataIndex: "neutral",
      width: "5%",
      key: "neutral",
      render: (text) => (!!text ? "True" : "False"),
    },

    {
      title: "Modules",
      dataIndex: "modules",
      key: "modules",
      render: (text) =>
        text.map((item) => {
          return (
            <a className="sector-_tag">
              <Tag>{item}</Tag>
            </a>
          )
        }),
    },

    {
      title: "Action",
      key: "action",
      width: 70,
      sorter: false,
      render: (value, record) => (
        <>
          <button
            onClick={() => {
              setSelectedQuestion(record)
              setState((pre) => {
                return {
                  ...pre,
                  openModal: "new-question",
                }
              })
            }}
            type="button"
            className="btn btn-sm btn-liste"
            title="Edit"
          >
            <i className="iconx-pencil"></i>
          </button>
        </>
      ),
      fixed: "right",
    },
  ]

  const column_modules = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      key: "action",
      width: 70,
      sorter: false,
      render: (value, record) => (
        <>
          <button
            onClick={() => {
              setSelectedModule(record)
              setState((pre) => {
                return {
                  ...pre,
                  openModal: "new-module",
                }
              })
            }}
            type="button"
            className="btn btn-sm btn-liste"
            title="Edit"
          >
            <i className="iconx-pencil"></i>
          </button>
        </>
      ),
      fixed: "right",
    },
  ]
  const column_sections = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      key: "action",
      width: 70,
      sorter: false,
      render: (value, record) => (
        <>
          <button
            onClick={() => {
              setSelectedSection(record)
              setState((pre) => {
                return {
                  ...pre,
                  openModal: "new-section",
                }
              })
            }}
            type="button"
            className="btn btn-sm btn-liste"
            title="Edit"
          >
            <i className="iconx-pencil"></i>
          </button>
        </>
      ),
      fixed: "right",
    },
  ]
  const changeCommonLocation = (id, code) => {
    let arr = commonLocations
    let changingItem = arr.filter((i) => i.id === parseInt(id))[0]
    changingItem = { ...changingItem, code: code }

    arr = arr.map((item) => {
      if (item.id === parseInt(id)) {
        return changingItem
      } else {
        return item
      }
    })
    setCommonLocations(arr)
  }
  const sendCommonLocation = () => {
    axios
      .put(`/admin/clients/${clientId}/locations/code`, commonLocations)
      .then((res) => {
        getData()
      })
  }

  return (
    <>
      <div className="container-fluid clients-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              {urlParam && <Tabs></Tabs>}
              <ul className="nav nav-tabs3 mt-4 mb-2">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedTab === "questions" && " active"
                    }`}
                    onClick={() => setSelectedTab("questions")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Questions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedTab === "modules" && " active"
                    }`}
                    onClick={() => setSelectedTab("modules")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Modules
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedTab === "sections" && " active"
                    }`}
                    onClick={() => setSelectedTab("sections")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Sections
                  </a>
                </li>
                {!urlParam && (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        selectedTab === "common locations" && " active"
                      }`}
                      onClick={() => setSelectedTab("common locations")}
                      data-toggle="tab"
                      href="#!"
                    >
                      Common locations
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title">{selectedTab.capitalize()}</h2>
                {selectedTab === "questions" ? (
                  <span className="text-table-info">
                    Total: {buffer.length} questions
                  </span>
                ) : selectedTab === "modules" ? (
                  <span className="text-table-info">
                    Total: {modules.length} modules
                  </span>
                ) : (
                  <span className="text-table-info">
                    Total: {commonLocations.length} common locations
                  </span>
                )}
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <ImportExport
                  refresh={getData}
                  type={selectedTab}
                  data={selectedTab === "questions" ? buffer : modules}
                  import={false}
                  export={true}
                />

                {selectedTab === "questions" && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedQuestion({})
                        setState((pre) => {
                          return {
                            ...pre,
                            openModal: "new-question",
                          }
                        })
                      }}
                      type="button"
                      className="btn btn-primary bigger-_btn ml-3"
                    >
                      New additional question
                    </button>
                    <div className="form-group mb-0 ml-3 top-_new-form">
                      <select
                        value={selectedSection}
                        onChange={(e) => {
                          setSelectedSection(e.target.value)
                        }}
                        name="section_id"
                        className="form-control show-tick"
                      >
                        <option value="">Sections</option>
                        {sections.map((i) => {
                          return <option value={i.id}>{i.title}</option>
                        })}
                      </select>
                    </div>

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
                        value={val}
                        onChange={change}
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                    </div>
                  </>
                )}

                {selectedTab === "modules" && (
                  <button
                    onClick={() => {
                      setSelectedModule({})
                      setState((pre) => {
                        return {
                          ...pre,
                          openModal: "new-module",
                        }
                      })
                    }}
                    type="button"
                    className="btn btn-primary bigger-_btn ml-3"
                  >
                    New additional module
                  </button>
                )}

                {selectedTab === "sections" && (
                  <button
                    onClick={() => {
                      setSelectedModule({})
                      setState((pre) => {
                        return {
                          ...pre,
                          openModal: "new-section",
                        }
                      })
                    }}
                    type="button"
                    className="btn btn-primary bigger-_btn ml-3"
                  >
                    New additional section
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              {selectedTab === "questions" && (
                <Table
                  pagination={
                    ({ position: ["none", "bottomLeft"] },
                    (itemRender = { itemRender }))
                  }
                  columns={columns}
                  dataSource={buffer}
                  loading={tableLoading}
                />
              )}
              {selectedTab === "common locations" && (
                <div className="scrollable--content dark-_bg col-lg-12 table--_content">
                  <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                      <label className="light-black table-_font">ID</label>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-7">
                      <label className="light-black table-_font">Label</label>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3">
                      <label className="light-black table-_font">Code</label>
                    </div>
                    <div className="col-lg-12">
                      <hr />
                    </div>
                    {commonLocations &&
                      commonLocations
                        .sort((a, b) => {
                          return a.id - b.id
                        })
                        .map((i) => {
                          return (
                            <>
                              <div className="col-lg-2 col-md-2 col-sm-2 form-group">
                                <input
                                  type="number"
                                  onChange={(e) => {}}
                                  className="form-control"
                                  value={i.id}
                                  placeholder="Common location id"
                                />
                              </div>
                              <div className="col-lg-7 col-md-7 col-sm-7 form-group">
                                <input
                                  type="text"
                                  value={i.label}
                                  onChange={(e) => {}}
                                  className="form-control"
                                  placeholder="Common location label"
                                />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 form-group">
                                <input
                                  type="text"
                                  value={i.code}
                                  onChange={(e) => {
                                    changeCommonLocation(i.id, e.target.value)
                                  }}
                                  className="form-control"
                                  placeholder="code"
                                  onFocus={() => {
                                    if (i.code && i.code.length > 0) {
                                      document.getElementById(
                                        "warningMessage" + i.id + i.label
                                      ).innerHTML =
                                        "Changing this value may cause some errors."
                                    }
                                  }}
                                />
                                <p
                                  style={{ color: "red" }}
                                  id={"warningMessage" + i.id + i.label}
                                ></p>
                              </div>
                            </>
                          )
                        })}
                    <div className="col-lg-12 pb-3">
                      <button
                        type="button"
                        data-dismiss="modal"
                        onClick={() => {
                          sendCommonLocation()
                        }}
                        className="btn btn-sm btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === "modules" && (
                <Table
                  pagination={
                    ({ position: ["none", "bottomLeft"] },
                    (itemRender = { itemRender }))
                  }
                  columns={column_modules}
                  dataSource={modules}
                  loading={tableLoading}
                />
              )}

              {selectedTab === "sections" && (
                <Table
                  pagination={
                    ({ position: ["none", "bottomLeft"] },
                    (itemRender = { itemRender }))
                  }
                  columns={column_sections}
                  dataSource={sections}
                  loading={tableLoading}
                />
              )}
            </div>
          </div>
        </div>
        {/* YENİ QUESTION EKLE / DÜZENLE MODAL */}
        <div
          key={selectedQuestion.id}
          className={`modal fade bd-example-modal-lg ${
            state.openModal === "new-question" ? " d-block show" : ""
          }`}
        >
          {
            <QuestionModal
              scope={props.location.scope}
              selectedQuestion={selectedQuestion}
              close={closeGroups}
              client_id={urlParam}
            ></QuestionModal>
          }
        </div>
        <div
          className={`modal fade bd-example-modal-lg ${
            state.openModal === "new-module" ? " d-block show" : ""
          }`}
        >
          <SectionModuleModal
            scope={props.location.scope}
            selected={selectedModule}
            close={closeGroups}
            type="modules"
          ></SectionModuleModal>
        </div>
        <div
          className={`modal fade bd-example-modal-lg ${
            state.openModal === "new-section" ? " d-block show" : ""
          }`}
        >
          <SectionModuleModal
            scope={props.location.scope}
            selected={selectedSection}
            close={closeGroups}
            type="sections"
          ></SectionModuleModal>
        </div>
      </div>
    </>
  )
}
export default Questions
