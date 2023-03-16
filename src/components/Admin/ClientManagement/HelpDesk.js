import React, { useEffect, useState } from "react"
import { Table, Switch, Tag, notification } from "antd"
import HelpDeskModal from "./modals/HelpDeskModal"
import axios from "axios"
import Tabs from "./Tabs"
import TableLoader from "../../common/TableLoader"
import { setLoader } from "../../../actions/settingsAction"
import { getHelpDeskDataAction } from "../../../actions/adminActions"
import { useDispatch, useSelector } from "react-redux"
const HelpDesk = (props) => {
  const dispach = useDispatch()
  const { data, modalData } = useSelector((store) => store.helpDeskGetData)
  const [state, setState] = useState({
    openModal: "",
  })

  const [editData, setEditData] = useState([])
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const [loading, setLoading] = useState(true)
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }

  function onChange(record, checked) {
    axios
      .put(`/admin/clients/${clientId}/helpdesk/${record.id}`, {
        status: checked === true ? "active" : "disabled",
      })
      .then((res) => {
        notification.success({ message: "Status changed!" })
        getData()
      })
      .catch((err) => {
        notification.warning({ message: "Something is wrong!" })
      })
  }

  const closeGroups = () => {
    getData()
    setState((pre) => {
      return {
        ...pre,
        openModal: "",
      }
    })
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Theme(s)",
      dataIndex: "theme_labels",
      key: "theme_labels",
      render: (text) =>
        text.map((item) => {
          return (
            <a className="theme-_tag">
              <Tag>{item}</Tag>
            </a>
          )
        }),
    },
    {
      title: "Location(s)",
      dataIndex: "location_labels",
      key: "location_labels",
      render: (text) =>
        text.map((item) => {
          return (
            <a className="sector-_tag">
              <Tag>{item}</Tag>
            </a>
          )
        }),
    },
    {
      title: "Email(s)",
      dataIndex: "emails",
      key: "emails",
      render: (text) =>
        text.map((item) => {
          return (
            <a className="maile-_tag">
              <Tag>{item}</Tag>
            </a>
          )
        }),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      sorter: false,
      render: (value, record) => (
        <>
          <button
            onClick={() => {
              setEditData(record)
              setState((pre) => {
                return {
                  ...pre,
                  openModal: "new-helpdesk",
                }
              })
            }}
            type="button"
            className="btn btn-sm btn-liste"
            title="Edit"
          >
            <i className="iconx-pencil"></i>
          </button>

          {/* Active / Deactive HelpDesk */}
          <Switch
            checked={record.status === "active"}
            onChange={(e) => {
              onChange(record, e)
            }}
            style={{ marginLeft: "15px" }}
          />
        </>
      ),
      fixed: "right",
    },
  ]

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a className="s-a-font">Previous</a>
    }
    if (type === "next") {
      return <a className="s-a-font">Next</a>
    }
    return originalElement
  }

  function getData() {
    dispach(getHelpDeskDataAction({ clientId })).get(
      `/admin/clients/${clientId}/helpdesk`
    )

    if (data.helpdeskData.length === 0) {
      notification.warning({ message: "No data found!" })
    }

    setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="container-fluid clients-page helpdesk-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              <Tabs></Tabs>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title mt-4">HelpDesk</h2>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <button
                  onClick={() => {
                    setEditData([])
                    setState((pre) => {
                      return {
                        ...pre,
                        openModal: "new-helpdesk",
                      }
                    })
                  }}
                  type="button"
                  className="btn btn-primary ml-3"
                >
                  New HelpDesk
                </button>
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
                dataSource={data}
                loading={tableLoading}
              />
            </div>
          </div>
        </div>

        {/* YENİ HELPDESK EKLE / DÜZENLE MODAL */}
        <div
          className={`modal fade bd-example-modal-lg ${
            state.openModal === "new-helpdesk" ? " d-block show" : ""
          }`}
        >
          <HelpDeskModal
            data={modalData}
            editData={editData}
            close={closeGroups}
          ></HelpDeskModal>
        </div>
      </div>
    </>
  )
}
export default HelpDesk
