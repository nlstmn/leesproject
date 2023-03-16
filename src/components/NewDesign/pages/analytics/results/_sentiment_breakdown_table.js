import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import StackedColumn from "../../../charts/stacked_column"

const SentimentBreakdown = () => {
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
        <div className="dark__title">
          Super
          <br />
          driver
        </div>
      ),
      dataIndex: "superDriver",
      key: "superDriver",
      width: "60px",
      render: (text) => (
        <span
          className={`${text ? "cxc-super-driver-new icon-table-status" : ""} `}
        ></span>
      ),
    },
    {
      title: <div className="null__title"></div>,
      dataIndex: "nullArea",
      key: "nullArea",
      width: "300px",
      render: (text) => (
        <>
          <span className="bold_it">{text.split(" ")[0]}</span>{" "}
          {text.substr(text.indexOf(" ") + 1)}
        </>
      ),
    },
    {
      title: <div className="dark__title">Respondents</div>,
      dataIndex: "respondents",
      key: "respondents",
      width: "600px",
      className: "classNameOfStacked",
      render: (record, { respondents }, row) => (
        <>
          <StackedColumn respondents={respondents} />
        </>
      ),
    },
    {
      title: (
        <div className="dark__title">
          Importance
          <br />%
        </div>
      ),
      dataIndex: "importance",
      key: "importance",
      width: "100px",
      render: (text) => <span>{text}%</span>,
    },
    {
      title: <div className="dark__title">Supported</div>,
      dataIndex: "supported",
      key: "supported",
      width: "100px",
      ...getColumnSearchProps("supported"),
      render: (text) => (
        <div
          className={`sup_result 
                                            ${text <= 16 ? "red" : " "} 
                                            ${
                                              text > 16 && text <= 32
                                                ? "orange"
                                                : " "
                                            } 
                                            ${
                                              text > 32 && text <= 48
                                                ? "yellow"
                                                : " "
                                            } 
                                            ${
                                              text > 48 && text <= 64
                                                ? "green-light"
                                                : " "
                                            } 
                                            ${
                                              text > 64 && text <= 80
                                                ? "green"
                                                : " "
                                            } 
                                            ${text > 80 ? "green" : " "} 
                                          `}
        >
          {text}%
        </div>
      ),
    },
  ]

  const data = [
    {
      key: "AB001",
      superDriver: true,
      nullArea: "01 Individual focused work, desk based",
      respondents: [5, 4, 10, 20, 33, 28],
      importance: 87.5,
      supported: 94.6,
    },
    {
      key: "AB002",
      superDriver: false,
      nullArea: "02 Telephone conversations",
      respondents: [2, 6, 15, 13, 28, 36],
      importance: 56.5,
      supported: 81.6,
    },
    {
      key: "AB003",
      superDriver: true,
      nullArea: "03 Audio conferences ",
      respondents: [7, 14, 14, 34, 15, 16],
      importance: 51.6,
      supported: 85.9,
    },
    {
      key: "AB004",
      superDriver: false,
      nullArea: "04 Individual routine tasks",
      respondents: [11, 8, 20, 11, 25, 25],
      importance: 51.0,
      supported: 93.8,
    },
    {
      key: "AB005",
      superDriver: false,
      nullArea: "05 Planned meetings",
      respondents: [5, 11, 12, 9, 20, 43],
      importance: 46.5,
      supported: 95.4,
    },
    {
      key: "AB006",
      superDriver: true,
      nullArea: "06 Informal, un-planned meetings",
      respondents: [9, 7, 9, 20, 10, 45],
      importance: 37.3,
      supported: 90.0,
    },
    {
      key: "AB007",
      superDriver: true,
      nullArea: "07 Video conferences",
      respondents: [15, 3, 22, 18, 30, 12],
      importance: 34.9,
      supported: 85.4,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <div className="n_table  center_labels second_not_center has__filter has__pre not_action has_percentage_label custom__footer">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            footer={() => (
              <>
                <div className="ant-table-content custom__footer_table">
                  <table>
                    <colgroup>
                      <col style={{ width: "60px", minWidth: "60px" }} />
                      <col style={{ width: "300px", minWidth: "300px" }} />
                      <col style={{ width: "600px", minWidth: "600px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                      <col style={{ width: "100px", minWidth: "100px" }} />
                    </colgroup>
                    <tbody className="ant-table-tbody">
                      <tr>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell"></td>
                        <td className="ant-table-cell pos_r">
                          <div className="table_percentage">
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">0%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">10%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">20%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">30%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">40%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">50%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">60%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">70%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">80%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">90%</div>
                            </div>
                            <div className="prc_item">
                              <div className="line"></div>
                              <div className="value">100%</div>
                            </div>
                          </div>
                          <div className="table_chart_legend stacked bd">
                            <ul>
                              <li>
                                <span className="marker ss1"></span>Not
                                supported
                              </li>
                              <li>
                                <span className="marker ss2"></span>Very under
                                supported
                              </li>
                              <li>
                                <span className="marker ss3"></span>Under
                                supported
                              </li>
                              <li>
                                <span className="marker ss4"></span>Supported
                              </li>
                              <li>
                                <span className="marker ss5"></span>Well
                                supported
                              </li>
                              <li>
                                <span className="marker ss6"></span>Very well
                                supported
                              </li>
                            </ul>
                          </div>
                        </td>
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

export default SentimentBreakdown
