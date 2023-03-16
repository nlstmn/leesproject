import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"

const CrossTab = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  // Table Visibility Functions
  const [visibleKey, setVisibleKey] = useState("")
  const isVisible = (record) => record.key === visibleKey
  const visibleThat = (record) => {
    setVisibleKey(record.key)
  }
  // Table Visibility Functions

  const select_items_3 = [
    {
      id: 1,
      options: [
        "Contains",
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]

  //   Custom ANT Filter
  const [searchText, setSearchText] = useState("")
  const [searchedColumn, setSearchedColumn] = useState("")
  const searchInput = useRef(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText("")
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <>
        <h3>Show items with a value that:</h3>
        <Input
          ref={searchInput}
          placeholder={`Type...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        />
        {select_items_3.map((item, i, arr) => (
          <CustomSelect item={item} i={i} arr={arr} />
        ))}
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          >
            Filter
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)}>
            Clear
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </>
    ),
    filterIcon: (filtered) => (
      <i
        className="cxv-expand-more-l-icn"
        style={{
          color: filtered ? "#4793F8" : "#1E1E1E",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  })
  //   Custom ANT Filter

  const columns = [
    {
      title: <div className="null__title"></div>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <div className="dark__title sm">0-5</div>,
      dataIndex: "05",
      key: "05",
      width: 150,

      // temp - dummy results
      render: (text, name) => (
        <span
          className={`items_result 
                                  ${
                                    text === 70.0 ||
                                    text === 69.2 ||
                                    text === 64.3
                                      ? " green"
                                      : text === 62.5
                                      ? " red"
                                      : "blue"
                                  }
                                        `}
        >
          {text}
        </span>
      ),
    },
    {
      title: <div className="dark__title sm">6-10</div>,
      dataIndex: "610",
      key: "610",
      width: 150,
      render: (text, name) => (
        <span
          className={`items_result 
                                          ${
                                            text === 70.0 ||
                                            text === 69.2 ||
                                            text === 64.3
                                              ? " green"
                                              : text === 62.5
                                              ? " red"
                                              : "blue"
                                          }
                                          `}
        >
          {text}
        </span>
      ),
    },
    {
      title: <div className="dark__title sm">11-15</div>,
      dataIndex: "1115",
      key: "1115",
      width: 150,
      render: (text, name) => (
        <span
          className={`items_result 
                                          ${
                                            text === 70.0 ||
                                            text === 69.2 ||
                                            text === 64.3
                                              ? " green"
                                              : text === 62.5
                                              ? " red"
                                              : "blue"
                                          }
                                          `}
        >
          {text}
        </span>
      ),
    },
    {
      title: <div className="dark__title sm">16-21</div>,
      dataIndex: "1621",
      key: "1621",
      width: 150,
      render: (text, name) => (
        <span
          className={`items_result 
                                          ${
                                            text === 70.0 ||
                                            text === 69.2 ||
                                            text === 64.3
                                              ? " green"
                                              : text === 62.5
                                              ? " red"
                                              : "blue"
                                          }
                                          `}
        >
          {text}
        </span>
      ),
    },
    {
      title: <div className="dark__title">Overall</div>,
      dataIndex: "overall",
      key: "overall",
      width: 150,
      render: (text, name) => (
        <span
          className={`items_result 
                                          ${
                                            text === 70.0 ||
                                            text === 69.2 ||
                                            text === 64.3
                                              ? " green"
                                              : text === 62.5
                                              ? " red"
                                              : "blue"
                                          }
                                          `}
        >
          {text}
        </span>
      ),
    },
  ]

  const data = [
    {
      key: "AB001",
      name: "I perform most/all of my activities at a single work setting and rarely use other locations within the office",
      "05": 76.4,
      610: 74.4,
      1115: 79.9,
      1621: 70.0,
      overall: 75.1,
    },
    {
      key: "AB002",
      name: "I perform the majority of my activities at a single work setting but also use other locations within the office",
      "05": 70.3,
      610: 73.9,
      1115: 73.3,
      1621: 76.1,
      overall: 73.4,
    },
    {
      key: "AB003",
      name: "I perform some of my activities at a single work setting but often use other locations within the office",
      "05": 62.5,
      610: 75.9,
      1115: 69.2,
      1621: 70.7,
      overall: 70.3,
    },
    {
      key: "AB004",
      name: "I use multiple work settings and rarely base myself at a single location within the office",
      "05": 78.7,
      610: 71.4,
      1115: 64.3,
      1621: 70.2,
      overall: 71.9,
    },
    {
      key: "AB005",
      name: "Overall",
      "05": 73.8,
      610: 74.3,
      1115: 74.6,
      1621: 72.2,
      overall: 73.9,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <div className="n_table center_labels first_not_center not_action">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    </>
  )
}

export default CrossTab
