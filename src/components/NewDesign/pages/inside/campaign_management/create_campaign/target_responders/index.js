import React, { useState } from "react"
import { Tree } from "antd"

const TargetSettings = () => {
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
      children: [
        {
          title: "Item 0-0-0",
          key: "Item 0-0-0",
          children: [
            {
              title: "Item 0-0-0-0",
              key: "Item 0-0-0-0",
            },
            {
              title: "Item 0-0-0-1",
              key: "Item 0-0-0-1",
            },
            {
              title: "Item 0-0-0-2",
              key: "Item 0-0-0-2",
            },
          ],
        },
        {
          title: "Item 0-0-1",
          key: "Item 0-0-1",
          children: [
            {
              title: "Item 0-0-1-0",
              key: "Item 0-0-1-0",
            },
            {
              title: "Item 0-0-1-1",
              key: "Item 0-0-1-1",
            },
            {
              title: "Item 0-0-1-2",
              key: "Item 0-0-1-2",
            },
          ],
        },
        {
          title: "Item 0-0-2",
          key: "Item 0-0-2",
        },
      ],
    },
    {
      title: "Item 0-1",
      key: "Item 0-1",
      children: [
        {
          title: "Item 0-1-0-0",
          key: "Item 0-1-0-0",
        },
        {
          title: "Item 0-1-0-1",
          key: "Item 0-1-0-1",
        },
        {
          title: "Item 0-1-0-2",
          key: "Item 0-1-0-2",
        },
      ],
    },
    {
      title: "Item 0-2",
      key: "Item 0-2",
    },
  ]

  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Target responders</h3>
          <div className="row">
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <h5 className="d_sub_title">Locations</h5>
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

            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <h5 className="d_sub_title">Departments</h5>
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

            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <h5 className="d_sub_title">Regions</h5>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default TargetSettings
