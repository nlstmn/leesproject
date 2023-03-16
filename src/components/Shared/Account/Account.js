import React, { useState, useEffect } from "react"
import { Select, Input, notification, Cascader } from "antd"
import { connect } from "react-redux"
import { setBgImage } from "../../../actions/settingsAction"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import DropdownQuestions from "../../Responder/QuestionComponents/dropdownQuestions"
import TickQuestions from "../../Responder/QuestionComponents/tickQuestions"
import { findCascadePath } from "../../../util/functions"
const { Option } = Select

const Account = ({ setBgImage }) => {
  const history = useHistory()
  const [data, setData] = useState([])
  const [userData, setUserData] = useState([])
  const [selections, setSelections] = useState([])
  const [demos, setDemos] = useState([])
  const [labels, setLabels] = useState([])
  const [populatedDepartments, setPopulatedDepartments] = useState([])
  const [populatedlocations, setPopulatedlocations] = useState([])
  const [departmentCascadePath, setDepartmentCascadePath] = useState([])
  const [locationCascadePath, setLocationCascadePath] = useState([])
  useEffect(() => {
    setBgImage("other-image")
    console.log("Image changed!!!")
    getData()
  }, [])

  const getChilds = (item) => {
    let getChild = []
    getChild = data.departments.filter(
      (i) => parseInt(i.parent_id) === parseInt(item.id)
    )
    let buffer = []

    buffer = getChild.map((item) => {
      return {
        value: item.id,
        label: item.label,
        children: getChilds(item),
      }
    })

    return buffer
  }

  function handleSpecial(e) {
    const { name, value } = e.target
    let arr = selections
    console.log(name, value)
    let v = parseInt(value)
    let options = getOptions("DEMO_PRES")
    let noone_id = options.filter((i) => i.option_label === "No one")[0]
      .option_id
    let nwfh = options.filter(
      (i) => i.option_label === "I never work from home"
    )[0].option_id
    console.log(nwfh, noone_id, v, selections)

    if (v === noone_id || v === nwfh) {
      options.forEach((item) => {
        arr = arr.filter((i) => i !== item.option_id)
      })
      arr.push(v)
    } else {
      arr = arr.filter((i) => i !== nwfh).filter((i) => i !== noone_id)

      if (selections.includes(v)) {
        arr = arr.filter((i) => i !== v)
      } else {
        arr.push(v)
      }
    }
    setSelections([...arr])
  }
  function handleActivity(e) {
    let { value } = e.target
    let v = parseInt(value)
    let arr = selections
    if (selections.includes(v)) {
      arr = arr.filter((i) => i !== v)
    } else {
      arr.push(v)
    }
    setSelections([...arr])
  }
  function getData() {
    axios
      .get("/demographics")
      .then((res) => {
        console.log(res.data.result)
        let answers = res.data.result.answers.filter((i) =>
          res.data.result.enabledOptions.includes(i)
        )
        console.log(answers)
        setData(res.data.result)
        setSelections(answers)
        setUserData(res.data.result.user)
        setDemos(res.data.result.demos)
        setLabels(res.data.result.labels)
        console.log(res.data.result.labels.sort((a, b) => a.level - b.level))
        setDepartmentCascadePath(
          findCascadePath(
            res.data.result.user.department_id,
            res.data.result.departments
          )
        )
        setLocationCascadePath(
          findCascadePath(
            res.data.result.user.location_id,
            res.data.result.locations
          )
        )
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    populateCascade()
  }, [data, userData, departmentCascadePath, locationCascadePath])

  function populateCascade() {
    console.log("populated")
    const template = (arr, index, type, path, setPath, userDataType) => {
      if (arr.length > 0)
        return (
          <div className="form-group form-box text-leftt">
            <label className="info--_text" htmlFor="department_id">
              <span className="info--sub-title">
                {labels.filter((i) => i.level === index + 1).length > 0
                  ? labels.filter((i) => i.level === index + 1)[0].label
                  : type === "department"
                  ? "Sub Department"
                  : "Floor"}
              </span>
            </label>
            <div className="ant-_-select-container">
              <Select
                aria-label="Department selection; please double tap to open the list."
                getPopupContainer={(trigger) => trigger.parentElement}
                optionFilterProp="children"
                placeholder="Department"
                style={{ width: 300 }}
                value={path[index + 1]}
                name={userDataType}
                id={userDataType}
                onChange={(e) => {
                  let arr = path
                  if (arr[index + 1]) {
                    arr[index + 1] = e
                  } else {
                    arr.push(e)
                  }

                  setPath(arr)

                  setUserData((pre) => {
                    return { ...pre, [userDataType]: e }
                  })
                }}
              >
                {arr.map((item) => {
                  return (
                    <Option
                      title={item.label}
                      aria-label={item.label}
                      tabIndex={0}
                      value={item.id}
                    >
                      {item.label}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </div>
        )
    }

    let arrDepartment = departmentCascadePath.map((id, index) => {
      return template(
        data.departments.filter((i) => i.parent_id === id),
        index,
        "department",
        departmentCascadePath,
        setDepartmentCascadePath,
        "department_id"
      )
    })
    let arrLocation = locationCascadePath.map((id, index) => {
      return template(
        data.locations.filter((i) => i.parent_id === id),
        index,
        "location",
        locationCascadePath,
        setLocationCascadePath,
        "location_id"
      )
    })
    setPopulatedDepartments(arrDepartment)
    setPopulatedlocations(arrLocation)
  }

  function handleSelectionsById(id, type, e) {
    let arr = selections
    let value = parseInt(e)
    if (type === "multiple") {
      if (selections.includes(value)) {
        arr = arr.filter((i) => i !== value)
      } else {
        arr.push(value)
      }
    } else if (type === "single") {
      getOptionsById(id)
        .map((i) => i.option_id)
        .map((item) => {
          arr = arr.filter((i) => i !== item)
        })
      arr.push(value)
    }

    console.log(arr)
    setSelections(arr)
  }
  function handleUserData(e) {
    const { name, value } = e.target
    setUserData((pre) => {
      return { ...pre, [name]: value.capitalize() }
    })
  }
  function getOptionsById(id) {
    if (!data.demos) {
      return []
    } else {
      return data.demos
        .filter((i) => i.id === id)[0]
        .options.filter((i) => data.enabledOptions.includes(i.option_id))
        .sort((a, b) => {
          if (a.position < b.position) return -1
          if (a.position > b.position) return 1
          return 0
        })
    }
  }
  function getSelectedById(id) {
    if (!data.demos) {
      return []
    } else {
      let selects = []
      getOptionsById(id).forEach((item) => {
        if (selections.includes(item.option_id)) {
          selects.push(item.option_id)
        }
      })

      return selects
    }
  }
  function getOptions(Code) {
    if (!data.demos) {
      return []
    } else {
      return data.demos.filter((i) => i.code === Code)[0]
        ? data.demos
            .filter((i) => i.code === Code)[0]
            .options.filter((i) => data.enabledOptions.includes(i.option_id))
            .sort((a, b) => {
              if (a.position < b.position) return -1
              if (a.position > b.position) return 1
              return 0
            })
        : []
    }
  }
  function send() {
    Promise.all([
      axios.post("/account", {
        answers: selections.map((i) => {
          return { answer: i }
        }),
      }),
      axios.put("/account", userData),
    ])
      .then((val) => {
        console.log(val)
        notification.success({ message: "Profile updated!" })
        history.push("/")
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    console.log(departmentCascadePath, locationCascadePath)
  }, [departmentCascadePath, locationCascadePath])
  return (
    <>
      <div className="responder-_account-section">
        <div className="container">
          <div className="row bg-_account-section">
            <div className="col-lg-5 col-md-12 bg-_color-left none-992">
              <div className="form-_section">
                <h3>
                  <strong>Settings</strong>
                </h3>
                <div className="account-_inner-form">
                  <div className="form-group form-box text-leftt">
                    <Link
                      to="/my-account"
                      className="item-_-link active-_-item"
                    >
                      <i
                        className="icon_a-editticon_a-"
                        aria-hidden="true"
                        title="Pencil icon"
                      ></i>{" "}
                      Edit profile
                    </Link>
                  </div>
                  <div className="form-group form-box text-leftt">
                    <Link to="/change-password" className="item-_-link">
                      <i
                        className="icon_a-passworddicon_a-"
                        aria-hidden="true"
                        title="Lock icon"
                      ></i>{" "}
                      Change password
                    </Link>
                  </div>
                  <div className="form-group form-box text-leftt">
                    <Link to="/alert-settings" className="item-_-link">
                      <i
                        className="icon_a-alertssicon_a-"
                        aria-hidden="true"
                        title="Bell icon"
                      ></i>{" "}
                      Alert settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 bg-_color-right">
              <div className="form-_section">
                <h3 className="right--_h3">
                  <i
                    className="icon_a-editticon_a-"
                    aria-hidden="true"
                    title="Pencil icon"
                  ></i>{" "}
                  Edit profile
                </h3>
                <div className="account-_inner-form">
                  <div className="form-group form-box text-leftt">
                    <label className="info--_text" htmlFor="first_name">
                      <span className="info--sub-title">First name</span>
                    </label>
                    <Input
                      placeholder="First name"
                      name="first_name"
                      id="first_name"
                      onChange={handleUserData}
                      value={
                        userData.first_name
                          ? userData.first_name
                          : data.user
                          ? data.user.first_name
                          : ""
                      }
                      style={{ width: 300 }}
                    />
                  </div>
                  <div className="form-group form-box text-leftt">
                    <label className="info--_text" htmlFor="last_name">
                      <span className="info--sub-title">Last name</span>
                    </label>
                    <Input
                      placeholder="Last name"
                      name="last_name"
                      id="last_name"
                      onChange={handleUserData}
                      value={
                        userData.last_name
                          ? userData.last_name
                          : data.user
                          ? data.user.last_name
                          : ""
                      }
                      style={{ width: 300 }}
                    />
                  </div>

                  <div className="form-group form-box text-leftt">
                    <label className="info--_text" htmlFor="department_id">
                      <span className="info--sub-title">
                        {labels.filter((i) => i.type === "department").length >
                        0
                          ? labels.filter(
                              (i) => i.type === "department" && i.level === 0
                            )[0].label
                          : "Department"}
                      </span>
                    </label>
                    <div className="ant-_-select-container">
                      <Select
                        aria-label="Department selection; please double tap to open the list."
                        getPopupContainer={(trigger) => trigger.parentElement}
                        optionFilterProp="children"
                        placeholder="Department"
                        style={{ width: 300 }}
                        name="department_id"
                        id="department_id"
                        value={departmentCascadePath[0]}
                        onChange={(e) => {
                          console.log(e, departmentCascadePath)
                          setDepartmentCascadePath([e])

                          setUserData((pre) => {
                            return { ...pre, department_id: e }
                          })
                        }}
                      >
                        {data?.departments
                          ?.filter((i) => !i.parent_id)
                          .map((item) => {
                            return (
                              <Option
                                title={item.label}
                                aria-label={item.label}
                                tabIndex={0}
                                value={item.id}
                              >
                                {item.label}
                              </Option>
                            )
                          })}
                      </Select>
                    </div>
                  </div>
                  {populatedDepartments.map((i) => {
                    return i
                  })}
                  <div className="form-group form-box text-leftt">
                    <label className="info--_text" htmlFor="location_id">
                      <span className="info--sub-title">
                        {labels.filter((i) => i.type === "location").length > 0
                          ? labels.filter((i) => i.type === "location")[0].label
                          : "Main office location"}
                      </span>
                    </label>
                    <div className="ant-_-select-container">
                      <Select
                        aria-label="Location selection; please double tap to open the list."
                        getPopupContainer={(trigger) => trigger.parentElement}
                        optionFilterProp="children"
                        placeholder="Main office location"
                        style={{ width: 300 }}
                        value={locationCascadePath[0]}
                        name="location_id"
                        id="location_id"
                        onChange={(e) => {
                          setLocationCascadePath([e])
                          setUserData((pre) => {
                            return { ...pre, location_id: e }
                          })
                        }}
                      >
                        {data.locations &&
                          data.locations
                            ?.filter((i) => !i.parent_id)
                            ?.filter(
                              (i) =>
                                !["code_office", "code_home"].includes(i.code)
                            )
                            ?.sort((a, b) => a.code - b.code)
                            .map((item) => {
                              return (
                                <Option
                                  title={item.label}
                                  aria-label={item.label}
                                  tabIndex={0}
                                  value={item.id}
                                >
                                  {item.label}
                                </Option>
                              )
                            })}
                      </Select>
                    </div>
                  </div>
                  {populatedlocations.map((i) => {
                    return i
                  })}

                  {demos
                    .sort((a, b) => {
                      if (a.id < b.id) return -1
                      if (a.id > b.id) return 1
                      return 0
                    })
                    .sort((a, b) => {
                      if (a.position < b.position) return -1
                      if (a.position > b.position) return 1
                      return 0
                    })
                    .map((item) => {
                      switch (item.name) {
                        case "dropdown":
                          return (
                            <DropdownQuestions
                              render={getOptionsById(item.id).length > 0}
                              heading={item.heading}
                              trigger={(trigger) => trigger.parentElement}
                              handleSelections={handleSelectionsById}
                              id={item.id}
                              getOptionsById={getOptionsById}
                              getSelectedById={getSelectedById}
                            />
                          )
                        case "tick":
                          return (
                            <TickQuestions
                              render={getOptionsById(item.id).length > 0}
                              label={item.label}
                              selections={selections}
                              handleActivity={handleActivity}
                              id={item.id}
                              getOptionsById={getOptionsById}
                              code={item.code}
                              handleSpecial={handleSpecial}
                            />
                          )
                        default:
                          break
                      }
                    })}
                </div>
                <div className="bottom-_btns">
                  <Link to="/" className="mb-0 float-l btn btn-default">
                    Close
                  </Link>
                  <a onClick={send} className="mb-0 float-r btn btn-primary">
                    Update
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

const mapStateToProps = (state) => ({
  bgImage: state.settings.bgImage,
})

const mapDispatchToProps = (dispatch) => ({
  setBgImage: (e) => dispatch(setBgImage(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
