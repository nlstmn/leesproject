import React, { useEffect, useState } from "react"
import { Space, Table, Button, Input, Switch } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getClientLocations } from "../../../../../../actions/adminActions"

const LocationGroups = ({ isLocationGroupDrawer, setLocationGroupDrawer }) => {
  // Redux Hooks
  const dispatch = useDispatch()
  const clientData = useSelector((store) => store.saveRowData.data)
  const clientLocations = useSelector((store) => store.getClientLocations)
  // React useState, useEffect
  const [pageNumber, setPageNumber] = useState(1)
  useEffect(() => {
    dispatch(
      getClientLocations(clientData["client_id"], "locationGroups", pageNumber)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])

  const columns = [
    {
      title: "##",
      dataIndex: "id",
      key: "id",
      width: "100px",
    },
    {
      title: "Location Group Name",
      dataIndex: "label",
      key: "label",
      width: "150px",
    },
    {
      title: "Locations",
      dataIndex: "location_labels",
      key: "location_labels",
      render: (locations) => (
        <ul className="locations">
          {locations.map((item) => {
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
              <button
                onClick={() => setLocationGroupDrawer(true)}
                className="icon__btn"
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
      <Table
        columns={columns}
        onChange={(pagination, _) => {
          setPageNumber(pagination.current)
        }}
        dataSource={clientLocations.data.locationGroups}
        pagination={{
          current: pageNumber,
          pageSize: 10,
          total: clientLocations.data.totalLocationCount,
          showSizeChanger: false,
        }}
        loading={clientLocations.loading}
      />
    </>
  )
}

export default LocationGroups
