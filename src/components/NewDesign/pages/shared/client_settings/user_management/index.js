import React, { useEffect, useState } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getClientUsers } from "../../../../../../actions/adminActions"

const UserManagementSettings = ({ isUserDrawer, setUserDrawer }) => {
  // Redux Hooks
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.getClientUsers)
  const clientData = useSelector((store) => store.saveRowData.data)

  // React useState, useEffect
  const [pageNumber, setPageNumber] = useState(1)
  useEffect(() => {
    dispatch(getClientUsers(clientData["client_id"], pageNumber))
    console.log("USER DATA IS", userData)
  }, [pageNumber])

  const columns = [
    {
      title: "##",
      dataIndex: "id",
      key: "id",
      width: "90px",
    },
    {
      title: "Client",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      render: (item) => (
        <div className="n__form_control">
          <label className="n__form_label dashboard_check without__text">
            <input
              type="checkbox"
              name="value"
              value="value"
              defaultChecked={item}
            />
            <span className="checkmark"></span>
          </label>
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
              <button className="icon__btn" title="Anonymize user">
                <span className="cxv-hide-l-icn clients_table_drop"></span>
              </button>
              <button className="icon__btn" title="Delete user">
                <span className="cxv-delete-l-icn clients_table_drop"></span>
              </button>
              <button
                onClick={() => setUserDrawer(true)}
                className="icon__btn"
                title="Edit user"
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

  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">User management</h3>
          <span className="card_desc">
            Total: <strong>{userData.data.totalUserCount} users</strong>
          </span>
          <div className="row">
            <div className="col-lg-12">
              <div className="n_table center_labels first_not_center second_not_center respo">
                <Table
                  columns={columns}
                  dataSource={userData.data.users}
                  onChange={(pagination, _) => {
                    setPageNumber(pagination.current)
                  }}
                  pagination={{
                    current: pageNumber,
                    pageSize: 10,
                    total: userData.data.totalUserCount,
                    showSizeChanger: false,
                  }}
                  loading={userData.loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserManagementSettings
