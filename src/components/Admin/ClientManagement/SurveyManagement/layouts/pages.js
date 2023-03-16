import React, { useEffect, useLayoutEffect, useState } from "react"
import PageDrawer from "./pages_add_edit_drawer"
import { Table, Tag } from "antd"
import axios from "axios"
import { customfilter } from "../../../../../util/functions"
import TableLoader from "../../../../common/TableLoader"
const Pages = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isChildrenModalVisible, setIsChildrenModalVisible] = useState(false)
  const [formData, setFormData] = useState({ questions: [] })
  const [selectedPage, setSelectedPage] = useState()
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  const [bufferData, setBufferData] = useState([])
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id") ? params.get("client_id") : "0"
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }
  const getData = () => {
    axios.get(`/admin/clients/${clientId}/surveys/pages`).then((res) => {
      console.log(res)
      setIsModalVisible(false)
      setData(res.data.pages)
      setBufferData(res.data.pages)
      setLoading(false)
      setQuestions(res.data.questions)
    })
  }

  useEffect(() => {
    console.log(formData.questions)
  }, [formData])
  useEffect(() => {
    data &&
      customfilter(
        query,
        data,
        ["title", "name", "questions", "heading"],
        setBufferData
      )
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
    if (selectedPage) {
      axios
        .put(
          `/admin/clients/${clientId}/surveys/pages/${selectedPage}`,
          formData
        )
        .then(() => getData())
    } else {
      axios
        .post(`/admin/clients/${clientId}/surveys/pages`, formData)
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
      title: "Page name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Page title",
      dataIndex: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Page type",
      dataIndex: "type",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Heading",
      dataIndex: "heading",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Questions",
      dataIndex: "questions",
      render: (text) => (
        <ul className="table-__ul">
          {text.map((tem) => (
            <li>{tem.question_label}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 180,
      render: (record, text) => (
        <>
          <a
            onClick={() => {
              setSelectedPage(record.id)
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
      <PageDrawer
        formData={formData}
        change={change}
        send={send}
        questions={questions}
        pages={data}
        setFormData={setFormData}
        selectedPage={selectedPage}
        isModalVisible={isModalVisible}
        clientId={clientId}
        setIsModalVisible={setIsModalVisible}
        isChildrenModalVisible={isChildrenModalVisible}
        setIsChildrenModalVisible={setIsChildrenModalVisible}
      />

      <div className="row clearfix">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row mb-4 page-__header">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h2 className="card-title">Pages</h2>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
              <a
                className="btn btn-primary ml-3"
                href="#!"
                onClick={() => {
                  setSelectedPage()
                  console.log(formData)
                  setFormData({ questions: [], name: "", title: "" })
                  setIsModalVisible(true)
                }}
              >
                New page
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

export default Pages
