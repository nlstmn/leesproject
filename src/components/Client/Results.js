import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SiScore from "../common/charts/siScore"
import DonutChart from "../common/charts/donutChart"
import DailyActiveUsers from "../common/charts/dailyActiveUsers"
import AdvancedFilter from "../common/AdvancedFilter"
import ProgressBar from "react-customizable-progressbar"
import { AuthContext } from "../../context/auth"
import { Tooltip } from "antd"
import Loader from "../common/Loader"
import Slider from "react-slick"
import { isMobileOnly } from "react-device-detect"
import LoaderLarge from "../common/LoaderLarge"
import NoData from "../common/noData"
import { resultsActions } from "../../actions/clientActions"
import { useDispatch, useSelector } from "react-redux"

const slideSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: isMobileOnly === true ? 1 : 4,
  slidesToScroll: isMobileOnly === true ? 1 : 4,
}

const Results = (props) => {
  const dispatch = useDispatch()
  const { isLoading, error, avg, donut, campaignCharts, usage, comments } =
    useSelector((store) => store.results)

  const [filterData, setFilterData] = useState([])

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  //let history = useHistory();
  useEffect(() => {
    if (document.querySelector("#campaigns-_link") !== null) {
      document.querySelector("#campaigns-_link") &&
        document.querySelector("#campaigns-_link").classList.remove("active")
    }
    if (document.querySelector("#comments-_link") !== null) {
      document.querySelector("#comments-_link") &&
        document.querySelector("#comments-_link").classList.remove("active")
    }
  }, [])

  const { role } = useContext(AuthContext)

  const getData = () => {
    console.log(props)
    let fdata = { ...filterData, page: "summary" }
    //if there is a parameter from mapbox
    if (props.location.location_id) {
      fdata = {
        ...filterData,
        page: "summary",
        locations: [props.location.location_id],
      }
    }
    dispatch(resultsActions({ fdata }))
  }

  useEffect(() => {
    console.log(filterData)
    filterData?.start && getData()
  }, [filterData])

  useEffect(() => {
    if (error) {
      sessionStorage.removeItem("filterData")
    }
  }, [error])

  function add(accumulator, a) {
    return accumulator + a
  }
  const decideColor = (avg) => {
    return parseFloat(avg).toFixed(1) <= 20
      ? "#bf1717"
      : parseFloat(avg).toFixed(1) > 20 && parseFloat(avg).toFixed(1) <= 40
      ? "#e95c0c"
      : parseFloat(avg).toFixed(1) > 40 && parseFloat(avg).toFixed(1) <= 60
      ? "#FFE054"
      : parseFloat(avg).toFixed(1) > 60 && parseFloat(avg).toFixed(1) <= 80
      ? "#63B450"
      : "#119336"
  }
  return (
    <>
      {isLoading ? <LoaderLarge /> : <></>}
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-3 col-sm-12">
              <h1>Summary</h1>
            </div>
            {/* FİLTRELEME SEÇENEKLERİ */}
            <AdvancedFilter setComponentFilterData={setFilterData} />
          </div>
        </div>
        <div className="row clearfix main-lssman_row">
          <div className="col-lg-6 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-357">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">XP Score</h2>
                    <p className="small-_info">
                      How employees are feeling about their work environments
                    </p>
                  </div>
                </div>

                {!isLoading ? (
                  <div className="row text-center">
                    <div className="col-lg-6">
                      {avg ? (
                        <div
                          className="donut-new donut-new-main"
                          style={{ height: "200px" }}
                        >
                          <ProgressBar
                            radius={90}
                            progress={avg && parseFloat(avg).toFixed(1)}
                            strokeWidth={8}
                            strokeColor={decideColor(avg)}
                            strokeLinecap="square"
                            trackStrokeColor="#70777a"
                            trackStrokeWidth={5}
                            transition="0.3s ease"
                            initialAnimation={true}
                          >
                            <Tooltip
                              title="Employee experience score"
                              placement="right"
                            >
                              <div className="progress-hover-info is--campaign"></div>
                            </Tooltip>
                            <div className="indicator">
                              {/* XP score = X.X */}
                              <div>
                                {parseFloat(avg).toFixed(1) > 0 ? (
                                  <>{avg && parseFloat(avg).toFixed(1)}</>
                                ) : (
                                  "0"
                                )}
                              </div>
                            </div>
                          </ProgressBar>
                          <p className="small-_info text-leftt">
                            Percentage of employees who feel positively about
                            their work environment
                          </p>
                        </div>
                      ) : (
                        <NoData></NoData>
                      )}
                    </div>

                    <div className="col-lg-6 pd-r-zero">
                      {/* XP Score breakdown */}
                      <DonutChart data={donut} />
                      {donut.reduce(add, 0) >= 1 ? (
                        <p className="small-_info breakdown-_info">
                          Breakdown of all positive and negative responses
                        </p>
                      ) : (
                        <p className="small-_info breakdown-_info">&nbsp;</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Loader></Loader>
                )}
              </div>

              <div className="body card-bottom-section">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <Link
                      to="/organisation-xp-score"
                      className="mb-0 card-link"
                    >
                      View dashboard
                      <span className="iconx-controller-play"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-357">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Usage</h2>
                    <p className="small-_info">
                      How employees are engaging with the platform
                    </p>
                  </div>
                </div>

                <div className="row text-center">
                  <div className="col-lg-12">
                    {isLoading ? <Loader /> : <DailyActiveUsers data={usage} />}
                  </div>
                </div>
              </div>

              <div className="body card-bottom-section">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <Link to="/wave-engagement" className="mb-0 card-link">
                      View dashboard
                      <span className="iconx-controller-play"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-337">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Campaigns</h2>
                    <p className="small-_info">
                      Sets of questions aimed to explore a particular topic in
                      more depth
                    </p>
                  </div>
                </div>

                <div className="row text-center smile-campaigns d-block">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      {campaignCharts.length > 0 ? (
                        <Slider {...slideSettings}>
                          {campaignCharts
                            .sort((a, b) => {
                              return b.avg - a.avg
                            })
                            // .slice(0, 4)
                            .map((i, index) => {
                              return (
                                <div className="four-small-donuts" key={index}>
                                  <div
                                    className="donut-new donut-new-main"
                                    style={{ height: "180px" }}
                                  >
                                    <ProgressBar
                                      radius={50}
                                      progress={parseFloat(i.avg).toFixed(1)}
                                      strokeWidth={6}
                                      strokeColor="#fff"
                                      strokeLinecap="square"
                                      trackStrokeColor="#70777a"
                                      trackStrokeWidth={4}
                                      transition="0.3s ease"
                                      initialAnimation={true}
                                    >
                                      <Tooltip
                                        title="Campaign score"
                                        placement="right"
                                      >
                                        <div className="progress-hover-info is--small-campaign"></div>
                                      </Tooltip>
                                      <div className="indicator xl-small">
                                        <div>
                                          {i.avg >= 0
                                            ? parseFloat(i.avg).toFixed(1)
                                            : "0"}
                                          %
                                        </div>
                                      </div>
                                    </ProgressBar>

                                    <Link
                                      to={`campaign-details?campaign_id=${i.id}`}
                                      className="mb-0 sub-title convert-link small-chart-link"
                                    >
                                      {truncate(i.title, 20)}
                                      <span className="iconx-controller-play"></span>
                                    </Link>
                                    <span className="mb-0 sub-title donut-txt-b">
                                      Status: {i.status}
                                      <br />
                                      {i.end === "Always on"
                                        ? ""
                                        : "Close date:" + i.end}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                        </Slider>
                      ) : (
                        <NoData />
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="body card-bottom-section min-h-51">
                <div className="row">
                  <div className="col-lg-6 col-sm-12"></div>
                  <div className="col-lg-6 col-sm-12">
                    <Link
                      to={
                        role === "Super Admin" || role === "Leesman Admin"
                          ? "/all-campaigns"
                          : "/campaigns"
                      }
                      className="mb-0 card-link"
                    >
                      All campaigns
                      <span className="iconx-controller-play"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-337">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Comments</h2>
                    <p className="small-_info">
                      Self-initiated feedback submitted as a free response
                    </p>
                  </div>
                </div>

                <div className="row text-center">
                  <div className="col-lg-12">
                    {isLoading ? <Loader /> : <SiScore data={comments} />}
                  </div>
                </div>
              </div>

              <div className="body card-bottom-section min-h-51">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <Link to="/results-feedbacks" className="mb-0 card-link">
                      View dashboard
                      <span className="iconx-controller-play"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Results
