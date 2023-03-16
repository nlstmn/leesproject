import React, { useEffect, useState } from "react"
import AdvancedFilter from "../common/AdvancedFilter"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../common/Loader"
import LoaderLarge from "../common/LoaderLarge"
import NoData from "../common/noData"
import { customfilter } from "../../util/functions"
import {
  campaignCommentsSearchPart,
  campaignCommonPart,
  campaignFilter,
  campaignSectionAll,
} from "../common/commonComponents/CommonBlocks"

import {
  CampaignBasicBufferAllDataAction,
  CampaignBufferCommentAllDataAction,
  CampaignBufferRatesAllDataAction,
  CampaignCommentAllDataAction,
  CampaignStatsAllDataAction,
  CampaignRatesAllDataAction,
  CampaignBarAllDataAction,
  CampaignHeatAllDataAction,
  CampaignHeatBufferAllDataAction,
} from "../../actions/adminActions"

const CampaignAllData = () => {
  const dispatch = useDispatch()
  const { basicBufferData } = useSelector(
    (store) => store.CampaignBasicBufferAllData
  )
  const { bufferCommentData } = useSelector(
    (store) => store.CampaignBufferCommentAllData
  )
  const { bufferRates } = useSelector(
    (store) => store.CampaignBufferRatesAllData
  )
  const { commentData } = useSelector((store) => store.CampaignCommentAllData)
  const { stats } = useSelector((store) => store.CampaignStatsAllData)
  const { rates } = useSelector((store) => store.CampaignRatesAllData)
  const { basicBarData } = useSelector((store) => store.CampaignBarAllData)
  const { heatData } = useSelector((store) => store.CampaignHeatAllData)
  const { heatBufferData } = useSelector(
    (store) => store.CampaignHeatBufferAllData
  )

  useEffect(() => {
    if (
      window.location.pathname === "/all-campaigns" &&
      document.querySelector("#campaigns-_link") !== null
    ) {
      document.querySelector("#campaigns-_link").classList.add("active")
    }
  }, [])

  const [chartType, setChartType] = useState("bar-chart")
  const [categoryType, setCategoryType] = useState("breakdown")

  const [selectedModule, setSelectedModule] = useState([])
  const [loading, setLoading] = useState(true)

  const [filterData, setFilterData] = useState([])

  const [dataType, setDataType] = useState("modules")
  const [orderBy, setOrderBy] = useState("positivity")
  const [query, setQuery] = useState("")
  const [trends, setTrends] = useState([])
  const [bufferTrends, setBufferTrends] = useState([])

  const columns = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
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
  useEffect(() => {
    query.length > 3 &&
      customfilter(
        query,
        commentData,
        ["locationType", "question", "section_label", "message"],
        basicBufferData
      )
  }, [query])

  useEffect(() => {
    console.log(filterData)
    filterData?.start && getData()
  }, [filterData])
  const getData = () => {
    const lData = {
      ...filterData,
      page: "campaigns",
    }

    dispatch(CampaignBasicBufferAllDataAction({ lData }))
    dispatch(CampaignBufferCommentAllDataAction({ lData }))
    dispatch(CampaignBufferRatesAllDataAction({ lData }))
    dispatch(CampaignCommentAllDataAction({ lData }))
    dispatch(CampaignStatsAllDataAction({ lData }))
    dispatch(CampaignRatesAllDataAction({ lData }))
    dispatch(CampaignBarAllDataAction({ lData }))
    dispatch(CampaignHeatAllDataAction({ lData }))
    dispatch(CampaignHeatBufferAllDataAction({ lData }))

    sessionStorage.removeItem("filterData")
    window.location.reload(false)
  }

  useEffect(() => {
    filter(selectedModule)
  }, [selectedModule])

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a className="s-a-font">Previous</a>
    }
    if (type === "next") {
      return <a className="s-a-font">Next</a>
    }
    return originalElement
  }

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
          setBufferTrends
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
          setBufferTrends
        )
      }
    }
  }

  return (
    <>
      {loading ? <LoaderLarge /> : <></>}

      <div className="container-fluid new-2022_class">
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-3 col-sm-12">
              <h1>All data</h1>
            </div>
            {/* FİLTRELEME SEÇENEKLERİ */}

            <AdvancedFilter setComponentFilterData={setFilterData} />
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-md-12 col-sm-12 mb-3">
            <ul className="nav">
              <li className="nav-item mr--8">
                <a
                  className={`btn btn-default btn-block chartcategory-btn ${
                    dataType === "modules" ? "active" : ""
                  }`}
                  onClick={() => setDataType("modules")}
                >
                  Modules
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`btn btn-default btn-block chartcategory-btn ${
                    dataType === "groups" ? "active" : ""
                  }`}
                  onClick={() => setDataType("groups")}
                >
                  Question groups
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-431 campaign-score-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Headline stats</h2>
                  </div>
                </div>

                <div className="row headline-stat-closed pt-80">
                  <div className="col-lg-6 col-sm-12 max-h-200">
                    <h4 className="font-16r text-white text-leftt">
                      {stats?.responses}
                    </h4>
                    <label className="mb-0 text-leftt">Responses</label>
                  </div>
                  <div className="col-lg-6 col-sm-12 max-h-200">
                    <h4 className="font-16r text-white  text-leftt">
                      {stats?.respondents}
                    </h4>
                    <label className="mb-0  text-leftt">Respondents</label>
                  </div>
                  <div className="col-lg-6 col-sm-12 max-h-200 pt-40">
                    <h4 className="font-16r text-white  text-leftt">
                      {stats?.departments}
                    </h4>
                    <label className="mb-0  text-leftt">Departments</label>
                  </div>
                  <div className="col-lg-6 col-sm-12 max-h-200 pt-40">
                    <h4 className="font-16r text-white  text-leftt">
                      {stats?.locations}
                    </h4>
                    <label className="mb-0  text-leftt">Locations</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-431">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">
                      {dataType === "modules" ? "Modules" : "Question groups"}
                    </h2>
                  </div>
                </div>

                {/* Modules SECTION */}
                {dataType === "groups" ? (
                  <>
                    <div className="row text-center campaigns-details">
                      <div className="col-lg-6">
                        <label className="mb-0 text-leftt bold-it pt-20">
                          Highest response rates
                        </label>
                        {loading ? (
                          <Loader />
                        ) : (
                          <div className="responses-_sc">
                            {rates &&
                            rates.questions &&
                            rates.questions &&
                            rates.questions.length >= 1 ? (
                              <>
                                {rates &&
                                  rates.questions &&
                                  rates.questions
                                    .sort(
                                      (a, b) =>
                                        parseInt(b.rate) - parseInt(a.rate)
                                    )
                                    .slice(0, 6)
                                    .map((i) => {
                                      return (
                                        <div className="response-section pb--23">
                                          <div className="row clearfix">
                                            <div className="col-6">
                                              <h6 className="score-title-left">
                                                {i.heading}
                                              </h6>
                                            </div>
                                            <div className="col-6">
                                              <h6 className="score-title-right">
                                                {i.rate + "%"}
                                              </h6>
                                            </div>
                                          </div>

                                          {/* BURADAKİ PROGRESSBAR DA YER ALAN WIDTH DEĞERİ DE ÜSTTEKİ YÜZDE DEĞERİ ALACAK - WIDTH DEĞİŞİNCE ÇUBUK OTOMATİK ARTIP AZALIYOR */}
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
                                      )
                                    })}
                              </>
                            ) : (
                              <NoData />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="col-lg-6">
                        <label className="mb-0 text-leftt bold-it pt-20">
                          Highest / lowest scores
                        </label>
                        {loading ? (
                          <Loader />
                        ) : (
                          <div className="responses-_sc">
                            {rates &&
                            rates.questions &&
                            rates.questions &&
                            rates.questions.length >= 1 ? (
                              <>
                                {rates &&
                                  rates.questions &&
                                  rates.questions
                                    .sort(
                                      (a, b) =>
                                        parseInt(b.score) - parseInt(a.score)
                                    )
                                    .getFirstandLastThree()
                                    .map((i) => {
                                      return (
                                        <div className="response-section pb--23">
                                          <div className="row clearfix">
                                            <div className="col-6">
                                              <h6 className="score-title-left">
                                                {i.heading}
                                              </h6>
                                            </div>
                                            <div className="col-6">
                                              <h6 className="score-title-right">
                                                {i.score + "%"}
                                              </h6>
                                            </div>
                                          </div>

                                          {/* BURADAKİ PROGRESSBAR DA YER ALAN WIDTH DEĞERİ DE ÜSTTEKİ YÜZDE DEĞERİ ALACAK - WIDTH DEĞİŞİNCE ÇUBUK OTOMATİK ARTIP AZALIYOR */}
                                          <div className="progress progress-xs">
                                            <div
                                              className={`progress-bar ${
                                                i.score > 50
                                                  ? "progress-bar-green"
                                                  : "progress-bar-red"
                                              }`}
                                              role="progressbar"
                                              aria-valuenow={60}
                                              aria-valuemin={0}
                                              aria-valuemax={100}
                                              style={{ width: i.score + "%" }}
                                            ></div>
                                          </div>
                                        </div>
                                      )
                                    })}
                              </>
                            ) : (
                              <NoData />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* QUESTION GROUPS */}

                    <div className="row text-center campaigns-details">
                      <div className="col-lg-12">
                        {loading ? (
                          <Loader />
                        ) : (
                          <div className="responses-_sc">
                            {rates &&
                            rates.sections &&
                            rates.sections &&
                            rates.sections.length >= 1 ? (
                              <>
                                {rates &&
                                  rates.sections &&
                                  rates.sections
                                    .sort(
                                      (a, b) =>
                                        parseInt(b.score) - parseInt(a.score)
                                    )
                                    .map((i) => {
                                      return (
                                        <div className="response-section pb--23 module--list">
                                          <div className="row clearfix">
                                            <div className="col-6">
                                              <h6 className="score-title-left">
                                                {i.heading}
                                              </h6>
                                            </div>
                                            <div className="col-6">
                                              <h6 className="score-title-right">
                                                {i.score + "%"}
                                              </h6>
                                            </div>
                                          </div>

                                          {/* BURADAKİ PROGRESSBAR DA YER ALAN WIDTH DEĞERİ DE ÜSTTEKİ YÜZDE DEĞERİ ALACAK - WIDTH DEĞİŞİNCE ÇUBUK OTOMATİK ARTIP AZALIYOR */}
                                          <div className="progress progress-xs">
                                            <div
                                              className="progress-bar progress-bar-blue"
                                              role="progressbar"
                                              aria-valuenow={60}
                                              aria-valuemin={0}
                                              aria-valuemax={100}
                                              style={{ width: i.score + "%" }}
                                            ></div>
                                          </div>
                                        </div>
                                      )
                                    })}
                              </>
                            ) : (
                              <NoData />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Campaign Breakdown
                    Internal Comparison
                    External Comparison */}

          <div className="col-lg-12 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-alldata-campaigns">
                <div className="row text-center">
                  <div className="col-lg-12">
                    <ul className="nav">
                      <li className="nav-item mr--8 category-margin">
                        <a
                          className={`btn btn-default btn-block chartcategory-btn ${
                            categoryType === "breakdown" ? "active" : ""
                          }`}
                          onClick={() => {
                            setCategoryType("breakdown")
                            setChartType("bar-chart")
                          }}
                        >
                          Campaign breakdown
                        </a>
                      </li>
                      <li className="nav-item mr--8 category-margin">
                        <a
                          className={`btn btn-default btn-block chartcategory-btn ${
                            categoryType === "internal" ? "active" : ""
                          }`}
                          onClick={() => {
                            setCategoryType("internal")
                            setChartType("heat-map")
                          }}
                        >
                          Internal comparison
                        </a>
                      </li>
                      {/* will be here in phase 2 */}
                      {/* <li className="nav-item mr--8 category-margin">
                        <a
                          className={`btn btn-default btn-block chartcategory-btn ${categoryType === "external" ? "active" : ""}`}
                          onClick={() => {
                            setCategoryType("external");
                            setChartType("grouped-bar");
                          }}
                        >
                          External comparison
                        </a>
                      </li> */}
                      <li className="nav-item mr--8 category-margin">
                        <a
                          className={`btn btn-default btn-block chartcategory-btn ${
                            categoryType === "comments" ? "active" : ""
                          }`}
                          onClick={() => {
                            setCategoryType("comments")
                            setChartType("comments")
                          }}
                        >
                          Question comments
                        </a>
                      </li>
                      {categoryType === "comments" &&
                        campaignCommentsSearchPart(
                          bufferCommentData,
                          query,
                          setQuery
                        )}
                    </ul>

                    {categoryType === "trends" ? (
                      <p className="small-_info text-leftt pt-10">
                        Scores over time
                      </p>
                    ) : (
                      ""
                    )}
                    {categoryType === "breakdown" ? (
                      <p className="small-_info text-leftt pt-10">
                        Breakdown of the campaign by question
                      </p>
                    ) : (
                      ""
                    )}
                    {categoryType === "internal" && (
                      <p className="small-_info text-leftt pt-10">
                        Comparison of campaign data between different groups
                      </p>
                    )}
                    {categoryType === "external" && (
                      <p className="small-_info text-leftt pt-10">
                        Comparison of campaign data with other datasets outside
                        this campaign
                      </p>
                    )}
                  </div>

                  <div className="col-lg-3 pt-40">
                    <div className="col-lg-12 col-md-12 text-leftt pt-20">
                      {categoryType === "breakdown" ? (
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
                              <i></i>Question positivity
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
                                chartType === "stacked-chart" ? "checked" : ""
                              }
                            />
                            <span className="light-black">
                              <i></i>Question breakdown
                            </span>
                          </label>
                        </>
                      ) : (
                        <></>
                      )}

                      {categoryType === "internal" ? (
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
                              <i></i>Respondent breakdown
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
                                chartType === "range-scores" ? "checked" : ""
                              }
                            />
                            <span className="light-black">
                              <i></i>Internal range
                            </span>
                          </label>
                        </>
                      ) : (
                        <></>
                      )}

                      {categoryType === "external" ? (
                        <>
                          {/* <label className="fancy-radio min-w-168">
                            <input
                              onClick={() => setChartType("grouped-bar")}
                              type="radio"
                              name="chart-type"
                              value="grouped-bar"
                              checked={chartType === "grouped-bar" ? "checked" : ""}
                            />
                            <span className="light-black">
                              <i></i>Bar chart view
                            </span>
                          </label> */}
                          {/* <label onClick={() => setChartType("spider-chart")} className="fancy-radio min-w-168">
                            <input
                              type="radio"
                              name="chart-type"
                              value="spider-chart"
                              checked={chartType === "spider-chart" ? "checked" : ""}
                            />
                            <span className="light-black">
                              <i></i>Spider chart view
                            </span>
                          </label> */}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    {categoryType !== "comments" && (
                      <>
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
                              {[...new Set(basicBarData?.sections)].map(
                                (item, index) => {
                                  return (
                                    <option key={index} value={item}>
                                      {item}
                                    </option>
                                  )
                                }
                              )}
                            </select>
                          </div>
                        </div>
                      </>
                    )}
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
                            <option value="positivity">Positivity</option>
                            <option value="responses">Responses</option>
                            <option value="alphabetical">Alphabetical</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {chartType !== "comments" ? (
                    campaignCommonPart(
                      chartType,
                      loading,
                      orderBy,
                      basicBufferData,
                      heatBufferData,
                      bufferRates
                    )
                  ) : (
                    <div className="col-lg-12 without-btn-table">
                      {chartType === "comments" ? (
                        <Table
                          pagination={
                            ({ position: ["none", "bottomLeft"] },
                            (itemRender = { itemRender }))
                          }
                          dataSource={bufferCommentData}
                          columns={columns}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CampaignAllData
