import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import HeatMapBlueDark from "../../../charts/heatmap_bluedark"

const HeatmapTableBlueDark = () => {
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
      dataIndex: "superDriver",
      key: "superDriver",
      width: 50,
      className: "classNameOfBold",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index % 8 === 0) {
          obj.props.rowSpan = 8
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      },
    },
    {
      title: <div className="null__title"></div>,
      dataIndex: "nullSection",
      key: "nullSection",
      className: "classNameOfBold",
      width: "300px",
    },
    {
      title: (
        <div className="dark__title">
          Accounting
          <br />
          and Finance
        </div>
      ),
      dataIndex: "accounting",
      key: "accounting",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: (
        <div className="dark__title">
          Group
          <br />
          Strategy
        </div>
      ),
      dataIndex: "strategy",
      key: "strategy",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: (
        <div className="dark__title">
          Human
          <br />
          Resources
        </div>
      ),
      dataIndex: "resources",
      key: "resources",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: (
        <div className="dark__title">
          Information
          <br />
          Technology
        </div>
      ),
      dataIndex: "technology",
      key: "technology",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">Marketing</div>,
      dataIndex: "marketing",
      key: "marketing",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">Operation</div>,
      dataIndex: "operation",
      key: "operation",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">Purchasing</div>,
      dataIndex: "purchasing",
      key: "purchasing",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: (
        <div className="dark__title">
          Research and
          <br />
          Development
        </div>
      ),
      dataIndex: "development",
      key: "development",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">Sales</div>,
      dataIndex: "sales",
      key: "sales",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: (
        <div className="muted__title">
          Office
          <br />
          Benchmark
        </div>
      ),
      dataIndex: "benchmark",
      key: "benchmark",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="blue__title">Leesman+</div>,
      dataIndex: "leesman",
      key: "leesman",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
  ]

  const data = [
    {
      key: "AB001",
      superDriver: "Super\nDriver",
      nullSection: "Office Lmi",
      accounting: 59.9,
      strategy: 65.9,
      resources: 51.9,
      technology: 54.1,
      marketing: 62.6,
      operation: 57.7,
      purchasing: 60.1,
      development: 72.8,
      sales: 66.5,
      benchmark: 64.1,
      leesman: 74.7,
    },
    {
      key: "AB002",
      superDriver: "Super\nDriver",
      nullSection: "H-Lmi",
      accounting: 69.6,
      strategy: 70.1,
      resources: 64.6,
      technology: 82.8,
      marketing: 75.3,
      operation: 76.5,
      purchasing: 58.9,
      development: 72.1,
      sales: null,
      benchmark: null,
      leesman: null,
    },
    {
      key: "AB003",
      superDriver: "Super\nDriver",
      nullSection: "Total respodents",
      accounting: 24,
      strategy: 22,
      resources: 5,
      technology: 16,
      marketing: 37,
      operation: 14,
      purchasing: 23,
      development: 8,
      sales: 8,
      benchmark: 904.345,
      leesman: 57.21,
    },
    {
      key: "AB004",
      superDriver: "Super\nDriver",
      nullSection: "Respondents who work from home",
      accounting: 15,
      strategy: 10,
      resources: 5,
      technology: 16,
      marketing: 37,
      operation: 14,
      purchasing: 23,
      development: 8,
      sales: 8,
      benchmark: null,
      leesman: null,
    },
  ]

  const columns2 = [
    {
      title: <div className="null__title"></div>,
      dataIndex: "superDriver",
      key: "superDriver",
      width: 50,
      render: (text) => (
        <span
          className={`${text ? "cxc-super-driver-new icon-table-status" : ""} `}
        ></span>
      ),
    },
    {
      title: <div className="null__title"></div>,
      dataIndex: "nullSection",
      key: "nullSection",
      width: "300px",
    },

    {
      title: (
        <div className="dark__title">
          Accounting
          <br />
          and Finance
        </div>
      ),
      dataIndex: "accounting",
      key: "accounting",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapBlueDark text={text} />,
    },
    {
      title: (
        <div className="dark__title">
          Group
          <br />
          Strategy
        </div>
      ),
      dataIndex: "strategy",
      key: "strategy",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapBlueDark text={text} />,
    },
    {
      title: (
        <div className="dark__title">
          Human
          <br />
          Resources
        </div>
      ),
      dataIndex: "resources",
      key: "resources",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapBlueDark text={text} />,
    },
    {
      title: (
        <div className="dark__title">
          Information
          <br />
          Technology
        </div>
      ),
      dataIndex: "technology",
      key: "technology",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapBlueDark text={text} />,
    },
    {
      title: <div className="dark__title">Marketing</div>,
      dataIndex: "marketing",
      key: "marketing",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapBlueDark text={text} />,
    },
    {
      title: <div className="dark__title">Operation</div>,
      dataIndex: "operation",
      key: "operation",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapBlueDark text={text} />,
    },
    {
      title: <div className="dark__title">Purchasing</div>,
      dataIndex: "purchasing",
      key: "purchasing",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapBlueDark text={text} />,
    },
    {
      title: (
        <div className="dark__title">
          Research and
          <br />
          Development
        </div>
      ),
      dataIndex: "development",
      key: "development",

      width: "110px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapBlueDark text={text} />,
    },
    {
      title: <div className="dark__title">Sales</div>,
      dataIndex: "sales",
      key: "sales",

      width: "110px",
      render: (text, name) => <HeatMapBlueDark text={text} />,
    },

    {
      title: (
        <div className="muted__title">
          Office
          <br />
          Benchmark
        </div>
      ),
      dataIndex: "benchmark",
      key: "benchmark",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}%</span>
      ),
    },
    {
      title: <div className="blue__title">Leesman+</div>,
      dataIndex: "leesman",
      key: "leesman",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}%</span>
      ),
    },
  ]

  const data2 = [
    {
      key: "AB001",
      superDriver: true,
      nullSection: "Individual focused work, desk based",
      accounting: 54.5,
      strategy: 81.8,
      resources: 80.0,
      technology: 53.3,
      marketing: 70.1,
      operation: null,
      purchasing: 68.2,
      development: 68.2,
      sales: 87.5,
      benchmark: 78.3,
      leesman: 88.4,
    },
    {
      key: "AB002",
      superDriver: true,
      nullSection: "Planned meetings",
      accounting: 95.2,
      strategy: 93.3,
      resources: 66.7,
      technology: 84.6,
      marketing: 96.2,
      operation: 88.9,
      purchasing: 77.8,
      development: 85.7,
      sales: 85.7,
      benchmark: 82.0,
      leesman: 90.0,
    },
    {
      key: "AB003",
      superDriver: false,
      nullSection: "Telephone conversations",
      accounting: 60.0,
      strategy: 58.8,
      resources: 20.0,
      technology: 80.0,
      marketing: 52.4,
      operation: 44.4,
      purchasing: 64.3,
      development: 57.1,
      sales: 75.0,
      benchmark: 75.9,
      leesman: 89.4,
    },
    {
      key: "AB004",
      superDriver: false,
      nullSection: "Informal, un-planned meetings",
      accounting: 61.1,
      strategy: 75.0,
      resources: 25.0,
      technology: 87.5,
      marketing: 60.0,
      operation: 83.3,
      purchasing: 64.7,
      development: 83.3,
      sales: 60.0,
      benchmark: 65.4,
      leesman: 78.8,
    },
    {
      key: "AB005",
      superDriver: false,
      nullSection: "Collaborating on focused work ",
      accounting: 54.5,
      strategy: 81.8,
      resources: 80.0,
      technology: 53.3,
      marketing: 70.1,
      operation: null,
      purchasing: 68.2,
      development: 68.2,
      sales: 87.5,
      benchmark: 78.3,
      leesman: 88.4,
    },
    {
      key: "AB006",
      superDriver: true,
      nullSection: "Planned meetings",
      accounting: 95.2,
      strategy: 93.3,
      resources: 66.7,
      technology: 84.6,
      marketing: 96.2,
      operation: 88.9,
      purchasing: 77.8,
      development: 85.7,
      sales: 85.7,
      benchmark: 82.0,
      leesman: 90.0,
    },
    {
      key: "AB007",
      superDriver: false,
      nullSection: "Audio conferences",
      accounting: 60.0,
      strategy: 58.8,
      resources: 20.0,
      technology: 80.0,
      marketing: 52.4,
      operation: 44.4,
      purchasing: 64.3,
      development: 57.1,
      sales: 75.0,
      benchmark: 75.9,
      leesman: 89.4,
    },
    {
      key: "AB008",
      superDriver: false,
      nullSection: "Reading",
      accounting: 61.1,
      strategy: 75.0,
      resources: 25.0,
      technology: 87.5,
      marketing: 60.0,
      operation: 83.3,
      purchasing: 64.7,
      development: 83.3,
      sales: 60.0,
      benchmark: 65.4,
      leesman: 78.8,
    },
    {
      key: "AB009",
      superDriver: true,
      nullSection: "Individual routine tasks",
      accounting: 60.0,
      strategy: 58.8,
      resources: 20.0,
      technology: 80.0,
      marketing: 52.4,
      operation: 44.4,
      purchasing: 64.3,
      development: 57.1,
      sales: 75.0,
      benchmark: 75.9,
      leesman: 89.4,
    },
    {
      key: "AB010",
      superDriver: false,
      nullSection: "Relaxing/taking a break",
      accounting: 61.1,
      strategy: 75.0,
      resources: 25.0,
      technology: 87.5,
      marketing: 60.0,
      operation: 83.3,
      purchasing: 64.7,
      development: 83.3,
      sales: 60.0,
      benchmark: 65.4,
      leesman: 78.8,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <div className="n_table has__pre has_first_one_column has_multi_table center_labels custom">
          <Table
            className="first_table"
            columns={columns}
            dataSource={data}
            pagination={false}
          />
          <Table
            className="second_table"
            columns={columns2}
            dataSource={data2}
            pagination={false}
          />

          <div className="table_chart_legend bd">
            <h3>% Importance</h3>
            <ul>
              <li>
                <span className="marker aa1"></span> 0% – 20%
              </li>
              <li>
                <span className="marker aa2"></span> 21% – 40%
              </li>
              <li>
                <span className="marker aa3"></span> 41% – 60%
              </li>
              <li>
                <span className="marker aa4"></span> 61% – 80%
              </li>
              <li>
                <span className="marker aa5"></span> 81% – 100%
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeatmapTableBlueDark
