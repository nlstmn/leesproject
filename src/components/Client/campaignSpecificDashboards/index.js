import React, { useState, useEffect, useLayoutEffect } from "react"
import axios from "axios"
import { campaignClosedDetailsAction } from "../../../actions/clientActions"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import { Table } from "antd"
import { customfilter } from "../../../util/functions"
import Progress from "./components/progress"
import Details from "./components/details"
import Tabs from "./components/tabs"
import LoaderLarge from "../../common/LoaderLarge"
import {
  campaignCommonPart,
  campaignFilter,
  campaignSectionAll,
} from "../../common/commonComponents/CommonBlocks"
const CampaignClosedDetails = () => {
  const dispatch = useDispatch()
  const {
    data,
    commentData,
    stats,
    rates,
    basicBarData,
    heatData,
    heatBufferData,
    bufferRates,
    campaignDetails,
    basicBufferData,
    bufferCommentData,
    trends,
    bufferTrends,
    error,
  } = useSelector((store) => store.campaignClosedDetails)
  //let history = useHistory();
  useEffect(() => {
    if (
      window.location.pathname === "/campaign-details" &&
      document.querySelector("#campaigns-_link") !== null
    ) {
      document.querySelector("#campaigns-_link").classList.add("active")
    }
  }, [])
  const search = window.location.search
  const params = new URLSearchParams(search)
  const campaign_id = params.get("campaign_id")
    ? params.get("campaign_id")
    : window.history.back()
  console.log(campaign_id)

  const [chartType, setChartType] = useState("bar-chart")
  const [categoryType, setCategoryType] = useState("breakdown")

  const [selectedModule, setSelectedModule] = useState([])

  const [orderBy, setOrderBy] = useState("positivity")

  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState("")

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  useLayoutEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    query.length > 3 &&
      customfilter(
        query,
        commentData,
        ["locationType", "question", "section_label", "message"],
        bufferCommentData
      )
  }, [query])

  const columns = [
    {
      title: "Location",
      dataIndex: "locationType",
      key: "locationType",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Section",
      dataIndex: "section_label",
      key: "section_label",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ]
  const getData = () => {
    let fdata = {
      page: "campaigns",
      campaign_id: campaign_id,
    }
    dispatch(campaignClosedDetailsAction({ fdata }))

    setLoading(false)

    if (error) {
      sessionStorage.removeItem("filterData")
      window.location.reload(false)
    }
  }

  useEffect(() => {
    filter(selectedModule)
  }, [selectedModule])

  const filter = (module) => {
    if (basicBarData.sections) {
      if (module === "all") {
        campaignSectionAll(
          basicBarData,
          heatData,
          rates,
          trends,
          basicBufferData,
          heatBufferData,
          bufferRates,
          bufferTrends
        )
      } else {
        campaignFilter(
          module,
          basicBarData,
          heatData,
          rates,
          trends,
          basicBufferData,
          heatBufferData,
          bufferRates,
          bufferTrends
        )
      }
    }
  }

  return (
    <>
      {loading && <LoaderLarge />}
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-6 col-sm-12 scroll-_hidden">
              <h1>{truncate(data && data.title, 35)}</h1>
            </div>

            {/* FİLTRELEME SEÇENEKLERİ */}
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-3 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-357 campaign-score-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Campaign score</h2>
                    <p className="small-_info">
                      Percentage of total positive responses to all questions in
                      the campaign
                    </p>
                  </div>
                  {/* <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="iconx-filter_list"></i></a>
                        </li>
                    </ul> */}
                </div>

                <div className="row text-center">
                  <Progress data={data} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-357">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">
                      {campaignDetails?.always_on
                        ? "Overview"
                        : "Campaign details"}
                    </h2>
                  </div>
                </div>

                <Details campaignDetails={campaignDetails} data={data} />
              </div>
            </div>
          </div>

          {data.available &&
          (!moment(campaignDetails.end_date).isBefore(moment()) ||
            campaignDetails.always_on) ? (
            <div className="col-lg-12 col-md-12 leesman-section">
              <div className="card">
                <div className="body min-h-alldata-campaigns">
                  <div className="row text-center">
                    <Tabs
                      setCategoryType={setCategoryType}
                      setChartType={setChartType}
                      categoryType={categoryType}
                      bufferCommentData={bufferCommentData}
                      query={query}
                      setQuery={setQuery}
                      campaignDetails={campaignDetails}
                    />

                    {categoryType !== "comments" && (
                      <div className="col-lg-3 pt-40">
                        <div className="col-lg-12 col-md-12 text-leftt pt-20">
                          {/* FOR ALWAYS ON */}
                          {categoryType === "trends" ? (
                            <>
                              <label className="fancy-radio min-w-168">
                                <input
                                  onClick={() =>
                                    setChartType("individual-chart")
                                  }
                                  type="radio"
                                  name="chart-type"
                                  value="individual-chart"
                                  checked={
                                    chartType === "individual-chart"
                                      ? "checked"
                                      : ""
                                  }
                                />
                                <span className="light-black">
                                  <i></i>Individual
                                </span>
                              </label>
                              <label
                                onClick={() => setChartType("combined-chart")}
                                className="fancy-radio min-w-168"
                              >
                                <input
                                  type="radio"
                                  name="chart-type"
                                  value="combined-chart"
                                  checked={
                                    chartType === "combined-chart"
                                      ? "checked"
                                      : ""
                                  }
                                />
                                <span className="light-black">
                                  <i></i>Combined
                                </span>
                              </label>
                            </>
                          ) : (
                            <></>
                          )}

                          {categoryType === "breakdown" && (
                            <>
                              <label className="fancy-radio min-w-168">
                                <input
                                  onClick={() => setChartType("bar-chart")}
                                  type="radio"
                                  name="chart-type"
                                  value="bar-chart"
                                  checked={
                                    chartType === "bar-chart" ? "checked" : ""
                                  }
                                />
                                <span className="light-black">
                                  <i></i>Bar chart view
                                </span>
                              </label>
                              <label
                                onClick={() => setChartType("stacked-chart")}
                                className="fancy-radio min-w-168"
                              >
                                <input
                                  type="radio"
                                  name="chart-type"
                                  value="stacked-chart"
                                  checked={
                                    chartType === "stacked-chart"
                                      ? "checked"
                                      : ""
                                  }
                                />
                                <span className="light-black">
                                  <i></i>Stacked chart view
                                </span>
                              </label>
                            </>
                          )}

                          {categoryType === "internal" && (
                            <>
                              <label className="fancy-radio min-w-168">
                                <input
                                  onClick={() => setChartType("heat-map")}
                                  type="radio"
                                  name="chart-type"
                                  value="heat-map"
                                  checked={
                                    chartType === "heat-map" ? "checked" : ""
                                  }
                                />
                                <span className="light-black">
                                  <i></i>Heat map view
                                </span>
                              </label>
                              <label
                                onClick={() => setChartType("range-scores")}
                                className="fancy-radio min-w-168"
                              >
                                <input
                                  type="radio"
                                  name="chart-type"
                                  value="range-scores"
                                  checked={
                                    chartType === "range-scores"
                                      ? "checked"
                                      : ""
                                  }
                                />
                                <span className="light-black">
                                  <i></i>Range of scores view
                                </span>
                              </label>
                            </>
                          )}
                        </div>

                        <div className="col-lg-12 col-md-12 text-leftt pt-20">
                          <h2 className="card-title mb-0 ">Filter</h2>
                        </div>

                        <div className="col-lg-12 col-md-12 pt-10">
                          <div className="form-group text-leftt">
                            <label className="text-leftt light-black">
                              Sections
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => {
                                setSelectedModule(e.target.value)
                              }}
                            >
                              <option value="all">All</option>
                              {[...new Set(basicBarData.sections)].map(
                                (item) => {
                                  return <option value={item}>{item}</option>
                                }
                              )}
                            </select>
                          </div>
                        </div>
                        {categoryType === "breakdown" && (
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group text-leftt">
                              <label className="text-leftt light-black">
                                Order by
                              </label>
                              <select
                                onChange={(e) => setOrderBy(e.target.value)}
                                value={orderBy}
                                className="form-control"
                              >
                                <option value="alphabetical">
                                  Alphabetical
                                </option>
                                <option value="positivity">Positivity</option>
                                <option value="positivity_desc">
                                  Positivity (Decreasing)
                                </option>
                                <option value="responses">Responses</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {chartType !== "comments" ? (
                      campaignCommonPart(
                        chartType,
                        loading,
                        orderBy,
                        basicBufferData,
                        heatBufferData,
                        bufferRates,
                        bufferTrends
                      )
                    ) : (
                      <div className="col-lg-12 pt-20 scrollable-_charts">
                        {chartType === "comments" && (
                          <Table
                            dataSource={bufferCommentData}
                            columns={columns}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="col-md-12 col-sm-12">
                <h2 className="card-title mb-fix mb-0">Campaign breakdown</h2>
                <nav className="d-flex text-muted top-icons-bar float-rightt">
                  <a className="icon mr-3">
                    <i className="iconx-brightness_1 icon-red" /> 0.0 - 20.0%
                  </a>
                  <a className="icon mr-3">
                    <i className="iconx-brightness_1 icon-orange" /> 20.1 -
                    40.0%
                  </a>
                  <a className="icon mr-3">
                    <i className="iconx-brightness_1 icon-orange-soft" /> 40.1 -
                    60.0%
                  </a>
                  <a className="icon mr-3">
                    <i className="iconx-brightness_1 icon-green-soft" /> 60.1 -
                    80.0%
                  </a>
                  <a className="icon mr-3">
                    <i className="iconx-brightness_1 icon-green" /> 80.1 -
                    100.0%
                  </a>
                </nav>
              </div>
              {data &&
                stats &&
                rates &&
                rates.questions.map((i) => {
                  return (
                    <>
                      <div className="col-xl-3 col-lg-4 col-md-12  leesman-section  text-center">
                        <div className="card">
                          <div className="body min-h-290">
                            <p className="question-text">{i.heading}</p>
                            <div className="score-section">
                              <div className="row clearfix">
                                <div className="col-6">
                                  <h6 className="score-title-left">
                                    Current score
                                  </h6>
                                </div>
                                <div className="col-6">
                                  <h6 className="score-title-right">
                                    {i.score}%
                                  </h6>
                                </div>
                              </div>

                              <div className="progress progress-xs">
                                <div
                                  className="progress-bar progress-bar-green"
                                  role="progressbar"
                                  aria-valuenow={60}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  style={{ width: i.score + "%" }}
                                ></div>
                              </div>
                            </div>

                            <div className="response-section">
                              <div className="row clearfix">
                                <div className="col-6">
                                  <h6 className="score-title-left">
                                    Response rate
                                  </h6>
                                </div>
                                <div className="col-6">
                                  <h6 className="score-title-right">
                                    {i.rate}%
                                  </h6>
                                </div>
                              </div>

                              <div className="progress progress-xs">
                                <div
                                  className="progress-bar progress-bar-white"
                                  role="progressbar"
                                  aria-valuenow={60}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  style={{ width: i.rate + "%" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CampaignClosedDetails
