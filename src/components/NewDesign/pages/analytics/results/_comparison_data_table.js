import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"

const ComparisonDataTable = () => {
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
      children: [
        {
          title: "Super\ndriver",
          key: "superDriver",
          width: 60,
          render: (text) => (
            <span
              className={`${
                text ? "cxc-super-driver-new icon-table-status" : ""
              } `}
            ></span>
          ),
        },
        {
          title: "",
          dataIndex: "name",
          key: "name",
        },
      ],
    },
    {
      title: <div className="dark__title">Organisation X</div>,
      children: [
        {
          title: "Rank\n#",
          dataIndex: "rankOrganisation",
          key: "rankOrganisation",
          width: 100,
        },
        {
          title: "Importance",
          dataIndex: "importanceOrganisation",
          key: "importanceOrganisation",
          width: 100,
          render: (text) => <>{text}%</>,
          ...getColumnSearchProps("importanceOrganisation"),
        },
        {
          title: "Support\n%",
          dataIndex: "supportOrganisation",
          key: "supportOrganisation",
          width: 100,
          render: (text) => (
            <span
              className={`items_result 
                                              ${text < 33 ? " red" : ""} 
                                              ${
                                                text >= 33 && text < 66
                                                  ? " black"
                                                  : ""
                                              } 
                                              ${text >= 66 ? " green" : ""} 
                                              `}
            >
              {text}%
            </span>
          ),
        },
      ],
    },
    {
      title: <div className="muted__title">Leesman Benchmark</div>,
      children: [
        {
          title: "Rank\n#",
          dataIndex: "rankBenchmark",
          key: "rankBenchmark",
          width: 100,
        },
        {
          title: "Importance\n%",
          dataIndex: "importanceBenchmark",
          key: "importanceBenchmark",
          width: 100,
          render: (text) => <>{text}%</>,
        },
        {
          title: "Support\n%",
          dataIndex: "supportBenchmark",
          key: "supportBenchmark",
          width: 100,
          render: (text) => (
            <span
              className={`items_result 
                                              ${text < 33 ? " red" : ""} 
                                              ${
                                                text >= 33 && text < 66
                                                  ? " black"
                                                  : ""
                                              } 
                                              ${text >= 66 ? " green" : ""} 
                                              `}
            >
              {text}%
            </span>
          ),
        },
        {
          title: "Gap - Support\n%",
          dataIndex: "gapSupportBenchmark",
          key: "gapSupportBenchmark",
          width: 100,
          render: (text) => (
            <span
              className={`items_result 
                                              ${text < 33 ? " red" : ""} 
                                              ${
                                                text >= 33 && text < 66
                                                  ? " black"
                                                  : ""
                                              } 
                                              ${text >= 66 ? " green" : ""} 
                                              `}
            >
              {text}%
            </span>
          ),
        },
      ],
    },
    {
      title: <div className="blue__title">Leesman+</div>,
      children: [
        {
          title: "Support\n%",
          dataIndex: "supportLeesman",
          key: "supportLeesman",
          width: 100,
          render: (text) => (
            <span
              className={`items_result 
                                              ${text < 33 ? " red" : ""} 
                                              ${
                                                text >= 33 && text < 66
                                                  ? " black"
                                                  : ""
                                              } 
                                              ${text >= 66 ? " green" : ""} 
                                              `}
            >
              {text}
            </span>
          ),
        },
        {
          title: "Gap - Support\n%",
          dataIndex: "gapSupportLeesman",
          key: "gapSupportLeesman",
          width: 100,
          render: (text) => (
            <span
              className={`items_result 
                                              ${text < 33 ? " red" : ""} 
                                              ${
                                                text >= 33 && text < 66
                                                  ? " black"
                                                  : ""
                                              } 
                                              ${text >= 66 ? " green" : ""} 
                                              `}
            >
              {text}
            </span>
          ),
        },
      ],
    },
  ]

  const data = [
    {
      key: "AB001",
      superDriver: true,
      name: "Individual focused work, desk based",
      rankOrganisation: 1,
      importanceOrganisation: 91.8,
      supportOrganisation: 74.6,

      rankBenchmark: 1,
      importanceBenchmark: 91.3,
      supportBenchmark: 78.2,
      gapSupportBenchmark: -3.6,

      supportLeesman: 88.1,
      gapSupportLeesman: -13.5,
    },
    {
      key: "AB002",
      superDriver: true,
      name: "Planned meetings",
      rankOrganisation: 2,
      importanceOrganisation: 81.8,
      supportOrganisation: 86.6,

      rankBenchmark: 2,
      importanceBenchmark: 74.3,
      supportBenchmark: 81.2,
      gapSupportBenchmark: 5.6,

      supportLeesman: 89.1,
      gapSupportLeesman: -3.5,
    },
    {
      key: "AB003",
      superDriver: false,
      name: "Collaborating on focused work",
      rankOrganisation: 3,
      importanceOrganisation: 68.8,
      supportOrganisation: 82.6,

      rankBenchmark: 5,
      importanceBenchmark: 56.3,
      supportBenchmark: 75.2,
      gapSupportBenchmark: 7.6,

      supportLeesman: 89.1,
      gapSupportLeesman: -6.5,
    },
    {
      key: "AB004",
      superDriver: false,
      name: "Telephone conversations",
      rankOrganisation: 5,
      importanceOrganisation: 33.8,
      supportOrganisation: 46.6,

      rankBenchmark: 3,
      importanceBenchmark: 43.3,
      supportBenchmark: 75.2,
      gapSupportBenchmark: 7.6,

      supportLeesman: 93.1,
      gapSupportLeesman: -6.5,
    },
    {
      key: "AB005",
      superDriver: true,
      name: "Audio conferences",
      rankOrganisation: 6,
      importanceOrganisation: 33.8,
      supportOrganisation: 46.6,

      rankBenchmark: 3,
      importanceBenchmark: 43.3,
      supportBenchmark: 75.2,
      gapSupportBenchmark: 7.6,

      supportLeesman: 93.1,
      gapSupportLeesman: -6.5,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <h2 className="table_question_title">
          Q — Thinking about the work that you do, which of the following
          activities are important and how well are they supported?
        </h2>
        <div className="n_table  center_labels second_not_center has__filter has__pre has__multiheader">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    </>
  )
}

export default ComparisonDataTable
