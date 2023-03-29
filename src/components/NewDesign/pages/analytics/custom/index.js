import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import CustomSelect from "../../../elements/custom_select"
import DeleteModal from "../../../elements/modal_delete"
import DropMenuRadio from "../../../elements/drop_menu_radio"
import LoaderPage from "../../../elements/loader_page"
import LeftFilter from "../../../elements/filter_left"
import RightFilter from "../../../elements/filter_right"
import DatasetModal from "../../../elements/modal_dataset"
import DatasetModalLarge from "../../../elements/modal_dataset_large"

const CustomFilters = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])
  // Table Drop Functions
  const [actionKey, setActionKey] = useState("")
  const isAction = (record) => record.key === actionKey
  const openDrop = (record) => {
    setActionKey(record.key)
  }
  const ref_custom_table_drop = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.classList.contains("custom_table_drop")) {
        setActionKey("")
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [setActionKey])

  // Drawer / Modal Functions
  const [visibleLeftDrawer, setVisibleLeftDrawer] = useState(false)
  const [visibleRightDrawer, setVisibleRightDrawer] = useState(false)
  const [visibleDatasetModal, setDatasetModal] = useState(false)
  const [visibleDatasetModalLarge, setDatasetModalLarge] = useState(false)
  // Drawer / Modal Functions

  // Table Visibility Functions
  const [visibleKey, setVisibleKey] = useState("")
  const isVisible = (record) => record.key === visibleKey
  const visibleThat = (record) => {
    setVisibleKey(record.key)
  }
  // Table Visibility Functions

  // Reset Drop Select
  const [isTopSelectFlag, setTopSelectFlag] = useState("")
  // Reset Drop Select

  const [deleteModal, setDeleteModal] = useState(false)

  const data_filters = {
    id: 2,
    label: "My datasets",
    options: [
      "Option 001…",
      "Option 002…",
      "Option 003…",
      "Option 004…",
      "Option 005…",
    ],
  }

  const data_filters_2 = {
    id: 2,
    label: "Clients",
    options: [
      "Option 001…",
      "Option 002…",
      "Option 003…",
      "Option 004…",
      "Option 005…",
    ],
  }

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

  const data_filters_4 = {
    id: 2,
    label: "Public filter groups",
    options: [
      "Option 001…",
      "Option 002…",
      "Option 003…",
      "Option 004…",
      "Option 005…",
    ],
  }

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
    // HIDE - SHOW ITEM
    // {
    //   title: 'Visibility',
    //   key: 'visibility',
    //   render: (_, record) => {
    //     const visible = isVisible(record);
    //     return (
    //       <div className="visible_btns">
    //           <button onClick={visible ? () => setVisibleKey('') : () => visibleThat(record)} className={`icon__btn ${visible ? " visible" : ""} `}><span className={` ${visible ? "cxv-hide-l-icn" : "cxv-view-l-icn"} `}></span></button>
    //       </div>
    //     )
    //   },
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("filters"),
    },
    {
      title: "Filters",
      dataIndex: "filters",
      key: "filters",
      width: 300,
      ...getColumnSearchProps("filters"),
    },
    {
      title: "Survey",
      dataIndex: "survey",
      key: "survey",
      width: 300,
      ...getColumnSearchProps("survey"),
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 300,
      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "Action",
      key: "action",
      width: "180px",
      render: (_, record) => {
        const action = isAction(record)
        return (
            <div className="action_btns"  style={{marginRight: "10px"}}>
              <div className={`drop__btn ${action ? " show" : ""} `}>
                <button
                    className="icon__btn"
                    onClick={
                      action ? () => setActionKey("") : () => openDrop(record)
                    }
                >
                <span
                    ref={ref_custom_table_drop}
                    className="cxv-action-l-icn custom_table_drop"
                ></span>
                </button>
                <div className="drop__menu">
                  <ul style={{border:"1px solid", paddingLeft:"4px", borderRadius:"9px"}}>
                    <li>
                      <button>Edit</button>
                    </li>
                    <li>
                      <button>Create new surveys</button>
                    </li>
                    <li>
                      <button>View in build surveys</button>
                    </li>
                    <li>
                      <button>View results</button>
                    </li>
                    <li>
                      <button>Bespoke setup</button>
                    </li>
                    <li>
                      <button onClick={() => setDeleteModal(true)}>Delete</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        )
      },
    },
  ]

  const data = [
    {
      key: "AB001",
      name: "Name…",
      filters: "Filter type…",
      survey: "Survey…",
      createdAt: "Created at…",
    },
    {
      key: "AB002",
      name: "Name…",
      filters: "Filter type…",
      survey: "Survey…",
      createdAt: "Created at…",
    },
    {
      key: "AB003",
      name: "Name…",
      filters: "Filter type…",
      survey: "Survey…",
      createdAt: "Created at…",
    },
    {
      key: "AB004",
      name: "Name…",
      filters: "Filter type…",
      survey: "Survey…",
      createdAt: "Created at…",
    },
    {
      key: "AB005",
      name: "Name…",
      filters: "Filter type…",
      survey: "Survey…",
      createdAt: "Created at…",
    },
  ]
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  const [topSelect, setTopSelect] = React.useState("FilterGroups")

  return (
      <>
        <DeleteModal
            visibleDatasetModal={deleteModal}
            setDeleteModal={setDeleteModal}
        />
        <LeftFilter
            visibleDrawer={visibleLeftDrawer}
            setVisibleDrawer={setVisibleLeftDrawer}
            setDatasetModal={setDatasetModal}
        />
        <RightFilter
            visibleDrawer={visibleRightDrawer}
            setVisibleDrawer={setVisibleRightDrawer}
        />

        <DatasetModal
            visibleDatasetModal={visibleDatasetModal}
            setDatasetModal={setDatasetModal}
        />
        <DatasetModalLarge
            visibleDatasetModal={visibleDatasetModalLarge}
            setDatasetModal={setDatasetModalLarge}
        />

        <LoaderPage />

        <div className="container-fluid">
          <div className="row clearfix top-info">
            <div className="col-lg-12">
              {/* <div id="breadcrumb__dashboard">
                    <ul>
                        <li className="breadcrumb-item_dashboard"><a href="#!">Breadcrump first</a></li>
                        <li className="breadcrumb-item_dashboard"><a href="#!">Breadcrump second</a></li>
                    </ul>
                </div> */}
              <h1>Custom filters</h1>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="top__filter-dashboard b-t-b">
                {/* Left */}
                <div className="left__side">
                  <div className="left__item">
                    <div className="labeled_custom_select default">
                      <label className="dashboard_radio">
                        <input
                            type="radio"
                            name="dd1"
                            value="FilterGroups"
                            checked={topSelect === "FilterGroups" ? "checked" : ""}
                            onChange={() => setTopSelect("FilterGroups")}
                        />
                        <span className="label-_text">Filter groups</span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div
                      className={`left__item ${
                          topSelect === "FilterGroups" ? " " : " closed"
                      }`}
                  >
                    <DropMenuRadio
                        data={data_filters_4}
                        setTopSelectFlag={setTopSelectFlag}
                        isTopSelectFlag={isTopSelectFlag}
                    />
                  </div>
                  <div className="h_divider qq"></div>
                  <div className="left__item">
                    <div className="labeled_custom_select default">
                      <label className="dashboard_radio">
                        <input
                            type="radio"
                            name="dd1"
                            value="Datasets"
                            checked={topSelect === "Datasets" ? "checked" : ""}
                            onChange={() => setTopSelect("Datasets")}
                        />
                        <span className="label-_text">Datasets</span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div
                      className={`left__item ${
                          topSelect === "Datasets" ? " " : " closed"
                      }`}
                  >
                    <DropMenuRadio
                        data={data_filters}
                        setTopSelectFlag={setTopSelectFlag}
                        isTopSelectFlag={isTopSelectFlag}
                    />
                  </div>
                  <div className="h_divider qq"></div>
                  <div className="left__item">
                    <button className="btn-dash drop has-icn">
                      Delete
                      <span className="cxv-delete-l-icn"></span>
                    </button>
                  </div>
                </div>

                {/* Right */}
                <div className="right__side">
                  <div className="right__item">
                    <button
                        onClick={() => setDatasetModalLarge(true)}
                        className="btn-dash drop has-icn"
                    >
                      Create new
                      <span className="cxv-create-l-icn"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n_table has__filter">
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default CustomFilters
