import React, { useState, useEffect } from "react"
import Nestable from "react-nestable"
import axios from "axios"
import { CSVReader } from "react-papaparse"
import { CSVLink } from "react-csv"
import { notification, Drawer } from "antd"
import Tabs from "./Tabs"
import ImportExport from "../../common/ImportExport"
import { checkDuplication } from "../../../util/functions"
import {
  toggleEnableDepartmentAction,
  deleteAllNonUsedDepartmentsAction,
  sendDepartmentsDepartmentsAction,
  sendDepartmentsDepartmentsEditAction,
} from "../../../actions/adminActions"
import { useDispatch, useSelector } from "react-redux"
const Departments = () => {
  const dispatch = useDispatch()
  const { error } = useSelector((store) => store.toggleEnableDepartment)
  const { error: delErr } = useSelector(
    (store) => store.deleteAllNonUsedDepartments
  )
  const [openSection, setSection] = useState("cascading")
  const [inputList, setInputList] = useState([{ name: "" }])
  const [addList, setAddList] = useState([])
  const [departments, setDepartments] = useState([])

  const [nestCascading, setNestCascading] = useState([])
  const [nestDropdown, setNestDropdown] = useState([])
  const [name, setName] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [nestedData, setNestedData] = useState([])
  const [isNestedEdited, setNestedEdited] = useState(false)
  const [levelCount, setLevelCount] = useState(0)
  const [subDepartmentLabels, setSubDepartmentLabels] = useState([])
  const [subDepartmentDrawerVisible, setSubDepartmentDrawerVisible] =
    useState(false)
  const [cascadingAvailable, setCascadingAvailable] = useState(true)
  const [flatData, setFlatData] = useState([])
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")

  const renderItem = ({ item }) => {
    return (
      <div>
        <a className={`list-group-item department-_list ${isEdit && "edited"}`}>
          {isEdit === item.id ? item.edit : item.text}

          <div className="float-right department-_right-side">
            <a
              onClick={() => {
                setName(item.label)
                setIsEdit(item.id)
              }}
              className="btn btn-sm cursorp icon-_department"
            >
              <span className="iconx-pencil"></span>
            </a>

            <label className="switch">
              <input
                onChange={() => {
                  toggleEnable(item.id, item.enable)
                }}
                type="checkbox"
                checked={item.enable}
              />
              <span className="slider round"></span>
            </label>

            {item.isReferenced !== undefined && !item.isReferenced && (
              <a
                onClick={() => deleteDepartment(item.id)}
                className="btn btn-sm cursorp icon-_department"
              >
                <span className="iconx-trash"></span>
              </a>
            )}
          </div>
        </a>
      </div>
    )
  }
  const toggleEnable = (id, enable) => {
    dispatch(toggleEnableDepartmentAction({ clientId, id, enable }))
    refresh()

    if (error) {
      notification.warning({ message: "Cannot edit state" })
    }
  }
  const deleteAllNonUsedDepartments = () => {
    dispatch(deleteAllNonUsedDepartmentsAction({ clientId }))
    refresh()

    if (delErr) {
      notification.warning({ message: "Cannot Deleted" })
    }
  }
  const refresh = () => {
    axios
      .get(`/admin/clients/${clientId}/departments`)
      .then((res) => {
        console.log(res.data)
        if (res.data.result.length === 0) {
          notification.warning({ message: "No data found!" })
        }
        let arr = {}
        res.data.labels.forEach((i) => {
          arr = { ...arr, [i.level]: i.label }
        })
        setSubDepartmentLabels(arr)
        if (res?.data?.result.filter((i) => i.parent_id).length > 0) {
          setCascadingAvailable(true)
          setSection("cascading")
        } else {
          setCascadingAvailable(false)
          setSection("dropdown")
        }
        setFlatData(res.data.result)

        checkAndFilterTranslations(res.data.result?.sortAlphabetically("label"))
      })
      .catch((err) => {
        notification.warning({ message: "No client found!" })
      })
  }
  useEffect(() => {
    refresh()
  }, [])
  useEffect(() => {
    addNest()
  }, [inputList])
  useEffect(() => {
    populateCascade()
    populateDropdown()
  }, [departments, addList, name, openSection])

  const sendDepartment = (e) => {
    if (checkDuplication(name, flatData, "label")) {
      notification.warning({ message: "Duplicate record" })
    } else {
      if (!isEdit) {
        let eData = {
          data: [{ name: name }],
          language: "en-GB",
        }
        sendDepartmentsDepartmentsAction({ clientId, eData })

        refresh()
        setName("")

        notification.success({ message: "Department Inserted!" })
      } else {
        sendDepartmentsDepartmentsEditAction({ clientId, isEdit })

        notification.success({ message: "Department updated" })
        setIsEdit(false)
        setName("")
        refresh()
      }
    }
  }
  const handleInputChange = (e, index) => {
    const { value } = e.target
    setName(value)
  }

  const handleAddClick = () => {
    if (name.length) {
      sendDepartment(inputList)
      setInputList([...inputList, { name: name }])
    } else {
      notification.warning({ message: "Department cannot be empty" })
    }
  }
  const updateDepartments = () => {
    axios
      .put(`/admin/clients/${clientId}/departments`, {
        cascade: true,
        data: nestedData,
      })
      .then((res) => {
        notification.success({ message: "Cascade level updated" })
        refresh()
        setNestedEdited(false)
      })
      .catch((err) => {
        notification.warning({ message: "Cannot change cascade level" })
      })
  }

  const decodeNest = (e) => {
    openSection === "dropdown" ? setNestDropdown(e) : setNestCascading(e)
    if (openSection === "dropdown") {
      notification.success({ message: "Listing type changed to cascade." })
      setSection("cascading")
    } else {
      let buffer = []
      const flatTree = (parent_id, tree) => {
        tree.forEach((item) => {
          buffer.push({
            id: item.id,
            label: item.text.props.children,
            parent_id: parent_id,
          })
          if (item.children.length > 0) {
            flatTree(item.id, item.children)
          }
        })
      }
      flatTree(null, e)
      setNestedData(buffer)
      setNestedEdited(true)
    }
  }
  const addNest = () => {
    let arr = inputList.map((i, index) => {
      return {
        id: "a" + index,
        label: i.name,
        parent_id: null,
        color: "blue",
      }
    })

    setAddList(arr)
  }

  const checkAndFilterTranslations = (e) => {
    let arr = e
    //arr = arr.filter((i) => i.parent_id === null);

    let ClientDefaultLanguage = "12"

    let departmentCount = []
    arr.map((i) => {
      if (!departmentCount.includes(i.key)) {
        departmentCount.push(i.key)
      }
    })

    let filtered = arr.filter(
      (i) => i.language_id === parseInt(ClientDefaultLanguage)
    )

    if (filtered.length !== departmentCount.length) {
      // notification.warning({
      //   message: "Looks like your translations for your default language is not complete. Showing Default translations",
      // });
      //default english
      filtered = arr.filter((i) => i.language_id === 12)
    }
    setDepartments(filtered)
  }
  const deleteDepartment = (id) => {
    console.log(id)
    axios
      .delete(`/admin/clients/${clientId}/departments/${id}`)
      .then((res) => {
        console.log(res)
        refresh()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const editComponent = (item) => {
    return (
      <div className="form-group">
        <input
          value={name}
          type="text"
          className="form-control"
          onChange={(e) => {
            handleInputChange(e)
          }}
        ></input>
        <button className="btn btn-sm btn-primary" onClick={handleAddClick}>
          Save
        </button>
      </div>
    )
  }
  const checkChild = (item) => {
    let findChild = []
    findChild = departments.filter(
      (i) => parseInt(i.parent_id) === parseInt(item.id)
    )

    findChild = findChild.map((i) => {
      let c = item.color
        ? "dd-handle- bg-" + item.color
        : "dd-handle- bg-department"
      return [
        {
          id: i.id,
          text: <div className={c}>{i.label}</div>,
          edit: editComponent(i),
          enable: i.enable,
          isReferenced: i.isReferenced,
          children: checkChild(i).map((item) => item[0]),
        },
      ]
    })

    return findChild
  }
  const populateCascade = () => {
    let mains = departments
      .filter((i) => !i.parent_id)
      .map((item) => {
        let c = item.color
          ? "dd-handle- bg-" + item.color
          : "dd-handle- bg-department"
        return {
          id: item.id,
          enable: item.enable,
          text: <div className={c}>{item.label}</div>,
          edit: editComponent(item),
          children: checkChild(item).map((i) => i[0]),
          isReferenced: item.isReferenced,
          label: item.label,
        }
      })

    let t = mains
    getDepth(t)
    setNestCascading(t)
  }
  const getDepth = (nest) => {
    let depthArr = Array.apply(
      0,
      Array(nest.filter((i) => i.children.length === 0).length)
    )
    let count = 0
    const searchChild = (item, index) => {
      if (item?.children?.length > 0) {
        count++
        item.children.forEach((i) => {
          i.children.forEach((o) => {
            searchChild(o, index)
          })
        })
      }
    }
    nest.forEach((item, index) => {
      searchChild(item, index)
      depthArr[index] = count
      count = 0
    })
    setLevelCount(depthArr.sort((a, b) => b - a)[0] + 1)
  }
  const populateDropdown = () => {
    let mains = departments.map((item) => {
      let c = item.color
        ? "dd-handle- bg-" + item.color
        : "dd-handle- bg-department"

      return {
        id: item.id,
        enable: item.enable,
        text: <div className={c}>{item.label}</div>,
        edit: editComponent(item),
        isReferenced: item.isReferenced,
        label: item.label,
      }
    })

    let t = mains

    setNestDropdown(t)
  }

  useEffect(() => {
    console.log(nestCascading)
  }, [nestCascading])
  const updateSubDepartmentLabel = () => {
    axios
      .put(`/admin/clients/${clientId}`, {
        department_labels: subDepartmentLabels,
      })
      .then((res) => {
        notification.success({ message: "Default department labels changed" })
        refresh()
      })
  }
  return (
    <>
      <Drawer
        title="Change department labels"
        placement="right"
        onClose={() => {
          setSubDepartmentDrawerVisible(false)
        }}
        width={300}
        visible={subDepartmentDrawerVisible}
      >
        <div className="card">
          <>
            <div className="row clearfix">
              {levelCount > 0 &&
                Array.apply(null, Array(levelCount)).map((i, index) => {
                  return (
                    <>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label className="info--_text" htmlFor="first_name">
                            <span className="info--sub-title">
                              {index === 0
                                ? `Parent department label`
                                : `Sub department label level:${index}`}
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Level ${index + 1}`}
                            onChange={(e) => {
                              {
                                setSubDepartmentLabels((pre) => {
                                  return {
                                    ...pre,
                                    [index]: e.target.value,
                                  }
                                })
                              }
                            }}
                            value={subDepartmentLabels[index]}
                          />
                        </div>
                      </div>
                    </>
                  )
                })}
              <div className="col-lg-12 col-md-12 mt-4">
                <button
                  onClick={updateSubDepartmentLabel}
                  className="btn btn-sm btn-primary float-l"
                >
                  Change
                </button>
              </div>
            </div>
          </>
        </div>
      </Drawer>
      <div className="container-fluid clients-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              <Tabs></Tabs>
              <ul className="nav nav-tabs3 mb-2 mt-4">
                {!cascadingAvailable ? (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        openSection === "dropdown" && " active"
                      }`}
                      onClick={() => setSection("dropdown")}
                      data-toggle="tab"
                    >
                      Dropdown department list
                    </a>
                  </li>
                ) : (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        openSection === "cascading" && " active"
                      }`}
                      onClick={() => setSection("cascading")}
                      data-toggle="tab"
                    >
                      Cascading department list
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title">Departments</h2>
                <span className="text-table-info">
                  Total: {nestDropdown.length} departments
                </span>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <ImportExport
                  import={true}
                  export={true}
                  refresh={refresh}
                  type="department_cascade"
                  clientId={clientId}
                  data={departments}
                  allData={flatData}
                />
                <div className="form-group mb-0 ml-3">
                  <input
                    type="text"
                    onChange={(e) => {
                      handleInputChange(e)
                    }}
                    name="name"
                    value={name}
                    className="form-control"
                    placeholder="Department name"
                  />
                </div>
                <button
                  className="btn btn-primary bigger-_btn after-_r-border ml-2"
                  onClick={handleAddClick}
                >
                  Add department
                </button>
                <button
                  onClick={() => setSubDepartmentDrawerVisible(true)}
                  className="btn btn-primary bigger-_btn ml-3"
                >
                  Change label
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 mt--22">
            {openSection === "dropdown" || openSection === "cascading" ? (
              <>
                <div className="card mt-4">
                  <div className="body min-h-381">
                    {" "}
                    <button
                      onClick={() => deleteAllNonUsedDepartments()}
                      className="btn btn-primary bigger-_btn ml-3 float-r"
                    >
                      Delete all non-used departments
                    </button>
                    <h5 className="mb-0 text-leftt light-black">
                      Department hierarchy
                    </h5>
                    <p className="text-leftt light-black">
                      Keep the items to be sublisted and slide to the right.
                    </p>{" "}
                    <div className="dd dd4">
                      {isNestedEdited && (
                        <div className="mb-3">
                          <button
                            type="button"
                            data-dismiss="modal"
                            onClick={updateDepartments}
                            className="btn btn-sm btn-primary"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-default"
                            data-dismiss="modal"
                            onClick={() => {
                              populateCascade()
                              setNestedEdited(false)
                            }}
                            style={{ marginLeft: "15px" }}
                          >
                            Close
                          </button>
                        </div>
                      )}
                      <ol className="dd-list">
                        <Nestable
                          items={
                            openSection === "dropdown"
                              ? nestDropdown
                              : nestCascading
                          }
                          renderItem={renderItem}
                          onChange={decodeNest}
                        />
                      </ol>
                    </div>
                  </div>
                  <></>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Departments
