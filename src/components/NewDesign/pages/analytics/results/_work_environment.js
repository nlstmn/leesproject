import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import HeatMapLabel from "../../../charts/heatmap_label"
import DonutChart from "../../../charts/donut_chart"
import DemographicsColumn from "../../../charts/demographics_column"
import BasicBarColumn from "../../../charts/basic_bar_column"

const WorkEnvironment = () => {
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
      title: <div className="dark__title xs text-left">Assigned?</div>,
      dataIndex: "nullSection",
      key: "nullSection",
      className: "classNameOfBold",
      width: "28.65%",
      render: (text, row, index) => (
        <HeatMapLabel value={text} row={row} index={index} isItemNumber={3} />
      ),
    },
    {
      title: <div className="dark__title xs">Respondents</div>,
      dataIndex: "respondents",
      key: "respondents",
      width: "100px",
      className: "classNameOfBold",
    },
    {
      title: <div className="dark__title xs">Lmi</div>,
      dataIndex: "lmi",
      key: "lmi",
      width: "100px",
      className: "classNameOfBold",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title xs">Lmi – Range</div>,
      dataIndex: "lmiRange",
      key: "lmiRange",
      width: "100px",
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
      render: (text, name) => (
        <span className={`items_result`}>
          {text === null ? "-" : text + "%"}
        </span>
      ),
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
        <div className="dark__title xs">
          Comparison
          <br />
          dataset 2<br />
          distribution
        </div>
      ),
      dataIndex: "cDistribution2",
      key: "cDistribution2",
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
          Comparison
          <br />
          dataset 2<br />
          LMI
        </div>
      ),
      dataIndex: "lDistribution2",
      key: "lDistribution2",
      className: "classNameOfBold",
    },
  ]

  const columns2 = [
    {
      title: <div className="dark__title">Assigned work setting</div>,
      dataIndex: "fws",
      key: "fws",
      width: "30%",
    },
    {
      title: (
        <div className="demographics__title">
          <ul>
            <li>
              <span className="marker blue-light"></span>Yes it’s permanently
              assigned
            </li>
          </ul>
        </div>
      ),
      dataIndex: "demographics",
      key: "demographics",
      width: "20%",
      className: "classNameOfDemographics",
      render: (record, { demographics }, row) => (
        <>
          <BasicBarColumn demographics={demographics} />
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
        if (index >= 1 && value === data2[index - 1].lmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data2.length && value === data2[index + i].lmiRange;
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
      render: (text, name) => (
        <span className={`items_result`}>
          {text === null ? "-" : text + "%"}
        </span>
      ),
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
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className="dark__title xs">
          Comparison
          <br />
          dataset 2<br />
          distribution
        </div>
      ),
      dataIndex: "cDistribution2",
      key: "cDistribution2",
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
          Comparison
          <br />
          dataset 2<br />
          LMI
        </div>
      ),
      dataIndex: "lDistribution2",
      key: "lDistribution2",
      className: "classNameOfBold",
      render: (text) => <span>{text}</span>,
    },
  ]

  const columns3 = [
    {
      title: <div className="dark__title">Flexible work setting</div>,
      dataIndex: "fws",
      key: "fws",
      width: "30%",
    },
    {
      title: (
        <div className="demographics__title">
          <ul className="d-block">
            <li>
              <span className="marker blue-dark"></span>No, I book in advance
            </li>
            <li>
              <span className="marker blue-light"></span>No, I use it when it’s
              unoccupied (without booking)
            </li>
          </ul>
        </div>
      ),
      dataIndex: "demographics",
      key: "demographics",
      width: "20%",
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
      render: (text, name) => (
        <span className={`items_result`}>
          {text === null ? "-" : text + "%"}
        </span>
      ),
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
      render: (text) => <span>{text}</span>,
    },
    {
      title: (
        <div className="dark__title xs">
          Comparison
          <br />
          dataset 2<br />
          distribution
        </div>
      ),
      dataIndex: "cDistribution2",
      key: "cDistribution2",
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
          Comparison
          <br />
          dataset 2<br />
          LMI
        </div>
      ),
      dataIndex: "lDistribution2",
      key: "lDistribution2",
      className: "classNameOfBold",
      render: (text) => <span>{text}</span>,
    },
  ]

  const data = [
    {
      key: "1AB001",
      nullSection: "Yes",
      respondents: 247,
      lmi: 79.8,
      lmiRange: 9.4,
      cDistribution: 43,
      lDistribution: 66.2,
      cDistribution2: 43,
      lDistribution2: 66.2,
    },
    {
      key: "1AB002",
      nullSection: "No, but I book it in advance",
      respondents: 185,
      lmi: 78.9,
      lmiRange: 9.4,
      cDistribution: 41,
      lDistribution: 64.0,
      cDistribution2: 41,
      lDistribution2: 64.0,
    },
    {
      key: "1AB003",
      nullSection: "No, I use it when it’s unoccupied (without booking) ",
      respondents: 48,
      lmi: 76.1,
      lmiRange: 9.4,
      cDistribution: 12,
      lDistribution: 61.2,
      cDistribution2: 12,
      lDistribution2: 61.2,
    },
  ]

  const data2 = [
    {
      key: "AB001",
      fws: "Workstation in an open plan office area",
      demographics: 50,
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB002",
      fws: "Cubicle or partially enclosed workstation",
      demographics: 26,
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB003",
      fws: "Workstation in shared room",
      demographics: 6,
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB004",
      fws: "Private",
      demographics: 10,
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB005",
      fws: "Specialist, practical or technical setting",
      demographics: 7,
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB006",
      fws: "Other",
      demographics: 1,
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
  ]

  const data3 = [
    {
      key: "AB001",
      fws: "Workstation in an open plan office area",
      demographics: [5, 25],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB002",
      fws: "Cubicle or partially enclosed workstation",
      demographics: [19, 6],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB003",
      fws: "Workstation in shared room",
      demographics: [12, 11],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB004",
      fws: "Shared team table",
      demographics: [2, 7],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB005",
      fws: "Quiet room",
      demographics: [3, 1],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB006",
      fws: "Private office",
      demographics: [3, 0],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB007",
      fws: "Meeting room",
      demographics: [1, 2],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB008",
      fws: "Informal work setting (e.g. break-out area)",
      demographics: [0, 1],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB009",
      fws: "Specialist, practical or technical setting",
      demographics: [0, 1],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB010",
      fws: "Other",
      demographics: [0, 0],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
    },
    {
      key: "AB011",
      fws: "Not applicable / I use a mix of settings",
      demographics: [0, 1],
      respondents: 149,
      lmi: 80.6,
      lmiRange: 6.9,
      cDistribution: "X",
      lDistribution: 66.2,
      cDistribution2: "X",
      lDistribution2: 66.2,
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
              <span>Assigned?</span>
            </div>
            <DonutChart isItemNumber={3} hasLines={true} />
          </div>
          <Table
            className="first_table"
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="Id01"
          />
        </div>
      </div>

      <div className="col-lg-12">
        <h2 className="table_question_title">
          Q — What type of setting is it?
        </h2>
        <div className="n_table  center_labels first_not_center second_not_center has__pre not_action has_percentage_label custom__footer">
          <Table
            style={{ marginTop: "40px" }}
            columns={columns2}
            dataSource={data2}
            pagination={false}
            rowKey="Id02"
            footer={() => (
              <>
                <div className="ant-table-content custom__footer_table">
                  <table>
                    <colgroup>
                      <col style={{ width: "30%", minWidth: "30%" }} />
                      <col style={{ width: "20%", minWidth: "20%" }} />
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
            rowKey="Id03"
            footer={() => (
              <>
                <div className="ant-table-content custom__footer_table">
                  <table>
                    <colgroup>
                      <col style={{ width: "30%", minWidth: "30%" }} />
                      <col style={{ width: "20%", minWidth: "20%" }} />
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

export default WorkEnvironment
