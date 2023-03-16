import React, { useState } from "react"
import { render } from "react-dom"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from "react-sortable-hoc"

const SortableItem = sortableElement(({ value }) => (
  <li className="sort_item_version2">
    <span className="sortable-thumb-2">
      <span className="iconx-dots-three-vertical"></span>
      <span className="iconx-dots-three-vertical r-_icon"></span>
    </span>
    <label>{value}</label>
  </li>
))

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>
})

const SortableSelect = () => {
  const [items, setItems] = useState([
    "Quis autem vel eum iure reprehenderit qui",
    "Nisi aliquid ex commodi consequatur",
    "At vero eos et accusamus et iusto odio dignissimos",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor",
  ])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <>
      <div className="question_div" id="scroll__that">
        {/* Question Title */}
        <h3 className="main_question">
          Q ― Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua?
          <br />
          <br />
          Please drag and drop to rank options.
        </h3>

        {/* Answers */}
        <div className="form-group sort_items right-_bordered">
          <SortableContainer
            onSortEnd={onSortEnd}
            helperclassName="sortableHelper_version2"
            axis={"y"}
          >
            {items.map((value, index) => (
              <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
          </SortableContainer>
        </div>
      </div>
    </>
  )
}

export default SortableSelect
