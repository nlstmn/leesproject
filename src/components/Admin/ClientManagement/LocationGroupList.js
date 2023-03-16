import React, { useEffect, useState } from "react"
import { Table, Switch, Form, notification, Drawer, Tree } from "antd"
import AddLocation from "./modals/AddLocation"
import axios from "axios"
import CountryRegionData from "country-region-data"
import ImportExport from "../../common/ImportExport"
import TableLoader from "../../common/TableLoader"
import { dbToTree, onlyIntArray } from "../../../util/functions"
import { useSelector, useDispatch } from "react-redux"
import {
  getlocationGroupListAction,
  getLocationDataAction,
} from "../../../actions/adminActions"

export default function LocationGroupList(props) {
  const { locationGroupData } = useSelector(
    (store) => store.getlocationGroupList
  )
  const { locationData } = useSelector((store) => store.getLocationData)

  const dispatch = useDispatch()

  const pagination = { position: "bottom" }

  const [selectedLocationGroup, setSelectedLocationGroup] = useState()

  const [selectedLocations, setSelectedLocations] = useState([])

  const [state, setState] = useState({
    pagination,
    size: "small",
    expandable: false,
    buildingGroup: false,
    rowSelection: false,
    scroll: "scroll",
    hasData: true,
    tableLayout: "fixed",
    top: "none",
    bottom: "bottomRight",
    isLocation: "",
    isBuilding: "",
  })
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState([])
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }

  const columns = [
    {
      title: "Uniqe Id",
      dataIndex: "id",
    },
    {
      title: "Location group Name",
      dataIndex: "label",
      sorter: (b, a) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        return 0
      },
    },

    {
      title: "locations",
      dataIndex: "location_labels",
      render: (text) => {
        return text.join(", ")
      },
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      sorter: false,
      render: (value, record) => (
        <>
          <button
            onClick={() => {
              setSelectedLocationGroup(record.id)
              setSelectedLocations(record.location_ids)
            }}
            type="button"
            className="btn btn-sm btn-liste"
            title="Edit"
          >
            <i className="iconx-pencil"></i>
          </button>
        </>
      ),
      fixed: "right",
    },
  ]
  const getData = () => {
    dispatch(getlocationGroupListAction({ clientId }))

    if (locationGroupData.length === 0) {
      notification.warning({ message: "No data found!" })
    }
    setLoading(false)
  }
  const getLocationData = () => {
    dispatch(getLocationDataAction({ clientId }))
  }
  useEffect(() => {
    getData()
    getLocationData()
  }, [])

  const createLocationGroup = () => {
    axios
      .post(`/admin/clients/${clientId}/locations/location_groups`, {
        name: name,
      })
      .then((res) => {
        console.log(res.data)
        getData()
      })
      .catch((err) => {
        console.log(err)
        notification.warning({ message: "No client found!" })
      })
  }
  const sendLocations = () => {
    axios
      .put(
        `/admin/clients/${clientId}/locations/${selectedLocationGroup}/location_groups`,
        selectedLocations
      )
      .then((res) => {
        console.log(res.data)
        setSelectedLocationGroup()
        setSelectedLocations([])
        getData()
      })
      .catch((err) => {
        console.log(err)
        notification.warning({ message: "No client found!" })
      })
  }
  return (
    <>
      <Drawer
        title="Locations"
        width={400}
        closable={false}
        onClose={() => setSelectedLocationGroup()}
        visible={selectedLocationGroup}
        footer={[
          <button
            onClick={() => sendLocations()}
            type="button"
            className="btn btn-sm btn-primary"
          >
            Save
          </button>,
          <button
            onClick={() => setSelectedLocationGroup()}
            type="button"
            className="btn btn-sm btn-default"
          >
            Close
          </button>,
        ]}
      >
        <div className={`filters-_column-1 mr-1`}>
          <Tree
            checkable
            onCheck={(keys, info) => {
              setSelectedLocations(onlyIntArray(keys))
            }}
            checkedKeys={selectedLocations}
            treeData={dbToTree(
              locationData.filter(
                (i) =>
                  (!i.location_group_id ||
                    i.location_group_id === selectedLocationGroup) &&
                  !i.is_location_group === true
              )
            )}
          />
        </div>
      </Drawer>
      <div className="row clearfix">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row mb-4 page-__header">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h2 className="card-title mt-4">Location Groups</h2>
              <span className="text-table-info">
                Total: {locationData.filter((i) => i.is_location_group).length}{" "}
                location Groups
              </span>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 jus-end toggle-_top">
              <div className="input-group ml-3">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="form-control"
                  placeholder="Location group name"
                />
                <button
                  onClick={() => {
                    name.length > 0 && createLocationGroup()
                  }}
                  className="btn btn-sm btn-primary mr-1 float-r"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <Table
                // {...state}
                pagination={{ position: ["none", "bottomLeft"] }}
                columns={columns}
                dataSource={locationGroupData}
                loading={tableLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
