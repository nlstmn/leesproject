import React, { useState, useRef, useEffect } from "react"
import { Drawer, Form, Typography, Popconfirm, Table } from "antd"
import {
  CustomTreeColumn,
  CustomEditableCell,
} from "../../../../common/commonComponents/formItems"
import { dbToTree } from "../../../../../util/functions"
import { notification } from "../../../../../../node_modules/antd/lib/index"
import ImportExport from "../../../../common/ImportExport"
import axios from "axios"
import moment from "moment"
const Locations = ({
  initData,
  setInitData,
  surveyId,
  clientId,
  formData,
  setFormData,
  close,
  send,
  reset,
}) => {
  let drawerContainer = useRef()
  const [form] = Form.useForm()
  const [visibleLocations, setLocations] = useState(false)
  const [tailoredDrawer, setTailoredDrawer] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState([])
  const [editingKey, setEditingKey] = useState("")
  const [data, setData] = useState([])
  const [tab, setTab] = useState("locations")
  const [column, setColumn] = useState([])
  const [tailoredLocationGroupQuestion, setTailoredLocationGroupQuestion] =
    useState("What region are you primarily based in?")
  const [tailoredLocationQuestion, setTailoredLocationQuestion] = useState(
    "Which of your organisation’s workplaces is the most important for your work?"
  )
  const [tailoredFloorQuestion, setTailoredFloorQuestion] = useState(
    "What floor do you primarily work on?"
  )

  const [buffer, setBuffer] = useState([])
  const [query, setQuery] = useState("")
  const isEditing = (record) => record.key === editingKey
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey("")
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(attributeCheck(newData))
        setEditingKey("")
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey("")
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }

  const sendTailoredQuestions = () => {
    axios
      .put(`/admin/clients/${clientId}/surveys/${surveyId}`, {
        data: [
          tailoredLocationGroupQuestion,
          tailoredLocationQuestion,
          tailoredFloorQuestion,
        ],
        type: "tailored_location",
      })
      .then((res) => {
        setTailoredDrawer(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const updateOtherFloorOption = () => {
    axios
      .put(`/admin/clients/${clientId}/surveys/${surveyId}`, {
        data: [formData?.general?.enable_other_floor],
        type: "toggle_other_floor_enabled",
      })
      .then((res) => {
        reset()
        notification.success({ message: "State updated" })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const updateOtherOption = () => {
    axios
      .put(`/admin/clients/${clientId}/surveys/${surveyId}`, {
        data: [formData?.general?.enable_other_location],
        type: "toggle_other_location_enabled",
      })
      .then((res) => {
        reset()
        notification.success({ message: "State updated" })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const updateOtherLocationGroupOption = () => {
    axios
      .put(`/admin/clients/${clientId}/surveys/${surveyId}`, {
        data: [formData?.general?.enable_other_location_group],
        type: "toggle_other_location_group_enabled",
      })
      .then((res) => {
        reset()
        notification.success({ message: "State updated" })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const mergeColumns = () => {
    let col = [
      {
        title: "Remove",
        dataIndex: "remove",
        render: (_, record) => {
          return (
            <Typography.Link
              onClick={() => {
                if (
                  formData?.general?.status === "live" &&
                  moment(formData?.general?.end_date).isBefore(moment())
                ) {
                  notification.warning({ message: "Cannot remove" })
                } else {
                  let locationFloors = initData?.locations
                    ?.filter((i) => i.parent_id === record.id)
                    .map((i) => i.id)
                  setSelectedLocations(
                    selectedLocations.filter(
                      (i) => i !== record.id && !locationFloors.includes(i)
                    )
                  )
                }
              }}
            >
              Remove
            </Typography.Link>
          )
        },
      },
      {
        title: "Remove floors",
        dataIndex: "remove floors",
        render: (_, record) => {
          return (
            <Typography.Link
              onClick={() => {
                if (
                  formData?.general?.status === "live" &&
                  moment(formData?.general?.end_date).isBefore(moment())
                ) {
                  notification.warning({ message: "Cannot remove" })
                } else {
                  let locationFloors = initData?.locations
                    ?.filter((i) => i.parent_id === record.id)
                    .map((i) => i.id)
                  setSelectedLocations(
                    selectedLocations.filter((i) => !locationFloors.includes(i))
                  )
                }
              }}
            >
              Remove '
              {
                selectedLocations.filter((i) =>
                  initData?.locations
                    ?.filter((i) => i.parent_id === record.id)
                    .map((i) => i.id)
                    .includes(i)
                ).length
              }
              ' floors
            </Typography.Link>
          )
        },
      },
      {
        title: "Operation",
        dataIndex: "operation",
        render: (_, record) => {
          const editable = isEditing(record)
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <>
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            </>
          )
        },
      },

      {
        title: "id",
        dataIndex: "id",
        editable: false,
      },
      {
        title: "Location group",
        dataIndex: "location_group_name",
        editable: false,
      },

      {
        title: "Workplace name",
        dataIndex: "label",
        editable: false,
      },
      ...initData?.location_attributes?.map((i) => {
        return {
          title: i.heading,
          dataIndex: i.heading,
          editable: true,
          type: i.type,
          options: i.options,
          required: i.required,
        }
      }),
    ]

    const mergedColumns = col.map((col) => {
      if (!col.editable) {
        return col
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.type,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
          options: col.options,
          required: col.required,
          editable: true,
        }),
      }
    })
    setColumn(mergedColumns)
  }
  const addAdditionalAttributes = () => {
    return selectedLocations?.map((i, index) => {
      let options = []
      initData.location_attributes.forEach((la) => {
        options[la.heading] = formData?.locationOptions?.filter(
          (o) => o.location_id === i && o.question_id === la.id
        )[0]?.answer
      })

      return {
        ...initData?.locations
          ?.filter((i) => !i.is_location_group)
          .filter((l) => l.id === i)[0],
        key: i,
        ...options,
      }
    })
  }

  useEffect(() => {
    let mergeData = []
    let RawLocationData = addAdditionalAttributes()

    if (RawLocationData) {
      RawLocationData.forEach((l) => {
        if (data.filter((d) => d.key === l.key).length) {
          mergeData.push(data.filter((d) => d.key === l.key)[0])
        } else {
          mergeData.push(l)
        }
      })

      setData(mergeData.filter((i) => i.id))
    }
  }, [selectedLocations])

  useEffect(() => {
    initData?.locations &&
      setBuffer((pre) => {
        return {
          ...pre,
          locations: dbToTree(
            initData?.locations?.filter((i) => !i.is_location_group)
          ),
        }
      })
    initData?.locations && mergeColumns()
  }, [initData, selectedLocations])

  useEffect(() => {
    //setData([]);
    let mergeData = []
    let RawLocationData = formData.locations?.map((i, index) => {
      let options = []
      initData.location_attributes.forEach((la) => {
        options[la.heading] = formData?.locationOptions?.filter(
          (o) => o.location_id === i && o.question_id === la.id
        )[0]?.answer
      })

      return {
        ...initData?.locations
          ?.filter((i) => !i.is_location_group)
          .filter((l) => l.id === i)[0],
        key: i,
        ...options,
      }
    })

    if (RawLocationData) {
      RawLocationData.forEach((l) => {
        if (data.filter((d) => d.key === l.key).length) {
          mergeData.push(data.filter((d) => d.key === l.key)[0])
        } else {
          mergeData.push(l)
        }
      })

      setData(attributeCheck(mergeData.filter((i) => i.id)))
    }
    setSelectedLocations(formData?.locations)
  }, [formData.locations])
  useEffect(() => {
    initData?.locations && mergeColumns()
  }, [editingKey])

  const attributeCheck = (d) => {
    return d?.map((location) => {
      let attributes = initData?.location_attributes
      let options = []
      attributes.forEach((a) => {
        options.push({
          question: a.id,
          option_id:
            a.type === "dropdown"
              ? a?.options?.filter(
                  (o) => o.option_label === location[a.heading]
                )[0]
              : null,
          answer: location[a.heading],
          required: a.required,
        })
      })
      return {
        ...location,
        parent_location: initData?.locations?.filter(
          (i) => i.id === d.parent_id
        )[0]?.label,
        options: options,
      }
    })
  }

  const SelectAll = () => {
    setSelectedLocations(initData?.locations?.map((i) => i.id))
  }
  const DeselectAll = () => {
    setSelectedLocations([])
  }
  useEffect(() => {
    handleQueryLocation(query)
  }, [query])
  const handleQueryLocation = (e) => {
    const buffer_locations = initData.locations
    let buffer = []
    buffer_locations &&
      buffer_locations.forEach((item) => {
        if (String(item.label).toLowerCase().includes(e.toLowerCase())) {
          buffer.push(item)
        }
      })
    setBuffer((pre) => {
      return {
        ...pre,
        locations: dbToTree(
          buffer.map((i) => {
            return { ...i, location_group_id: e ? null : i.location_group_id }
          })
        ),
      }
    })
  }

  const checkData = (data) => {
    let isReady = false
    let missingAttributedLocationCount = 0
    data
      .filter((i) => !i.parent_id)
      .filter((i) => !i.is_location_group)
      .map((i) => i.options)
      .forEach((optionSet) => {
        optionSet?.filter((o) => o?.required && !o.answer)?.length > 0 &&
          missingAttributedLocationCount++
      })
    if (data.filter((i) => i.options).length !== data.length) {
      //not edited at all

      notification.warning({
        message: "Please update locations required attributes",
      })
    } else if (missingAttributedLocationCount > 0) {
      notification.warning({
        message: `Please update all locations required attributes. Missing attributed location count:${missingAttributedLocationCount}`,
      })
    } else {
      isReady = true
    }
    return isReady
  }
  const FloorColumns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Floor",
      dataIndex: "floor",
    },

    {
      title: "Remove",
      dataIndex: "remove",
      render: (_, record) => {
        return (
          <Typography.Link
            onClick={() => {
              if (
                formData?.general?.status === "live" &&
                moment(formData?.general?.end_date).isBefore(moment())
              ) {
                notification.warning({ message: "Cannot remove" })
              } else {
                setSelectedLocations(
                  selectedLocations.filter((i) => i !== record.id)
                )
              }
            }}
          >
            Remove
          </Typography.Link>
        )
      },
    },
  ]

  return (
    <>
      <div
        className="drawer_sc-div create--sr"
        id="survey-_section"
        ref={drawerContainer}
      >
        <Drawer
          title="Location list"
          placement="right"
          width="30%"
          onClose={() => setLocations(false)}
          visible={visibleLocations}
          getContainer={() => drawerContainer.current}
        >
          <CustomTreeColumn
            type={"locations"}
            selectAll={SelectAll}
            deselectAll={DeselectAll}
            query={query}
            setQuery={setQuery}
            setSelected={setSelectedLocations}
            checkedKeys={selectedLocations}
            treeData={buffer}
            count={1}
            nonRemovable={
              formData?.general?.status === "live" &&
              moment(formData?.general?.end_date).isBefore(moment())
            }
          />
        </Drawer>{" "}
        <Drawer
          title="Tailored location questions"
          placement="right"
          width="50%"
          onClose={() => setTailoredDrawer(false)}
          visible={tailoredDrawer}
          getContainer={() => drawerContainer.current}
        >
          <div className="form-group">
            <label>Tailored location group question</label>
            <textarea
              style={{
                width: "100%",
                height: "100px",
                backgroundColor: "#303030",
                color: "white",
                fontSize: "20px",
              }}
              onChange={(e) => {
                setTailoredLocationGroupQuestion(e.target.value)
              }}
              value={tailoredLocationGroupQuestion}
            ></textarea>
          </div>{" "}
          {/* <div className="form-group">
            <label>Tailored location question</label>
            <textarea
              style={{ width: "100%", height: "100px", backgroundColor: "#303030", color: "white", fontSize: "20px" }}
              onChange={(e) => {
                setTailoredLocationQuestion(e.target.value);
              }}
              value={tailoredLocationQuestion}
            ></textarea>{" "}
          </div> */}
          <div className="form-group">
            <label>Tailored floor question</label>
            <textarea
              style={{
                width: "100%",
                height: "100px",
                backgroundColor: "#303030",
                color: "white",
                fontSize: "20px",
              }}
              onChange={(e) => {
                setTailoredFloorQuestion(e.target.value)
              }}
              value={tailoredFloorQuestion}
            ></textarea>{" "}
          </div>
          <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
            &nbsp;&nbsp;
            <button
              onClick={() => {
                sendTailoredQuestions()
              }}
              className="btn btn-sm btn-primary ml-2 float-l"
            >
              Save
            </button>
            &nbsp;&nbsp;
            <button
              onClick={() => {
                setTailoredDrawer(false)
              }}
              className="btn btn-sm btn-primary ml-2 float-l"
            >
              Close
            </button>
          </div>
        </Drawer>
      </div>
      <div className="col-lg-12 col-md-12 without-btn-table">
        <nav className="nav nav-tabs" role="tablist">
          <a
            href="#!"
            className={`custom_tab nav-item nav-link ${
              tab === "locations" && " active"
            }`}
            onClick={() => setTab("locations")}
          >
            Locations
          </a>
          <a
            href="#!"
            className={`custom_tab nav-item nav-link ${
              tab === "floors" && " active"
            }`}
            onClick={() => setTab("floors")}
          >
            Floors
          </a>
        </nav>
      </div>
      {tab === "locations" ? (
        <div className="aspect-tab ">
          <label htmlFor="item-3" className="aspect-label"></label>
          <div className="aspect-content">
            <div className="aspect-info">
              <div className="tab-_status green"></div>
              <span className="aspect-name">Locations</span>
            </div>
          </div>
          <div className="">
            <div className="sentiment-wrapper">
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                  <h6 className="mb-3">Location(s)</h6>
                  <button
                    onClick={() => setTailoredDrawer(true)}
                    className="btn btn-outline-default btn-sm"
                  >
                    Tailor location question(s)
                  </button>
                  <ImportExport
                    import={true}
                    export={true}
                    refresh={reset}
                    type="location_cascade_survey"
                    clientId={clientId}
                    data={formData.locations}
                    allData={initData?.locations}
                    customAttributes={initData?.location_attributes}
                    surveyId={surveyId}
                  />
                  <button
                    onClick={() => setLocations(true)}
                    className="btn btn-outline-default btn-sm"
                  >
                    Select location(s)
                  </button>{" "}
                  <button
                    onClick={() => {
                      let d = [
                        ...selectedLocations,
                        ...initData?.locations
                          ?.filter((i) => i.parent_id)
                          .map((i) => i.id),
                      ]
                      setSelectedLocations([...new Set(d)])
                    }}
                    className="btn btn-outline-default btn-sm ml-5"
                  >
                    Include all floors
                  </button>
                  <label className="fancy-checkbox ml-5">
                    <input
                      type="checkbox"
                      checked={formData?.general?.enable_other_location_group}
                      onChange={() => {
                        updateOtherLocationGroupOption()
                      }}
                    />
                    <span className="light-black">
                      <i></i>
                      Use 'Other' as location group
                    </span>
                  </label>
                  <label className="fancy-checkbox  ">
                    <input
                      type="checkbox"
                      checked={formData?.general?.enable_other_location}
                      onChange={() => {
                        updateOtherOption()
                      }}
                    />
                    <span className="light-black">
                      <i></i>
                      Use 'Other' as location
                    </span>
                  </label>
                  <label className="fancy-checkbox ml-5">
                    <input
                      type="checkbox"
                      checked={formData?.general?.enable_other_floor}
                      onChange={() => {
                        updateOtherFloorOption()
                      }}
                    />
                    <span className="light-black">
                      <i></i>
                      Use 'Other' as floor
                    </span>
                  </label>
                  <p className="mt-3">Selected location(s):</p>
                  <Form form={form} component={false}>
                    <Table
                      components={{
                        body: {
                          cell: CustomEditableCell,
                        },
                      }}
                      bordered
                      dataSource={data
                        ?.filter((i) => !i.parent_id)
                        .sort((a, b) => a.position - b.position)}
                      columns={column}
                      rowClassName="editable-row"
                      pagination={{
                        onChange: cancel,
                      }}
                    />
                  </Form>
                </div>

                <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                  &nbsp;&nbsp;
                  <button
                    onClick={() => {
                      checkData(data) && send("locations", attributeCheck(data))
                    }}
                    className="btn btn-sm btn-primary ml-2 float-l"
                  >
                    Save
                  </button>
                  &nbsp;&nbsp;
                  <button
                    onClick={() => {
                      close()
                    }}
                    className="btn btn-sm btn-primary ml-2 float-l"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="aspect-tab ">
            <label htmlFor="item-3" className="aspect-label"></label>
            <div className="aspect-content">
              <div className="aspect-info">
                <div className="tab-_status green"></div>
                <span className="aspect-name">Floors</span>
              </div>
            </div>
            <div className="">
              <div className="sentiment-wrapper">
                <div className="row clearfix">
                  {!(
                    formData?.general?.status === "live" &&
                    moment(formData?.general?.end_date).isBefore(moment())
                  ) && (
                    <div className="col-lg-12 col-md-12">
                      <button
                        onClick={() =>
                          setSelectedLocations(
                            selectedLocations.filter(
                              (i) =>
                                !initData?.locations
                                  ?.filter((o) => o.parent_id)
                                  .map((o) => o.id)
                                  .includes(i)
                            )
                          )
                        }
                        className="btn btn-outline-default btn-sm ml-5"
                      >
                        Remove all floors
                      </button>
                    </div>
                  )}

                  <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                    <Table
                      bordered
                      dataSource={selectedLocations
                        ?.map((i) => {
                          let floor = initData?.locations?.filter(
                            (o) => o.id === i
                          )[0]

                          if (floor?.parent_id) {
                            return {
                              id: i,
                              location: initData?.locations?.filter(
                                (o) => o.id === floor?.parent_id
                              )[0]?.label,
                              floor: floor?.label,
                              position: initData?.locations?.filter(
                                (o) => o.id === floor?.parent_id
                              )[0]?.position,
                            }
                          }
                        })
                        .filter((i) => i)
                        .sort((a, b) => a.position - b.position)}
                      columns={FloorColumns}
                    />
                    &nbsp;&nbsp;
                    <button
                      onClick={() => {
                        checkData(data) &&
                          send("locations", attributeCheck(data))
                      }}
                      className="btn btn-sm btn-primary ml-2 float-l"
                    >
                      Save
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={() => {
                        close()
                      }}
                      className="btn btn-sm btn-primary ml-2 float-l"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Locations
