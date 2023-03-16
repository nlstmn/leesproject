import React from "react"
import { Table } from "antd"

const DependencyTable = ({ isDrawerDependency, setDrawerDependency }) => {
  const columns = [
    {
      title: "##",
      dataIndex: "key",
      key: "key",
      width: "90px",
    },
    {
      title: "Dependency name",
      dataIndex: "name",
      key: "name",
      render: (item) => <span>{item}</span>,
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
                onClick={() => setDrawerDependency(true)}
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
      name: "Dependency...",
    },
    {
      key: "AB002",
      name: "Dependency...",
    },
    {
      key: "AB003",
      name: "Dependency...",
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}

export default DependencyTable
