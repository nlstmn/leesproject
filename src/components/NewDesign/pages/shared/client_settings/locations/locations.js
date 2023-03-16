import React, { useEffect, useState } from "react"
import { Table, Switch } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getClientLocations } from "../../../../../../actions/adminActions"

const Locations = ({
  deleteModal,
  setDeleteModal,
  isLocationDrawer,
  setLocationDrawer,
  locationRowData,
  setLocationRowData,
}) => {
  // Redux Hooks
  const dispatch = useDispatch()
  const clientData = useSelector((store) => store.saveRowData.data)
  const clientLocations = useSelector((store) => store.getClientLocations)
  // React useState, useEffect
  const [pageNumber, setPageNumber] = useState(1)
  useEffect(() => {
    dispatch(
      getClientLocations(clientData["client_id"], "locations", pageNumber)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])

  const columns = [
    {
      title: "Location ID",
      dataIndex: "id",
      key: "id",
      width: "150px",
    },
    {
      title: "Location Group Name",
      dataIndex: "location_group_name",
      key: "location_group_name",
      width: "150px",
    },
    {
      title: "Location Name",
      dataIndex: "label",
      key: "label",
      width: "150px",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: "150px",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: "150px",
    },
    // TODO: Will add or remove after API changes
    // {
    //   title: 'Defined number of floors',
    //   dataIndex: 'definedFloors',
    //   key: 'definedFloors',
    //   width: "150px"
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    //   width: "150px"
    // },
    // {
    //   title: 'Number of Floors',
    //   dataIndex: 'numberFloors',
    //   key: 'numberFloors',
    //   width: "150px"
    // },
    // {
    //   title: 'Building Location',
    //   dataIndex: 'buildingLocation',
    //   key: 'buildingLocation',
    //   width: "150px"
    // },
    // {
    //   title: 'Occupancy Status',
    //   dataIndex: 'occupancyStatus',
    //   key: 'occupancyStatus',
    //   width: "150px"
    // },
    // {
    //   title: 'Occupancy Mix',
    //   dataIndex: 'occupancyMix',
    //   key: 'occupancyMix',
    //   width: "150px"
    // },
    // {
    //   title: 'Latitude',
    //   dataIndex: 'latitude',
    //   key: 'latitude',
    //   width: "150px"
    // },
    // {
    //   title: 'Longitude',
    //   dataIndex: 'longitude',
    //   key: 'longitude',
    //   width: "150px"
    // },
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
                onClick={() => {
                  setLocationDrawer(true)
                  setLocationRowData(record)
                }}
                className="icon__btn"
              >
                <span className="cxv-settings-l-icn clients_table_drop"></span>
              </button>

              <Switch size="small" defaultChecked />
            </div>
          </div>
        )
      },
    },
  ]

  const data = [
    {
      key: "AB001",
      lGroupName: "Location Group Name…",
      lName: "Location Name…",
      region: "Region Name…",
      country: "Country Name…",
      city: "City Name…",
      targetPopulation: "Target Population…",
      postcode: "Postcode…",
      intervalUsable: "…",
      definedFloors: "…",
      buildingStyle: "…",
      dateOrganisation: "…",
      address: "…",
      numberFloors: "…",
      buildingLocation: "…",
      occupancyStatus: "…",
      occupancyMix: "…",
      latitude: "…",
      longitude: "…",
    },
    {
      key: "AB002",
      lGroupName: "Location Group Name…",
      lName: "Location Name…",
      region: "Region Name…",
      country: "Country Name…",
      city: "City Name…",
      targetPopulation: "Target Population…",
      postcode: "Postcode…",
      intervalUsable: "…",
      definedFloors: "…",
      buildingStyle: "…",
      dateOrganisation: "…",
      address: "…",
      numberFloors: "…",
      buildingLocation: "…",
      occupancyStatus: "…",
      occupancyMix: "…",
      latitude: "…",
      longitude: "…",
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={clientLocations.data.locations}
      onChange={(pagination, _) => {
        setPageNumber(pagination.current)
      }}
      pagination={{
        current: pageNumber,
        pageSize: 10,
        total: clientLocations.data.totalLocationCount,
        showSizeChanger: false,
      }}
      loading={clientLocations.loading}
    />
  )
}

export default Locations
