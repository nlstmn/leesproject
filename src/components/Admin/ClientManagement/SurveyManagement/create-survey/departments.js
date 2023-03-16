import React, { useState, useRef, useEffect } from "react"
import { Drawer, Form, Typography, Popconfirm, Table } from "antd"
import {
  TreeColumn,
  EditableCell,
} from "../../../../common/commonComponents/formItems"
import { dbToTree } from "../../../../../util/functions"
import { notification } from "../../../../../../node_modules/antd/lib/index"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from "react-sortable-hoc"
import axios from "axios"
import moment from "moment"
const Departments = ({
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
  const [visibleDepartments, setDepartments] = useState(false)
  const [selectedDepartments, setSelectedDepartments] = useState([])

  const [data, setData] = useState([])

  const [buffer, setBuffer] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    initData?.departments &&
      setBuffer((pre) => {
        return {
          ...pre,
          departments: dbToTree(initData?.departments),
        }
      })
  }, [initData])

  useEffect(() => {
    setData(
      formData?.departments?.map((i, index) => {
        return {
          ...initData?.departments?.filter((l) => l.id === i)[0],
          key: index,
        }
      })
    )
  }, [formData])

  const SelectAll = (type) => {
    setFormData((pre) => {
      return { ...pre, [type]: initData?.departments?.map((i) => i.id) }
    })
  }
  const DeselectAll = (type) => {
    setFormData((pre) => {
      return { ...pre, [type]: [] }
    })
  }
  useEffect(() => {
    handleQueryDepartment(query)
  }, [query])
  const handleQueryDepartment = (e) => {
    const buffer_departments = initData.departments
    let buffer = []
    buffer_departments &&
      buffer_departments.forEach((item) => {
        if (String(item.label).toLowerCase().includes(e.toLowerCase())) {
          buffer.push(item)
        }
      })
    setBuffer((pre) => {
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
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      editable: false,
    },
    {
      title: "Label",
      dataIndex: "label",
      editable: false,
    },
  ]
  const updateOtherOption = () => {
    axios
      .put(`/admin/clients/${clientId}/surveys/${surveyId}`, {
        data: [formData?.general?.enable_other_department],
        type: "toggle_other_department_enabled",
      })
      .then((res) => {
        reset()
        notification.success({ message: "State updated" })
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="ul-_sort-items">{children}</ul>
  })
  const DragHandle = sortableHandle(() => (
    <span className="sortable-thumb">
      <span className="iconx-dots-three-vertical"></span>
      <span className="iconx-dots-three-vertical r-_icon"></span>
    </span>
  ))
  const SortableItemDepartments = sortableElement(
    ({ value, id, key, sortable }) => (
      <li className="sort_item dark sections">
        {sortable &&
          !(
            formData?.general?.status === "live" &&
            moment(formData?.general?.end_date).isBefore(moment())
          ) && (
            <span
              onClick={() => {
                console.log(value, id, key)
                setFormData((pre) => {
                  return {
                    ...pre,
                    departments: formData?.departments?.filter((i) => i !== id),
                  }
                })
              }}
              className="delete iconx-trash-2"
            ></span>
          )}
        {sortable && <DragHandle />}
        {value}
      </li>
    )
  )
  const onDepartmentSortEnd = ({ oldIndex, newIndex }) => {
    let departmentSet = formData?.departments
    //console.log(departmentSet);
    departmentSet = arrayMove(departmentSet, oldIndex, newIndex)

    setFormData((pre) => {
      return { ...pre, departments: departmentSet }
    })
  }
  return (
    <>
      <div
        className="drawer_sc-div create--sr"
        id="survey-_section"
        ref={drawerContainer}
      >
        <Drawer
          title="Department list"
          placement="right"
          width="30%"
          onClose={() => setDepartments(false)}
          visible={visibleDepartments}
          getContainer={() => drawerContainer.current}
        >
          <TreeColumn
            type={"departments"}
            selectAll={SelectAll}
            deselectAll={DeselectAll}
            query={query}
            setQuery={setQuery}
            setSelected={setFormData}
            checkedKeys={formData}
            treeData={buffer}
            count={1}
            nonRemovable={
              formData?.general?.status === "live" &&
              moment(formData?.general?.end_date).isBefore(moment())
            }
          />
        </Drawer>
      </div>
      <div className="aspect-tab ">
        <label htmlFor="item-3" className="aspect-label"></label>
        <div className="aspect-content">
          <div className="aspect-info">
            <div className="tab-_status green"></div>
            <span className="aspect-name">Departments</span>
          </div>
        </div>
        <div className="">
          <div className="sentiment-wrapper">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                <h6 className="mb-3">Department(s)</h6>

                <button
                  onClick={() => setDepartments(true)}
                  className="btn btn-outline-default btn-sm"
                >
                  Select department(s)
                </button>
                <label className="fancy-checkbox ml-5">
                  <input
                    type="checkbox"
                    checked={formData?.general?.enable_other_department}
                    onChange={() => {
                      updateOtherOption()
                    }}
                  />
                  <span className="light-black">
                    <i></i>
                    Use 'Other' as department
                  </span>
                </label>
                <p className="mt-3">Selected department(s):</p>

                {/* <Table bordered dataSource={data} columns={columns} rowClassName="editable-row" /> */}
                <SortableContainer
                  onSortEnd={(...props) => onDepartmentSortEnd(...props)}
                  useDragHandle
                  helperclassName="sortableHelper"
                >
                  {formData?.departments?.map((department, index) => {
                    return (
                      <SortableItemDepartments
                        key={department}
                        index={index}
                        value={
                          initData?.departments?.filter(
                            (i) => i.id === department
                          )[0]?.label
                        }
                        id={department}
                        sortable={true}
                      />
                    )
                  })}
                </SortableContainer>
              </div>

              <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    send("departments", data)
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
  )
}

export default Departments
