import React, { useEffect, useState } from "react"
import { Table, Switch, Form, notification } from "antd"
import AddLocation from "./modals/AddLocation"
import axios from "axios"
import CountryRegionData from "country-region-data"
import ImportExport from "../../common/ImportExport"
import TableLoader from "../../common/TableLoader"
import { locationListDataAction } from "../../../actions/adminActions"
import { useDispatch, useSelector } from "react-redux"
export default function LocationsList(props) {
  const dispach = useDispatch()
  const { data, regionData } = useSelector((store) => store.locationListData)

  const pagination = { position: "bottom" }
  const [locationData, setLocationData] = useState([])
  const [selectedLocation, setSelectedLocation] = useState({})
  const [bufferLocation, setBufferLocation] = useState([])
  const [query, setQuery] = useState("")
  const [rawData, setRawData] = useState([])

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
  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }
  useEffect(() => {
    filterData(query)
  }, [query])
  const change = (e) => {
    setQuery(e.target.value)
  }
  const filterData = (e) => {
    let buffer = []
    locationData.forEach((item) => {
      if (
        String(item.name).toLowerCase().includes(e.toLowerCase()) ||
        String(item.location_group_name)
          .toLowerCase()
          .includes(e.toLowerCase()) ||
        String(item.region).toLowerCase().includes(e.toLowerCase()) ||
        String(item.key).toLowerCase().includes(e.toLowerCase()) ||
        String(item.country).toLowerCase().includes(e.toLowerCase()) ||
        String(item.city).toLowerCase().includes(e.toLowerCase()) ||
        String(item.postCode).toLowerCase().includes(e.toLowerCase()) ||
        String(item.numberOfFloors).toLowerCase().includes(e.toLowerCase()) ||
        String(item.occupancy_mix).toLowerCase().includes(e.toLowerCase()) ||
        String(item.occupancy_status).toLowerCase().includes(e.toLowerCase()) ||
        String(item.targetPopulation).toLowerCase().includes(e.toLowerCase()) ||
        String(item.totalNetInterval).toLowerCase().includes(e.toLowerCase()) ||
        String(item.building_location)
          .toLowerCase()
          .includes(e.toLowerCase()) ||
        String(item.address).toLowerCase().includes(e.toLowerCase()) ||
        String(item.building_style).toLowerCase().includes(e.toLowerCase()) ||
        String(item.date_organisation_moved_in)
          .toLowerCase()
          .includes(e.toLowerCase())
      ) {
        buffer.push(item)
      }
    })

    setBufferLocation(buffer?.sort((a, b) => a.position - b.position))
  }
  const getLocations = () => {
    dispach(locationListDataAction({ clientId }))

    if (populateLocation) {
      notification.warning({ message: "No data found!" })
    }
    populateLocation(data)

    setLoading(false)
  }
  useEffect(() => {
    getLocations()
  }, [])
  const getCountryByShortCode = (country) => {
    let l = CountryRegionData.filter((i) => i.countryShortCode === country)
    return l[0]
  }
  const getCityByShortCode = (regions, city) => {
    let c = regions.filter((item) => item.shortCode === city)
    return c[0] ? c[0].name : ""
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
  const deleteAllNonUsedlocations = () => {
    axios
      .delete(`/admin/clients/${clientId}/locations/bulk`)
      .then((res) => {
        notification.success({ message: "Non used locations deleted" })

        getLocations()
      })
      .catch((err) => {
        notification.warning({ message: "Cannot Deleted" })
      })
  }
  const populateLocation = (e) => {
    console.log(e)
    setRawData(e)
    let arr = e
      .filter((i) => !i.parent_id && !i.is_location_group)
      .map((item, i) => {
        // let country_ = item.country ? getCountryByShortCode(item.country) : "";
        // let regions = item.country ? country_.regions : [];

        // let cityName = getCityByShortCode(regions, item.city);
        // let countryName = country_.countryName;

        return {
          key: item.id,
          name: item.label,
          region: item.region,
          // cityShort: item.city,
          // countryShort: item.country,
          city: item.city || "Not Selected",
          country: item.country || "Not Selected",
          targetPopulation: item.target_population,
          postCode: item.post_code,
          building_location: item.building_location,
          occupancy_status: item.occupancy_status,
          occupancy_mix: item.occupancy_mix,
          totalNetInterval: item.area,
          numberOfFloors: item.number_of_floor,
          language_id: item.language_id,
          enable: item.enable,
          lat: item.lat,
          long: item.long,
          parent_id: item.parent_id,
          floors: e.filter((i) => i.parent_id === item.id),
          location_group_name: item.location_group_name,
          building_style: item.building_style,
          date_organisation_moved_in: item.date_organisation_moved_in,
          address: item.address,
          region_id: item.region_id,
          country_id: item.country_id,
          city_id: item.city_id,
          position: item.position,
        }
      })
    //get only selected language
    let ClientDefaultLanguage = localStorage.getItem("selectedClientLang")
    console.log(ClientDefaultLanguage)
    console.log(arr)
    let locationCount = []
    arr.map((i) => {
      if (!locationCount.includes(i.key)) {
        locationCount.push(i.key)
      }
    })
    console.log(locationCount)
    let filtered = arr.filter(
      (i) => i.language_id === parseInt(ClientDefaultLanguage)
    )

    if (filtered.length !== locationCount.length) {
      // notification.warning({
      //   message: "Looks like your translations for your default language is not complete. Showing Default translations",
      // });
      //default english
      filtered = arr.filter((i) => i.language_id === 12)
    }
    filtered = filtered.sort((a, b) => a.position - b.position)
    setLocationData(filtered)
    setBufferLocation(filtered)
  }

  const closeLocation = () => {
    getLocations()
    setState((pre) => {
      return {
        ...pre,
        isLocation: "",
      }
    })
  }

  function onChange(id, enable) {
    console.log(id, enable)
    axios
      .put(`/admin/clients/${clientId}/locations/${id}`, { enable: !enable })
      .then((res) => {
        getLocations()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const columns = [
    {
      title: "Uniqe Id",
      dataIndex: "key",
    },
    {
      title: "Location Group Name",
      dataIndex: "location_group_name",
      sorter: (b, a) => {
        if (
          a.location_group_name.toLowerCase() <
          b.location_group_name.toLowerCase()
        )
          return -1
        if (
          a.location_group_name.toLowerCase() >
          b.location_group_name.toLowerCase()
        )
          return 1
        return 0
      },
    },
    {
      title: "Location Name",
      dataIndex: "name",
      sorter: (b, a) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        return 0
      },
    },
    {
      title: "Region",
      dataIndex: "region",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Leesman inside target population",
      dataIndex: "targetPopulation",
      sorter: (a, b) => a.targetPopulation - b.targetPopulation,
    },
    {
      title: "Postcode",
      dataIndex: "postCode",
    },
    {
      title: "Total Net Interval / Usable Area",
      dataIndex: "totalNetInterval",
      width: 240,
    },
    {
      title: "Defined number of floors",
      dataIndex: "floors",
      render: (_, record) => {
        return record.floors?.length
      },
    },
    {
      title: "Building style",
      dataIndex: "building_style",
    },
    {
      title: "Date of organisation moved in",
      dataIndex: "date_organisation_moved_in",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Number of Floors",
      dataIndex: "numberOfFloors",
      sorter: (a, b) => a.numberOfFloors - b.numberOfFloors,
    },
    {
      title: "Building Location",
      dataIndex: "building_location",
    },
    {
      title: "Occupancy Status",
      dataIndex: "occupancy_status",
    },
    {
      title: "Occupancy Mix",
      dataIndex: "occupancy_mix",
    },
    {
      title: "Latitude",
      dataIndex: "lat",
    },
    {
      title: "Longitude",
      dataIndex: "long",
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
              console.log(record)
              setSelectedLocation(value)
              setState((pre) => {
                return {
                  ...pre,
                  isLocation: "location-edit-add",
                }
              })
            }}
            type="button"
            className="btn btn-sm btn-liste"
            title="Edit"
          >
            <i className="iconx-pencil"></i>
          </button>

          {/* Active / Deactive Locations */}
          <Switch
            checked={record.enable}
            onChange={() => onChange(record.key, record.enable)}
            style={{ marginLeft: "15px" }}
          />
        </>
      ),
      fixed: "right",
    },
  ]

  const { xScroll, yScroll } = state

  const scroll = {}
  if (yScroll) {
    scroll.y = 240
  }
  if (xScroll) {
    scroll.x = "100vw"
  }

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: state.ellipsis,
  }))
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true
    tableColumns[tableColumns.length - 1].fixed = "right"
  }

  return (
    <>
      <div className="row clearfix">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row mb-4 page-__header">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h2 className="card-title mt-4">Locations</h2>
              <span className="text-table-info">
                Total: {locationData.filter((i) => !i.is_location_group).length}{" "}
                locations
              </span>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 jus-end toggle-_top">
              <ImportExport
                import={true}
                export={true}
                refresh={getLocations}
                type="location_cascade"
                clientId={clientId}
                data={rawData}
                allData={locationData}
              />
              <button
                onClick={() => {
                  setState((pre) => {
                    return {
                      ...pre,
                      isLocation: "location-edit-add",
                    }
                  })
                  setSelectedLocation([])
                }}
                type="button"
                className="btn btn-primary bigger-_btn ml-3"
              >
                Add Location
              </button>
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
                  onChange={change}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>{" "}
              <button
                onClick={() => deleteAllNonUsedlocations()}
                className="btn btn-primary bigger-_btn ml-3 float-r"
              >
                Delete all non-used locations
              </button>
            </div>
          </div>{" "}
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <Table
                // {...state}
                pagination={
                  ({ position: ["none", "bottomLeft"] },
                  (itemRender = { itemRender }))
                }
                columns={tableColumns}
                dataSource={state.hasData ? bufferLocation : null}
                loading={tableLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {/* YENİ LOCATION EKLE / DÜZENLE MODAL */}
      <div
        className={`modal fade bd-example-modal-lg ${
          state.isLocation === "location-edit-add" ? " d-block show" : ""
        }`}
      >
        <AddLocation
          refresh={getLocations}
          close={closeLocation}
          selectedLocation={selectedLocation}
          locations={locationData}
          regionData={regionData}
        ></AddLocation>
      </div>
    </>
  )
}
