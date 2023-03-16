import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import DumbbellColumn from "../../../charts/dumbbell_column"

const DumbbellTable = () => {
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
    },
    {
      title: <div className="dark__title">% Supported</div>,
      dataIndex: "supported",
      key: "supported",
      width: "600px",
      className: "classNameOfStacked",

      render: (_, { supported }, row) => (
        <>
          <DumbbellColumn supported={supported} />
        </>
      ),
    },
    {
      title: <div className="dark__title">Importance</div>,
      dataIndex: "importance",
      key: "importance",
      width: "100px",
      ...getColumnSearchProps("importance"),
      render: (text) => <span>{text}%</span>,
    },
    {
      title: (
        <div className="dark__title">
          Comparison
          <br />
          set 1 % gap -<br />
          support
        </div>
      ),
      dataIndex: "comparisonOne",
      key: "comparisonOne",
      width: "100px",
      render: (text) => (
        <div
          className={`sup_result 
                                            ${text <= 0 ? "red" : " green"} 
                                          `}
        >
          {text}%
        </div>
      ),
    },
    {
      title: (
        <div className="dark__title">
          Comparison
          <br />
          set 2 % gap -<br />
          support
        </div>
      ),
      dataIndex: "comparisonTwo",
      key: "comparisonTwo",
      width: "100px",
      render: (text) => (
        <div
          className={`sup_result 
                                            ${text <= 0 ? "red" : " green"} 
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
      nullArea: "Individual focused work, desk based",
      supported: [86.9, 93.6, 94.6],
      importance: 87.5,
      comparisonOne: 6.2,
      comparisonTwo: 6.2,
    },
    {
      key: "AB002",
      superDriver: false,
      nullArea: "Telephone conversations",
      supported: [73.5, 72.5, 81.6],
      importance: 56.5,
      comparisonOne: 2.7,
      comparisonTwo: 2.7,
    },
    {
      key: "AB003",
      superDriver: true,
      nullArea: "Audio conferences ",
      supported: [72.9, 80, 85.9],
      importance: 51.6,
      comparisonOne: -0.1,
      comparisonTwo: -0.1,
    },
    {
      key: "AB004",
      superDriver: false,
      nullArea: "Individual routine tasks",
      supported: [86.5, 93, 93.6],
      importance: 51.0,
      comparisonOne: 0.4,
      comparisonTwo: 0.4,
    },
    {
      key: "AB005",
      superDriver: false,
      nullArea: "Planned meetings",
      supported: [77.5, 94, 95.4],
      importance: 46.5,
      comparisonOne: 5.4,
      comparisonTwo: 5.4,
    },
    {
      key: "AB006",
      superDriver: true,
      nullArea: "Informal, un-planned meetings",
      supported: [86.9, 90, 94.6],
      importance: 37.3,
      comparisonOne: 6.0,
      comparisonTwo: 6.0,
    },
    {
      key: "AB007",
      superDriver: true,
      nullArea: "Video conferences",
      supported: [86.9, 90, 94.6],
      importance: 34.9,
      comparisonOne: 1.6,
      comparisonTwo: 1.6,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <div className="n_table has__filter center_labels second_not_center has__pre not_action has_percentage_label custom__footer">
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
                          <div className="table_chart_legend db">
                            <ul>
                              <li>
                                <span className="marker dd1"></span>Dataset X
                              </li>
                              <li>
                                <span className="marker dd2"></span>Comparison
                                dataset 1
                              </li>
                              <li>
                                <span className="marker dd3"></span>Comparison
                                dataset 2
                              </li>
                            </ul>
                          </div>
                        </td>
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

export default DumbbellTable
