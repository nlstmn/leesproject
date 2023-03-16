import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import HeatMapLabel from "../../../charts/heatmap_label"
import DonutChart from "../../../charts/donut_chart"

const MobilityProfile = () => {
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
      title: <div className="dark__title xs text-left">External mobility</div>,
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
      title: <div className="dark__title xs">Distribution</div>,
      dataIndex: "distribution",
      key: "distribution",
      className: "classNameOfBold",
      render: (text, name) => (
        <span className={`items_result`}>
          {text === null ? "-" : text + "%"}
        </span>
      ),
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
        if (index >= 1 && value === data[index - 1].lmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data.length && value === data[index + i].lmiRange;
            i += 1
          ) {
            obj.props.rowSpan = i + 1
          }
        }
        return obj
      },
    },
    {
      title: (
        <div className="dark__title xs">
          Comparison
          <br />
          dataset 1<br />
          distribution
        </div>
      ),
      dataIndex: "cDistribution",
      key: "cDistribution",
      className: "classNameOfBold",
    },
    {
      title: (
        <div className="dark__title xs">
          Comparison
          <br />
          dataset 1<br />
          LMI
        </div>
      ),
      dataIndex: "lDistribution",
      key: "lDistribution",
      className: "classNameOfBold",
    },
    {
      title: (
        <div className="muted__title xs">
          Benchmark
          <br />
          distribution
        </div>
      ),
      dataIndex: "bDistribution",
      key: "bDistribution",
      className: "classNameOfBold",
      render: (text, name) => (
        <span className={`items_result`}>
          {text === null ? "-" : text + "%"}
        </span>
      ),
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
    },
  ]

  const columns2 = [
    {
      title: <div className="dark__title xs text-left">Internal mobility</div>,
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
      title: <div className="dark__title xs">Distribution</div>,
      dataIndex: "distribution",
      key: "distribution",
      className: "classNameOfBold",
      render: (text, name) => (
        <span className={`items_result`}>
          {text === null ? "-" : text + "%"}
        </span>
      ),
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
        if (index >= 1 && value === data[index - 1].lmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data.length && value === data[index + i].lmiRange;
            i += 1
          ) {
            obj.props.rowSpan = i + 1
          }
        }
        return obj
      },
    },
    {
      title: (
        <div className="dark__title xs">
          Comparison
          <br />
          dataset 1<br />
          distribution
        </div>
      ),
      dataIndex: "cDistribution",
      key: "cDistribution",
      className: "classNameOfBold",
    },
    {
      title: (
        <div className="dark__title xs">
          Comparison
          <br />
          dataset 1<br />
          LMI
        </div>
      ),
      dataIndex: "lDistribution",
      key: "lDistribution",
      className: "classNameOfBold",
    },
    {
      title: (
        <div className="muted__title xs">
          Benchmark
          <br />
          distribution
        </div>
      ),
      dataIndex: "bDistribution",
      key: "bDistribution",
      className: "classNameOfBold",
      render: (text, name) => (
        <span className={`items_result`}>
          {text === null ? "-" : text + "%"}
        </span>
      ),
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
    },
  ]

  const data = [
    {
      key: "1AB001",
      nullSection: "I mainly work there and rarely elsewhere",
      respondents: 908,
      distribution: 41,
      lmi: 69.8,
      lmiRange: 8.7,
      cDistribution: 59,
      lDistribution: 66.2,
      bDistribution: 59,
      bLmi: 66.2,
    },
    {
      key: "1AB002",
      nullSection:
        "I primarily work there but attend meetings off-site or work elsewhere",
      respondents: 771,
      distribution: 35,
      lmi: 64.4,
      lmiRange: 8.7,
      cDistribution: 32,
      lDistribution: 61.3,
      bDistribution: 6,
      bLmi: 63.4,
    },
    {
      key: "1AB003",
      nullSection:
        "I primarily work there but attend meetings off-site or work elsewhere",
      respondents: 322,
      distribution: 15,
      lmi: 62.3,
      lmiRange: 8.7,
      cDistribution: 6,
      lDistribution: 63.4,
      bDistribution: 6,
      bLmi: 63.4,
    },
    {
      key: "1AB004",
      nullSection: "I rarely work there and primarily work elsewhere",
      respondents: 205,
      distribution: 9,
      lmi: 61.1,
      lmiRange: 8.7,
      cDistribution: 3,
      lDistribution: 64.7,
      bDistribution: 3,
      bLmi: 64.7,
    },
  ]

  const data2 = [
    {
      key: "2AB001",
      nullSection: "I mainly work at a single setting and rarely use others",
      respondents: 908,
      distribution: 41,
      lmi: 69.8,
      lmiRange: 8.7,
      cDistribution: 59,
      lDistribution: 66.2,
      bDistribution: 59,
      bLmi: 66.2,
    },
    {
      key: "2AB002",
      nullSection: "I often work at a single setting and sometimes use others",
      respondents: 771,
      distribution: 35,
      lmi: 64.4,
      lmiRange: 8.7,
      cDistribution: 32,
      lDistribution: 61.3,
      bDistribution: 6,
      bLmi: 63.4,
    },
    {
      key: "2AB003",
      nullSection: "I sometimes work at a single setting, but often use others",
      respondents: 322,
      distribution: 15,
      lmi: 62.3,
      lmiRange: 8.7,
      cDistribution: 6,
      lDistribution: 63.4,
      bDistribution: 6,
      bLmi: 63.4,
    },
    {
      key: "2AB004",
      nullSection:
        "I rarely work at a single setting, but mainly use multiple settings",
      respondents: 205,
      distribution: 9,
      lmi: 61.1,
      lmiRange: 8.7,
      cDistribution: 3,
      lDistribution: 64.7,
      bDistribution: 3,
      bLmi: 64.7,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <h2 className="table_question_title">
          Q — Think about your organisation’s workplace. How often do you work
          there?
        </h2>
        <div className="n_table height60 has__pre  center_labels first_not_center  has_chart with_multi">
          <div className="n_donut_chart">
            <div className="height__40">
              <span>External mobility</span>
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
        <h2 className="table_question_title">
          Q — Thinking about how you use your workplace, which of the following
          most closely describes your work mobility?
        </h2>
        <div className="n_table height60 has__pre  center_labels first_not_center  has_chart with_multi">
          <div className="n_donut_chart">
            <div className="height__40">
              <span>Internal mobility</span>
            </div>
            <DonutChart isItemNumber={4} hasLines={true} />
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

export default MobilityProfile
