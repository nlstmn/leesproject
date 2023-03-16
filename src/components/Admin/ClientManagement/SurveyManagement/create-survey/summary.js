import React, { useState, useRef, useEffect } from "react"
import { Table, Popconfirm } from "antd"
import moment from "moment"

const Summary = ({
  initData,
  setInitData,
  surveyId,
  clientId,
  formData,
  setFormData,
  close,
  send,
}) => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  const [summaryData, setSummaryData] = useState([])
  const [readyToLive, setReadyToLive] = useState(false)
  const [deleteOldData, setDeleteOldData] = useState(true)

  useEffect(() => {
    console.log(
      initData?.parts?.map((p) => {
        return {
          part: p.title,
          state: formData?.summary
            ?.filter((f) => f.survey_part_id === p.id)
            .sort((b, a) => new Date(a.created_at) - new Date(b.created_at)),
        }
      })
    )
  }, [formData])

  const columns = [
    {
      title: "Survey part",
      dataIndex: "part",
      render: (text) => {
        return text?.capitalize()
      },
    },
    {
      title: "User",
      dataIndex: "user",
      render: (text) => {
        return text?.capitalize()
      },
    },
    {
      title: "State",
      dataIndex: "state",
      render: (text) => {
        return text?.capitalize()
      },
    },
  ]
  const columnsLog = [
    {
      title: "User",
      dataIndex: "user",
    },
    {
      title: "Survey part",
      dataIndex: "part",
      render: (text) => {
        return text?.capitalize()
      },
    },
    {
      title: "Date",
      dataIndex: "created_at",
    },
    {
      title: "Details",
      dataIndex: "details",
      render: (text) => {
        return text?.capitalize()
      },
    },
    {
      title: "State",
      dataIndex: "state",
      render: (text) => {
        return text?.capitalize()
      },
    },
  ]
  useEffect(() => {
    setSummaryData(
      initData?.parts
        ?.filter((i) => i.title !== "summary")
        .map((p) => {
          let lastLog = formData?.summary
            ?.filter((f) => f.survey_part_id === p.id)
            .sort((b, a) => new Date(a.created_at) - new Date(b.created_at))[0]
          return {
            part: p.title,
            user: lastLog?.user,
            state: lastLog?.state || "Not initilased",
          }
        })
    )
  }, [initData])
  useEffect(() => {
    console.log(summaryData)
    setReadyToLive(
      summaryData?.length ===
        summaryData?.filter((i) => i.state === "saved")?.length
    )
  }, [summaryData])
  return (
    <>
      <div className="aspect-tab ">
        <label htmlFor="item-3" className="aspect-label"></label>
        <div className="aspect-content">
          <div className="aspect-info">
            <div className="tab-_status green"></div>
            <span className="aspect-name">Summary</span>
          </div>
        </div>
        <div className="">
          <div className="sentiment-wrapper">
            <div className="row clearfix">
              {/* <div className="col-lg-8 col-md-12">
                <Table bordered dataSource={formData?.summary} columns={columnsLog} />
              </div> */}
              <div className="col-lg-12 col-md-12">
                <Table bordered dataSource={summaryData} columns={columns} />
              </div>
              <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                &nbsp;&nbsp; &nbsp;&nbsp;
                <button
                  onClick={() => {
                    close()
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Close
                </button>
                {readyToLive && formData?.general?.status !== "live" && (
                  <>
                    <label className="fancy-checkbox">
                      <input
                        type="checkbox"
                        checked={deleteOldData}
                        onChange={() => {
                          setDeleteOldData(!deleteOldData)
                        }}
                      />
                      <span className="light-black">
                        <i></i>
                        Delete old user data
                      </span>
                    </label>
                    <Popconfirm
                      placement="bottom"
                      title={`Are you sure to launch this survey and make it 'Live'`}
                      onConfirm={() => {
                        send("general", {
                          ...formData.general,
                          live: true,
                          deleteOldData: deleteOldData,
                        })
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        style={{ marginLeft: "15px" }}
                      >
                        Launch survey
                      </button>
                    </Popconfirm>
                  </>
                )}
                {formData?.cacheDate && formData?.cacheDate[0]?.updated_at && (
                  <div className="float-right">
                    <span>
                      Cache Updated:
                      {formData?.cacheDate &&
                        formData?.cacheDate[0]?.updated_at}
                    </span>
                    <br></br>

                    <span>
                      Cache Created:
                      {formData?.cacheDate &&
                        formData?.cacheDate[0]?.created_at}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => {
                    send("update_cache", [])
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Update cache
                </button>
                {formData?.cacheDate && formData?.cacheDate[0]?.updated_at && (
                  <button
                    onClick={() => {
                      send("delete_cache", [])
                    }}
                    className="btn btn-sm btn-primary ml-2 float-l"
                  >
                    Delete cache
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Summary
