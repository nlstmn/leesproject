import React, { useState } from "react"
import { Switch } from "antd"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from "react-sortable-hoc"

const DemographicsCard = ({
  title,
  enabled,
  items,
  drag,
  setDemographicsQuestionsDrawer,
  setDeleteModal,
}) => {
  let sortedItems = items.options.sort((a, b) => {
    return a.position - b.position
  })

  const [isItems, setItems] = useState(sortedItems)

  const DragHandle = sortableHandle(({ active }) => (
    <span
      className={`iconx-dehaze grab__table_item ${active && " actived"}`}
    ></span>
  ))

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(isItems, oldIndex, newIndex))
  }

  const SortableItem = sortableElement(({ item }) => (
    <div className="drag_item">
      <li>
        <div className="n__form_control">
          <label className="n__form_label dashboard_check">
            <input
              type="checkbox"
              name={item["option_label"]}
              value={item["option_label"]}
            />
            <span className="label-_text">{item["option_label"]}</span>
            <span className="checkmark"></span>
          </label>
        </div>
      </li>
      <DragHandle />
    </div>
  ))

  const SortableList = sortableContainer(({ items }) => (
    <div className="items_sortable">
      {items !== undefined &&
        items.map((item, index) => (
          <SortableItem key={`${item.id}`} index={index} item={item} />
        ))}
    </div>
  ))

  return (
    <>
      <div className="col-lg-4 col-md-12">
        <div className="card_block">
          {drag && drag}
          <span
            onClick={() => setDemographicsQuestionsDrawer(true)}
            className="iconx-pencil cursorp edit_card"
          ></span>
          <span
            onClick={() => setDeleteModal(true)}
            className="iconx-trash-2 cursorp delete_card"
          ></span>
          <div className="info">
            <Switch size="small" defaultChecked={enabled} />
            <h4 className="sub_title">{title}</h4>
          </div>

          <div className="items">
            <ul>
              <SortableList
                useDragHandle
                items={isItems}
                onSortEnd={onSortEnd}
                axis="y"
                lockAxis="y"
                helperClass="itemb_sorting"
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default DemographicsCard
