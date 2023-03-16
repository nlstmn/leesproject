import React, { useState } from "react"
import { Table } from "antd"

const SummarySettings = ({ setMenu, setMenuSub, isMenu, isMenuSub, goTop }) => {
  const columns = [
    {
      title: "Admin section",
      dataIndex: "adminSection",
      key: "adminSection",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      render: (_, { summary }) => (
        <>
          <ul>
            {summary.map((tag) => {
              return <li>{tag}</li>
            })}
          </ul>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        return (
          <div className="action_btns status">
            <span
              className={`cxv-${
                text === "complete"
                  ? "status-complete-active-l-icn"
                  : "status-complete-l-icn"
              } `}
            ></span>
            <span
              className={`cxv-${
                text === "cancel"
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

  const data = [
    {
      key: "AB001",
      adminSection: "General setup",
      url: "General",
      sub_url: "",
      description: "Initial general setup",
      summary: ["…", "…"],
      status: "complete",
    },
    {
      key: "AB002",
      adminSection: "Campaign modules",
      url: "Campaign modules",
      sub_url: "",
      description:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.",
      summary: ["…", "…"],
      status: "cancel",
    },
    {
      key: "AB003",
      adminSection: "Demographics",
      url: "Demographics",
      sub_url: "",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      summary: ["…", "…"],
      status: "complete",
    },
    {
      key: "AB004",
      adminSection: "Locations",
      url: "Target",
      sub_url: "",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
      summary: ["…", "…"],
      status: "cancel",
    },
    {
      key: "AB005",
      adminSection: "Departments",
      url: "Target",
      sub_url: "",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
      summary: ["…", "…"],
      status: "cancel",
    },
    {
      key: "AB006",
      adminSection: "Regions",
      url: "Target",
      sub_url: "",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
      summary: ["…", "…"],
      status: "cancel",
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
              <div className="n_table respo">
                <Table columns={columns} dataSource={data} pagination={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SummarySettings
