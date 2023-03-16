import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DatePicker } from "antd"
import moment from "moment"
import { notification, Tree, Tooltip } from "antd"
import Tabs from "../Tabs"
import { dbToTree } from "../../../../util/functions"
const { RangePicker } = DatePicker

const CreateCampaignFinal = ({
  printSummary,
  formData,
  index,
  selections,
  send,
  SetSelections,
  isEdit,
}) => {
  const [check, setCheck] = useState(false)
  const [departments, setDepartments] = useState([])
  const [locations, setLocations] = useState([])
  const [demoPopulate, setDemoPopulate] = useState([])
  const [allDemos, setallDemos] = useState([])
  const [allLocations, setallLocations] = useState([])
  const [allDepartments, setallDepartments] = useState([])
  const [isAll, setIsAll] = useState([])
  const [selectedDemos, setSelectedDemos] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [status, setStatus] = useState()
  const [selectedRegions, setSelectedRegions] = useState([])
  const [queryLocations, setQueryLocations] = useState("")
  const [queryDepartments, setQueryDepartments] = useState("")
  useEffect(() => {
    const t = new Date(Date.now()).toISOString()
    console.log(selectedLocations)
    SetSelections({
      demos: selectedDemos,
      locations: selectedLocations,
      departments: selectedDepartments,
      start: check ? (start ? start : t) : start,
      end: check ? null : end,
      title: title,
      description: description,
      isAlwaysOn: check,
      status: status,
    })
  }, [
    selectedDemos,
    selectedLocations,
    selectedDepartments,
    title,
    description,
    check,
    start,
    end,
    status,
  ])
  useEffect(() => {
    console.log(formData, end)
    if (formData) {
      if (formData.demos.length > 0) {
        populateLocations(formData.locations)
        populateDepartments(formData.departments)
        populateDemos(formData.demos)
        setallDemos(formData.demos)
        setallDepartments(formData.departments)
        setallLocations(formData.locations)
      }
    }
  }, [formData, selectedDemos, selectedLocations, selectedDepartments, end])

  useEffect(() => {
    console.log(selections)
    setTitle(selections.title)
    setDescription(selections.description)
    setSelectedDemos(selections.demos)
    setSelectedLocations(selections.locations)
    setSelectedDepartments(selections.departments)
    setStart(
      selections.start
        ? selections.start
        : new Date(moment().format("YYYY-MM-DD")).toISOString()
    )
    setEnd(
      isEdit && selections.end
        ? selections.end
        : new Date(moment().add(14, "days").format("YYYY-MM-DD")).toISOString()
    )
    isEdit && !selections.end && setCheck(true)
    setSelectedRegions(formData.regions.map((i) => i.id))
  }, [])

  useEffect(() => {
    populateDemos(allDemos)
  }, [isAll.length])
  useEffect(() => {
    handleLocationsByRegion(selectedRegions)
  }, [selectedRegions])

  useEffect(() => {
    filterLocationsAndDepartments("departments", queryDepartments)
  }, [queryDepartments])
  useEffect(() => {
    filterLocationsAndDepartments("locations", queryLocations)
  }, [queryLocations])

  const disabledDate = (current) => {
    //disable six months or later
    const tooLate = moment().add(-10, "months") >= current
    const past = current >= moment().add(1, "days")
    return tooLate || past
  }
  const filterLocationsAndDepartments = (type, query) => {
    const filterData = (data, e) => {
      let buffer = []

      data.forEach((item) => {
        if (String(item.label).toLowerCase().includes(e.toLowerCase())) {
          buffer.push(item)
        }
      })
      return buffer
    }
    switch (type) {
      case "departments":
        populateDepartments(filterData(formData.departments, query))
        break
      case "locations":
        populateLocations(filterData(formData.locations, query))
        break
      default:
        break
    }
  }

  const handleLocationsByRegion = (regionIds) => {
    let buffer = formData.locations.filter(
      (i) => regionIds.includes(parseInt(i.region_id)) || !i.region_id
    )

    //setSelectedLocations(buffer.map((i) => i.id));
  }

  const handleRegions = (id) => {
    let buffer = selectedRegions
    if (id === "all") {
      if (selectedRegions.length === formData.regions.length) {
        setSelectedRegions([])
      } else {
        setSelectedRegions(formData.regions.map((i) => i.id))
      }
    } else {
      if (buffer.includes(parseInt(id))) {
        buffer = buffer.filter((i) => i !== parseInt(id))
      } else {
        buffer.push(parseInt(id))
      }
      let b = [...buffer]
      setSelectedRegions(b)
    }
  }
  const isAllLocationInThisRegion = (id) => {}
  const populateDemos = (e) => {
    let arr = [...new Set(e.map((i) => i.heading))]

    checkIsAll()
    arr = arr.map((item) => {
      //
      return (
        <div className="col-lg-3 col-md-4 campaigns-fancy  pt-20">
          <div className="text-leftt light-black pb-20">{item}</div>
          <label className="fancy-checkbox">
            <input
              type="checkbox"
              name="modules"
              checked={isAll.includes(item)}
              onChange={() => {
                selectAll(item)
              }}
            />
            <span className="light-black">
              <strong>(All)</strong>
            </span>
          </label>
          {populateOptions(item, e)}
          {/* <label className="fancy-checkbox">
            <input type="checkbox" name="modules" />
            <span className="light-black">
              <strong>(All)</strong>
            </span>
          </label> */}
        </div>
      )
    })
    setDemoPopulate(arr)
  }
  const populateOptions = (e, d) => {
    let arr = d.filter((i) => i.heading === e)
    arr = arr.sort((a, b) => {
      return parseFloat(a.position) - parseFloat(b.position)
    })
    arr = arr.map((item) => {
      return (
        <label className="fancy-checkbox">
          <input
            checked={selectedDemos.includes(item.option_id)}
            type="checkbox"
            onChange={handleTicks}
            name="demos"
            value={item.option_id}
          />
          <span className="light-black">{item.option_label}</span>
        </label>
      )
    })
    return arr
  }
  const populateDepartments = (e) => {
    setDepartments(
      <>
        <button
          type="button"
          onClick={() => {
            setSelectedDepartments(e.map((i) => i.id))
          }}
          className="ant-btn  ant-btn-link ant-btn-sm pd--zero"
        >
          <span className="text-white">Select all</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedDepartments([])
          }}
          className="ant-btn ant-btn-link ant-btn-sm "
        >
          <span className="text-white">Deselect</span>
        </button>
        <hr />
        <Tree
          checkable
          onCheck={(keys, info) => {
            console.log(info.node.key, keys)
            handleDepartments(info.node.key)
          }}
          checkedKeys={selectedDepartments}
          treeData={dbToTree(e)}
        />
      </>
    )
  }
  const populateLocations = (e) => {
    console.log(dbToTree(e), selectedLocations, e)
    setLocations(
      <>
        <button
          type="button"
          onClick={() => {
            setSelectedLocations(e.map((i) => i.id))
          }}
          className="ant-btn  ant-btn-link ant-btn-sm pd--zero"
        >
          <span className="text-white">Select all</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedLocations([])
          }}
          className="ant-btn ant-btn-link ant-btn-sm "
        >
          <span className="text-white">Deselect</span>
        </button>
        <hr />
        <Tree
          checkable
          onCheck={(keys, info) => {
            console.log([...keys], info.node.key)
            handleLocations(info.node.key)
          }}
          checkedKeys={selectedLocations}
          treeData={dbToTree(e)}
        />
      </>
    )
  }
  const selectAll = (e) => {
    let b = selectedDemos
    if (isAll.includes(e)) {
      allDemos
        .filter((i) => i.heading === e)
        .forEach((i) => {
          b = b.filter((p) => p !== i.option_id)
        })
    } else {
      allDemos
        .filter((i) => i.heading === e)
        .forEach((i) => {
          b.push(i.option_id)
        })
    }
    setSelectedDemos([...new Set(b)])
  }
  const checkIsAll = () => {
    let headings = allDemos.map((i) => i.heading)
    let alls = headings
    headings.forEach((item) => {
      allDemos
        .filter((i) => i.heading === item)
        .forEach((o) => {
          if (!selectedDemos.includes(o.option_id)) {
            alls = alls.filter((p) => p !== item)
          }
        })
    })

    setIsAll([...new Set(alls)])
  }
  const handleTicks = (e) => {
    const { name, value } = e.target

    let buffer = selectedDemos

    if (buffer.includes(parseInt(value))) {
      buffer = buffer.filter((i) => i !== parseInt(value))
    } else {
      buffer.push(parseInt(value))
    }

    let b = [...buffer]
    setSelectedDemos(b)
  }
  const handleDepartments = (e) => {
    let buffer = selectedDepartments

    if (buffer.includes(parseInt(e))) {
      buffer = buffer.filter((i) => i !== parseInt(e))
    } else {
      buffer.push(parseInt(e))
    }

    let b = [...buffer]
    setSelectedDepartments(b)
  }
  const handleLocations = (e) => {
    console.log(e)
    let buffer = selectedLocations

    if (buffer.includes(parseInt(e))) {
      buffer = buffer.filter((i) => i !== parseInt(e))
    } else {
      buffer.push(parseInt(e))
    }

    let b = [...buffer]
    setSelectedLocations(b)
  }
  const changeDate = (e) => {
    let start_ = new Date(
      moment(e[0]).format("YYYY-MM-DD HH:mm:ss")
    ).toISOString()
    let end_ = new Date(
      moment(e[1]).format("YYYY-MM-DD HH:mm:ss")
    ).toISOString()
    setStart(start_)
    setEnd(end_)
  }
  const checkReady = (status_) => {
    setStatus(status_)
    console.log(title)
    if (!title) {
      notification.warn({
        message: "Please insert a title",
      })
    } else if (start === "" && !check) {
      notification.warn({
        message: "Please select time",
      })
    } else if (selectedDemos?.length < 1) {
      notification.warn({
        message: "Please select at least one demographic option",
      })
    } else if (selectedDepartments?.length < 1) {
      notification.warn({
        message: "Please select at least one department",
      })
    } else if (selectedLocations?.length < 1) {
      notification.warn({
        message: "Please select at least one location",
      })
    } else {
      send(status_)
    }
  }
  return (
    <>
      <div className="container-fluid clients-page">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              {/* <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a onClick={() => history.goBack()}><span className="iconx-triangle-left"></span> Back</a></li>
                                </ol>
                            </nav> */}
              <h1>Admin management</h1>
              <Tabs></Tabs>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <div className="body min-h-381">
                <h2 className="card-title mb-0">Select target responders</h2>
                <div className="row clearfix pt-20 pb-34">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <span className="light-black list-group-item min-h-396">
                        <strong>Demographics</strong>
                        <div className="row clearfix pb-20">{demoPopulate}</div>
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <span className="light-black list-group-item min-h-396">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div
                              className="form-group mt--100"
                              style={{
                                paddingLeft: "15px",
                              }}
                            >
                              <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value)
                                }}
                                placeholder="Campaign title"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div
                              className="form-group "
                              style={{
                                paddingLeft: "15px",
                              }}
                            >
                              <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => {
                                  setDescription(e.target.value)
                                }}
                                placeholder="Campaign description"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div
                              className="form-group "
                              style={{
                                paddingLeft: "15px",
                              }}
                            >
                              <label className="fancy-checkbox">
                                <input
                                  type="checkbox"
                                  name="modules"
                                  checked={check}
                                  onClick={() => setCheck((pre) => !pre)}
                                />
                                <span className="light-black">
                                  <strong>Always on</strong>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Show start and end date if Always On not ticked (Mandatory) */}
                        {!check && (
                          <>
                            <div className="text-centerr light-black pb-20 pt-40 relative-centerr">
                              Campaign start date - end date
                            </div>
                            <Tooltip title="Start date">
                              <DatePicker
                                className="takvim-select top-takvim"
                                dropdownClassName="advanced_-picker"
                                readOnly
                                onChange={(a, b) => {
                                  setStart(b.splitDate())
                                }}
                                showToday
                                //disabledDate={disabledDate}
                                format="YYYY-MM-DD"
                                defaultPickerValue={moment()}
                                value={
                                  start
                                    ? moment(start ? start.splitDate() : null)
                                    : moment()
                                }
                              />
                            </Tooltip>
                            <Tooltip title="End date">
                              <DatePicker
                                className="takvim-select top-takvim ml-1 mr-2"
                                dropdownClassName="advanced_-picker"
                                readOnly
                                onChange={(a, b) => {
                                  setEnd(b.splitDate())
                                }}
                                showToday
                                // disabledDate={disabledDate}
                                format="YYYY-MM-DD"
                                defaultPickerValue={moment()}
                                value={
                                  end
                                    ? moment(end ? end.splitDate() : null)
                                    : moment()
                                }
                              />
                            </Tooltip>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <span className="light-black list-group-item min-h-316">
                        <strong>Locations</strong>

                        <div className="row clearfix pb-20">
                          <div className="col-lg-12 col-md-12 campaigns-fancy  pt-20">
                            <input
                              type="text"
                              onChange={(e) => {
                                setQueryLocations(e.target.value)
                              }}
                              value={queryLocations}
                              className="form-control mb-4"
                              placeholder="Search.."
                            ></input>
                            <div className="targets-list-scrollign">
                              {/* <label className="fancy-checkbox">
                                <input
                                  type="checkbox"
                                  checked={selectedLocations.length === formData.locations.length}
                                  name="location"
                                  onChange={() => {
                                    if (selectedLocations.length !== formData.locations.length) {
                                      
                                      setSelectedLocations(formData.locations.map((i) => i.id));
                                    } else {
                                      setSelectedLocations([]);
                                    }
                                  }}
                                />
                                <span className="light-black">Select all</span>
                              </label> */}
                              {locations}
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <span className="light-black list-group-item min-h-316">
                        <strong>Departments</strong>

                        <div className="row clearfix pb-20">
                          <div className="col-lg-12 col-md-12 campaigns-fancy  pt-20">
                            <input
                              type="text"
                              onChange={(e) => {
                                setQueryDepartments(e.target.value)
                              }}
                              value={queryDepartments}
                              className="form-control mb-4"
                              placeholder="Search.."
                            ></input>
                            <div className="targets-list-scrollign">
                              {departments}
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <span className="light-black list-group-item min-h-316">
                        <strong>Regions</strong>

                        <div className="row clearfix pb-20">
                          <div className="col-lg-12 col-md-12 campaigns-fancy  pt-20">
                            <label className="fancy-checkbox">
                              <input
                                onChange={() => handleRegions("all")}
                                checked={
                                  formData.regions.length ===
                                  selectedRegions.length
                                }
                                type="checkbox"
                                name="modules"
                              />
                              <span className="light-black">
                                <strong>(All)</strong>
                              </span>
                            </label>
                            <div className="targets-list-scrollign">
                              {selectedRegions &&
                                formData.regions.map((i) => {
                                  return (
                                    <label className="fancy-checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={() => handleRegions(i.id)}
                                        checked={
                                          selectedRegions.includes(i.id) ||
                                          isAllLocationInThisRegion(i.id)
                                        }
                                        name="modules"
                                      />
                                      <span className="light-black">
                                        {i.name}
                                      </span>
                                    </label>
                                  )
                                })}
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bottom-btns">
                  <button
                    onClick={() => index(0)}
                    className="btn btn-sm btn-default mr-1 float-l"
                  >
                    Back
                  </button>
                  {formData.questions.length > 0 && (
                    <button
                      onClick={() =>
                        printSummary(
                          formData.questions,
                          selectedDepartments.map((item) => {
                            return allDepartments.filter(
                              (i) => i.id === item
                            )[0].label
                          }),
                          selectedLocations.map((item) => {
                            return allLocations.filter((i) => i.id === item)[0]
                              .label
                          }),
                          [
                            ...new Set(
                              selectedDemos.map((item) => {
                                return allDemos.filter(
                                  (i) => i.option_id === item
                                )[0].heading
                              })
                            ),
                          ],
                          new Date(Date.now()).toISOString(),
                          title
                        )
                      }
                      className="btn btn-sm btn-default mr-1 float-l"
                    >
                      Print summary
                    </button>
                  )}
                  &nbsp;&nbsp;
                  <a
                    onClick={() => {
                      checkReady("draft")
                    }}
                    className="btn btn-sm btn-warning ml-2 float-r"
                  >
                    Draft
                  </a>
                  &nbsp;&nbsp;
                  <a
                    onClick={() => {
                      checkReady("active")
                    }}
                    className="btn btn-sm btn-primary mr-1 float-r"
                  >
                    {isEdit ? "Save" : "Submit"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateCampaignFinal
