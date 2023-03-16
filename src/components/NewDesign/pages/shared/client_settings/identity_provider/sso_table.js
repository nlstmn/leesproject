import React from "react"
import { Table } from "antd"

const SSO = () => {
  const columns = [
    {
      title: "Domain name",
      dataIndex: "domain",
      key: "domain",
      render: (item) => <strong className="">{item}</strong>,
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
              <button className="icon__btn">
                <span className="cxv-delete-l-icn clients_table_drop"></span>
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
      domain: "leesmanindex.com",
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}

export default SSO
