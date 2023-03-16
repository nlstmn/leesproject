import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import DemographicsColumn from "../../../charts/demographics_column"

const Demographics = () => {
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
      title: <div className="dark__title">Gender</div>,
      dataIndex: "gender",
      key: "gender",
      width: 230,
    },
    {
      title: (
        <div className="demographics__title">
          <ul>
            <li>
              <span className="marker blue-light"></span>Not working from home
            </li>
            <li>
              <span className="marker blue-dark"></span>Working from home
            </li>
          </ul>
        </div>
      ),
      dataIndex: "demographics",
      key: "demographics",
      width: "400px",
      className: "classNameOfDemographics",
      render: (record, { demographics }, row) => (
        <>
          <DemographicsColumn demographics={demographics} />
        </>
      ),
    },
    {
      title: <div className="dark__title">Respondents</div>,
      dataIndex: "respondents",
      key: "respondents",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div className="dark__title">Lmi</div>,
      dataIndex: "lmi",
      key: "lmi",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result green`}>
          {text === null ? "-" : text}
        </span>
      ),
    },
    {
      title: <div className="dark__title">Lmi – Range</div>,
      dataIndex: "lmiRange",
      key: "lmiRange",
      width: "100px",
      className: "classNameOfBorderBottom",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index >= 1 && value === data3[index - 1].lmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data3.length && value === data3[index + i].lmiRange;
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
        <div className="muted__title">
          Benchmark
          <br />
          Lmi
        </div>
      ),
      dataIndex: "benchmarkLmi",
      key: "benchmarkLmi",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className="dark__title">
          Respondents
          <br />
          working
          <br />
          from home
        </div>
      ),
      dataIndex: "respondentsHome",
      key: "respondentsHome",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div className="dark__title">H-Lmi</div>,
      dataIndex: "hLmi",
      key: "hLmi",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result red`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">H-Lmi - Range</div>,
      dataIndex: "hLmiRange",
      key: "hLmiRange",
      width: "100px",
      className: "classNameOfBorderBottom",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index >= 1 && value === data3[index - 1].hLmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data3.length && value === data3[index + i].hLmiRange;
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
        <div className="muted__title">
          Benchmark
          <br />
          H-Lmi
        </div>
      ),
      dataIndex: "benchmarkHLmi",
      key: "benchmarkHLmi",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
  ]

  const columns2 = [
    {
      title: <div className="dark__title">Employment type</div>,
      dataIndex: "gender",
      key: "gender",
      width: 230,
    },
    {
      title: (
        <div className="demographics__title">
          <ul>
            <li>
              <span className="marker blue-light"></span>Not working from home
            </li>
            <li>
              <span className="marker blue-dark"></span>Working from home
            </li>
          </ul>
        </div>
      ),
      dataIndex: "demographics",
      key: "demographics",
      width: "400px",
      className: "classNameOfDemographics",
      render: (record, { demographics }, row) => (
        <>
          <DemographicsColumn demographics={demographics} />
        </>
      ),
    },
    {
      title: <div className="dark__title">Respondents</div>,
      dataIndex: "respondents",
      key: "respondents",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div className="dark__title">Lmi</div>,
      dataIndex: "lmi",
      key: "lmi",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result green`}>
          {text === null ? "-" : text}
        </span>
      ),
    },
    {
      title: <div className="dark__title">Lmi – Range</div>,
      dataIndex: "lmiRange",
      key: "lmiRange",
      width: "100px",
      className: "classNameOfBorderBottom",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index >= 1 && value === data3[index - 1].lmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data3.length && value === data3[index + i].lmiRange;
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
        <div className="muted__title">
          Benchmark
          <br />
          Lmi
        </div>
      ),
      dataIndex: "benchmarkLmi",
      key: "benchmarkLmi",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className="dark__title">
          Respondents
          <br />
          working
          <br />
          from home
        </div>
      ),
      dataIndex: "respondentsHome",
      key: "respondentsHome",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div className="dark__title">H-Lmi</div>,
      dataIndex: "hLmi",
      key: "hLmi",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result red`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">H-Lmi - Range</div>,
      dataIndex: "hLmiRange",
      key: "hLmiRange",
      width: "100px",
      className: "classNameOfBorderBottom",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index >= 1 && value === data3[index - 1].hLmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data3.length && value === data3[index + i].hLmiRange;
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
        <div className="muted__title">
          Benchmark
          <br />
          H-Lmi
        </div>
      ),
      dataIndex: "benchmarkHLmi",
      key: "benchmarkHLmi",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
  ]

  const columns3 = [
    {
      title: <div className="dark__title">Role</div>,
      dataIndex: "gender",
      key: "gender",
      width: 230,
    },
    {
      title: (
        <div className="demographics__title">
          <ul>
            <li>
              <span className="marker blue-light"></span>Not working from home
            </li>
            <li>
              <span className="marker blue-dark"></span>Working from home
            </li>
          </ul>
        </div>
      ),
      dataIndex: "demographics",
      key: "demographics",
      width: "400px",
      className: "classNameOfDemographics",
      render: (record, { demographics }, row) => (
        <>
          <DemographicsColumn demographics={demographics} />
        </>
      ),
    },
    {
      title: <div className="dark__title">Respondents</div>,
      dataIndex: "respondents",
      key: "respondents",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div className="dark__title">Lmi</div>,
      dataIndex: "lmi",
      key: "lmi",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result green`}>
          {text === null ? "-" : text}
        </span>
      ),
    },
    {
      title: <div className="dark__title">Lmi – Range</div>,
      dataIndex: "lmiRange",
      key: "lmiRange",
      width: "100px",
      className: "classNameOfBorderBottom",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index >= 1 && value === data3[index - 1].lmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data3.length && value === data3[index + i].lmiRange;
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
        <div className="muted__title">
          Benchmark
          <br />
          Lmi
        </div>
      ),
      dataIndex: "benchmarkLmi",
      key: "benchmarkLmi",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className="dark__title">
          Respondents
          <br />
          working
          <br />
          from home
        </div>
      ),
      dataIndex: "respondentsHome",
      key: "respondentsHome",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div className="dark__title">H-Lmi</div>,
      dataIndex: "hLmi",
      key: "hLmi",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result red`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">H-Lmi - Range</div>,
      dataIndex: "hLmiRange",
      key: "hLmiRange",
      width: "100px",
      className: "classNameOfBorderBottom",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index >= 1 && value === data3[index - 1].hLmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data3.length && value === data3[index + i].hLmiRange;
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
        <div className="muted__title">
          Benchmark
          <br />
          H-Lmi
        </div>
      ),
      dataIndex: "benchmarkHLmi",
      key: "benchmarkHLmi",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
  ]

  const columns4 = [
    {
      title: <div className="dark__title">Time with organisation</div>,
      dataIndex: "gender",
      key: "gender",
      width: 230,
    },
    {
      title: (
        <div className="demographics__title">
          <ul>
            <li>
              <span className="marker blue-light"></span>Not working from home
            </li>
            <li>
              <span className="marker blue-dark"></span>Working from home
            </li>
          </ul>
        </div>
      ),
      dataIndex: "demographics",
      key: "demographics",
      width: "400px",
      className: "classNameOfDemographics",
      render: (record, { demographics }, row) => (
        <>
          <DemographicsColumn demographics={demographics} />
        </>
      ),
    },
    {
      title: <div className="dark__title">Respondents</div>,
      dataIndex: "respondents",
      key: "respondents",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div className="dark__title">Lmi</div>,
      dataIndex: "lmi",
      key: "lmi",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result green`}>
          {text === null ? "-" : text}
        </span>
      ),
    },
    {
      title: <div className="dark__title">Lmi – Range</div>,
      dataIndex: "lmiRange",
      key: "lmiRange",
      width: "100px",
      className: "classNameOfBorderBottom",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index >= 1 && value === data3[index - 1].lmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data3.length && value === data3[index + i].lmiRange;
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
        <div className="muted__title">
          Benchmark
          <br />
          Lmi
        </div>
      ),
      dataIndex: "benchmarkLmi",
      key: "benchmarkLmi",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className="dark__title">
          Respondents
          <br />
          working
          <br />
          from home
        </div>
      ),
      dataIndex: "respondentsHome",
      key: "respondentsHome",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div className="dark__title">H-Lmi</div>,
      dataIndex: "hLmi",
      key: "hLmi",
      width: "100px",
      render: (text, name) => (
        <span className={`items_result red`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">H-Lmi - Range</div>,
      dataIndex: "hLmiRange",
      key: "hLmiRange",
      width: "100px",
      className: "classNameOfBorderBottom",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index >= 1 && value === data3[index - 1].hLmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data3.length && value === data3[index + i].hLmiRange;
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
        <div className="muted__title">
          Benchmark
          <br />
          H-Lmi
        </div>
      ),
      dataIndex: "benchmarkHLmi",
      key: "benchmarkHLmi",
      width: "100px",
      render: (text) => <span>{text}</span>,
    },
  ]

  const data = [
    {
      key: "AB001",
      gender: "Female",
      demographics: [5, 48],
      respondents: 929,
      lmi: 65.8,
      lmiRange: 13.8,
      benchmarkLmi: 64.1,
      respondentsHome: 910,
      hLmi: 64.1,
      hLmiRange: 3.0,
      benchmarkHLmi: 75.7,
    },
    {
      key: "AB002",
      gender: "Male",
      demographics: [5, 40],
      respondents: 803,
      lmi: 67.5,
      lmiRange: 13.8,
      benchmarkLmi: 64.1,
      respondentsHome: 757,
      hLmi: 65.0,
      hLmiRange: 3.0,
      benchmarkHLmi: 73.9,
    },
    {
      key: "AB003",
      gender: "Prefer not to say",
      demographics: [0, 2],
      respondents: 36,
      lmi: 53.7,
      lmiRange: 13.8,
      benchmarkLmi: 55.6,
      respondentsHome: 35,
      hLmi: 67.1,
      hLmiRange: 3.0,
      benchmarkHLmi: 70.3,
    },
  ]

  const data2 = [
    {
      key: "AB001",
      gender: "Full-time",
      demographics: [2, 95],
      respondents: 929,
      lmi: 65.8,
      lmiRange: 13.8,
      benchmarkLmi: 64.1,
      respondentsHome: 910,
      hLmi: 64.1,
      hLmiRange: 3.0,
      benchmarkHLmi: 75.7,
    },
    {
      key: "AB002",
      gender: "Part-time",
      demographics: [0, 3],
      respondents: 803,
      lmi: 67.5,
      lmiRange: 13.8,
      benchmarkLmi: 64.1,
      respondentsHome: 757,
      hLmi: 65.0,
      hLmiRange: 3.0,
      benchmarkHLmi: 73.9,
    },
  ]

  const data3 = [
    {
      key: "AB001",
      gender: "Individual contributor",
      demographics: [8, 71],
      respondents: 929,
      lmi: 65.8,
      lmiRange: 13.8,
      benchmarkLmi: 64.1,
      respondentsHome: 910,
      hLmi: 64.1,
      hLmiRange: 3.0,
      benchmarkHLmi: 75.7,
    },
    {
      key: "AB002",
      gender: "People manager",
      demographics: [4, 9],
      respondents: 803,
      lmi: 67.5,
      lmiRange: 13.8,
      benchmarkLmi: 64.1,
      respondentsHome: 757,
      hLmi: 65.0,
      hLmiRange: 3.0,
      benchmarkHLmi: 73.9,
    },
    {
      key: "AB003",
      gender: "Senior leader",
      demographics: [1, 5],
      respondents: 36,
      lmi: 53.7,
      lmiRange: 13.8,
      benchmarkLmi: 55.6,
      respondentsHome: 35,
      hLmi: 67.1,
      hLmiRange: 3.0,
      benchmarkHLmi: 70.3,
    },
  ]

  const data4 = [
    {
      key: "AB001",
      gender: "0–6 months",
      demographics: [8, 71],
      respondents: 929,
      lmi: 65.8,
      lmiRange: 13.8,
      benchmarkLmi: 64.1,
      respondentsHome: 910,
      hLmi: 64.1,
      hLmiRange: 3.0,
      benchmarkHLmi: 75.7,
    },
    {
      key: "AB002",
      gender: "6–18 months",
      demographics: [1, 25],
      respondents: 803,
      lmi: 67.5,
      lmiRange: 13.8,
      benchmarkLmi: 64.1,
      respondentsHome: 757,
      hLmi: 65.0,
      hLmiRange: 3.0,
      benchmarkHLmi: 73.9,
    },
    {
      key: "AB003",
      gender: "18 months – 3 years",
      demographics: [3, 23],
      respondents: 36,
      lmi: 53.7,
      lmiRange: 13.8,
      benchmarkLmi: 55.6,
      respondentsHome: 35,
      hLmi: 67.1,
      hLmiRange: 3.0,
      benchmarkHLmi: 70.3,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <div className="n_table  center_labels first_not_center second_not_center has__pre not_action has_percentage_label custom__footer">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            footer={() => (
              <>
                <div className="ant-table-content custom__footer_table">
                  <table>
                    <colgroup>
                      <col style={{ width: "230px", minWidth: "230px" }} />
                      <col style={{ width: "400px", minWidth: "400px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                    </colgroup>
                    <tbody className="ant-table-tbody">
                      <tr>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell pos_r">
                          <div className="table_percentage">
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">0%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">20%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">40%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">60%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">80%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">100%</div>
                            </div>
                          </div>
                        </td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          />
          <Table
            style={{ marginTop: "40px" }}
            columns={columns2}
            dataSource={data2}
            pagination={false}
            footer={() => (
              <>
                <div className="ant-table-content custom__footer_table">
                  <table>
                    <colgroup>
                      <col style={{ width: "230px", minWidth: "230px" }} />
                      <col style={{ width: "400px", minWidth: "400px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                    </colgroup>
                    <tbody className="ant-table-tbody">
                      <tr>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell pos_r">
                          <div className="table_percentage">
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">0%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">20%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">40%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">60%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">80%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">100%</div>
                            </div>
                          </div>
                        </td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          />
          <Table
            style={{ marginTop: "40px" }}
            columns={columns3}
            dataSource={data3}
            pagination={false}
            footer={() => (
              <>
                <div className="ant-table-content custom__footer_table">
                  <table>
                    <colgroup>
                      <col style={{ width: "230px", minWidth: "230px" }} />
                      <col style={{ width: "400px", minWidth: "400px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                    </colgroup>
                    <tbody className="ant-table-tbody">
                      <tr>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell pos_r">
                          <div className="table_percentage">
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">0%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">20%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">40%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">60%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">80%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">100%</div>
                            </div>
                          </div>
                        </td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          />
          <Table
            style={{ marginTop: "40px" }}
            columns={columns4}
            dataSource={data4}
            pagination={false}
            footer={() => (
              <>
                <div className="ant-table-content custom__footer_table">
                  <table>
                    <colgroup>
                      <col style={{ width: "230px", minWidth: "230px" }} />
                      <col style={{ width: "400px", minWidth: "400px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                    </colgroup>
                    <tbody className="ant-table-tbody">
                      <tr>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell pos_r">
                          <div className="table_percentage">
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">0%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">20%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">40%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">60%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">80%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">100%</div>
                            </div>
                          </div>
                        </td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  )
}

export default Demographics
