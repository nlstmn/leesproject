import React, { useState } from "react"
import { Link } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { Table, Space, Button, Input, Tag } from "antd"
import Highlighter from "react-highlight-words"
import { SearchOutlined } from "@ant-design/icons"
import moment from "moment"
import TableLoader from "../common/TableLoader"

import Drawer from "./CampaignDetails"
const CampaignList = (props) => {
  const [searchText, setSearchText] = useState("")
  const [isDetail, setIsDetail] = useState(false)
  const [selectedRow, setSelectedRow] = useState([])
  var searchInput = React.createRef()
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const tableLoading = {
    spinning: props.loading,
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText("")
  }

  const columns = [
    {
      title: "Unique Id",
      dataIndex: "id",
      width: 100,
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
      render: (text, record) => (
        <a
          className={`
        ${props.getStatus(record) === "CLOSED" && "closed-_-tag"} 
         ${props.getStatus(record) === "READY" && "ready-_-tag"} 
        ${props.getStatus(record) === "ACTIVE" && "active-_-tag"} 
        ${props.getStatus(record) === "DRAFT" && "draft-_-tag"} 
        ${props.getStatus(record) === "PAUSED" && "paused-_-tag"}`}
        >
          <Tag>{props.getStatus(record)}</Tag>
        </a>
      ),
      sorter: (a, b) => {
        if (props.getStatus(a).toLowerCase() < props.getStatus(b).toLowerCase())
          return -1
        if (props.getStatus(a).toLowerCase() > props.getStatus(b).toLowerCase())
          return 1
        return 0
      },
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "ascend",
    },
    {
      title: "Campaign",
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
      title: "Description",
      dataIndex: "description",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      width: 110,
      render: (text) => (
        <a>{text ? moment(text.splitDate()).format("DD MMM YY") : ""}</a>
      ),
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
    },
    {
      title: "End date",
      dataIndex: "end_date",
      width: 100,
      render: (text) => (
        <a>{text ? moment(text.splitDate()).format("DD MMM YY") : ""}</a>
      ),
      sorter: (a, b) => new Date(a.end_date) - new Date(b.end_date),
    },
    {
      title: "Target population",
      dataIndex: "respondents",
      render: (text) => <a>{text}</a>, //<a>{text}</a>
    },
    {
      title: "Respondents",
      dataIndex: "uniqueUsers",
      render: (text) => <a>{text}</a>, //<a>{text}</a>
    },
    {
      title: "Score",
      dataIndex: "avg",
      render: (text) => <a>{text}</a>, //<a>{text}</a>
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 220,
      render: (text, record) => (
        <>
          {record.status === "paused" && (
            <button
              onClick={() => {
                props.changeStatus(record.id, "active")
              }}
              title="Start campaign"
              className="btn btn-sm btn-liste cursorp"
            >
              <span className="iconx-play"></span>
            </button>
          )}

          {props.role !== "Admin" &&
            record.status === "active" &&
            (moment(record.end_date).isAfter(moment()) || !record.end_date) && (
              <button
                onClick={() => {
                  props.changeStatus(record.id, "paused")
                }}
                title="Pause campaign"
                className="btn btn-sm btn-liste cursorp"
              >
                <span className="iconx-pause"></span>
              </button>
            )}

          <Link
            to={`/campaign-details?campaign_id=${record.id}`}
            className="btn btn-sm btn-liste cursorp"
            title="Result"
          >
            <span className="iconx-eye1"></span>
          </Link>
          <button
            onClick={() => {
              setIsDetail(true)
              setSelectedRow(record)
            }}
            title="Show details"
            className="btn btn-sm btn-liste cursorp"
          >
            <span className="iconx-clipboard"></span>
          </button>

          {props.role !== "Admin" &&
            (moment(record.end_date).isAfter(moment()) || !record.end_date) && (
              <Link
                to={`/create-campaign?campaign_id=${record.id}&client_id=${record.client_id}`}
                className="btn btn-sm btn-liste cursorp"
                title="Edit"
              >
                <span className="iconx-pencil"></span>
              </Link>
            )}
        </>
      ),
    },
  ]

  return (
    <>
      <Table
        pagination={
          ({ position: ["none", "bottomLeft"] }, (itemRender = { itemRender }))
        }
        columns={columns}
        rowKey={(x) => x.id}
        loading={tableLoading}
        dataSource={props.campaigns}
      />
      <Drawer
        setIsVisible={setIsDetail}
        visible={isDetail}
        data={selectedRow}
      ></Drawer>
    </>
  )
}

export default CampaignList
