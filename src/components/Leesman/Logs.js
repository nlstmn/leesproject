import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useMemo,
} from "react"
import {
  notification,
  Table,
  Checkbox,
  Input,
  Button,
  Space,
  Tooltip,
} from "antd"
import { AuthContext } from "../../context/auth"
import { leesmanLogsAction } from "../../actions/leesmanActions"
import { useDispatch, useSelector } from "react-redux"
import ImportExport from "../common/ImportExport"
import TableLoader from "../common/TableLoader"
import moment from "moment"

const Logs = () => {
  const dispatch = useDispatch()
  const { bufferLogs, logs, error } = useSelector((store) => store.leesmanLogs)

  const { role } = useContext(AuthContext)

  const [query, setQuery] = useState("")

  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id") ? params.get("client_id") : 0
  const [loading, setLoading] = useState(true)
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }

  useLayoutEffect(() => {
    getData()
  }, [])

  const getData = () => {
    dispatch(leesmanLogsAction())
    setLoading(false)
    if (error) {
      notification.warning({ message: "You have no access to that page" })
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

  const filterLogs = useMemo(() => {
    let buffer = []
    logs.forEach((item) => {
      if (
        String(item.action_type).toLowerCase().includes(query.toLowerCase()) ||
        String(item.action).toLowerCase().includes(query.toLowerCase()) ||
        String(item.email).toLowerCase().includes(query.toLowerCase()) ||
        String(item.first_name).toLowerCase().includes(query.toLowerCase()) ||
        String(item.last_name).toLowerCase().includes(query.toLowerCase())
      ) {
        buffer.push(item)
      }
    })
    return buffer
  }, [logs, query])

  const changeQuery = (e) => {
    setQuery(e.target.value)
  }
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        if (a.email.toLowerCase() < b.email.toLowerCase()) return -1
        if (a.email.toLowerCase() > b.email.toLowerCase()) return 1
        return 0
      },
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "ascend",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a, b) => {
        if (a.email.toLowerCase() < b.email.toLowerCase()) return -1
        if (a.email.toLowerCase() > b.email.toLowerCase()) return 1
        return 0
      },
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "ascend",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a, b) => {
        if (a.email.toLowerCase() < b.email.toLowerCase()) return -1
        if (a.email.toLowerCase() > b.email.toLowerCase()) return 1
        return 0
      },
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "ascend",
    },
    {
      title: "Action type",
      dataIndex: "action_type",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (text) => (
        <a>
          {text ? moment(text.splitDate()).format("dddd, MMMM Do YYYY") : ""}
        </a>
      ),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
  ]

  return (
    <>
      <div className="container-fluid clients-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title">Logs</h2>
                <span className="text-table-info">
                  Total: {logs.length} logs - {bufferLogs.length} filtered
                </span>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <ImportExport
                  refresh={getData}
                  type={"logs"}
                  data={bufferLogs}
                  import={false}
                  export={true}
                />
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
                    value={query}
                    onChange={changeQuery}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card without-btn-table">
              <Table
                pagination={
                  ({ position: ["none", "bottomLeft"] },
                  (itemRender = { itemRender }))
                }
                columns={columns}
                rowKey={(x) => x.id}
                dataSource={filterLogs}
                loading={tableLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Logs
