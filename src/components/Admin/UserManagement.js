import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import Highlighter from "react-highlight-words"
import {
  notification,
  Table,
  Checkbox,
  Input,
  Button,
  Space,
  Tooltip,
} from "antd"
import { SearchOutlined } from "@ant-design/icons"
import API from "@aws-amplify/api"
import { AuthContext } from "../../context/auth"

import Tabs from "./ClientManagement/Tabs"
import TableLoader from "../common/TableLoader"
import ImportExport from "../common/ImportExport"
import validator from "validator"
import { customfilter } from "../../util/functions"
import { useSelector, useDispatch } from "react-redux"

import {
  userManagementDepartmentsAction,
  userManagementLocationsAction,
  userManagementUsersAction,
  userManagementDomainHeaderAction,
} from "../../actions/adminActions"

const UserManagement = () => {
  const dispatch = useDispatch()

  const { departments } = useSelector(
    (store) => store.userManagementDepartments
  )
  const { locations } = useSelector((store) => store.userManagementLocations)
  const { users } = useSelector((store) => store.userManagementUsers)
  const { domains } = useSelector((store) => store.userManagementDomainHeader)

  const { role } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState("")

  const [roles, setRoles] = useState([])
  const [changed, setChanged] = useState(Date.now())
  const [editing, setEditing] = useState()
  const [editingUser, setEditingUser] = useState({})
  const [deletingUser, setDeletingUser] = useState({})
  const [anonymizingUser, setAnonymizingUser] = useState({})
  const [formData, setFormData] = useState({})

  const [urlHeader, setUrlHeader] = useState("")
  const [bufferUsers, setBufferUsers] = useState([])
  const [query, setQuery] = useState("")

  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id") ? params.get("client_id") : 0

  const change = (e) => {
    const { name, value } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a className="s-a-font">Previous</a>
    }
    if (type === "next") {
      return <a className="s-a-font">Next</a>
    }
    return originalElement
  }

  const changeTicked = (e) => {
    const { name, checked } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]: checked,
      }
    })
  }

  const changeQuery = (e) => {
    setQuery(e.target.value)
  }
  useEffect(() => {
    customfilter(
      query,
      users,
      [
        "id",
        "client_name",
        "email",
        "first_name",
        "last_name",
        "department_label",
        "location_label",
        "role",
      ],
      setBufferUsers
    )
  }, [query])

  const getData = () => {
    let urlHeader = ""
    let domainHeader = "/client/domains"
    if (role === "Leesman Admin" || role === "Super Admin") {
      urlHeader = `/admin/clients/${clientId}`
      domainHeader = `/admin/clients/${clientId}/domains`
      setUrlHeader(urlHeader)
    }
    dispatch(userManagementDepartmentsAction({ urlHeader }))
    dispatch(userManagementLocationsAction({ urlHeader }))
    dispatch(userManagementUsersAction({ urlHeader }))
    dispatch(userManagementDomainHeaderAction({ domainHeader }))

    if (users.length === 0) {
      notification.warning({ message: "No data found!" })
    }

    setBufferUsers(users)
  }
  useEffect(() => {
    setLoading(true)
    getData()
  }, [changed])
  useEffect(() => {
    !loading &&
      domains.length === 0 &&
      clientId !== 0 &&
      notification.warning({
        message: "To add a user, please add a domain first.",
      })
    console.log(domains.length)
  }, [domains, loading])

  useEffect(() => {
    setLoading(true)
    API.get("CoreAPI", "/users/roles")
      .then((res) => setRoles(res.result))
      .catch(console.error)
  }, [])

  const editUser = (user) => {
    setEditing(true)
    setEditingUser(user)
    setOpenModal("user")
  }

  const saveUser = () => {
    if (editing) {
      // PUT
      const { id } = editingUser
      API.put("CoreAPI", `${urlHeader}/users/${id}`, {
        body: formData,
      })
        .then(() => {
          setChanged(Date.now())
          setEditing(false)
          setFormData({})
          setOpenModal("")
          setEditingUser({})

          notification.success({
            message: "User updated",
          })
        })
        .catch((err) => {
          console.error(err)
          notification.error({
            message: "Unable to update user",
          })
        })
    } else {
      if (!validator.isEmail(formData.email)) {
        notification.warning({ message: "Please enter a valid email" })
      } else if (!domains.includes(formData.email.split("@")[1])) {
        notification.warning({
          message: "You cannot create user with that domain!",
        })
      } else {
        // POST
        API.post("CoreAPI", `${urlHeader}/users`, {
          body: formData,
        })
          .then(() => {
            setChanged(Date.now())
            setEditing(false)
            setFormData({})
            setOpenModal("")
            setEditingUser({})

            notification.success({
              message: "User created",
            })
          })
          .catch((err) => {
            console.error(err)
            notification.error({
              message: "Unable to create user (user already created)",
            })
          })
      }
    }
  }

  const deleteUser = (user) => {
    setDeletingUser(user)
    setOpenModal("delete")
  }
  const anonymizeUser = (user) => {
    setAnonymizingUser(user)
    setOpenModal("anonymize")
  }

  const confirmDeleteUser = () => {
    const { id } = deletingUser
    API.del("CoreAPI", `${urlHeader}/users/${id}`)
      .then(() => {
        setChanged(Date.now())
        setDeletingUser({})
        setOpenModal("")

        notification.success({
          message: "User deleted",
        })
      })
      .catch((err) => {
        console.error(err)
        notification.error({
          message: "Can't delete that user.",
        })
      })
  }
  const confirmAnonymizeUser = () => {
    const { id } = anonymizingUser
    API.put("CoreAPI", `${urlHeader}/users/${id}`, {
      body: { action: "anonymize" },
    })
      .then(() => {
        setChanged(Date.now())
        setAnonymizingUser({})
        setOpenModal("")

        notification.success({
          message: "User anonymized",
        })
      })
      .catch((err) => {
        console.error(err)
        notification.error({
          message: "Unable to anonymize user",
        })
      })
  }

  const closeModal = () => {
    setEditing(false)
    setEditingUser({})
    setDeletingUser({})
    setFormData({})
    setOpenModal("")
  }

  const columns = [
    {
      title: "Unique Id",
      dataIndex: "id",
    },
    {
      title: "Client",
      dataIndex: "client_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        if (a.email.toLowerCase() < b.email.toLowerCase()) return -1
        if (a.email.toLowerCase() > b.email.toLowerCase()) return 1
        return 0
      },
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "ascend",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Department",
      dataIndex: "department_label",
    },
    {
      title: "Location",
      dataIndex: "location_label",
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        ...roles.map((role) => ({
          text: role,
          value: role,
        })),
      ],
      onFilter: (value, user) => user.role === value,
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      render: (enabled) => <Checkbox checked={enabled} disabled />,
    },

    {
      title: "Actions",
      width: 180,
      fixed: "right",
      render: (user, record) => (
        <>
          <Tooltip title="Edit user">
            <button
              onClick={() => editUser(user)}
              className="btn btn-sm btn-liste cursorp"
            >
              <span className="iconx-pencil"></span>
            </button>
          </Tooltip>
          {
            <Tooltip title="Delete user">
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-sm btn-liste cursorp"
              >
                <span className="iconx-trash"></span>
              </button>
            </Tooltip>
          }
          <Tooltip title="Anonymize user">
            <button
              onClick={() => anonymizeUser(user)}
              className="btn btn-sm btn-liste cursorp"
            >
              <span className="iconx-visibility_off"></span>
            </button>
          </Tooltip>
        </>
      ),
    },
  ]

  return (
    <>
      <div className="container-fluid clients-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              {role !== "Admin" && clientId !== 0 && <Tabs></Tabs>}
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title mt-4">User Management</h2>
                <span className="text-table-info">
                  Total: {users.length} users - {bufferUsers.length} filtered
                </span>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <button
                  onClick={() => setChanged(Date.now())}
                  title="Refresh"
                  className="btn btn-primary icon-_btn"
                >
                  <i className="iconx-refresh" />
                </button>

                {(clientId !== 0 || role === "Admin") && (
                  <button
                    onClick={() => setOpenModal("user")}
                    className="btn btn-primary ml-3"
                  >
                    New user
                  </button>
                )}
                <ImportExport
                  refresh={getData}
                  type={"users"}
                  data={bufferUsers}
                  import={false}
                  export={true}
                />
                <div className="input-group ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-search"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    value={query}
                    onChange={changeQuery}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <Table
                pagination={
                  ({ position: ["none", "bottomLeft"] },
                  (itemRender = { itemRender }))
                }
                columns={columns}
                loading={tableLoading}
                dataSource={bufferUsers}
              />
            </div>
          </div>
        </div>
      </div>

      {/* YENİ KULLANICI EKLE / DÜZENLE MODAL | New User */}
      <div
        className={`modal fade bd-example-modal-lg ${
          openModal === "user" ? " d-block show" : ""
        }`}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div
            className="modal-content modal-border-w"
            style={{ padding: "15px" }}
          >
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <h2 className="card-title mb-0">
                    {editing ? "Edit" : "Add"} user
                  </h2>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    required={true}
                    disabled={editing}
                    onChange={change}
                    value={formData.email || editingUser.email || ""}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="form-group">
                  <select
                    className="form-control show-tick"
                    name="role"
                    onChange={change}
                    required={true}
                    value={formData.role || editingUser.role || ""}
                  >
                    <option value="">Select role</option>
                    {roles.map((role, i) => (
                      <option key={i}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="first_name"
                    onChange={change}
                    value={formData.first_name || editingUser.first_name || ""}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Surname"
                    name="last_name"
                    onChange={change}
                    value={formData.last_name || editingUser.last_name || ""}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="form-group">
                  <select
                    className="form-control show-tick"
                    name="department_id"
                    onChange={change}
                    required={true}
                    value={
                      formData.department_id || editingUser.department_id || ""
                    }
                  >
                    <option value="">Select department</option>
                    {departments.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                    .{" "}
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="form-group">
                  <select
                    className="form-control show-tick"
                    name="location_id"
                    onChange={change}
                    required={true}
                    value={
                      formData.location_id || editingUser.location_id || ""
                    }
                  >
                    <option value="">Select location</option>
                    {locations.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                    .{" "}
                  </select>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="form-group clearfix">
                  <label className="fancy-checkbox element-left">
                    <input
                      onChange={changeTicked}
                      checked={
                        typeof formData.enabled === "boolean"
                          ? formData.enabled
                          : typeof editingUser.enabled === "boolean"
                          ? editingUser.enabled
                          : true
                      }
                      name="enabled"
                      type="checkbox"
                    />
                    <span>Enabled</span>
                  </label>
                </div>
              </div>

              <div className="col-12 pt-40">
                <button
                  type="button"
                  data-dismiss="modal"
                  onClick={saveUser}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-default"
                  data-dismiss="modal"
                  onClick={closeModal}
                  style={{ marginLeft: "15px" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete User */}
      <div
        className={`modal fade ${
          openModal === "delete" ? " d-block show" : ""
        }`}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content modal-border-w"
            style={{ padding: "15px" }}
          >
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <h2 className="card-title mb-0">Delete user?</h2>
                </div>
                {deletingUser.email}
              </div>

              <div className="col-12 pt-40">
                <button
                  type="button"
                  data-dismiss="modal"
                  onClick={confirmDeleteUser}
                  className="btn btn-sm btn-primary"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-default"
                  data-dismiss="modal"
                  onClick={closeModal}
                  style={{ marginLeft: "15px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Anonymize User */}
      <div
        className={`modal fade ${
          openModal === "anonymize" ? " d-block show" : ""
        }`}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content modal-border-w"
            style={{ padding: "15px" }}
          >
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <h2 className="card-title mb-0">Anonymize user?</h2>
                </div>
                {anonymizingUser.email}
              </div>

              <div className="col-12 pt-40">
                <button
                  type="button"
                  data-dismiss="modal"
                  onClick={confirmAnonymizeUser}
                  className="btn btn-sm btn-primary"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-default"
                  data-dismiss="modal"
                  onClick={closeModal}
                  style={{ marginLeft: "15px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default UserManagement
