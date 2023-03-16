import React from "react"
import { Table } from "antd"

const SectionsTable = ({ isDrawerSections, setDrawerSections }) => {
  const columns = [
    {
      title: "##",
      dataIndex: "key",
      key: "key",
      width: "90px",
    },
    {
      title: "Section name",
      dataIndex: "name",
      key: "name",
      render: (item) => <span>{item}</span>,
    },
    {
      title: "Pages",
      dataIndex: "pages",
      key: "pages",
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
                onClick={() => setDrawerSections(true)}
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
      name: "HUNTERIAN",
      pages: ["DEMOGRAPHICS", "ACTIVITYQUESTION1", "AVERAGETIME"],
    },
    {
      key: "AB002",
      name: "WELLNESS",
      pages: [
        "DEMOGRAPHICS",
        "ACTIVITYQUESTION1",
        "AVERAGETIME",
        "LOCATION",
        "EXTERNALMOBILITY",
        "OFFICEWORKSETTING",
        "INTERNALMOBILITY",
        "OFFACTIVITYQUESTION2",
        "FEATURESQUESTION1",
      ],
    },
    {
      key: "AB003",
      name: "COMPLETE",
      pages: ["DEMOGRAPHICS", "ACTIVITYQUESTION1", "AVERAGETIME"],
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}

export default SectionsTable
