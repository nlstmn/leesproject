import React, { useEffect, useLayoutEffect, useState } from "react"
import { Table, Tag, notification, Empty } from "antd"
import TagModal from "./modals/TagModal"
import axios from "axios"
import ParentModal from "./modals/TagParentModal"
import Tabs from "./Tabs"
import ImportExport from "../../common/ImportExport"
import TableLoader from "../../common/TableLoader"
import { customfilter } from "../../../util/functions"
const Tags = (props) => {
  const [state, setState] = useState({
    openModal: "",
  })
  const [tags, setTags] = useState([])
  const [parents, setParents] = useState([])
  const [themes, setThemes] = useState([])
  const [buffer, setBuffer] = useState([])
  const [bufferParent, setBufferParent] = useState([])

  const [val, setVal] = useState([])
  const [valParent, setValParent] = useState([])
  const [selectedTag, setSelectedTag] = useState({})
  const [selectedParent, setSelectedParent] = useState({})
  const [selectedTab, setSelectedTab] = useState("tags")
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const [loading, setLoading] = useState(true)
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }

  const emptyTag = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={"No tag to show"}
      ></Empty>
    ),
  }
  const emptyParent = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={"No tag parent to show"}
      ></Empty>
    ),
  }

  useLayoutEffect(() => {
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
    if (!clientId) {
      axios
        .get(`/admin/clients/0/tags`)
        .then((res) => {
          setTags(res.data.tags)
          setParents(res.data.parents)
          setThemes(res.data.themes)
          setBuffer(res.data.tags)
          setBufferParent(res.data.parents)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios
        .get(`/admin/clients/${clientId}/tags`)
        .then((res) => {
          setTags(res.data.tags)
          setParents(res.data.parents)
          setThemes(res.data.themes)
          setBuffer(res.data.tags)
          setBufferParent(res.data.parents)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          notification.warning({ message: "No client found!" })
        })
    }
  }

  useEffect(() => {
    customfilter(val, tags, ["tag_label", "parent_label"], setBuffer)
  }, [val])
  useEffect(() => {
    customfilter(valParent, parents, ["label"], setBufferParent)
  }, [valParent])
  const change = (e) => {
    const { value } = e.target
    setVal(value)
  }
  const change_parent = (e) => {
    const { value } = e.target
    setValParent(value)
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

  const columns = [
    {
      title: "Tags",
      dataIndex: "tag_label",
      key: "tag_label",
      width: "20%",
    },
    {
      title: "Parents",
      dataIndex: "parent_label",
      key: "parent_label",
      width: "20%",
      render: (text) => (
        <a className="sector-_tag">
          <Tag>{text.capitalize()}</Tag>
        </a>
      ),
    },

    {
      title: "Themes",
      dataIndex: "themes",

      key: "themes",
      render: (text) =>
        text.map((item) => {
          return (
            <a className="theme-_tag">
              <Tag>{item.theme_label.capitalize()}</Tag>
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
              setSelectedTag(record)
              setState((pre) => {
                return {
                  ...pre,
                  openModal: "new-tag",
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
  const columns_parent = [
    {
      title: "Parents",
      dataIndex: "label",
      key: "label",
      width: "20%",
      render: (text) => (
        <a className="sector-_tag">
          <Tag>{text.capitalize()}</Tag>
        </a>
      ),
    },

    {
      title: "Themes",
      dataIndex: "themes",

      key: "themes",
      render: (text) =>
        text.map((item) => {
          return (
            <a className="theme-_tag">
              <Tag>{item.theme_label.capitalize()}</Tag>
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
              setSelectedParent(record)
              setState((pre) => {
                return {
                  ...pre,
                  openModal: "new-parent",
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
  return (
    <>
      <div className="container-fluid clients-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              {clientId && <Tabs></Tabs>}
              <ul className="nav nav-tabs3 mt-4 mb-2">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedTab === "tags" && " active"
                    }`}
                    onClick={() => setSelectedTab("tags")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Tags
                  </a>
                </li>
                {!clientId && (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        selectedTab === "parents" && " active"
                      }`}
                      onClick={() => setSelectedTab("parents")}
                      data-toggle="tab"
                      href="#!"
                    >
                      Parents
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
                <span className="text-table-info">
                  Total: {buffer.length} tags
                </span>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <ImportExport
                  refresh={getData}
                  type={selectedTab}
                  data={selectedTab === "tags" ? buffer : bufferParent}
                  import={false}
                  export={true}
                />
                {selectedTab === "tags" && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedTag({})
                        setState((pre) => {
                          return {
                            ...pre,
                            openModal: "new-tag",
                          }
                        })
                      }}
                      type="button"
                      className="btn btn-primary bigger-_btn ml-3"
                    >
                      New additional tag
                    </button>
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
                {selectedTab === "parents" && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedParent({})
                        setState((pre) => {
                          return {
                            ...pre,
                            openModal: "new-parent",
                          }
                        })
                      }}
                      type="button"
                      className="btn btn-primary bigger-_btn ml-3"
                    >
                      New additional parent tag
                    </button>
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
                        value={valParent}
                        onChange={change_parent}
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              {selectedTab === "tags" && (
                <Table
                  pagination={
                    ({ position: ["none", "bottomLeft"] },
                    (itemRender = { itemRender }))
                  }
                  locale={emptyTag}
                  columns={columns}
                  dataSource={buffer}
                  loading={tableLoading}
                />
              )}
              {selectedTab === "parents" && (
                <Table
                  pagination={
                    ({ position: ["none", "bottomLeft"] },
                    (itemRender = { itemRender }))
                  }
                  locale={emptyParent}
                  columns={columns_parent}
                  dataSource={bufferParent}
                  loading={tableLoading}
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={`modal fade bd-example-modal-lg ${
            state.openModal === "new-tag" ? " d-block show" : ""
          }`}
        >
          <TagModal
            scope={props.location.scope}
            selectedTag={selectedTag}
            close={closeGroups}
            parents={parents}
          ></TagModal>
        </div>
        <div
          className={`modal fade bd-example-modal-lg ${
            state.openModal === "new-parent" ? " d-block show" : ""
          }`}
        >
          <ParentModal
            themes={themes}
            selectedParent={selectedParent}
            scope={props.location.scope}
            close={closeGroups}
          ></ParentModal>
        </div>
      </div>
    </>
  )
}
export default Tags
