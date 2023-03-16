import React, { useState, useEffect } from "react"
import SectionDrawer from "./sections_add_edit_drawer"
import { Table, Tag } from "antd"
import axios from "axios"
import { customfilter } from "../../../../../util/functions"
import TableLoader from "../../../../common/TableLoader"
const Sections = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isChildrenModalVisible, setIsChildrenModalVisible] = useState(false)
  const [formData, setFormData] = useState({ pages: [] })
  const [pages, setPages] = useState([])
  const [bufferPages, setBufferPages] = useState([])
  const [selectedSection, setSelectedSection] = useState()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  const [bufferData, setBufferData] = useState([])
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id") ? params.get("client_id") : "0"
  const getData = () => {
    Promise.all([
      axios.get(`/admin/clients/${clientId}/surveys/sections`),
      axios.get(`/admin/clients/${clientId}/surveys/pages`),
    ]).then((res) => {
      console.log(res)
      setIsModalVisible(false)
      setData(res[0].data)
      setBufferData(res[0]?.data)
      setPages(res[1].data)
      setBufferPages(res[1].data)
      setLoading(false)
    })
  }
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }
  useEffect(() => {
    console.log(formData.questions)
  }, [formData])
  useEffect(() => {
    data && customfilter(query, data, ["name", "pages"], setBufferData)
  }, [query])

  const change = (e) => {
    const { name, value } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  const send = () => {
    if (selectedSection) {
      axios
        .put(
          `/admin/clients/${clientId}/surveys/sections/${selectedSection}`,
          formData
        )
        .then(() => getData())
    } else {
      axios
        .post(`/admin/clients/${clientId}/surveys/sections`, formData)
        .then(() => getData())
    }
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
      title: "ID",
      dataIndex: "id",
      render: (text) => <span>{`${text}`}</span>,
    },
    {
      title: "Section name",
      dataIndex: "name",
      render: (text) => <a>{text?.capitalize()}</a>,
    },
    {
      title: "Pages",
      dataIndex: "pages",
      render: (text) => (
        <ul className="table-__ul">
          {text?.map((tem) => (
            <li>{tem}</li>
          ))}
        </ul>
      ),
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 180,
      render: (record, _) => (
        <>
          <a
            onClick={() => {
              setSelectedSection(record.id)
              setIsModalVisible(true)
            }}
            href={`#!`}
            className="btn btn-sm btn-liste cursorp"
            title="Edit"
          >
            <span className="iconx-pencil"></span>
          </a>
        </>
      ),
    },
  ]
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <SectionDrawer
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isChildrenModalVisible={isChildrenModalVisible}
        setIsChildrenModalVisible={setIsChildrenModalVisible}
        formData={formData}
        change={change}
        send={send}
        pages={data.pages}
        setFormData={setFormData}
        selectedSection={selectedSection}
      />

      <div className="row clearfix">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row mb-4 page-__header">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h2 className="card-title">Sections</h2>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
              <a
                className="btn btn-primary ml-3"
                href="#!"
                onClick={() => {
                  setSelectedSection()
                  setFormData({ pages: [], name: "" })
                  setIsModalVisible(true)
                }}
              >
                New section
              </a>

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
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                  value={query}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12">
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
      </div>
    </>
  )
}

export default Sections
