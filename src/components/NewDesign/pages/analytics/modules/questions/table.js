import React from "react"
import { Table } from "antd"

const QuestionsTable = ({ isDrawerQuestions, setDrawerQuestions }) => {
  const columns = [
    {
      title: "##",
      dataIndex: "key",
      key: "key",
      width: "90px",
    },
    {
      title: "Question",
      dataIndex: "name",
      key: "name",
      render: (item) => <span>{item}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (item) => <span className="table__type">{item}</span>,
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
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
              <button className="icon__btn" title="Delete">
                <span className="cxv-delete-l-icn clients_table_drop"></span>
              </button>
              <button
                onClick={() => setDrawerQuestions(true)}
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
      name: "My organisation’s workplace(s)",
      type: "continuous",
      options: ["Bespoke, Tailored"],
    },
    {
      key: "AB002",
      name: "Serviced offices or co-working spaces",
      type: "continuous",
      options: [
        "Bespoke, Tailored",
        "Flexible, Responsive",
        "Lively, Vibrant",
        "Calm, Quiet",
        "Contemporary",
        "Accessible, Open",
      ],
    },
    {
      key: "AB003",
      name: "Other workplaces (e.g. those of clients, partners or suppliers)",
      type: "continuous",
      options: ["Calm, Quiet", "Traditional", "Elsewhere"],
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}

export default QuestionsTable
