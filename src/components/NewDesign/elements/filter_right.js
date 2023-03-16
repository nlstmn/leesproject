import { Button, Drawer, Radio, Space } from "antd"
import React, { useState } from "react"

const RightFilter = ({ visibleDrawer, setVisibleDrawer }) => {
  const [isSelected, setSelected] = useState(0)
  const [isSubSelected, setSubSelected] = useState(0)
  const [isSelectOpen, setSelectOpen] = useState(false)
  const [isSubSelectedItem, setSubSelectedItem] = useState("")
  const setSelect = (event, index, arr) => {
    setSelected(index)
    if (arr < 1) {
      setSubSelectedItem("")
    }
  }
  const setSubSelect = (event, index) => {
    setSubSelected(index)
  }

  const drodown_items = [
    {
      id: 1,
      label: "Demographics",
      options: [],
    },
    {
      id: 2,
      label: "Work environment",
      options: [],
    },
    {
      id: 3,
      label: "Mobility profile",
      options: [],
    },
    {
      id: 4,
      label: "Office activities",
      options: [
        "Stacked chart",
        "Heat map",
        "Matrix",
        "Spider chart",
        "Dot plot",
        "Differences chart",
        "Table",
      ],
    },
    {
      id: 5,
      label: "Home activities",
      options: ["Home Option 01…", "Home Option 02…", "Home Option 03…"],
    },
    {
      id: 6,
      label: "Office features",
      options: ["Office Option 01…", "Office Option 02…", "Office Option 03…"],
    },
    {
      id: 7,
      label: "Home features",
      options: [
        "Features Option 01…",
        "Features Option 02…",
        "Features Option 03…",
      ],
    },
  ]

  return (
    <>
      <Drawer
        className="filter_drawer right_filter"
        title=""
        placement={"right"}
        onClose={() => setVisibleDrawer(false)}
        visible={visibleDrawer}
        extra={
          <Space>
            <Button onClick={() => setVisibleDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setVisibleDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setVisibleDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>
          <div className="main__side">
            <div className="left_side">
              <h3>Question type</h3>
              <ul>
                {drodown_items.map((item, i, arr) => (
                  <>
                    <li
                      className={`
                            ${
                              isSelected === i && item.options.length < 1
                                ? "active strong "
                                : " "
                            } 
                            ${
                              isSelected === i &&
                              item.options.length >= 1 &&
                              isSelectOpen
                                ? "opened"
                                : " "
                            } 
                            ${
                              isSubSelectedItem === item.id &&
                              item.options.length >= 1
                                ? "active strong"
                                : " "
                            } 
                            ${item.options.length >= 1 && " openable"} `}
                    >
                      <button
                        onClick={(e) => {
                          setSelect(e, i, item.options.length)
                          setSelectOpen(isSelected === i ? !isSelectOpen : true)
                        }}
                      >
                        {item.label}
                        {item.options.length >= 1 && (
                          <span className="cxv-expand-more-l-icn"></span>
                        )}
                      </button>

                      {item.options.length >= 1 && (
                        <div className="sub_list">
                          {item.options.map((option, i, arr) => (
                            <button
                              onClick={(e) => {
                                setSubSelect(e, i)
                                setSubSelectedItem(item.id)
                              }}
                              className={`${
                                isSubSelected === i &&
                                isSubSelectedItem === item.id
                                  ? " active"
                                  : ""
                              } `}
                            >
                              <div
                                className={`line_sub ${
                                  isSubSelected === i &&
                                  isSubSelectedItem === item.id
                                    ? " show"
                                    : ""
                                } `}
                              >
                                ―&nbsp;
                              </div>
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>
          <div className="bottom_side">
            <button className="btn-dash dark float-right tt">Apply</button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default RightFilter
