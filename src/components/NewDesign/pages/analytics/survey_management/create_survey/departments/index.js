import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table } from "antd"
import { arrayMoveImmutable } from "array-move"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc"
import {
  getOtherSurveySetupAction,
  getSurveySetupAction,
} from "../../../../../../../actions/adminActions"
import DepartmentsTreeSurveys from "./departments_tree_survey"

const DragHandle = sortableHandle(({ active }) => (
  <span
    className={`iconx-dehaze grab__table_item ${active && " actived"}`}
  ></span>
))

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
  const surveyId = useSelector((store) => store?.saveSurveyId?.data)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
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

  const [dataSource, setDataSource] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  const getColumns = () => {
    return [
      {
        title: "Sort",
        dataIndex: "sort",
        width: 30,
        className: "drag-visible",
        render: (d, dd, i) => (
          <>
            <DragHandle active={selectedItems.includes(i)} />
          </>
        ),
      },
      // {
      //   title: '##',
      //   dataIndex: 'key',
      //   key: 'key',
      //   width:"90px"
      // },
      {
        title: "Selected departments",
        dataIndex: "name",
        key: "name",
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
                <button className="icon__btn" title="Delete user">
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

  const merge = (a, b, i = 0) => {
    let aa = [...a]
    return [...a.slice(0, i), ...b, ...aa.slice(i, aa.length)]
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let tempDataSource = dataSource

    if (oldIndex !== newIndex) {
      if (!selectedItems.length) {
        let movingItem = tempDataSource[oldIndex]
        tempDataSource.splice(oldIndex, 1)
        tempDataSource = merge(tempDataSource, [movingItem], newIndex)
      } else {
        let filteredItems = []
        selectedItems.forEach((d) => {
          filteredItems.push(tempDataSource[d])
        })
        let newData = []
        tempDataSource.forEach((d, i) => {
          if (!selectedItems.includes(i)) {
            newData.push(d)
          }
        })
        tempDataSource = [...newData]
        tempDataSource = merge(tempDataSource, filteredItems, newIndex)
      }
      setDataSource(tempDataSource)
      setSelectedItems([])
    }
  }

  const DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperclassName="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  )

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps["data-row-key"]
    )
    return (
      <SortableItem
        index={index}
        {...restProps}
        selected={selectedItems.length}
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey) {
            selectedItems.includes(index)
              ? selectedItems.splice(selectedItems.indexOf(index), 1)
              : selectedItems.push(index)
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
            Total: <strong>{dataSelector?.length} departments</strong>
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
                    dataSelector?.length > 0
                      ? dataSelector?.map((i) => ({ ...i, key: i.id }))
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
