import React, { useState, useEffect, useRef } from "react"
import { Tree } from "antd"

const CascadingMenuCheckbox = ({
  data,
  setTopSelectFlag,
  isTopSelectFlag,
  label,
  id,
}) => {
  const dataList = []
  const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const { key } = node
      dataList.push({ key, title: key })
      if (node.children) {
        generateList(node.children)
      }
    }
  }
  generateList(data)

  const getParentKey = (key, tree) => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }

  // Top Select Functions
  const [isTopSelect, setTopSelect] = useState(false)
  // Top Select Functions

  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"])
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  // Refresh Animation
  const [isRefreshing, setRefreshing] = useState(false)
  const startRefreshing = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1800)
  }
  // Refresh Animation

  const [searchValue, setSearchValue] = useState("")

  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue) // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue)
    setCheckedKeys(checkedKeysValue)
  }

  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info)
    setSelectedKeys(selectedKeysValue)
  }

  const onChange = (e) => {
    const { value } = e.target
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, data)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    if (value) {
      setExpandedKeys(expandedKeys)
      setSearchValue(value)
      setAutoExpandParent(true)
    } else {
      setExpandedKeys([])
      setSearchValue("")
      setAutoExpandParent(false)
    }
  }

  const filterTreeNode = (node) => {
    const title = node.title.props.children[2]
    const result = title.indexOf(searchValue) !== -1 ? true : false
    console.log(searchValue)
    console.log(result)
    return result
  }

  const loop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(searchValue)
      const beforeStr = item.title.substr(0, index)
      const afterStr = item.title.substr(index + searchValue.length)
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        )
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) }
      }

      return {
        title,
        key: item.key,
      }
    })

  return (
    <>
      {isTopSelect && isTopSelectFlag === id ? (
        <div
          onClick={() => setTopSelect(false)}
          className="n_modal_bg trans"
        ></div>
      ) : (
        <></>
      )}

      <div
        className={`drop_dash_container ${
          isTopSelect && isTopSelectFlag === id ? " show" : ""
        } `}
        key={id}
      >
        <button
          className="btn-dash drop has-icn cascading_select_item"
          onClick={() => {
            setTopSelect(isTopSelectFlag === id ? !isTopSelect : true)
            setTopSelectFlag(id)
          }}
        >
          {label}
          <span className="cxv-expand-more-l-icn"></span>
        </button>
        <div className="drop_dash-menu">
          <div className="drop_dash-search">
            <span className="cxv-search-l-icn icn"></span>
            <input onChange={onChange} type="text" placeholder="Search" />
          </div>
          <Tree
            showSearch
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={loop(data)}
            switcherIcon={<i className="cxv-expand-less-l-icn"></i>}
          />

          <button
            onClick={startRefreshing}
            className={`btn-dash drop has-icn left-icn bb float-left refresh ${
              isRefreshing ? " refreshing" : " "
            } `}
          >
            <span className="cxc-reset-all"></span>
            Reset all
          </button>
          <button
            className="btn-dash dark float-right"
            onClick={() => setTopSelect(false)}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  )
}

export default CascadingMenuCheckbox
