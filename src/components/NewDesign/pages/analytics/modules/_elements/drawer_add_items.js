import { Button, Drawer, Tree, Space } from "antd"
import React, { useState } from "react"

const DrawerAddItems = ({ isDrawerAddItems, setDrawerAddItems, title }) => {
  const [expandedKeys, setExpandedKeys] = useState(["Item 0-0-0", "Item 0-0-1"])
  const [checkedKeys, setCheckedKeys] = useState(["Item 0-0-0"])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

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

  const treeData = [
    {
      title: "Item 0-0",
      key: "Item 0-0",
    },
    {
      title: "Item 0-1",
      key: "Item 0-1",
    },
    {
      title: "Item 0-2",
      key: "Item 0-2",
    },
    {
      title: "Item 0-3",
      key: "Item 0-3",
    },
    {
      title: "Item 0-4",
      key: "Item 0-4",
    },
    {
      title: "Item 0-5",
      key: "Item 0-5",
    },
  ]

  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setDrawerAddItems(false)}
        visible={isDrawerAddItems}
        extra={
          <Space>
            <Button onClick={() => setDrawerAddItems(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setDrawerAddItems(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setDrawerAddItems(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <h5 className="d_sub_title">All items</h5>
            </div>
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n_input_control has_icon in_drawer_small">
                <span className="cxv-search-l-icn icn"></span>
                <input
                  placeholder="Search..."
                  type="text"
                  className="n_input"
                  id="find-box"
                ></input>
              </div>
            </div>

            <div className="col-lg-12">
              <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
              />
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setDrawerAddItems(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setDrawerAddItems(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerAddItems
