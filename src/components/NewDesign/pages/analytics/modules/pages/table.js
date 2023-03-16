import React from "react"
import { Table } from "antd"

const PagesTable = ({ isDrawerPages, setDrawerPages }) => {
  const columns = [
    {
      title: "##",
      dataIndex: "key",
      key: "key",
      width: "90px",
    },
    {
      title: "Page name",
      dataIndex: "name",
      key: "name",
      render: (item) => <span>{item}</span>,
    },
    {
      title: "Page title",
      dataIndex: "title",
      key: "title",
      render: (item) => <span>{item}</span>,
    },
    {
      title: "Page type",
      dataIndex: "type",
      key: "type",
      render: (item) => <span className="table__type">{item}</span>,
    },
    {
      title: "Hover positive",
      dataIndex: "hover_positive",
      key: "hover_positive",
      render: (item) => <span>{item}</span>,
    },
    {
      title: "Hover neutral",
      dataIndex: "hover_neutral",
      key: "hover_neutral",
      render: (item) => <span>{item}</span>,
    },
    {
      title: "Popup",
      dataIndex: "popup",
      key: "popup",
      render: (item) => <span>{item ? "True" : "False"}</span>,
    },
    {
      title: "Questions",
      dataIndex: "questions",
      key: "questions",
      render: (item) => (
        <ul className="locations">
          {item.map((item) => {
            return <li>{item}</li>
          })}
        </ul>
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
              {/* <button className="icon__btn" title="Delete"><span className="cxv-delete-l-icn clients_table_drop"></span></button> */}
              <button
                onClick={() => setDrawerPages(true)}
                className="icon__btn"
                title="Edit"
              >
                <span className="cxv-settings-l-icn clients_table_drop"></span>
              </button>

              {/* <Switch size="small" defaultChecked /> */}
            </div>
          </div>
        )
      },
    },
  ]

  const data = [
    {
      key: "AB001",
      name: "LOCATION",
      title: "LOCATION",
      type: "radio",
      hover_positive: "",
      hover_neutral: "",
      popup: false,
      questions: [
        "Which of your organisation’s workplaces is the most important for your work?",
      ],
    },
    {
      key: "AB002",
      name: "DEMOGRAPHICS",
      title: "DEMOGRAPHICS",
      type: "dropdown",
      hover_positive: "",
      hover_neutral: "",
      popup: false,
      questions: [
        "Role",
        "Department",
        "Employment type",
        "Time with organisation",
        "Age group",
        "Gender",
      ],
    },
    {
      key: "AB003",
      name: "ACTIVITYQUESTION1",
      title: "ACTIVITYQUESTION1",
      type: "tick",
      hover_positive: "",
      hover_neutral: "",
      popup: false,
      questions: [
        "Individual focused work (desk-based)",
        "Individual focused work (not desk-based)",
        "Reading",
      ],
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}

export default PagesTable
