import React, { useState } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getOtherSurveySetupAction,
  getSurveySetupAction,
} from "../../../../../../../actions/adminActions"
const SummarySettings = ({ setMenu, setMenuSub, isMenu, isMenuSub, goTop }) => {
  const dispatch = useDispatch()
  const dataSelector = useSelector(
    (store) => store.getOtherSurveySetupData?.data?.logs
  )
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)

  const getData = () => {
    dispatch(
      getOtherSurveySetupAction({
        clientId: clientId,
        tab: "summary",
        surveyId: surveyId,
      })
    )
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      title: "Admin section",
      dataIndex: "section",
      key: "section",
      render: (text) => {
        return <span className="cxv-bold">{text?.capitalize()}</span>
      },
    },
    {
      title: "Description",
      dataIndex: "details",
      key: "details",
      render: (text) => {
        //show first 50 characters
        return (
          <span className="cxv-bold">
            {text?.length
              ? text?.length > 50
                ? text?.substring(0, 50) + "..."
                : text
              : "Not set"}
          </span>
        )
      },
    },
    // ASK WHAT DATA SHOULD BE IN THIS COLUMN
    // {
    //   title: "Summary",
    //   dataIndex: "summary",
    //   key: "summary",
    //   render: (text) => {
    //
    //   },
    // },
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      render: (text) => {
        return (
          <div className="action_btns status">
            <span
              className={`cxv-${
                text === "saved"
                  ? "status-complete-active-l-icn"
                  : "status-complete-l-icn"
              } `}
            ></span>
            <span
              className={`cxv-${
                !text || text === "drafted"
                  ? "status-incomplete-active-l-icn"
                  : "status-incomplete-l-icn"
              } `}
            ></span>
          </div>
        )
      },
    },
    {
      title: "Edit",
      key: "action",
      render: (_, record) => {
        return (
          <div className="action_btns">
            <button
              onClick={() => {
                setMenu(record.url)
                setMenuSub(record.sub_url)
                goTop()
              }}
              className="btn-dash-export"
            >
              <span className="cxv-edit-l-icn"></span>
            </button>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <div className="n__card hast__table mt-0">
        <div className="n__body">
          <h3 className="">Summary</h3>
          <br />
          <div className="fixed_infos mb-2">
            <span className="card_desc info">
              <strong>
                <span className="iconx-info-with-circle"></span> Cache info:
              </strong>
              <span className="text-muted">
                <b>Updated:</b> 05.09.2022 - 18:20
              </span>
              &nbsp;&nbsp;-&nbsp;&nbsp;
              <span className="text-muted">
                <b>Created:</b> 05.09.2022 - 18:40
              </span>
            </span>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="n_table respo pd_table">
                <Table
                  columns={columns}
                  dataSource={dataSelector}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SummarySettings
