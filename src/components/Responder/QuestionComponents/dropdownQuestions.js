import React from "react"
import { Select } from "antd"
const { Option } = Select
export default function DropdownQuestions({
  render,
  heading,
  trigger,
  handleSelections,
  id,
  getOptionsById,
  getSelectedById,
}) {
  return (
    render && (
      <div className="form-group form-box text-leftt">
        <label
          className={`info--_text`}
          htmlFor={heading.replace(/ /g, "\u00a0")}
        >
          <span className="info--sub-title">{heading}</span>
        </label>
        <div className="ant-_-select-container">
          <Select
            aria-label="Office selection; please double tap to open the list."
            getPopupContainer={(trigger) => trigger.parentElement}
            optionFilterProp="children"
            placeholder={heading}
            style={{ width: 300 }}
            onChange={(e) => {
              handleSelections(id, "single", e)
            }}
            value={getSelectedById(id)[0]}
            id={heading.replace(/ /g, "\u00a0")}
          >
            {getOptionsById(id).map((item) => {
              return (
                <Option
                  title={item.option_label}
                  aria-label={item.option_label}
                  tabIndex={0}
                  value={item.option_id}
                >
                  {item.option_label}
                </Option>
              )
            })}
          </Select>
        </div>
      </div>
    )
  )
}
