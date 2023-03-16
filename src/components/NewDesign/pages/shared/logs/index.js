import React, { useState, useLayoutEffect } from "react"
import { Table } from "antd"
import LoaderPage from "../../../elements/loader_page"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import TopFilter from "../../../elements/top_filter_dashboard"

const LogsManagementAdmin = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  // Reset Drop Select
  const [isTopSelectFlag, setTopSelectFlag] = useState("")
  // Reset Drop Select

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Action type",
      dataIndex: "actionType",
      key: "actionType",
      render: (item) => <span className="table__type">{item}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Created at",
      dataIndex: "created",
      key: "created",
    },
  ]

  const data = [
    {
      key: "AB001",
      email: "Email…",
      firstName: "First name…",
      lastName: "Last name…",
      actionType: "Action type…",
      action: "Action…",
      created: "11.10.2022",
    },
    {
      key: "AB002",
      email: "Email…",
      firstName: "First name…",
      lastName: "Last name…",
      actionType: "Action type…",
      action: "Action…",
      created: "11.10.2022",
    },
    {
      key: "AB003",
      email: "Email…",
      firstName: "First name…",
      lastName: "Last name…",
      actionType: "Action type…",
      action: "Action…",
      created: "11.10.2022",
    },
    {
      key: "AB004",
      email: "Email…",
      firstName: "First name…",
      lastName: "Last name…",
      actionType: "Action type…",
      action: "Action…",
      created: "11.10.2022",
    },
    {
      key: "AB005",
      email: "Email…",
      firstName: "First name…",
      lastName: "Last name…",
      actionType: "Action type…",
      action: "Action…",
      created: "11.10.2022",
    },
  ]

  return (
    <>
      <LoaderPage />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard isShow={false} />
            <h1>Logs</h1>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12">
            <TopFilter
              setTopSelectFlag={setTopSelectFlag}
              isTopSelectFlag={isTopSelectFlag}
              isClientPage={true}
              // Filter items
              isExport={true}
              isSearch={true}
            />
          </div>

          <div className="col-lg-12">
            <div className="n_table has__filter">
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogsManagementAdmin
