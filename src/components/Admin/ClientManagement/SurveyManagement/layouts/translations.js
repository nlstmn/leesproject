import React, { useState, useEffect } from "react"
import SectionDrawer from "./sections_add_edit_drawer"
import { Table, Tag, Drawer, notification, Popconfirm } from "antd"
import axios from "axios"
import { customfilter } from "../../../../../util/functions"
import ReactMarkdown from "react-markdown"
import TableLoader from "../../../../common/TableLoader"
const Translations = () => {
  const [loading, setLoading] = useState(true)
  const [bufferData, setBufferData] = useState([])
  const [data, setData] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState("pages")
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [innerDrawerVisible, setInnerDrawerVisible] = useState(false)
  const [languages, setLanguages] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState(12)
  const [label, setLabel] = useState("")
  const [helpText, setHelpText] = useState("")
  const [currentTranslation, setCurrentTranslation] = useState([])
  const [newType, setNewType] = useState("")
  const [copyFrom, setCopyFrom] = useState([])
  const [overWrite, setOverWrite] = useState(false)
  const [innerQuery, setInnerQuery] = useState("")
  const [innerBuffer, setInnerBuffer] = useState([])

  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id") ? params.get("client_id") : "0"
  const getData = () => {
    axios.get(`/translations/${tab}`).then((res) => {
      setBufferData(res.data.data)
      setInnerBuffer(res.data.data)
      setData(res.data.data)
      setLanguages(res.data.languages)
      setLoading(false)
    })
  }
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
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

  useEffect(() => {
    data && customfilter(query, data, ["label", "parent"], setBufferData)
  }, [query])
  useEffect(() => {
    data && customfilter(innerQuery, data, ["label", "parent"], setInnerBuffer)
  }, [innerQuery])

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

      render: (text) => `${text.length} translations available`,
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
  const columnsWithParent = [
    {
      title: "id",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Parent",
      dataIndex: "parent",
      render: (text) => <a>{text?.join(", ")}</a>,
    },
    {
      title: "English (UK)",
      dataIndex: "label",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Translations",
      dataIndex: "translations",

      render: (text) => `${text.length} translations available`,
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

  const expandedRowRender = (key) => {
    console.log(key)
    const columns = [
      {
        title: "Language",
        dataIndex: "language",
        key: "language",
      },
      {
        title: "Label",
        dataIndex: "label",
        key: "label",
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
                  setSelectedLanguage(record?.language_id)
                  setLabel(record?.label)
                  setCurrentTranslation(key)
                  setDrawerVisible(true)
                }}
              >
                Update
              </a>
            </>
          </>
        ),
      },
    ]
    const columnsWithHelpText = [
      {
        title: "Language",
        dataIndex: "language",
        key: "language",
      },
      {
        title: "Label",
        dataIndex: "label",
        key: "label",
      },
      {
        title: "Help text",
        dataIndex: "help_text",
        key: "help_text",
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
                  setHelpText(record?.help_text)
                  setSelectedLanguage(record?.language_id)
                  setLabel(record?.label)
                  setCurrentTranslation(key)
                  setDrawerVisible(true)
                }}
              >
                Update
              </a>
            </>
          </>
        ),
      },
    ]
    return (
      <Table
        columns={tab === "questions" ? columnsWithHelpText : columns}
        dataSource={key.translations.sort(
          (a, b) => a.language_id - b.language_id
        )}
        pagination={false}
      />
    )
  }
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    setIsFilter(false)
    setQuery("")
    setBufferData([])
    getData()
  }, [tab])
  useEffect(() => {
    setLabel(
      currentTranslation?.translations?.filter(
        (i) => i.language_id === selectedLanguage
      )[0]?.label || ""
    )
  }, [selectedLanguage])

  useEffect(() => {
    isFilter
      ? setBufferData(bufferData.filter((i) => i?.translations?.length === 1))
      : setBufferData(data)
  }, [isFilter])
  const send = () => {
    axios
      .put(`/translations/${tab}/${currentTranslation?.id}`, {
        language_id: selectedLanguage,
        label: label,
        help_text: helpText,
        type: currentTranslation.label,
      })
      .then((res) => {
        getData()
        notification.success({ message: "Updated" })
      })
  }
  const create = () => {
    axios
      .post(`/translations/ui`, {
        language_id: selectedLanguage,
        label: label,
        type: newType,
      })
      .then((res) => {
        setNewType("")
        getData()
        notification.success({ message: "Updated" })
      })
  }
  const sendBulk = (id) => {
    let bulkData = data.filter((i) =>
      tab === "ui" ? i.label === id : i.id === id
    )[0].translations

    axios
      .put(`/translations/copytranslation`, {
        tab: tab,
        id: currentTranslation,
        overWrite: overWrite,
        data: bulkData,
      })
      .then((res) => {
        getData()
        notification.success({ message: "Updated" })
      })
  }
  return (
    <>
      <div className="drawer_sc-div create--sr" id="survey-_section">
        <Drawer
          title="Translations"
          placement="right"
          width="70%"
          onClose={() => {
            setDrawerVisible(false)
            setSelectedLanguage(12)
          }}
          visible={drawerVisible}
        >
          <Drawer
            title="Copy translations from"
            placement="right"
            width="60%"
            onClose={() => {
              setInnerDrawerVisible(false)
            }}
            visible={innerDrawerVisible}
          >
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <input
                    type="text"
                    onChange={(e) => {
                      setInnerQuery(e.target.value)
                    }}
                    value={innerQuery}
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </div>{" "}
              <div className="col-lg-7 col-md-7">
                <div className="form-group">
                  <select
                    onChange={(e) => {
                      setCopyFrom(e.target.value)
                    }}
                    className="form-control show-tick"
                    value={copyFrom}
                  >
                    return <option value="">Select copy from</option>;
                    {innerBuffer?.map((i) => {
                      return <option value={i.id || i.label}>{i.label}</option>
                    })}
                  </select>
                </div>
              </div>{" "}
              <div className="col-lg-2 col-md-2">
                <div className="form-group">
                  {copyFrom?.length > 0 && (
                    <Popconfirm
                      placement="bottom"
                      title={
                        overWrite
                          ? `This will copy translations from the selected option and the existing ones will be deleted.`
                          : `Skip the existing/already present ones and copy the remaining translations from the selected record.`
                      }
                      onConfirm={() => {
                        sendBulk(copyFrom)
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        style={{ marginLeft: "15px" }}
                      >
                        Copy
                      </button>
                    </Popconfirm>
                  )}
                </div>
              </div>{" "}
              <div className="col-lg-3 col-md-3">
                <div className="form-group">
                  <label className="fancy-checkbox">
                    <input
                      value={overWrite}
                      onChange={() => {
                        setOverWrite(!overWrite)
                      }}
                      type="checkbox"
                      name="questions"
                    />
                    <span className="light-black">Overwrite</span>
                  </label>
                </div>
              </div>{" "}
              <div className="col-lg-12 col-md-12">
                <Table
                  columns={
                    tab === "questions"
                      ? [
                          {
                            title: "Language",
                            dataIndex: "language",
                            key: "language",
                          },
                          {
                            title: "Label",
                            dataIndex: "label",
                            key: "label",
                          },
                          {
                            title: "Help text",
                            dataIndex: "help_text",
                            key: "help_text",
                          },
                        ]
                      : [
                          {
                            title: "Language",
                            dataIndex: "language",
                            key: "language",
                          },
                          {
                            title: "Label",
                            dataIndex: "label",
                            key: "label",
                          },
                        ]
                  }
                  dataSource={
                    data?.filter((i) =>
                      tab === "ui" ? i.label === copyFrom : i.id === copyFrom
                    )[0]?.translations
                  }
                  loading={tableLoading}
                />
              </div>
            </div>
          </Drawer>
          <div className="row clearfix">
            <div className="col-lg-8 col-md-8">
              <div className="form-group">
                <select
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value)
                  }}
                  className="form-control show-tick"
                  value={selectedLanguage}
                >
                  {languages?.map((i) => {
                    return <option value={i.id}>{i.label}</option>
                  })}
                </select>
              </div>
            </div>
            {tab !== "pages" && tab !== "ui" && (
              <div className="col-lg-4 col-md-4">
                <div className="form-group">
                  <button
                    type="button"
                    onClick={() => {
                      setInnerQuery("")
                      setOverWrite(false)
                      setCopyFrom("")
                      setInnerDrawerVisible(true)
                    }}
                    className="btn btn-sm btn-primary"
                    style={{ marginLeft: "15px" }}
                  >
                    Copy from another translation
                  </button>
                </div>
              </div>
            )}
            {newType?.length > 0 && tab === "ui" && (
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  {/* bildirim adı */}

                  <textarea
                    onChange={(e) => setNewType(e.target.value)}
                    value={newType}
                    style={{ minHeight: "50px" }}
                    type="text"
                    className="form-control"
                    placeholder="update/create translation"
                  />
                </div>
              </div>
            )}
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
            {tab === "questions" && (
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  {/* bildirim adı */}

                  <textarea
                    onChange={(e) => setHelpText(e.target.value)}
                    value={helpText}
                    style={{ minHeight: "200px" }}
                    type="text"
                    className="form-control"
                    placeholder="update/create Help text"
                  />
                </div>
              </div>
            )}
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
                newType?.length && tab === "ui" ? create() : send()
              }}
              className="btn btn-sm btn-primary"
              style={{ marginLeft: "15px" }}
            >
              Save
            </button>
          </div>
        </Drawer>
      </div>
      <div className="row clearfix">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row mb-4 page-__header">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h2 className="card-title">Translations</h2>
            </div>
          </div>
          <ul className="nav nav-tabs3 mt-4 mb-4">
            <li className="nav-item">
              <a
                className={`nav-link ${tab === "ui" && " active"}`}
                onClick={() => setTab("ui")}
                data-toggle="tab"
                href="#!"
              >
                Ui
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${tab === "pages" && " active"}`}
                onClick={() => setTab("pages")}
                data-toggle="tab"
                href="#!"
              >
                Pages
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${tab === "questions" && " active"}`}
                onClick={() => setTab("questions")}
                data-toggle="tab"
                href="#!"
              >
                Questions
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${tab === "options" && " active"}`}
                onClick={() => setTab("options")}
                data-toggle="tab"
                href="#!"
              >
                Options
              </a>
            </li>
            <li className="nav-item">
              <input
                type="text"
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
                value={query}
                className="form-control"
                placeholder="Search"
              />
            </li>
          </ul>
          <a
            onClick={() => {
              setIsFilter(!isFilter)
            }}
            className="btn btn-primary ml-3 float-r"
            href="#!"
          >
            Filter only English
          </a>
          {tab === "ui" && (
            <a
              onClick={() => {
                setNewType("New type")
                setDrawerVisible(true)
              }}
              className="btn btn-primary ml-3 float-r"
              href="#!"
            >
              Create new Global Translations
            </a>
          )}
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12">
          <Table
            pagination={
              ({ position: ["none", "bottomLeft"] },
              (itemRender = { itemRender }))
            }
            columns={tab === "ui" ? columns : columnsWithParent}
            expandable={{
              expandedRowRender,
              defaultExpandedRowKeys: ["0"],
            }}
            rowKey={(x) => x.id}
            dataSource={bufferData}
            loading={tableLoading}
          />
        </div>
      </div>
    </>
  )
}

export default Translations
