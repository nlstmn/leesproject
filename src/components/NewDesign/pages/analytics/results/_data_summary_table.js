import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"

const DataSummary = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

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
      title: <div className="dark__title">Dataset X</div>,
      dataIndex: "dataSet",
      key: "dataSet",

      // temp - dummy results
      render: (text, name) => (
        <span
          className={`items_result 
                                          ${
                                            name.name ===
                                              "Lmi experience score" &&
                                            text === 66.2
                                              ? " green"
                                              : ""
                                          }
                                          ${
                                            name.name ===
                                              "Lmi experience score" &&
                                            text === 64.1
                                              ? " green"
                                              : ""
                                          }
                                          ${
                                            name.name ===
                                              "Lmi experience score" &&
                                            text === 74.7
                                              ? " blue"
                                              : ""
                                          }
                                          ${
                                            name.name ===
                                              "H-Lmi experience score" &&
                                            text === 71.6
                                              ? " red"
                                              : ""
                                          }
                                          `}
        >
          {text === null ? "-" : text}
          {name.name === "Response rate" && text !== null ? "%" : ""}
        </span>
      ),
    },
    {
      title: (
        <div className="dark__title">Leesman Office Benchmark (Q1 2022)</div>
      ),
      dataIndex: "leesmanBenchmark",
      key: "leesmanBenchmark",
      render: (text, name) => (
        <span
          className={`items_result 
                                          ${
                                            name.name ===
                                              "Lmi experience score" &&
                                            text === 66.2
                                              ? " green"
                                              : ""
                                          }
                                          ${
                                            name.name ===
                                              "Lmi experience score" &&
                                            text === 64.1
                                              ? " green"
                                              : ""
                                          }
                                          ${
                                            name.name ===
                                              "Lmi experience score" &&
                                            text === 74.7
                                              ? " blue"
                                              : ""
                                          }
                                          ${
                                            name.name ===
                                              "H-Lmi experience score" &&
                                            text === 71.6
                                              ? " red"
                                              : ""
                                          }
                                          `}
        >
          {text === null ? "-" : text}
          {name.name === "Response rate" && text !== null ? "%" : ""}
        </span>
      ),
    },
    {
      title: <div className="blue__title">Leesman+ (Q1 2022)</div>,
      dataIndex: "leesmanPlus",
      key: "leesmanPlus",
      render: (text, name) => (
        <span
          className={`items_result 
                                          ${
                                            name.name ===
                                              "Lmi experience score" &&
                                            text === 66.2
                                              ? " green"
                                              : ""
                                          }
                                          ${
                                            name.name ===
                                              "Lmi experience score" &&
                                            text === 64.1
                                              ? " green"
                                              : ""
                                          }
                                          ${
                                            name.name ===
                                              "Lmi experience score" &&
                                            text === 74.7
                                              ? " blue"
                                              : ""
                                          }
                                          ${
                                            name.name ===
                                              "H-Lmi experience score" &&
                                            text === 71.6
                                              ? " red"
                                              : ""
                                          }
                                          `}
        >
          {text === null ? "-" : text}
          {name.name === "Response rate" && text !== null ? "%" : ""}
        </span>
      ),
    },
  ]

  const data = [
    {
      key: "AB001",
      name: "Number of buildings",
      dataSet: 5,
      leesmanBenchmark: 5.764,
      leesmanPlus: 142,
    },
    {
      key: "AB002",
      name: "Date range",
      dataSet: "01.05.2022 – 10.05.2022",
      leesmanBenchmark: "31.05.2010 – 31.03.2022",
      leesmanPlus: "31.05.2010 – 31.03.2022",
    },
    {
      key: "AB003",
      name: "Number of responses / invitees",
      dataSet: "2,147 / 3,266",
      leesmanBenchmark: "860,476",
      leesmanPlus: "53,730",
    },
    {
      key: "AB004",
      name: "Response rate",
      dataSet: 66,
      leesmanBenchmark: 57,
      leesmanPlus: null,
    },
    {
      key: "AB005",
      name: "Margin of error at 99% confidence",
      dataSet: "+/– 1.6%",
      leesmanBenchmark: null,
      leesmanPlus: null,
    },
    {
      key: "AB007",
      name: "Lmi experience score",
      dataSet: 66.2,
      leesmanBenchmark: 64.1,
      leesmanPlus: 74.7,
    },
    {
      key: "AB006",
      name: "H-Lmi experience score",
      dataSet: 71.6,
      leesmanBenchmark: null,
      leesmanPlus: null,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <div className="n_table   center_labels first_not_center not_action">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    </>
  )
}

export default DataSummary
