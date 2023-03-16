import React, { useState, useRef, useEffect } from "react"
import {
  Drawer,
  Table,
  Input,
  Popconfirm,
  Form,
  Typography,
  notification,
} from "antd"
import {
  CustomTreeColumn,
  EditableCell,
} from "../../../../common/commonComponents/formItems"
import { customfilter, dbToTree } from "../../../../../util/functions"
import ImportExport from "../../../../common/ImportExport"
import TranslationTemplate from "../../TranslationTemplate"
import axios from "axios"
import TableLoader from "../../../../common/TableLoader"
const Translations = ({
  initData,
  setInitData,
  surveyId,
  clientId,
  formData,
  setFormData,
  close,
  send,
  reset,
}) => {
  let drawerContainer = useRef()
  const [visibleLanguages, setLangages] = useState(false)

  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState("")
  const [tab, setTab] = useState("locations")
  const [buffer, setBuffer] = useState([])
  const [bufferData, setBufferData] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkboxes, setCheckboxes] = useState([])
  const [query, setQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState(
    formData.languages?.length ? formData.languages : [12]
  )
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [languages, setLanguages] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState(12)
  const [label, setLabel] = useState([])
  const [currentTranslation, setCurrentTranslation] = useState([])
  const [exportData, setExportData] = useState([])

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "English (UK)",
      dataIndex: "label",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Translations",
      dataIndex: "translations",
      render: (text) => (
        <ul className="table-__ul">
          {text
            ?.sort((a, b) => a.language_id - b.language_id)
            .map((tem) => (
              <li>{tem.language + ": " + tem.label}</li>
            ))}
        </ul>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 180,
      render: (record) => (
        <>
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
                setLabel(
                  record?.translations?.filter((i) => i.language_id === 12)[0]
                    ?.label
                )
                setCurrentTranslation(record)
                setDrawerVisible(true)
              }}
            >
              Create/Update
            </a>
          </>
        </>
      ),
    },
  ]
  const handleCheckbox = (id) => {
    let arr = selectedLanguages
    if (arr?.includes(id)) {
      arr = arr?.filter((i) => i !== id)
    } else {
      arr.push(id)
    }
    setSelectedLanguages([...arr])
  }
  useEffect(() => {
    populateCheckBoxes()
  }, [selectedLanguages])
  const populateCheckBoxes = () => {
    setCheckboxes(
      initData?.languages
        ?.filter((i) => i.id !== 12)
        .map((i) => {
          return (
            <div className="col-lg-3 col-md-3">
              <label className="fancy-checkbox">
                <input
                  checked={selectedLanguages?.includes(i.id)}
                  type="checkbox"
                  name="questions"
                  onChange={() => handleCheckbox(i.id)}
                  // value={index_}
                />
                <span className="light-black">{i.label}</span>
              </label>
            </div>
          )
        })
    )
  }

  useEffect(() => {
    if (formData?.translations) {
      let d = {}
      d = formData?.translations[tab] || []
      let translationData = []
      if (d.length) {
        d = d.filter((i) => i?.label?.length)
        d.forEach((row) => {
          let buffer = {
            type: tab,
            id: tab === "customisations" ? row.label : row.id,
          }
          selectedLanguages.forEach((l) => {
            buffer = {
              ...buffer,
              [initData?.languages?.filter((i) => i.id === l)[0].label]:
                row?.translations?.filter((i) => i.language_id === l)[0]?.label,
            }
          })
          translationData.push(buffer)
        })
        setData([...d])
        setBufferData([...d])
        setExportData(translationData)
      } else {
        setData([])
        setBufferData([])
      }
    }

    //setQuery("");
  }, [tab, formData])
  useEffect(() => {
    data && customfilter(query, data, ["label"], setBufferData)
  }, [query])
  useEffect(() => {
    setLabel(
      currentTranslation?.translations?.filter(
        (i) => i.language_id === selectedLanguage
      )[0]?.label || ""
    )
  }, [selectedLanguage])
  const sendTranslation = () => {
    axios
      .put(`/admin/clients/${clientId}/surveys/${surveyId}/translation`, {
        id: currentTranslation?.id,
        language_id: selectedLanguage,
        label: label,
        type: currentTranslation.label,
        tab: tab,
      })
      .then((res) => {
        console.log(res.data)
        //setDrawerVisible(false);
        reset()
        notification.success({ message: "Updated" })
      })
  }
  return (
    <>
      <div className="drawer_sc-div create--sr" id="survey-_section">
        <Drawer
          title="Translations"
          placement="right"
          width="60%"
          onClose={() => {
            setDrawerVisible(false)
            setSelectedLanguage(12)
          }}
          visible={drawerVisible}
        >
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <select
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value)
                  }}
                  className="form-control show-tick"
                  value={selectedLanguage}
                >
                  {selectedLanguages.map((i) => {
                    return (
                      <option value={i}>
                        {
                          initData?.languages?.filter((o) => o.id === i)[0]
                            ?.label
                        }
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <span className="light-black">
                  {"English translation: " +
                    currentTranslation?.translations?.filter(
                      (i) => i.language_id === 12
                    )[0]?.label}
                </span>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <span className="light-black">
                  {"selected language translation: " +
                    currentTranslation?.translations?.filter(
                      (i) => i.language_id === selectedLanguage
                    )[0]?.label}
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <button
                  type="button"
                  onClick={() => {
                    setLabel(label + " (Organisation name)")
                  }}
                  className="btn btn-sm btn-primary"
                  style={{ marginLeft: "15px" }}
                >
                  Add Organisation code
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <button
                  type="button"
                  onClick={() => {
                    setLabel(label + " (Workplace X / Other workplace)")
                  }}
                  className="btn btn-sm btn-primary"
                  style={{ marginLeft: "15px" }}
                >
                  Add selected location code
                </button>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                {/* bildirim adı */}

                <textarea
                  onChange={(e) => setLabel(e.target.value)}
                  value={label}
                  style={{ minHeight: "200px" }}
                  type="text"
                  className="form-control"
                  placeholder="update/create translation"
                />
              </div>
            </div>

            <div className="col-lg-12">
              <hr />
            </div>
          </div>
          <div className="dual--screen-bottom">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => setDrawerVisible(false)}
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                sendTranslation()
              }}
              className="btn btn-sm btn-primary"
              style={{ marginLeft: "15px" }}
            >
              Save
            </button>
          </div>
        </Drawer>
      </div>

      <div className="aspect-tab ">
        <label htmlFor="item-7" className="aspect-label"></label>
        <div className="aspect-content">
          <div className="aspect-info">
            <div className="tab-_status green"></div>
            <span className="aspect-name">Languages - Translations</span>
          </div>
        </div>
        <div className="">
          <div className="sentiment-wrapper">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 mb-3">
                <h6>Languages</h6>
              </div>
              <div className="col-lg-3 col-md-3">
                <label className="fancy-checkbox">
                  <input checked={true} type="checkbox" name="questions" />
                  <span className="light-black">English( UK )</span>
                </label>
              </div>
              {checkboxes}
              <div className="col-lg-12 col-md-12 mb-3 mt-4">
                <h6>Translations</h6>
              </div>
              <div className="col-lg-12 col-md-12 without-btn-table">
                <nav className="nav nav-tabs" role="tablist">
                  <a
                    href="#!"
                    className={`custom_tab nav-item nav-link ${
                      tab === "locations" && " active"
                    }`}
                    onClick={() => setTab("locations")}
                  >
                    Locations
                  </a>
                  <a
                    href="#!"
                    className={`custom_tab nav-item nav-link ${
                      tab === "departments" && " active"
                    }`}
                    onClick={() => setTab("departments")}
                  >
                    Departments
                  </a>
                  <a
                    className={`custom_tab nav-item nav-link ${
                      tab === "questions" && " active"
                    }`}
                    onClick={() => setTab("questions")}
                    href="#!"
                  >
                    Questions
                  </a>
                  <a
                    className={`custom_tab nav-item nav-link ${
                      tab === "options" && " active"
                    }`}
                    onClick={() => setTab("options")}
                    href="#!"
                  >
                    Options
                  </a>
                  <a
                    className={`custom_tab nav-item nav-link ${
                      tab === "customisations" && " active"
                    }`}
                    onClick={() => setTab("customisations")}
                    href="#!"
                  >
                    Customisations
                  </a>
                  <a
                    className={`custom_tab nav-item nav-link ${
                      tab === "tailored" && " active"
                    }`}
                    onClick={() => setTab("tailored")}
                    href="#!"
                  >
                    Tailored
                  </a>
                  <a
                    className={`custom_tab nav-item nav-link ${
                      tab === "departmentLabels" && " active"
                    }`}
                    onClick={() => setTab("departmentLabels")}
                    href="#!"
                  >
                    Department labels
                  </a>

                  <ImportExport
                    import={true}
                    export={true}
                    refresh={reset}
                    data={exportData}
                    selectedLanguages={selectedLanguages}
                    allLanguages={initData?.languages}
                    type={`survey_specific_translations`}
                    clientId={clientId}
                    surveyId={surveyId}
                  />
                  <a className={`custom_tab nav-item nav-link `}>
                    <input
                      type="text"
                      onChange={(e) => {
                        setQuery(e.target.value)
                      }}
                      value={query}
                      className="form-control"
                      placeholder="Search"
                    />
                  </a>
                </nav>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12">
                <Table columns={columns} dataSource={bufferData} />
              </div>
              <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    send("languages", selectedLanguages)
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Save
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    close()
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Translations
