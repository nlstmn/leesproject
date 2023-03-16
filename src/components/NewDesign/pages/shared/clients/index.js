import { Table } from "antd"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import Highlighter from "react-highlight-words"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { clientsManagementAction } from "../../../../../actions/adminActions"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import LoaderPage from "../../../elements/loader_page"
import DeleteModal from "../../../elements/modal_delete"
import TopFilter from "../../../elements/top_filter_dashboard"

import {
  editClient,
  saveClientIdForSurveys,
  saveMenuIndex,
  saveMenuIndexSub,
  saveRowData,
} from "../../../../../actions/clientManagement"

const ClientManagementAdmin = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])
  // Search Parameters for "clientId"
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id") ? params.get("client_id") : 0

  const dispatch = useDispatch()
  const { loading, clientList, totalClientsCount, clientsCountWithParameter } =
    useSelector((store) => store.clientsManagement)

  // Table Drop Functions
  const [actionKey, setActionKey] = useState("")
  const [letterOne, setLetterOne] = useState("")
  const [letterTwo, setLetterTwo] = useState("")

  const isAction = (record) => record.client_id === actionKey
  const openDrop = (record) => setActionKey(record.client_id)

  const ref_clients_table_drop = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.classList.contains("clients_table_drop")) {
        setActionKey("")
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [setActionKey])

  // Reset Drop Select
  const [isTopSelectFlag, setTopSelectFlag] = useState("")
  // Reset Drop Select
  const [deleteModal, setDeleteModal] = useState(false)

  //   Custom ANT Filter
  const [searchText, setSearchText] = useState("")
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: clientsCountWithParameter,
      showSizeChanger: false,
    },
  })

  const refreshTable = () => {
    dispatch(
      clientsManagementAction({
        pageId: tableParams.pagination.current,
        letterOne,
        letterTwo,
        searchKey: searchText,
        clientId: clientId,
      })
    )
  }

  useEffect(() => {
    refreshTable()
  }, [JSON.stringify(tableParams)])

  useEffect(() => {
    if (tableParams.pagination.current !== 1) {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          current: 1,
        },
      })
    } else {
      refreshTable()
    }
  }, [searchText, letterOne, letterTwo])

  useEffect(() => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        total: clientsCountWithParameter,
      },
    })
  }, [clientsCountWithParameter])

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })

    // `dataSource` is useless since `pageSize` changed
    /* if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    } */
  }

  const columns = [
    {
      title: "Client ID",
      dataIndex: "client_id",
      key: "client_id",
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      render: (text) =>
        searchText ? (
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
    },
    {
      title: "Reference Code",
      dataIndex: "client_ref_no",
      key: "client_ref_no",
      render: (text) =>
        searchText ? (
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
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      render: (text) =>
        searchText ? (
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
    },
    {
      title: "Location Count",
      dataIndex: "location_count",
      key: "location_count",
      render: (text) =>
        searchText ? (
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
    },
    {
      title: "User Count",
      dataIndex: "user_count",
      key: "user_count",
      render: (text) =>
        searchText ? (
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
    },
    {
      title: "Survey Count",
      dataIndex: "survey_count",
      key: "survey_count",
      render: (text) =>
        searchText ? (
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
    },
    {
      title: "Action",
      key: "action",
      width: "80px",
      render: (text, record) => {
        const action = isAction(record)
        return (
          <div className="action_btns">
            <div className={`drop__btn ${action ? " show" : ""} `}>
              <button
                className="icon__btn"
                onClick={
                  action
                    ? () => {
                        setActionKey("")
                      }
                    : () => {
                        openDrop(record)
                      }
                }
              >
                <span
                  ref={ref_clients_table_drop}
                  className="cxv-action-l-icn clients_table_drop"
                ></span>
              </button>
              <div className="drop__menu">
                <ul>
                  <li>
                    <Link
                      to="/client-settings"
                      onClick={() => {
                        // Routing Client Settings and Sub Menu Dispatches Will Be Here
                        dispatch(saveMenuIndex("Surveys"))
                        dispatch(saveMenuIndexSub(null))
                        dispatch(saveClientIdForSurveys(record["client_id"]))
                        dispatch(saveRowData(record))
                        dispatch(editClient())
                      }}
                    >
                      Surveys
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/client-settings"
                      onClick={() => {
                        dispatch(saveClientIdForSurveys(record["client_id"]))
                        dispatch(saveRowData(record))
                        dispatch(editClient())
                        dispatch(saveMenuIndex("Main"))
                        dispatch(saveMenuIndexSub(null))
                      }}
                    >
                      Edit
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setDeleteModal(true)
                        saveClientIdForSurveys(record["client_id"])
                      }}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
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
            <h1>Client management</h1>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12">
            <TopFilter
              setTopSelectFlag={setTopSelectFlag}
              isTopSelectFlag={isTopSelectFlag}
              isClientPage={true}
              // Filter items
              isExport={true}
              isSearchClients={true}
              isSearchAlphabetical={true}
              isCreateNew={true}
              setLetterOne={setLetterOne}
              setLetterTwo={setLetterTwo}
              searchText={searchText}
              setSearchText={setSearchText}
              totalClientsCount={totalClientsCount}
              clientsCountWithParameter={clientsCountWithParameter}
            />
          </div>
          <div className="col-lg-12">
            <div className="n_table has__filter">
              <Table
                columns={columns}
                rowKey={(record) => record.client_id}
                dataSource={clientList}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientManagementAdmin
