import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"

const ComparisonTable = () => {
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
      title: <div className="dark__title">Building</div>,
      dataIndex: "building",
      key: "building",
    },
    {
      title: <div className="dark__title">Respondents </div>,
      dataIndex: "respondents",
      key: "respondents",
    },
    {
      title: <div className="dark__title">Response rate </div>,
      dataIndex: "responseRate",
      key: "responseRate",
      render: (text, name) => (
        <span
          className={`items_result 
                                    ${
                                      name.name === "Lmi" && text === 71.1
                                        ? " blue"
                                        : ""
                                    }
                                    ${
                                      name.name === "Lmi" &&
                                      text !== 71.1 &&
                                      text < 64
                                        ? " red"
                                        : ""
                                    }
                                    ${
                                      name.name === "Lmi" &&
                                      text !== 71.1 &&
                                      text >= 64
                                        ? " green"
                                        : ""
                                    }
                                    ${
                                      name.name === "H-Lmi" && text < 74
                                        ? " red"
                                        : ""
                                    }
                                    ${
                                      name.name === "H-Lmi" && text >= 74
                                        ? " green"
                                        : ""
                                    }
                                    `}
        >
          {text === null ? "-" : text + "%"}
        </span>
      ),
    },
    {
      title: <div className="dark__title">Survey purpose</div>,
      dataIndex: "surveyPurpose",
      key: "surveyPurpose",
      render: (text, name) => (
        <span className={`items_result`}>{text === null ? "-" : text}</span>
      ),
    },
    {
      title: <div className="dark__title">Lmi</div>,
      dataIndex: "lmi",
      key: "lmi",
      ...getColumnSearchProps("lmi"),
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
      title: <div className="dark__title">Lmi range</div>,
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
      title: <div className="dark__title">H-Lmi</div>,
      dataIndex: "hlmi",
      key: "hlmi",
      render: (text, name) => (
        <span
          className={`items_result 
                                    ${text < 74 ? " red" : ""}
                                    ${text >= 74 ? " green" : ""}
                                    `}
        >
          {text === null ? "-" : text}
        </span>
      ),
    },
    {
      title: <div className="dark__title">H-Lmi Range</div>,
      dataIndex: "hlmiRange",
      key: "hlmiRange",
      className: "classNameOfBorderBottom",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index >= 1 && value === data[index - 1].hlmiRange) {
          obj.props.rowSpan = 0
        } else {
          for (
            let i = 0;
            index + i !== data.length && value === data[index + i].hlmiRange;
            i += 1
          ) {
            obj.props.rowSpan = i + 1
          }
        }
        return obj
      },
    },
  ]

  const data = [
    {
      key: "AB001",
      building: "Amsterdam Basisweg",
      respondents: 129,
      responseRate: 17,
      surveyPurpose: "Post",
      lmi: 71.1,
      lmiRange: 16.9,
      hlmi: 72.9,
      hlmiRange: 18.1,
    },
    {
      key: "AB002",
      building: "Nijmegen",
      respondents: 17,
      responseRate: 23,
      surveyPurpose: "Post",
      lmi: 69.3,
      lmiRange: 16.9,
      hlmi: 76.9,
      hlmiRange: 18.1,
    },
    {
      key: "AB003",
      building: "Duiven",
      respondents: 287,
      responseRate: 19,
      surveyPurpose: "Post",
      lmi: 65.4,
      lmiRange: 16.9,
      hlmi: 73.8,
      hlmiRange: 18.1,
    },
    {
      key: "AB004",
      building: "Alkmaar",
      respondents: 37,
      responseRate: 54,
      surveyPurpose: "Pre",
      lmi: 54.2,
      lmiRange: 16.9,
      hlmi: 71.7,
      hlmiRange: 18.1,
    },
    {
      key: "AB005",
      building: "Other",
      respondents: 28,
      responseRate: null,
      surveyPurpose: null,
      lmi: 68.6,
      lmiRange: 16.9,
      hlmi: 72.4,
      hlmiRange: 18.1,
    },
  ]

  return (
    <>
      <div className="col-lg-12">
        <div className="n_table center_labels first_not_center has__filter not_action">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    </>
  )
}

export default ComparisonTable
