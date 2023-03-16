import React, { useState } from "react"
import { Link } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { Table, Tag, Space, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import { SearchOutlined } from "@ant-design/icons"
import TableLoader from "../common/TableLoader"

const ClientList = (props) => {
  const [searchText, setSearchText] = useState("")
  const [count, setCount] = useState(0)
  var searchInput = React.createRef()

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
      title: "ID",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.userNumber - b.userNumber,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Client name",
      dataIndex: "name",
      key: "name",

      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#2793ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.name.toString().toLowerCase().includes(value.toLowerCase()),
      render: (text, go) => (
        <span className="text-white">
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={props.show && text ? text.toString() : "***"}
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

      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      defaultSortOrder: "ascend",
    },

    {
      title: "Client ref no",
      dataIndex: "refNo",
      key: "refNo",
      render: (text) => <a>{props.show ? text : "***"}</a>,
    },

    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text) => <a>{props.show ? text : "***"}</a>,
    },

    {
      title: "Industry / sector",
      key: "industry",
      dataIndex: "industry",
      render: (industry) => (
        <>
          <a className="sector-_tag">
            <Tag color="blue" key={industry}>
              {industry?.toUpperCase()}
            </Tag>
          </a>
        </>
      ),
    },
    {
      title: "Number of users",
      dataIndex: "userCount",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.userCount - b.userCount,
    },
    {
      title: "Number of locations",
      dataIndex: "locationCount",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.locationCount - b.locationCount,
    },
    {
      title: "Weekly XP score",
      dataIndex: "weeklyXp",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.weeklyXp - b.weeklyXp,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 120,
      render: (text, record) => (
        <Link
          onClick={() => {
            localStorage.setItem("selectedClientId", record.key)
            localStorage.setItem("selectedClientLang", record.lang)
            localStorage.setItem("selectedClientName", record.name)
          }}
          to={`/client-main?client_id=${record.key}`}
          className="btn btn-sm btn-liste cursorp"
        >
          <span className="iconx-pencil"></span>
        </Link>
      ),
    },
  ]

  return (
    <>
      <span className="text-table-info total-c_span-ab">
        Total: {props.data.length} clients - {count} filtered
      </span>

      <Table
        pagination={
          ({ position: ["none", "bottomLeft"] }, (itemRender = { itemRender }))
        }
        columns={columns}
        onChange={(a, b, c, extra) => {
          console.log(extra)
          setCount(extra.currentDataSource.length)
        }}
        dataSource={props.data}
        loading={tableLoading}
      />
    </>
  )
}

export default ClientList
