import React from "react"
import { Table, Switch } from "antd"

const NotificationsTable = ({
  isNotificationDrawer,
  setNotificationDrawer,
}) => {
  const columns = [
    {
      title: "##",
      dataIndex: "key",
      key: "key",
      width: "100px",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Notify to",
      dataIndex: "emails",
      key: "emails",
      render: (emails) => (
        <ul className="emails">
          {emails.map((item) => {
            return <li>{item}</li>
          })}
        </ul>
      ),
    },
    {
      title: "Description",
      key: "desc",
      render: (row, index) => (
        <p className="table__desc">
          When <strong>{row.respondentCount}</strong> users answer score
          <br />
          <strong>{row.highLowType}</strong> than{" "}
          <strong>%{row.highLowValue}</strong>
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "130px",
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="action_btns">
            <div className="fixed__btn">
              <button
                onClick={() => setNotificationDrawer(true)}
                className="icon__btn"
              >
                <span className="cxv-settings-l-icn clients_table_drop"></span>
              </button>

              <button className="icon__btn" title="Delete user">
                <span className="cxv-delete-l-icn clients_table_drop"></span>
              </button>

              <Switch size="small" defaultChecked />
            </div>
          </div>
        )
      },
    },
  ]

  const data = [
    {
      key: "AB001",
      type: "admin_question",
      title: "XXX Notification…",
      emails: ["a@example.com", "b@example.com", "c@example.com"],
      respondentCount: 45,
      highLowType: "Higher",
      highLowValue: 10,
    },
    {
      key: "AB002",
      type: "admin_question",
      title: "XXX Notification…",
      emails: ["a@example.com", "b@example.com", "c@example.com"],
      respondentCount: 344,
      highLowType: "Lower",
      highLowValue: 5,
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}

export default NotificationsTable
