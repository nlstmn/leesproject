import React, { useState, useContext, useEffect } from "react"
import {
  Tag,
  Menu,
  Dropdown,
  DatePicker,
  Drawer,
  Tooltip,
  Checkbox,
} from "antd"
import { DownOutlined } from "@ant-design/icons"
import { AuthContext } from "../../context/auth"
import axios from "axios"
import moment from "moment"
import ImportExport from "./ImportExport"
import { connect } from "react-redux"
import * as filterActions from "../../actions/filter"
import { regionsGlobalActions } from "../../actions/clientActions"
import {
  getRegionCountryCityTreeData,
  onlyIntArray,
  resetFilter,
  dbToTree,
} from "../../util/functions"
import MultiSelect from "react-multi-select-component"
import { TreeColumn } from "./commonComponents/formItems"
const { RangePicker } = DatePicker

const AdvancedFilter = ({
  // setComponentFilterData,
  user,
  reduxSaveFilter,
  reduxFilterData,
  regionsGlobalActions,
}) => {
  const { role } = useContext(AuthContext)
  const [loginSpinner, setLoginSpinner] = useState(false)
  const [bufferFilterData, setBufferFilterData] = useState([])
  const [start, setStart] = useState(() => {
    let today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14)
  })
  const [end, setEnd] = useState(moment().format("YYYY-MM-DD"))
  const [rawData, setRawData] = useState([])
  const [isDrawerFilters, setDrawerFilters] = useState(false)
  const [queryDemo, setQueryDemo] = useState("")
  const [queryLocation, setQueryLocation] = useState("")
  const [queryDepartment, setQueryDepartment] = useState("")
  const [queryClient, setQueryClient] = useState("")
  const [queryRegion, setQueryRegion] = useState("")
  const [clientsMenu, setClientsMenu] = useState([])
  const [dbData, setDbData] = useState([])
  const [isDrawerDemos, setDrawerDemos] = useState(false)
  const [isDrawerRegions, setDrawerRegions] = useState(false)
  const [isTagsVisible, setIsTagsVisible] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [demoFilter, setDemoFilter] = useState([])
  const [isFetched, setIsFetched] = useState(true)
  const [filterPreference, setFilterPreference] = useState([])
  const [fetchClientData, setFetchClientData] = useState([])
  const [isClientFiltersVisible, setClientFiltersVisible] = useState(false)
  const [defaultFilterData, setDefaultFilterData] = useState([])
  const [isInit, setIsInit] = useState(true)
  const [filterPreferenceOptions, setFilterPreferenceOptions] = useState([
    {
      value: "demos",
      label: "Demographics",
    },
    {
      value: "regions",
      label: "Regions",
    },
  ])

  const [selectedFilters, setSelectedFilters] = useState({
    departments: [],
    locations: [],
    demos: [],
    regions: [],
  })

  const handleVisibleChangeClient = (flag) => {
    setClientFiltersVisible(flag)
  }

  const handleSelect = (id) => {
    setFetchClientData([id])
  }

  const populateHoverMenuItems = (data, type, query, setQuery) => {
    console.log(fetchClientData)
    return (
      <Menu className="filter-dropdown">
        <div className="more-group-filters">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="form-control mb-4"
            placeholder="Search.."
          ></input>

          {data[type]?.map((i, index) => {
            return (
              <label key={index} className="fancy-checkbox">
                <input
                  checked={isInit ? true : fetchClientData?.includes(i.key)}
                  onClick={(e) => handleSelect(i.key)}
                  type="checkbox"
                  name="Region"
                />
                <span className="light-black">{i.title}</span>
              </label>
            )
          })}
        </div>
        <div className="ant-table-filter-dropdown-btns">
          <button
            type="button"
            className="ant-btn ant-btn-link ant-btn-sm"
            onClick={() => SelectAll(type)}
          >
            <span>Select All</span>
          </button>
          {/* Add “Deselect” option to deselect all Region */}
          <button
            onClick={() => DeselectAll(type)}
            type="button"
            className="ant-btn ant-btn-link ant-btn-sm"
          >
            <span>Deselect</span>
          </button>
        </div>
      </Menu>
    )
  }

  useEffect(() => {
    handleQueryClient(queryClient)
  }, [queryClient])
  useEffect(() => {
    handleQueryLocation(queryLocation)
  }, [queryLocation])
  useEffect(() => {
    handleQueryDepartment(queryDepartment)
  }, [queryDepartment])
  useEffect(() => {
    handleQueryDemo(queryDemo)
  }, [queryDemo])
  useEffect(() => {
    handleQueryRegion(queryRegion)
  }, [queryRegion])

  useEffect(() => {
    if (reduxFilterData?.start?.length > 0) {
      getData(reduxFilterData)
      setSelectedFilters(reduxFilterData)
      setFetchClientData(reduxFilterData.clients)
      setStart(reduxFilterData.start)
      setEnd(reduxFilterData.end)
    }
    return () => {
      setSelectedFilters({})
      sessionStorage.removeItem("sessionFilterData")
    }
  }, [reduxFilterData])

  useEffect(() => {
    user.client_id && getInitialData(false)
  }, [user.client_id])

  const getData = (filterData) => {
    let fdata = {
      ...filterData,
      page: "location_summary",
    }

    regionsGlobalActions(fdata)
  }

  const handleQueryClient = (e) => {
    const buffer_clients = dbData.clients
    let buffer = []
    buffer_clients &&
      buffer_clients.forEach((item) => {
        if (String(item.label).toLowerCase()?.includes(e.toLowerCase())) {
          buffer.push(item)
        }
      })

    setBufferFilterData((pre) => {
      return { ...pre, clients: dbToTree(buffer) }
    })
  }
  const handleQueryLocation = (e) => {
    const buffer_locations = dbData.locations
    let buffer = []
    buffer_locations &&
      buffer_locations.forEach((item) => {
        if (String(item.label).toLowerCase()?.includes(e.toLowerCase())) {
          buffer.push(item)
        }
      })
    setBufferFilterData((pre) => {
      return {
        ...pre,
        locations: dbToTree(
          buffer.map((i) => {
            //if search flatten the data if not cascade
            return { ...i, parent_id: e ? null : i.parent_id }
          })
        ),
      }
    })
  }
  const handleQueryDepartment = (e) => {
    const buffer_departments = dbData.departments
    let buffer = []
    buffer_departments &&
      buffer_departments.forEach((item) => {
        if (String(item.label).toLowerCase()?.includes(e.toLowerCase())) {
          buffer.push(item)
        }
      })

    setBufferFilterData((pre) => {
      return {
        ...pre,
        departments: dbToTree(
          buffer.map((i) => {
            //if search flatten the data if not cascade
            return { ...i, parent_id: e ? null : i.parent_id }
          })
        ),
      }
    })
  }
  const handleQueryDemo = (e) => {
    let flatOptions = []
    dbData?.demos &&
      dbData.demos.forEach((i) => {
        i.options.forEach((item) => {
          flatOptions.push({ id: item.option_id, label: item.option_label })
        })
      })
    const buffer_demos = flatOptions

    let questionBuffer = []
    dbData?.demos &&
      dbData.demos.forEach((i) => {
        if (String(i.heading).toLowerCase()?.includes(e.toLowerCase())) {
          questionBuffer.push({
            key: i.id,
            title: i.heading,
            children: dbData.demos
              .find((o) => o.id === i.id)
              .options.map((p) => {
                return { key: p.option_id, title: p.option_label }
              }),
          })
        }
      })

    let buffer = []
    buffer_demos &&
      buffer_demos.forEach((item) => {
        if (String(item.label).toLowerCase()?.includes(e.toLowerCase())) {
          buffer.push(item)
        }
      })

    setBufferFilterData((pre) => {
      return {
        ...pre,
        demos:
          e.length > 2
            ? [...questionBuffer, ...dbToTree(buffer)]
            : demoToTree(dbData.demos),
      }
    })
  }
  const handleQueryRegion = (e) => {
    const buffer_regions = getRegionCountryCityTreeData(dbData.regions)
    let buffer = []
    buffer_regions.cascade &&
      buffer_regions.dropdown.forEach((item) => {
        if (item.title.toLowerCase()?.includes(e.toLowerCase())) {
          buffer.push(item)
        }
      })

    let data = e.length > 2 ? buffer : buffer_regions.cascade
    setBufferFilterData((pre) => {
      return {
        ...pre,
        regions: data,
      }
    })
  }

  const disabledDate = (current) => {
    //disable six months or later
    const tooLate = moment().add(-10, "months") >= current
    const past = current >= moment().add(1, "days")
    return tooLate || past
  }

  const handleApply = () => {
    console.log(start, end)
    let data = {
      ...selectedFilters,
      start: moment(start).format("YYYY-MM-DD").splitDate(),
      end: moment(end).format("YYYY-MM-DD").splitDate(),
      client_id: fetchClientData,
    }
    if (role === "Admin") {
      data = { ...data, client_id: [user.client_id], clients: [user.client_id] }
    }
    // setComponentFilterData(data);
    reduxSaveFilter(data)
  }

  const handleRaw = () => {
    setLoginSpinner(true)
    axios
      .post("/metrics", {
        ...selectedFilters,
        start: moment(start).format("YYYY-MM-DD").splitDate(),
        end: moment(end).format("YYYY-MM-DD").splitDate(),
        page: "raw",
      })
      .then((res) => {
        setLoginSpinner(false)
        setRawData(res.data)
      })
      .catch((err) => {})
  }

  const demoToTree = (data) => {
    return data
      ?.sortAlphabetically("heading")
      .sort((a, b) => a.position - b.position)
      .map((i) => {
        return {
          key: "parent-" + i.id,
          title: i.heading,
          children: i.options
            ?.sortAlphabetically("option_label")
            .map((item) => {
              return {
                key: item.option_id,
                title: item.option_label,
              }
            }),
        }
      })
  }
  const decideQuery = (val) => {
    switch (val) {
      case "locations":
        return { query: queryLocation, setQuery: setQueryLocation }
      case "departments":
        return { query: queryDepartment, setQuery: setQueryDepartment }
      case "clients":
        return { query: queryClient, setQuery: setQueryClient }
      case "demos":
        return { query: queryDemo, setQuery: setQueryDemo }
      case "regions":
        return { query: queryRegion, setQuery: setQueryRegion }
    }
  }
  const getDemoOptions = (data) => {
    console.log(data)
    let demoOptionIds = []
    data &&
      data.demos &&
      data.demos.forEach((i) => {
        i.options.forEach((item) => {
          demoOptionIds.push(item.option_id)
        })
      })
    return demoOptionIds
  }
  const getDemoOptionsByQuestionId = (data, id) => {
    let demoOptionIds = []
    data
      .find((i) => i.key === "parent-" + id)
      .demos.forEach((i) => {
        i.options.forEach((item) => {
          demoOptionIds.push(item.option_id)
        })
      })
    return demoOptionIds
  }
  const SelectAll = (type) => {
    if (type === "clients") {
      setFetchClientData(dbData?.clients?.map((i) => i.id))
    }
    setSelectedFilters((pre) => {
      return {
        ...pre,
        [type]:
          type === "demos"
            ? getDemoOptions(dbData)
            : dbData[type]?.map((i) => i.id),
      }
    })
  }
  const DeselectAll = (type) => {
    if (type === "clients") {
      setFetchClientData([])
    }
    setSelectedFilters((pre) => {
      return { ...pre, [type]: [] }
    })
  }

  const selectAllDemos = (id) => {
    const isAllSelected =
      dbData &&
      dbData.demos
        .filter((i) => i.id === id)[0]
        .options.map((i) => i.option_id)
        .Contains(selectedFilters.demos)

    let buffer = dbData && dbData.demos.filter((i) => i.id === id)[0].options

    let selectedBuffer = selectedFilters.demos

    isAllSelected
      ? buffer.forEach((item) => {
          selectedBuffer = selectedBuffer.filter((i) => i !== item.option_id)
        })
      : buffer.forEach((item) => {
          if (!selectedBuffer?.includes(item.option_id)) {
            selectedBuffer.push(item.option_id)
          }
        })
    setSelectedFilters((pre) => {
      return { ...pre, demos: selectedBuffer }
    })
  }

  const selectAllDemosInit = (demos) => {
    let buffer = []

    demos.forEach((i) => {
      i.options.forEach((o) => {
        buffer.push(o.option_id)
      })
    })
    setSelectedFilters((pre) => {
      return { ...pre, demos: buffer }
    })
  }

  const handleTicks = (e, label) => {
    let buffer = selectedFilters.demos

    if (buffer?.includes(parseInt(e))) {
      buffer = buffer.filter((i) => i !== parseInt(e))
    } else {
      buffer.push(parseInt(e))
    }

    let b = [...buffer]
    setSelectedFilters((pre) => {
      return { ...pre, demos: b }
    })
  }
  const closeTag = (id, type) => {
    console.log(id, type)
    let t = type === "demographics" ? "demos" : type
    if (type === "clients" || selectedTags.length === 1) {
      filterInit()
    } else {
      setSelectedFilters((pre) => {
        return { ...pre, [t]: pre[t]?.filter((i) => i !== id) }
      })
    }
  }

  const clearFilterButton = () => {
    return (
      selectedTags.length > 0 && (
        <button
          type="button"
          onClick={() => filterInit()}
          className="btn btn-sm btn-default open-more-modal ml--10 float-right"
          title="Clear filter"
        >
          Clear filter
        </button>
      )
    )
  }
  const setMenus = () => {
    setClientsMenu(
      populateHoverMenuItems(
        bufferFilterData,
        "clients",
        queryClient,
        setQueryClient
      )
    )

    const demo = (
      <div className="row clearfix">
        {dbData &&
          dbData.clients &&
          dbData.demos
            .sort((a, b) => {
              var textA = a.label.toUpperCase()
              var textB = b.label.toUpperCase()
              return textA < textB ? -1 : textA > textB ? 1 : 0
            })
            .sort((a, b) => {
              if (a.position < b.position) return -1
              if (a.position > b.position) return 1
              return 0
            })
            .map((item, index) => {
              return (
                <div key={index}>
                  <div
                    className={`col-lg-12 col-md-12 more-group-filters 
                  ${
                    item.heading === "Important activities" ||
                    item.heading === "Presence of Others" ||
                    item.heading === "Home Working Setting"
                      ? " long_-labels"
                      : ""
                  } ${
                      item.options && item.options.length <= 3
                        ? " threet_-labels"
                        : ""
                    }`}
                  >
                    <div className="text-leftt light-black pb-20">
                      <strong>{item.heading}</strong>
                      <Checkbox
                        className="ml-4"
                        onClick={() => {
                          selectAllDemos(item.id)
                        }}
                        checked={dbData.demos
                          .filter((i) => i.id === item.id)[0]
                          .options.map((i) => i.option_id)
                          .Contains(selectedFilters.demos)}
                      >
                        <span className="light-black">All</span>
                      </Checkbox>
                    </div>

                    {item.options
                      .sort((a, b) => {
                        if (a.position < b.position) return -1
                        if (a.position > b.position) return 1
                        return 0
                      })
                      .map((i, index) => {
                        return (
                          <Checkbox
                            key={index}
                            className="check-50-50"
                            onClick={() => {
                              handleTicks(i.option_id, i.option_label)
                            }}
                            checked={selectedFilters.demos?.includes(
                              parseInt(i.option_id)
                            )}
                          >
                            <span className="light-black">
                              {i.option_label}
                            </span>
                          </Checkbox>
                        )
                      })}
                  </div>
                  <div className="col-lg-12 col-md-12 divider-filter">
                    <hr className="solid"></hr>
                  </div>
                </div>
              )
            })}
      </div>
    )
    setDemoFilter(demo)
  }
  const handleTags = (clients, locations, departments, demos, regions) => {
    const checkDemoQuestionOptions = (ids) => {
      let selections = ids
      //eksik olani bul
      let optionSets = dbData.demos.map((i) => {
        return {
          question_id: i.id,
          options: i.options.map((o) => o.option_id),
        }
      })
      optionSets.forEach((i) => {
        //hic eslesme yoksa
        //veya hepsi varsa
        //listeden cikar
        if (i.options.isSubset(selections)) {
          selections = selections.filter((o) => !i.options?.includes(o))
        }
      })
      return selections
    }
    console.log(demos, dbData.demos)
    let clientTags = []
    dbData.clients.forEach((i) => {
      if (clients?.includes(parseInt(i.id))) {
        clientTags.push(i)
      }
    })
    let locationTags = []
    dbData.locations.forEach((i) => {
      if (locations?.includes(parseInt(i.id))) {
        locationTags.push(i)
      }
    })
    let departmentTags = []
    dbData.departments.forEach((i) => {
      if (departments?.includes(parseInt(i.id))) {
        departmentTags.push(i)
      }
    })
    let demoTags = []
    let allDemos = []
    dbData.demos.forEach((item) => {
      item.options.forEach((i) => {
        if (demos?.includes(parseInt(i.option_id))) {
          demoTags.push(i)
        }
        allDemos.push(i)
      })
    })

    let regionTags = []
    dbData.regions.forEach((i) => {
      if (regions?.includes(parseInt(i.id))) {
        regionTags.push(i)
      }
    })
    demoTags = demoTags.filter((i) =>
      checkDemoQuestionOptions(demoTags.map((i) => i.option_id))?.includes(
        i.option_id
      )
    )

    let buffer_clients = []
    let buffer_locations = []
    let buffer_departments = []
    let buffer_demos = []
    let buffer_regions = []
    let buffer = []

    clientTags.forEach((item) => {
      buffer_clients.push({ id: item.id, label: item.label, type: "clients" })
    })
    locationTags.forEach((item) => {
      buffer_locations.push({
        id: item.id,
        label: item.label,
        type: "locations",
      })
    })
    departmentTags.forEach((item) => {
      buffer_departments.push({
        id: item.id,
        label: item.label,
        type: "departments",
      })
    })
    demoTags.forEach((item) => {
      buffer_demos.push({
        id: item.option_id,
        label: item.option_label,
        type: "demographics",
      })
    })
    regionTags.forEach((item) => {
      buffer_regions.push({ id: item.id, label: item.label, type: "regions" })
    })

    if (buffer_clients.length !== dbData.clients.length) {
      buffer = buffer_clients.concat(buffer)
    }
    if (buffer_locations.length !== dbData.locations.length) {
      buffer = buffer_locations.concat(buffer)
    }
    if (buffer_departments.length !== dbData.departments.length) {
      buffer = buffer_departments.concat(buffer)
    }
    if (buffer_demos.length !== allDemos.length) {
      buffer = buffer_demos.concat(buffer)
    }

    if (buffer_regions.length !== dbData.regions.length) {
      buffer = buffer_regions.concat(buffer)
    }

    setSelectedTags(buffer)
  }
  const decideSelections = (clientData, role) => {
    let preferences = filterPreferenceOptions
    let selectedPreferences = filterPreference
    console.log(role, user.user_role)
    if (role === "Admin") {
      preferences = [
        { value: "departments", label: "Departments" },
        { value: "locations", label: "Locations" },
        {
          value: "demos",
          label: "Demographics",
        },
        {
          value: "regions",
          label: "Regions",
        },
      ]
      selectedPreferences = [
        { value: "departments", label: "Departments" },
        { value: "locations", label: "Locations" },
      ]
    } else {
      if (clientData?.length > 1) {
        console.log("all clients selected")

        preferences = preferences.filter(
          (i) => !["departments", "locations"]?.includes(i.value)
        )
        selectedPreferences = selectedPreferences.filter(
          (i) => !["departments", "locations"]?.includes(i.value)
        )
      } else if (clientData?.length === 1) {
        console.log("one client selected")
        preferences = preferences.filter(
          (i) => !["departments", "locations"]?.includes(i.value)
        )
        preferences.push({ value: "departments", label: "Departments" })
        preferences.push({ value: "locations", label: "Locations" })
        selectedPreferences = [
          { value: "departments", label: "Departments" },
          { value: "locations", label: "Locations" },
        ]
      }
    }

    setFilterPreferenceOptions(preferences)
    setFilterPreference(selectedPreferences)
  }
  const filterInit = () => {
    const lastweek = () => {
      let today = new Date()
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 14
      )
    }

    var tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    let weekBefore = lastweek().toISOString()

    setFetchClientData(dbData?.clients?.map((i) => i.id))
    setStart(
      defaultFilterData?.start
        ? defaultFilterData.start
        : weekBefore.splitDate()
    )
    setEnd(
      defaultFilterData?.end
        ? defaultFilterData.end
        : tomorrow.toISOString().splitDate()
    )
    reduxSaveFilter([])
    setIsTagsVisible(false)
  }
  const populate = (data) => {
    console.log("data from db", data)
    let d = {
      clients: dbToTree(data?.clients),
      locations: dbToTree(data?.locations),
      departments: dbToTree(data?.departments),
      regions: getRegionCountryCityTreeData(data?.regions).cascade,
      demos: demoToTree(data?.demos),
    }

    setBufferFilterData(d)
  }
  const getInitialData = async (isSavedData) => {
    setLoginSpinner(true)
    console.log("init data fetched")
    await axios
      .get("/metrics")
      .then((res) => {
        console.log(res.data)
        setDbData(res.data.filters)
        setDefaultFilterData(res.data.default)
        if (!isSavedData) {
          // setComponentFilterData(res.data.default);
          reduxSaveFilter(res.data.default)
          getData(res.data.default)
          setLoginSpinner(false)
          setIsFetched(true)
          selectAllDemosInit(res.data.filters.demos)
        }
        console.log("getinital")
        populate(res.data.filters)
      })
      .catch((err) => {})
  }
  const getDataByClientId = (ids) => {
    setLoginSpinner(true)
    reduxSaveFilter({
      ...selectedFilters,
      start: moment(start).format("YYYY-MM-DD").splitDate(),
      end: moment(end).format("YYYY-MM-DD").splitDate(),
      client_id: fetchClientData,
    })
    console.log("by client id fetched", ids)
    let url = ["Super Admin", "Leesman Admin"]?.includes(user.user_role)
      ? `/metrics/${JSON.stringify(ids)}`
      : "/metrics"
    axios
      .get(url)
      .then((res) => {
        console.log("get data by client id", ids)
        setDbData(res.data.filters)
        populate(res.data.filters)
        setLoginSpinner(false)
        setIsFetched(true)
        setIsInit(false)
      })
      .catch((err) => {})
  }

  useEffect(() => {
    console.log(reduxFilterData.client_id !== fetchClientData)
    if (reduxFilterData?.start) {
      setFetchClientData(reduxFilterData.client_id)
    } else {
      console.log("hhh", reduxFilterData.client_id, fetchClientData)
    }

    setSelectedFilters((pre) => {
      return {
        ...pre,
        locations: reduxFilterData?.start
          ? reduxFilterData.locations
          : dbData?.locations?.map((i) => i.id),
        departments: reduxFilterData?.start
          ? reduxFilterData.departments
          : dbData?.departments?.map((i) => i.id),
        demos: reduxFilterData?.start
          ? reduxFilterData?.demos
          : getDemoOptions(dbData),
        regions: reduxFilterData?.start
          ? reduxFilterData?.regions
          : dbData?.regions?.map((i) => i.id),
      }
    })
  }, [dbData, reduxFilterData])

  useEffect(() => {
    bufferFilterData?.regions?.length > 0 && setMenus()
  }, [bufferFilterData, selectedFilters, isInit])

  useEffect(() => {
    dbData?.regions &&
      selectedFilters?.locations &&
      handleTags(
        fetchClientData,
        selectedFilters.locations,
        selectedFilters.departments,
        selectedFilters.demos,
        selectedFilters.regions
      )
  }, [selectedFilters, dbData, fetchClientData])

  useEffect(() => {
    console.log("selected clients", fetchClientData, isFetched)
    if (fetchClientData?.length === 1) {
      getDataByClientId(fetchClientData)
      decideSelections(fetchClientData, role)
    } else if (fetchClientData?.length > 1) {
      getDataByClientId(defaultFilterData?.clients)
      decideSelections(defaultFilterData?.clients, role)
    }
  }, [JSON.stringify(fetchClientData)])

  return (
    <>
      {/* {isLargeLoader ? <LoaderLarge /> : <></>} */}

      <div className="col-md-12 col-sm-12 hidden-xs is-have-nav">
        <div className="row clearfix">
          {/* SELECT FILTERS - SADECE BU ALANIN SEÇİMLERİ ETİKETLER (UYGULANAN FİLTRELER) KISMINDA GÖSTERİLECEKTİR */}
          <div className="col-lg-12 col-md-12 filter-btns text-right client-dropdown">
            {(role === "Super Admin" || role === "Leesman Admin") &&
              (rawData.length > 0 ? (
                <ImportExport
                  type={"raw"}
                  data={rawData}
                  import={false}
                  export={true}
                >
                  <i className="iconx-download1"></i>
                </ImportExport>
              ) : (
                <button
                  type="button"
                  onClick={handleRaw}
                  className="btn btn-sm btn-default mr--10"
                  title="Fetch raw data"
                >
                  {loginSpinner && <div className="sbl-circ"></div>}{" "}
                  {loginSpinner ? "Fetching" : "Export data"}
                </button>
              ))}
            <Tooltip title="Start date">
              <DatePicker
                className="takvim-select top-takvim ml-1 mr-2"
                dropdownClassName="advanced_-picker"
                readOnly
                onChange={(a, b) => {
                  setStart(b)
                }}
                showToday
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                defaultPickerValue={moment()}
                value={moment(start ? start : null)}
                allowClear={false}
              />
            </Tooltip>
            <Tooltip title="End date">
              <DatePicker
                className="takvim-select top-takvim ml-1 mr-2"
                dropdownClassName="advanced_-picker"
                readOnly
                onChange={(a, b) => {
                  setEnd(b)
                }}
                showToday
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                defaultPickerValue={moment()}
                value={moment(end ? end : null)}
                allowClear={false}
              />
            </Tooltip>
            {role && ["Super Admin", "Leesman Admin"]?.includes(role) && (
              <Dropdown
                overlay={clientsMenu}
                onClick={(e) => e.preventDefault()}
                className="drop-link-filter ml--8"
                visible={isClientFiltersVisible}
                onVisibleChange={handleVisibleChangeClient}
              >
                <a className="ant-dropdown-link">
                  Clients <DownOutlined />
                </a>
              </Dropdown>
            )}

            <button
              onClick={() => setDrawerDemos(true)}
              className="btn btn-sm btn-default open-more-modal btn-w_icon ml--10"
            >
              <span className="iconx-compass"></span>Demographics
            </button>
            <button
              onClick={() => setDrawerRegions(true)}
              className="btn btn-sm btn-default open-more-modal btn-w_icon ml--10"
            >
              <span className="iconx-globe1"></span>Regions
            </button>
            <button
              onClick={() => setDrawerFilters(true)}
              className="btn btn-sm btn-default open-more-modal btn-w_icon ml--10"
            >
              <span className="iconx-filter"></span>Filter
            </button>
            {/* Should be only 1 apply button which will be enabled after at least one filter is selected */}
            <button
              type="button"
              disabled={role !== "Admin" && !fetchClientData?.length}
              onClick={handleApply}
              className="btn btn-sm btn-primary open-more-modal ml--10"
            >
              {loginSpinner ? <div className="sbl-circ"></div> : "Apply"}
            </button>
            {/* OTHER BUTTONS */}
            {/* <button className="btn btn-sm btn-default open-more-modal ml--10 h-_line">
              <span className="iconx-cw"></span>
            </button> */}
            {clearFilterButton()}
          </div>
          <div className="col-lg-6 col-md-6"></div>

          {/* No need to show all options where no filter is applied, only filtered options should have been in this page */}
          <div className="col-lg-6 col-md-6 text-leftt float-right filter-tags">
            {/* 5 ten fazla filtre etiketi olursa sola 30px kay - show filters butonu için yer aç */}
            <div
              className={`scrolling-_-wrapper text-right ${
                selectedTags.length > 5 ? " right-_30" : ""
              }`}
            >
              {selectedTags
                .sortAlphabetically("type")
                .slice(0, 5)
                .map((item, id) => {
                  return (
                    <Tag key={id}>
                      {item.label}
                      <span
                        title="Remove"
                        onClick={() => {
                          closeTag(item.id, item.type)
                        }}
                        className="iconx-x custom-tag-close-icon"
                      ></span>
                    </Tag>
                  )
                })}
            </div>

            {/* Make it dark blue when there are filters applied
            btn-default --> btn-primary */}

            {/* 5 ten fazla filtre etiketi olursa butonu göster - yoksa zaten 5 etiket ekrana sığmakta */}
            {selectedTags.length > 5 ? (
              <button
                type="button"
                onClick={() => setIsTagsVisible(true)}
                disabled={selectedTags.length === 0}
                className={`btn btn-sm btn-default tags_-_btn ml--10`}
                title={
                  selectedTags.length === 0
                    ? "No filtered tags"
                    : "Show all filtered tags"
                }
              >
                <span className="iconx-filter"></span>
              </button>
            ) : (
              <></>
            )}

            {/* This page can be active after certain number of filters are applied, i.e more than 10  */}
          </div>
        </div>
      </div>

      <Drawer
        className="filter-drawer tt"
        title="Filter"
        placement={"right"}
        width={
          (filterPreference.length < 3
            ? 60
            : 60 + (filterPreference.length - 3) * 20) + "%"
        }
        onClose={() => setDrawerFilters(false)}
        visible={isDrawerFilters}
      >
        <Tooltip title="Start date">
          <DatePicker
            className="takvim-select jj-start"
            dropdownClassName="advanced_-picker"
            readOnly
            onChange={(a, b) => {
              setStart(b)
            }}
            showToday
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            defaultPickerValue={moment()}
            value={moment(start)}
          />
        </Tooltip>
        <Tooltip title="End date">
          <DatePicker
            className="takvim-select jj ml-9"
            dropdownClassName="advanced_-picker"
            readOnly
            onChange={(a, b) => {
              setEnd(b)
            }}
            showToday
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            defaultPickerValue={moment()}
            value={moment(end)}
          />
        </Tooltip>

        <div className="form-group text-leftt filter-advancd-select">
          <MultiSelect
            options={filterPreferenceOptions}
            value={filterPreference}
            disableSearch={false}
            hasSelectAll={true}
            onChange={setFilterPreference}
            maxSelectedItems={5}
            labelledBy={"Select filter option(s)"}
            className="multi-select"
            overrideStrings={{
              allItemsAreSelected: "(All)",
              clearSearch: "Clear search",
              noOptions: "No options",
              search: "Search",
              selectAll: "Select all",
              selectSomeItems: "Select filter option(s)",
            }}
          />
        </div>

        <button
          key="submit"
          className="btn btn-sm btn-primary open-more-_filtrs jj"
          type="primary"
          disabled={!user.client_id}
          onClick={() => {
            setDrawerFilters(false)
            handleApply()
          }}
        >
          {loginSpinner ? <div className="sbl-circ"></div> : "Apply"}
        </button>

        <button
          onClick={() => setDrawerFilters(false)}
          type="button"
          className="btn btn-sm btn-default open-more-_filtrs"
        >
          Close
        </button>
        <div className="d-flex">
          {filterPreference.map((i) => {
            return (
              <TreeColumn
                type={i.value}
                selectAll={SelectAll}
                deselectAll={DeselectAll}
                query={decideQuery(i.value).query}
                setQuery={decideQuery(i.value).setQuery}
                setSelected={setSelectedFilters}
                checkedKeys={selectedFilters}
                treeData={bufferFilterData}
                count={filterPreference.length}
                condition={i.value === "clients"}
                specialSetSelected={setFetchClientData}
              />
            )
          })}
        </div>
      </Drawer>
      <Drawer
        title="Demographics"
        width={"30%"}
        closable={false}
        onClose={() => setDrawerDemos(false)}
        visible={isDrawerDemos}
        footer={[
          <button
            onClick={() => setDrawerDemos(false)}
            type="button"
            className="btn btn-sm btn-default"
          >
            Close
          </button>,
        ]}
      >
        {demoFilter}
      </Drawer>
      <Drawer
        className="filter-drawer"
        title="Selected tags"
        placement={"top"}
        height={"50%"}
        onClose={() => setIsTagsVisible(false)}
        visible={isTagsVisible}
      >
        <Tooltip title="refresh">{clearFilterButton()}</Tooltip>
        <div className="text-leftt filter-tags drawer-tags mb-5">
          {[
            "clients",
            "locations",
            "departments",
            "demographics",
            "regions",
          ].map((type) => {
            if (selectedTags.filter((i) => i.type === type).length) {
              return (
                <>
                  <p className="mb-5">
                    <h6 className="mb-2 d-block tags-_h6">
                      {type.capitalize()}
                    </h6>
                    {selectedTags
                      .filter((i) => i.type === type)
                      .map((item, id) => {
                        return (
                          <Tag key={id}>
                            {item.label}
                            <span
                              title="Remove"
                              onClick={() => {
                                closeTag(item.id, item.type)
                              }}
                              className="iconx-x custom-tag-close-icon"
                            ></span>
                          </Tag>
                        )
                      })}
                  </p>
                </>
              )
            }
          })}
        </div>
      </Drawer>
      {/* TAGS DRAWER */}
      <Drawer
        title="Regions"
        width={400}
        closable={false}
        onClose={() => setDrawerRegions(false)}
        visible={isDrawerRegions}
        footer={[
          <button
            onClick={() => setDrawerRegions(false)}
            type="button"
            className="btn btn-sm btn-default"
          >
            Close
          </button>,
        ]}
      >
        <TreeColumn
          type={"regions"}
          selectAll={SelectAll}
          deselectAll={DeselectAll}
          query={decideQuery("regions").query}
          setQuery={decideQuery("regions").setQuery}
          setSelected={setSelectedFilters}
          checkedKeys={selectedFilters}
          treeData={bufferFilterData}
          count={1}
        />
      </Drawer>
    </>
  )
}
const mapStateToProps = (state) => ({
  reduxFilterData: state.filter.data,
  user: state.user,
})
const mapDispatchToProps = (dispatch) => ({
  reduxSaveFilter: (e) => dispatch(filterActions.setFilter(e)),
  regionsGlobalActions: (e) => dispatch(regionsGlobalActions(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedFilter)
