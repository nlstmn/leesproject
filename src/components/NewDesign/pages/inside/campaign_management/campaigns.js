import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Space, Table, Button, Input } from "antd"
import Highlighter from "react-highlight-words"
import { Link, NavLink } from "react-router-dom"
import CustomSelect from "../../../elements/custom_select"
import DeleteModal from "../../../elements/modal_delete"
import LoaderPage from "../../../elements/loader_page"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import TopFilter from "../../../elements/top_filter_dashboard"

const CampaignManagement = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  // Table Drop Functions
  const [actionKey, setActionKey] = useState("")
  const isAction = (record) => record.key === actionKey
  const openDrop = (record) => {
    setActionKey(record.key)
  }
  const ref_campaigns_table_drop = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.classList.contains("campaigns_table_drop")) {
        setActionKey("")
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [setActionKey])

  const [deleteModal, setDeleteModal] = useState(false)

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
      title: "Code",
      dataIndex: "key",
      key: "key",
      ...getColumnSearchProps("key"),
    },
    {
      title: "Campaign",
      dataIndex: "campaign",
      key: "campaign",
      ...getColumnSearchProps("campaign"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
      ...getColumnSearchProps("agent"),
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      ...getColumnSearchProps("client"),
    },
    {
      title: "Start date",
      dataIndex: "sDate",
      key: "sDate",
      ...getColumnSearchProps("sDate"),
    },
    {
      title: "End date",
      dataIndex: "eDate",
      key: "eDate",
      ...getColumnSearchProps("eDate"),
    },
    {
      title: "Target population",
      dataIndex: "targetPopulation",
      key: "targetPopulation",
      ...getColumnSearchProps("targetPopulation"),
    },
    {
      title: "Respondents",
      dataIndex: "respondents",
      key: "respondents",
      ...getColumnSearchProps("respondents"),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      ...getColumnSearchProps("score"),
    },
    {
      title: "Action",
      key: "action",
      width: "80px",
      render: (_, record) => {
        const action = isAction(record)
        return (
          <div className="action_btns">
            <div className={`drop__btn ${action ? " show" : ""} `}>
              <button
                className="icon__btn"
                onClick={
                  action ? () => setActionKey("") : () => openDrop(record)
                }
              >
                <span
                  ref={ref_campaigns_table_drop}
                  className="cxv-action-l-icn campaigns_table_drop"
                ></span>
              </button>
              <div className="drop__menu">
                <ul>
                  <li>
                    <Link to="/create-campaigns">Edit</Link>
                  </li>
                  <li>
                    <Link to="/create-campaigns">Create new campaign</Link>
                  </li>
                  <li>
                    <button>View in build campaign</button>
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
      campaign: "Campaign name…",
      description: "Description…",
      agent: "Agent name…",
      client: "Client name…",
      sDate: "20.10.2022",
      eDate: "25.10.2022",
      targetPopulation: 15,
      respondents: 40,
      score: "72%",
    },
    {
      key: "AB002",
      campaign: "Campaign name…",
      description: "Description…",
      agent: "Agent name…",
      client: "Client name…",
      sDate: "20.10.2022",
      eDate: "25.10.2022",
      targetPopulation: 15,
      respondents: 40,
      score: "72%",
    },
    {
      key: "AB003",
      campaign: "Campaign name…",
      description: "Description…",
      agent: "Agent name…",
      client: "Client name…",
      sDate: "20.10.2022",
      eDate: "25.10.2022",
      targetPopulation: 15,
      respondents: 40,
      score: "72%",
    },
    {
      key: "AB004",
      campaign: "Campaign name…",
      description: "Description…",
      agent: "Agent name…",
      client: "Client name…",
      sDate: "20.10.2022",
      eDate: "25.10.2022",
      targetPopulation: 15,
      respondents: 40,
      score: "72%",
    },
    {
      key: "AB005",
      campaign: "Campaign name…",
      description: "Description…",
      agent: "Agent name…",
      client: "Client name…",
      sDate: "20.10.2022",
      eDate: "25.10.2022",
      targetPopulation: 15,
      respondents: 40,
      score: "72%",
    },
  ]

  return (
    <>
      <DeleteModal
        visibleDatasetModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
      <LoaderPage />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard isShow={false} />
            <h1>Campaign management</h1>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12">
            <TopFilter
              // Filter items
              isClosedCampaigns={true}
              AllLiveCampaigns={true}
            />
          </div>

          <div className="col-lg-12">
            <div className="n_table has__filter">
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CampaignManagement
