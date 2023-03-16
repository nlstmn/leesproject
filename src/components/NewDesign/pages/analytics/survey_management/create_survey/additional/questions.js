import React, { useEffect, useState } from "react"
import { Table } from "antd"
import { arrayMoveImmutable } from "array-move"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedQuestions } from "../../../../../../../actions/adminActions"

const data = [
  {
    key: "CAB001",
    question: "Job role",
    index: 0,
  },
  {
    key: "CAB002",
    question: "Department",
    index: 1,
  },
  {
    key: "CAB003",
    question: "Employment type",
    index: 2,
  },
]

const DragHandle = sortableHandle(({ active }) => (
  <span
    className={`iconx-dehaze grab__table_item ${active && " actived"}`}
  ></span>
))

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const AdditionalQuestionsTable = ({ pageId }) => {
  // REDUX HOOKS
  const dispatch = useDispatch()
  const pagesData = useSelector((store) => store.getSelectedQuestions)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  // REACT USESTATE, USEEFFECT
  const [dataSource, setDataSource] = useState(pagesData.data)
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    dispatch(getSelectedQuestions(clientId, surveyId, pageId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId])
  const getColumns = () => {
    return [
      {
        title: "Sort",
        dataIndex: "sort",
        width: 30,
        className: "drag-visible",
        render: () => <DragHandle />,
      },
      {
        title: "Select",
        dataIndex: "radio",
        width: 50,
        className: "drag-hidden",
        render: (_, record) => {
          return (
            <div className="action_btns">
              <div className="fixed__btn">
                <div className="n__form_control">
                  <label className="n__form_label dashboard_radio">
                    <input type="radio" name="questions" value="select" />
                    <span className="label-_text"></span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          )
        },
      },
      {
        title: "Selected questions",
        dataIndex: "question_label",
        key: "question_label",
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
      <Table
        columns={getColumns()}
        dataSource={pagesData.data}
        loading={pagesData.loading}
        pagination={false}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </>
  )
}

export default AdditionalQuestionsTable
