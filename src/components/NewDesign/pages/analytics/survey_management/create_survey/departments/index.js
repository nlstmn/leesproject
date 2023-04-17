import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table } from "antd"
import { arrayMoveImmutable } from "array-move"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from "react-sortable-hoc"
import {
  getOtherSurveySetupAction,
  getSurveySetupAction,
  surveySetupFormData,
} from "../../../../../../../actions/adminActions"
import DepartmentsTreeSurveys from "./departments_tree_survey"

const DragHandle = sortableHandle(({ active, i }) => {
  return (
    <span
      className={`iconx-dehaze grab__table_item ${active && " actived"}`}
    ></span>
  )
})

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const DepartmentSurveySettings = ({
  isDepartmentSurveyDrawer,
  setDepartmentSurveyDrawer,
}) => {
  const dispatch = useDispatch()
  const dataSelector = useSelector(
    (store) => store.getOtherSurveySetupData?.data
  )
  const formData = useSelector((store) => store.setSurveySetupFormData?.data)
  const surveyId = useSelector((store) => store?.saveSurveyId?.data)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
  const [selectedItems, setSelectedItems] = useState([])

  const getData = () => {
    dispatch(
      getOtherSurveySetupAction({
        clientId: clientId,
        tab: "departments",
        surveyId: surveyId,
      })
    )
  }

  useEffect(() => {
    getData()
  }, [])

  const updateFormdata = (data) => {
    dispatch(
      surveySetupFormData({
        ...formData,
        data: data,
      })
    )
  }

  const getColumns = () => {
    return [
      {
        title: "Sort",
        dataIndex: "position",
        width: 30,
        className: "drag-visible",
        render: (d, dd, i) => (
          <>
            <DragHandle active={selectedItems.includes(i)} id={dd} />
          </>
        ),
      },

      {
        title: "Selected departments",
        dataIndex: "label",
        key: "label",
        className: "drag-visible",
      },

      {
        title: "Action",
        key: "action",
        width: "130px",
        fixed: "right",
        className: "drag-hidden",
        render: (_, record) => {
          return (
            <div className="action_btns">
              <div className="fixed__btn">
                <button
                  className="icon__btn"
                  title="Delete department"
                  onClick={() => {
                    let tempData = [...formData?.data]
                    tempData = tempData.filter((d) => d.id !== record.id)
                    updateFormdata(tempData)
                  }}
                >
                  <span className="cxv-delete-l-icn clients_table_drop"></span>
                </button>

                {/* <Switch size="small" defaultChecked /> */}
              </div>
            </div>
          )
        },
      },
    ]
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    updateFormdata(
      arrayMove(
        formData?.data?.filter((i) => i),
        oldIndex,
        newIndex
      )
    )
  }

  const DraggableContainer = (props) => {
    return (
      <SortableContainer
        useDragHandle
        disableAutoscroll
        helperclassName="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
    )
  }

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index

    const id = restProps?.children[0]?.props?.record?.id
    const index_ = formData?.data?.find((i) => i.id === id)?.position || 0

    return (
      <SortableItem
        index={index_}
        {...restProps}
        selected={selectedItems.length}
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey) {
            selectedItems.includes(index_)
              ? selectedItems.splice(selectedItems.indexOf(index_), 1)
              : selectedItems.push(index_)
            setSelectedItems(selectedItems)
          } else {
            setSelectedItems([])
          }
        }}
      />
    )
  }

  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Selected departments</h3>
          <span className="card_desc">
            Total: <strong>{formData?.data?.length} departments</strong>
          </span>
          <div className="row">
            <div className="col-lg-12">
              <div className="n_table pr__10 center_labels first_not_center second_not_center respo">
                {/* TODO: WE'LL CHANGE THE TABLE COMPONENT TO TREE VIEW */}
                {/* <DepartmentsTreeSurveys /> */}
                {/* Commented that considerations of future updates */}
                <Table
                  columns={getColumns()}
                  dataSource={
                    formData?.data?.length > 0
                      ? formData?.data?.map((i) => ({
                          ...i,
                          key: i.id,
                        }))
                      : []
                  }
                  pagination={false}
                  rowKey="index"
                  components={{
                    body: {
                      wrapper: DraggableContainer,
                      row: DraggableBodyRow,
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DepartmentSurveySettings
