import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import HeatMapLabel from "../../../charts/heatmap_label"
import DonutChart from "../../../charts/donut_chart"

const ActivityProfile = () => {
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
      title: (
        <div className="dark__title xs text-left">Activity complexity</div>
      ),
      dataIndex: "nullSection",
      key: "nullSection",
      className: "classNameOfBold",
      width: "300px",
      render: (text, row, index) => (
        <HeatMapLabel value={text} row={row} index={index} isItemNumber={4} />
      ),
    },
    {
      title: <div className="dark__title xs">Respondents</div>,
      dataIndex: "respondents",
      key: "respondents",
      className: "classNameOfBold",
    },
    {
      title: <div className="dark__title xs">Lmi</div>,
      dataIndex: "lmi",
      key: "lmi",
      className: "classNameOfBold",
      render: (text, name) => (
        <span
          className={`items_result 
                                    ${
                                      text !== 71.1 && text < 64
                                        ? " red"
                                        : text !== 71.1 && text >= 64
                                        ? " green"
                                        : "blue"
                                    }
                                    `}
        >
          {text === null ? "-" : text}
        </span>
      ),
    },
    {
      title: <div className="dark__title xs">Lmi – Range</div>,
      dataIndex: "lmiRange",
      key: "lmiRange",
      className: "classNameOfBorderBottom",

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
      title: (
        <div className="muted__title xs">
          Benchmark
          <br />
          Lmi
        </div>
      ),
      dataIndex: "bLmi",
      key: "bLmi",
      className: "classNameOfBold",
      render: (text, name) => (
        <span className={`items_result`}>
          {text === null ? "-" : text + "%"}
        </span>
      ),
    },
    {
      title: (
        <div className="dark__title xs">
          Respondents
          <br />
          working from
          <br />
          home{" "}
        </div>
      ),
      dataIndex: "rwfh",
      key: "rwfh",
      className: "classNameOfBold",
    },
    {
      title: <div className="dark__title xs">H-Lmi</div>,
      dataIndex: "hLmi",
      key: "hLmi",
      className: "classNameOfBold",
      render: (text, name) => (
        <span
          className={`items_result 
                                    ${text < 64 ? " red" : " green"}
                                    `}
        >
          {text === null ? "-" : text}
        </span>
      ),
    },
    {
      title: <div className="dark__title xs">H-Lmi – Range</div>,
      dataIndex: "hLmiRange",
      key: "hLmiRange",
      className: "classNameOfBorderBottom",

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
      title: (
        <div className="muted__title xs">
          Benchmark
          <br />
          H-Lmi
        </div>
      ),
      dataIndex: "bHLmi",
      key: "bHLmi",
      className: "classNameOfBold",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
  ]

  const columns2 = [
    {
      title: (
        <div className="dark__title xs text-left">Activity complexity</div>
      ),
      dataIndex: "nullSection",
      key: "nullSection",
      className: "classNameOfBold",
      width: "300px",
      render: (text, row, index) => (
        <HeatMapLabel value={text} row={row} index={index} isItemNumber={5} />
      ),
    },
    {
      title: <div className="dark__title xs">Respondents</div>,
      dataIndex: "respondents",
      key: "respondents",
      className: "classNameOfBold",
    },
    {
      title: <div className="dark__title xs">Lmi</div>,
      dataIndex: "lmi",
      key: "lmi",
      className: "classNameOfBold",
      render: (text, name) => (
        <span
          className={`items_result 
                                    ${
                                      text !== 71.1 && text < 64
                                        ? " red"
                                        : text !== 71.1 && text >= 64
                                        ? " green"
                                        : "blue"
                                    }
                                    `}
        >
          {text === null ? "-" : text}
        </span>
      ),
    },
    {
      title: <div className="dark__title xs">Lmi – Range</div>,
      dataIndex: "lmiRange",
      key: "lmiRange",
      className: "classNameOfBorderBottom",

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
      title: (
        <div className="muted__title xs">
          Benchmark
          <br />
          Lmi
        </div>
      ),
      dataIndex: "bLmi",
      key: "bLmi",
      className: "classNameOfBold",
      render: (text, name) => (
        <span className={`items_result`}>
          {text === null ? "-" : text + "%"}
        </span>
      ),
    },
    {
      title: (
        <div className="dark__title xs">
          Respondents
          <br />
          working from
          <br />
          home{" "}
        </div>
      ),
      dataIndex: "rwfh",
      key: "rwfh",
      className: "classNameOfBold",
    },
    {
      title: <div className="dark__title xs">H-Lmi</div>,
      dataIndex: "hLmi",
      key: "hLmi",
      className: "classNameOfBold",
      render: (text, name) => (
        <span
          className={`items_result 
                                    ${text < 64 ? " red" : " green"}
                                    `}
        >
          {text === null ? "-" : text}
        </span>
      ),
    },
    {
      title: <div className="dark__title xs">H-Lmi – Range</div>,
      dataIndex: "hLmiRange",
      key: "hLmiRange",
      className: "classNameOfBorderBottom",

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
      title: (
        <div className="muted__title xs">
          Benchmark
          <br />
          H-Lmi
        </div>
      ),
      dataIndex: "bHLmi",
      key: "bHLmi",
      className: "classNameOfBold",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
  ]

  const data = [
    {
      key: "1AB001",
      nullSection: "< 5",
      respondents: 455,
      lmi: 69.8,
      lmiRange: 3.3,
      bLmi: 67.0,
      rwfh: 455,
      hLmi: 64.9,
      hLmiRange: 3.3,
      bHLmi: 67.0,
    },
    {
      key: "1AB002",
      nullSection: "6 to 10",
      respondents: 880,
      lmi: 63.4,
      lmiRange: 3.3,
      bLmi: 64.0,
      rwfh: 880,
      hLmi: 63.4,
      hLmiRange: 3.3,
      bHLmi: 64.0,
    },
    {
      key: "1AB003",
      nullSection: "11 to 15",
      respondents: 447,
      lmi: 63.7,
      lmiRange: 3.3,
      bLmi: 62.3,
      rwfh: 447,
      hLmi: 63.7,
      hLmiRange: 3.3,
      bHLmi: 62.3,
    },
    {
      key: "1AB004",
      nullSection: "16 to 21",
      respondents: 365,
      lmi: 61.6,
      lmiRange: 3.3,
      bLmi: 61.6,
      rwfh: 365,
      hLmi: 61.6,
      hLmiRange: 3.3,
      bHLmi: 61.6,
    },
  ]

  const data2 = [
    {
      key: "11AB001",
      nullSection: "Highly individual",
      respondents: 455,
      lmi: 69.8,
      lmiRange: 3.3,
      bLmi: 67.0,
      rwfh: 455,
      hLmi: 64.9,
      hLmiRange: 3.3,
      bHLmi: 67.0,
    },
    {
      key: "11AB002",
      nullSection: "Individual",
      respondents: 880,
      lmi: 63.4,
      lmiRange: 3.3,
      bLmi: 64.0,
      rwfh: 880,
      hLmi: 63.4,
      hLmiRange: 3.3,
      bHLmi: 64.0,
    },
    {
      key: "11AB003",
      nullSection: "Balanced",
      respondents: 447,
      lmi: 63.7,
      lmiRange: 3.3,
      bLmi: 62.3,
      rwfh: 447,
      hLmi: 63.7,
      hLmiRange: 3.3,
      bHLmi: 62.3,
    },
    {
      key: "11AB004",
      nullSection: "Collaborative",
      respondents: 365,
      lmi: 61.6,
      lmiRange: 3.3,
      bLmi: 61.6,
      rwfh: 365,
      hLmi: 61.6,
      hLmiRange: 3.3,
      bHLmi: 61.6,
    },
    {
      key: "11AB005",
      nullSection: "Highly collaborative",
      respondents: 365,
      lmi: 61.6,
      lmiRange: 3.3,
      bLmi: 61.6,
      rwfh: 365,
      hLmi: 61.6,
      hLmiRange: 3.3,
      bHLmi: 61.6,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <div className="n_table height60 has__pre  center_labels first_not_center  has_chart with_multi">
          <div className="n_donut_chart">
            <div className="height__40">
              <span>Activity complexity</span>
            </div>
            <DonutChart isItemNumber={4} hasLines={true} />
          </div>
          <Table
            className="first_table"
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="External"
          />
        </div>
      </div>

      <div className="col-lg-12">
        <div className="n_table height60 has__pre  center_labels first_not_center  has_chart with_multi">
          <div className="n_donut_chart">
            <div className="height__40">
              <span>Activity complexity</span>
            </div>
            <DonutChart isItemNumber={5} hasLines={true} />
          </div>
          <Table
            className="first_table"
            columns={columns2}
            dataSource={data2}
            pagination={false}
            rowKey="Internal"
          />
        </div>
      </div>
    </>
  )
}

export default ActivityProfile
