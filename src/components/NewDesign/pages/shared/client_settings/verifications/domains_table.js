import React, { useEffect, useState } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getDomainVerificationData } from "../../../../../../actions/adminActions"

const Domains = () => {
  // Redux Hooks
  const dispatch = useDispatch()
  const domainData = useSelector((store) => store.getDomainVerificationData)
  // React useState, useEffect
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    dispatch(getDomainVerificationData(1, pageNumber))
    console.log(domainData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])
  const columns = [
    {
      title: "##",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Domain",
      dataIndex: "name",
      key: "name",
      render: (item) => <strong className="">{item}</strong>,
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: (item) => <strong className="align-left">{item}</strong>,
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (item) => (
        <div className="action_btns status">
          {item ? (
            <span className="cxv-status-complete-active-l-icn "></span>
          ) : (
            <span className="cxv-status-incomplete-l-icn "></span>
          )}
        </div>
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
              <button className="icon__btn">
                <span className="cxv-hide-l-icn clients_table_drop"></span>
              </button>
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={domainData.data.domains}
        onChange={(pagination, _) => {
          setPageNumber(pagination.current)
        }}
        pagination={{
          current: pageNumber,
          pageSize: 10,
          total: domainData.data.totalDomainCount,
          showSizeChanger: false,
        }}
        loading={domainData.loading}
      />
    </>
  )
}

export default Domains
