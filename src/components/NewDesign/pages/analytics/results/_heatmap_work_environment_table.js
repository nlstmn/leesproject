import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import HeatMapLabel from "../../../charts/heatmap_label"
import DonutChart from "../../../charts/donut_chart"

const HeatmapTableRadial = () => {
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
      dataIndex: "nullSection",
      key: "nullSection",
      className: "classNameOfBold",
      width: "300px",
      render: (text, row, index) => (
        <HeatMapLabel value={text} row={row} index={index} isItemNumber={6} />
      ),
    },
  ]

  const data = [
    {
      key: "AB001",
      nullSection: "My organisations’s workplace(s)",
      color: "dark-blue",
    },
    {
      key: "AB002",
      nullSection: "Serviced offices or co-working spaces",
      color: "blue",
    },
    {
      key: "AB003",
      nullSection:
        "Other workplaces (e.g.) those of clients, partners or suppliers)",
      color: "light-blue",
    },
    {
      key: "AB004",
      nullSection: "Home",
      color: "dark-grey",
    },
    {
      key: "AB005",
      nullSection: "Working while travelling",
      color: "grey",
    },
    {
      key: "AB006",
      nullSection: "Other location(s)",
      color: "light-grey",
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <h2 className="table_question_title">
          Q — On average, what proportion of your time at your organisation do
          spend at the following locations?
        </h2>
        <div className="n_table height60 has__pre  center_labels second_not_center  no_header has_chart">
          <div className="n_donut_chart">
            <div className="height__40"></div>
            <DonutChart isItemNumber={6} hasLines={true} />
          </div>
          <Table
            className="first_table"
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </>
  )
}

export default HeatmapTableRadial
