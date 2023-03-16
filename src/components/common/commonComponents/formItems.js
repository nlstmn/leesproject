import React from "react"
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  notification,
  Tree,
  Select,
} from "antd"
import { onlyIntArray } from "../../../util/functions"
const { Option } = Select
export const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
export const CustomEditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  options,
  required,
  ...restProps
}) => {
  const inputNode =
    inputType === "open_text" ? (
      <InputNumber min={0} />
    ) : (
      <Select>
        {options?.map((o) => {
          return <Option value={o?.option_label}>{o?.option_label}</Option>
        })}
      </Select>
    )
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: required,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
export const TreeColumn = ({
  type,
  selectAll,
  deselectAll,
  query,
  setQuery,
  setSelected,
  checkedKeys,
  treeData,
  count,
  nonRemovable,
}) => {
  return (
    <div className={`filters-_column-${count} mr-3`}>
      <h6>{type.capitalize()}</h6>
      <button
        type="button"
        onClick={() => {
          selectAll(type)
        }}
        className="ant-btn ant-btn-link ant-btn-sm pd--zero"
      >
        <span className="text-white">Select all</span>
      </button>
      {!nonRemovable && (
        <button
          type="button"
          onClick={() => {
            deselectAll(type)
          }}
          className="ant-btn ant-btn-link ant-btn-sm ml-5 pd--zero"
        >
          <span className="text-white">Deselect</span>
        </button>
      )}
      <hr />
      <input
        type="text"
        className="form-control mb-4 w-50"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        placeholder="Search.."
      ></input>
      <Tree
        checkable
        onCheck={(keys, info) => {
          if (nonRemovable) {
            if (checkedKeys[type].length < keys.length) {
              setSelected((pre) => {
                return { ...pre, [type]: onlyIntArray(keys) }
              })
            } else {
              notification.warning({ message: "Cannot remove" })
            }
          } else {
            setSelected((pre) => {
              return { ...pre, [type]: onlyIntArray(keys) }
            })
          }
        }}
        checkedKeys={checkedKeys[type]}
        treeData={treeData[type]}
      />
    </div>
  )
}
export const CustomTreeColumn = ({
  type,
  selectAll,
  deselectAll,
  query,
  setQuery,
  setSelected,
  checkedKeys,
  treeData,
  count,
  nonRemovable,
}) => {
  return (
    <div className={`filters-_column-${count} mr-3`}>
      <h6>{type.capitalize()}</h6>
      <button
        type="button"
        onClick={() => {
          selectAll(type)
        }}
        className="ant-btn ant-btn-link ant-btn-sm pd--zero"
      >
        <span className="text-white">Select all</span>
      </button>
      {!nonRemovable && (
        <button
          type="button"
          onClick={() => {
            deselectAll(type)
          }}
          className="ant-btn ant-btn-link ant-btn-sm ml-5 pd--zero"
        >
          <span className="text-white">Deselect</span>
        </button>
      )}
      <hr />
      <input
        type="text"
        className="form-control mb-4 w-50"
        style={{ color: "white" }}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        placeholder="Search.."
      ></input>
      <Tree
        checkable
        onCheck={(keys, info) => {
          if (nonRemovable) {
            if (checkedKeys.length < keys.length) {
              setSelected(onlyIntArray(keys))
            } else {
              notification.warning({ message: "Cannot remove" })
            }
          } else {
            setSelected(onlyIntArray(keys))
          }
        }}
        checkedKeys={checkedKeys}
        treeData={treeData[type]}
      />
    </div>
  )
}

export const commonAuthItem = (change, formData, type, send, placeholder) => {
  return (
    <input
      onChange={change}
      id={"input-" + type}
      value={formData[type]}
      type={type}
      className="n_input"
      name={type}
      placeholder={placeholder || type.capitalize()}
      required="required"
      onKeyPress={(e) => {
        e.key === "Enter" && send(e)
      }}
    />
  )
}
