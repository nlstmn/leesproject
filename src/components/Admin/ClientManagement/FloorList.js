import React, { useEffect, useState } from "react"
import { Table, Switch, Form, notification, Drawer, Tree } from "antd"
import AddLocation from "./modals/AddLocation"

import CountryRegionData from "country-region-data"
import ImportExport from "../../common/ImportExport"
import TableLoader from "../../common/TableLoader"
import { dbToTree, onlyIntArray } from "../../../util/functions"
import {
  floorListDeleteLocationAction,
  getFloorDataAction,
} from "../../../actions/adminActions"
import { useDispatch, useSelector } from "react-redux"
export default function LocationGroupList(props) {
  const dispach = useDispatch()
  const { floorData } = useSelector((store) => store.getLocationFloorData)
  const { locationData } = useSelector((store) => store.getFloorData)

  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const [loading, setLoading] = useState(true)
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }

  const deleteLocationFloors = (locationId) => {
    dispach(floorListDeleteLocationAction({ clientId, locationId }))
    reset()
  }

  const columns = [
    {
      title: "Uniqe Id",
      dataIndex: "id",
    },
    {
      title: "Location Name",
      dataIndex: "label",
      sorter: (b, a) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        return 0
      },
    },
    {
      title: "Floors",
      dataIndex: "floor_labels",
      render: (text) => {
        return text?.sort().join(", ")
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
              deleteLocationFloors(record.id)
            }}
            type="button"
            className="btn btn-sm btn-liste"
            title="Delete non used floors"
          >
            <i className="iconx-delete"></i>
          </button>
        </>
      ),
      fixed: "right",
    },
  ]
  const getData = () => {
    if (floorData.result.length === 0) {
      notification.warning({ message: "No data found!" })
    }
    setLoading(false)
  }
  const getLocationData = () => {
    dispach(getFloorDataAction({ clientId }))

    setLoading(false)
  }
  const reset = () => {
    getData()
    getLocationData()
  }
  useEffect(() => {
    reset()
  }, [])

  return (
    <>
      <div className="row clearfix">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row mb-4 page-__header">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h2 className="card-title mt-4">Floors</h2>
              <span className="text-table-info">
                Total: {locationData.filter((i) => i.parent_id).length} Floors
              </span>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 jus-end toggle-_top">
              {" "}
              <ImportExport
                import={true}
                export={true}
                hideLine={true}
                refresh={getData}
                type="cascade_floors"
                clientId={clientId}
                data={floorData}
                allData={locationData}
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <Table
                // {...state}
                pagination={{ position: ["none", "bottomLeft"] }}
                columns={columns}
                dataSource={floorData}
                loading={tableLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
