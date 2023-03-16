import { Button, Drawer, Tree, Space } from "antd"
import React, { useState } from "react"

const DrawerLocationGroup = ({
  isLocationGroupDrawer,
  setLocationGroupDrawer,
  title,
}) => {
  const [expandedKeys, setExpandedKeys] = useState([
    "Location 0-0-0",
    "Location 0-0-1",
  ])
  const [checkedKeys, setCheckedKeys] = useState(["Location 0-0-0"])
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
      title: "Location 0-0",
      key: "Location 0-0",
      children: [
        {
          title: "Location 0-0-0",
          key: "Location 0-0-0",
          children: [
            {
              title: "Location 0-0-0-0",
              key: "Location 0-0-0-0",
            },
            {
              title: "Location 0-0-0-1",
              key: "Location 0-0-0-1",
            },
            {
              title: "Location 0-0-0-2",
              key: "Location 0-0-0-2",
            },
          ],
        },
        {
          title: "Location 0-0-1",
          key: "Location 0-0-1",
          children: [
            {
              title: "Location 0-0-1-0",
              key: "Location 0-0-1-0",
            },
            {
              title: "Location 0-0-1-1",
              key: "Location 0-0-1-1",
            },
            {
              title: "Location 0-0-1-2",
              key: "Location 0-0-1-2",
            },
          ],
        },
        {
          title: "Location 0-0-2",
          key: "Location 0-0-2",
        },
      ],
    },
    {
      title: "Location 0-1",
      key: "Location 0-1",
      children: [
        {
          title: "Location 0-1-0-0",
          key: "Location 0-1-0-0",
        },
        {
          title: "Location 0-1-0-1",
          key: "Location 0-1-0-1",
        },
        {
          title: "Location 0-1-0-2",
          key: "Location 0-1-0-2",
        },
      ],
    },
    {
      title: "Location 0-2",
      key: "Location 0-2",
    },
  ]

  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setLocationGroupDrawer(false)}
        visible={isLocationGroupDrawer}
        extra={
          <Space>
            <Button onClick={() => setLocationGroupDrawer(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => setLocationGroupDrawer(false)}
            >
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setLocationGroupDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <h5 className="d_sub_title">Selected locations</h5>
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
            onClick={() => setLocationGroupDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setLocationGroupDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerLocationGroup
