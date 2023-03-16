import React from "react"
import { Table } from "antd"

const Emails = () => {
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (item) => <strong className="">{item}</strong>,
    },
    {
      title: "Domain name",
      dataIndex: "domain",
      key: "domain",
      render: (item) => <strong className="">{item}</strong>,
    },
    {
      title: "Record",
      dataIndex: "record",
      key: "record",
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
      type: "TXT",
      domain: "_leesman.leesmanindex.com",
      record: "a55a09bb-fdb0-4542-bc34-3a59a855844f",
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}

export default Emails
