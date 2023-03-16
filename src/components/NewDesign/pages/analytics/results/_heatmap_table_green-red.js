import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import HeatMapRedGreen from "../../../charts/heatmap_redgreen"

const HeatmapTableGreenRed = () => {
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
      width: "300px",
      className: "classNameOfBold",
    },
    {
      title: <div className="dark__title">HK</div>,
      dataIndex: "hk",
      key: "hk",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">ID</div>,
      dataIndex: "id",
      key: "id",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">IE</div>,
      dataIndex: "ie",
      key: "ie",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">MY</div>,
      dataIndex: "my",
      key: "my",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">NP</div>,
      dataIndex: "np",
      key: "np",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">NG</div>,
      dataIndex: "ng",
      key: "ng",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">PT</div>,
      dataIndex: "pt",
      key: "pt",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">SG</div>,
      dataIndex: "sg",
      key: "sg",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">KR</div>,
      dataIndex: "kr",
      key: "kr",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">ES</div>,
      dataIndex: "es",
      key: "es",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">LK</div>,
      dataIndex: "lk",
      key: "lk",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">TW</div>,
      dataIndex: "tw",
      key: "tw",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">UK</div>,
      dataIndex: "uk",
      key: "uk",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">US</div>,
      dataIndex: "us",
      key: "us",

      width: "60px",
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
      hk: 69.5,
      id: 65.9,
      ie: 51.9,
      my: 54.1,
      np: 62.6,
      ng: 57.7,
      pt: 60.1,
      sg: 72.8,
      kr: 66.5,
      es: 66.5,
      lk: 66.5,
      tw: 66.5,
      uk: 66.5,
      us: 66.5,

      benchmark: 64.1,
      leesman: 74.7,
    },
    {
      key: "AB002",
      superDriver: "Super\nDriver",
      nullSection: "Total respodents",
      hk: 357,
      id: 271,
      ie: 462,
      my: 322,
      np: 158,
      ng: 152,
      pt: 258,
      sg: 1.147,
      kr: 578,
      es: 970,
      lk: 191,
      tw: 371,
      uk: 2.327,
      us: 176,

      benchmark: 904.345,
      leesman: 57.21,
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
      title: <div className="dark__title">HK</div>,
      dataIndex: "hk",
      key: "accounting",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">ID</div>,
      dataIndex: "id",
      key: "id",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">IE</div>,
      dataIndex: "ie",
      key: "ie",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">MY</div>,
      dataIndex: "my",
      key: "my",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">NP</div>,
      dataIndex: "np",
      key: "np",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">NG</div>,
      dataIndex: "ng",
      key: "ng",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">PT</div>,
      dataIndex: "pt",
      key: "pt",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">SG</div>,
      dataIndex: "sg",
      key: "sg",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">KR</div>,
      dataIndex: "kr",
      key: "kr",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">ES</div>,
      dataIndex: "es",
      key: "es",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">LK</div>,
      dataIndex: "lk",
      key: "lk",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">TW</div>,
      dataIndex: "tw",
      key: "tw",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">UK</div>,
      dataIndex: "uk",
      key: "uk",

      width: "60px",
      className: "classNameOfHeat",
      render: (text, name) => <HeatMapRedGreen text={text} />,
    },
    {
      title: <div className="dark__title">US</div>,
      dataIndex: "us",
      key: "us",

      width: "60px",

      render: (text, name) => <HeatMapRedGreen text={text} />,
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
      hk: 82.5,
      id: 81.8,
      ie: 80.0,
      my: 53.3,
      np: 70.1,
      ng: 78.0,
      pt: 68.2,
      sg: 82.8,
      kr: 87.5,
      es: 78.3,
      lk: 81.7,
      tw: 83.7,
      uk: 80.9,
      us: 81.4,

      benchmark: 78.3,
      leesman: 88.4,
    },
    {
      key: "AB002",
      superDriver: true,
      nullSection: "Planned meetings",
      hk: 90.5,
      id: 84.8,
      ie: 89.6,
      my: 89.4,
      np: 86.4,
      ng: 87.7,
      pt: 44.2,
      sg: 34.8,
      kr: 23.5,
      es: 54.3,
      lk: 77.7,
      tw: 34.7,
      uk: 65.9,
      us: 88.4,

      benchmark: 34.3,
      leesman: 23.4,
    },
    {
      key: "AB003",
      superDriver: false,
      nullSection: "Telephone conversations",
      hk: 76.5,
      id: 56.8,
      ie: 45.0,
      my: 34.3,
      np: 32.1,
      ng: 90.0,
      pt: 98.2,
      sg: 87.8,
      kr: 67.5,
      es: 65.3,
      lk: 81.7,
      tw: 83.7,
      uk: 44.9,
      us: 33.4,

      benchmark: 34.3,
      leesman: 23.4,
    },
    {
      key: "AB004",
      superDriver: false,
      nullSection: "Informal, un-planned meetings",
      hk: 22.5,
      id: 11.8,
      ie: 23.0,
      my: 43.3,
      np: 65.1,
      ng: 36.0,
      pt: 68.2,
      sg: 3.8,
      kr: 56.5,
      es: 88.3,
      lk: 56.7,
      tw: 34.7,
      uk: 12.9,
      us: 15.4,

      benchmark: 54.3,
      leesman: 23.4,
    },
    {
      key: "AB005",
      superDriver: false,
      nullSection: "Collaborating on focused work ",
      hk: 65.5,
      id: 45.8,
      ie: 23.0,
      my: 54.3,
      np: 76.1,
      ng: 0.0,
      pt: 76.2,
      sg: 45.8,
      kr: 23.5,
      es: 54.3,
      lk: 76.7,
      tw: 87.7,
      uk: 56.9,
      us: 34.4,

      benchmark: 99.3,
      leesman: 88.4,
    },
    {
      key: "AB006",
      superDriver: true,
      nullSection: "Planned meetings",
      hk: 65.5,
      id: 45.8,
      ie: 23.0,
      my: 54.3,
      np: 76.1,
      ng: 0.0,
      pt: 76.2,
      sg: 45.8,
      kr: 23.5,
      es: 54.3,
      lk: 76.7,
      tw: 87.7,
      uk: 56.9,
      us: 34.4,

      benchmark: 99.3,
      leesman: 88.4,
    },
    {
      key: "AB007",
      superDriver: false,
      nullSection: "Audio conferences",
      hk: 65.5,
      id: 45.8,
      ie: 23.0,
      my: 54.3,
      np: 76.1,
      ng: 0.0,
      pt: 76.2,
      sg: 45.8,
      kr: 23.5,
      es: 54.3,
      lk: 76.7,
      tw: 87.7,
      uk: 56.9,
      us: 34.4,

      benchmark: 99.3,
      leesman: 88.4,
    },
    {
      key: "AB008",
      superDriver: false,
      nullSection: "Reading",
      hk: 45.5,
      id: 56.8,
      ie: 34.0,
      my: 23.3,
      np: 54.1,
      ng: 65.0,
      pt: 76.2,
      sg: 87.8,
      kr: 8.5,
      es: 23.3,
      lk: 22.7,
      tw: 54.7,
      uk: 77.9,
      us: 34.4,

      benchmark: 99.3,
      leesman: 88.4,
    },
    {
      key: "AB009",
      superDriver: true,
      nullSection: "Individual routine tasks",
      hk: 65.5,
      id: 45.8,
      ie: 23.0,
      my: 54.3,
      np: 76.1,
      ng: 76.0,
      pt: 78.2,
      sg: 67.8,
      kr: 45.5,
      es: 6.3,
      lk: 76.7,
      tw: 34.7,
      uk: 54.9,
      us: 34.4,

      benchmark: 99.3,
      leesman: 88.4,
    },
    {
      key: "AB010",
      superDriver: false,
      nullSection: "Relaxing/taking a break",
      hk: 65.5,
      id: 33.8,
      ie: 43.0,
      my: 32.3,
      np: 12.1,
      ng: 11.0,
      pt: 32.2,
      sg: 34.8,
      kr: 23.5,
      es: 54.3,
      lk: 76.7,
      tw: 87.7,
      uk: 56.9,
      us: 34.4,

      benchmark: 99.3,
      leesman: 88.4,
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

          <div className="table_chart_legend gr">
            <h3>% Supported</h3>
            <ul>
              <li>
                <span className="marker red"></span> Below Leesman Benchmark
              </li>
              <li>
                <span className="marker green"></span> Above Leesman Benchmark
              </li>
              <li>
                <span className="marker muted"></span> Same as Leesman Benchmark
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeatmapTableGreenRed
