import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SiScore from "../common/charts/siScore"
import LocationBreakDown from "../common/charts/locationBreakDown"
import CommentsNumber from "../common/charts/commentsNumber"

import AdvancedFilter from "../common/AdvancedFilter"
import ProgressBar from "react-customizable-progressbar"
import Loader from "../common/Loader"
import LoaderLarge from "../common/LoaderLarge"
import { Tooltip, notification } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { feedBackResultActions } from "../../actions/clientActions"

const FeedbackResults = (props) => {
  const dispatch = useDispatch()
  const {
    isLoading,
    siScoreData,
    locationBreakDownData,
    commentsNumber,
    donutData,
    highAndLows,
    dataAvailable,
  } = useSelector((store) => store.feedBackResult)

  const [filterData, setFilterData] = useState([])
  const [high, setHigh] = useState("")
  const [low, setLow] = useState("")
  const [highScore, setHighScore] = useState(0)
  const [lowScore, setLowScore] = useState(0)

  useEffect(() => {
    console.log(filterData)
    filterData?.start && getData()
  }, [filterData])

  function getData() {
    let fdata = {
      ...filterData,
      page: "comment_summary",
    }
    dispatch(feedBackResultActions({ fdata }))

    if (dataAvailable) {
      let themeArr = highAndLows.sort(
        (a, b) => new Date(a.score) - new Date(b.score)
      )

      console.log(themeArr[0], themeArr[themeArr.length - 1])
      setLow(themeArr[0] && themeArr[0].label)
      setHigh(themeArr[0] && themeArr[themeArr.length - 1].label)
      setLowScore(themeArr[0] && themeArr[0].score)
      setHighScore(themeArr[0] && themeArr[themeArr.length - 1].score)
    } else {
      setLow("")
      setHigh("")
      setLowScore(0)
      setHighScore(0)
      //notification.warning({ message: "Not enough data yet." });
    }

    sessionStorage.removeItem("filterData")
    window.location.reload(false)
  }

  return (
    <>
      {isLoading ? <LoaderLarge /> : <></>}

      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-3 col-sm-12 user-feedback-top">
              <h1>Comments</h1>
              <p className="small-_info for-title">
                Self-initiated feedback submitted as a free response
              </p>
            </div>
            {/* FİLTRELEME SEÇENEKLERİ */}
            <AdvancedFilter setComponentFilterData={setFilterData} />
          </div>
        </div>
        <div className="row clearfix main-lssman_row">
          <div className="col-md-12 col-sm-12 mb-3">
            <ul className="nav">
              <li className="nav-item mr--8">
                <Link
                  to="/results-feedbacks"
                  className="btn btn-default active btn-block"
                >
                  Summary
                </Link>
              </li>
              <li className="nav-item mr--8">
                <Link
                  to="/feedback-theme-view"
                  className="btn btn-default btn-block"
                >
                  Themes
                </Link>
              </li>
              <li className="nav-item mr--8">
                <Link
                  to="/feedback-data-view"
                  className="btn btn-default btn-block"
                >
                  Theme breakdown
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/feedback-comments-view"
                  className="btn btn-default btn-block"
                >
                  Comments
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-357">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Comments Score</h2>
                    <p className="small-_info">
                      Percentage of positive comments
                    </p>
                  </div>
                </div>

                <div className="row text-center">
                  <div className="col-lg-6">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div
                        className="donut-new donut-new-main"
                        style={{ height: "200px" }}
                      >
                        <ProgressBar
                          radius={90}
                          progress={donutData >= 0 ? donutData : 0}
                          strokeWidth={8}
                          strokeColor={
                            donutData <= 14
                              ? "#bf1717"
                              : donutData > 14 && donutData <= 28
                              ? "#e95c0c"
                              : donutData > 28 && donutData <= 42
                              ? "#f5a04c"
                              : donutData > 42 && donutData <= 56
                              ? "#ffe054"
                              : donutData > 56 && donutData <= 70
                              ? "#b6d484"
                              : donutData > 70 && donutData <= 84
                              ? "#63b450"
                              : "#119336"
                          }
                          strokeLinecap="square"
                          trackStrokeColor="#70777a"
                          trackStrokeWidth={5}
                          transition="0.3s ease"
                          initialAnimation={true}
                        >
                          <Tooltip title="Positive comments" placement="right">
                            <div className="progress-hover-info is--campaign"></div>
                          </Tooltip>
                          <div className="indicator">
                            {/* Comments Score = X% - virgülden sonrası olmayacak */}
                            <div>
                              {parseFloat(donutData).toFixed(1) >= 0
                                ? parseFloat(donutData).toFixed(1)
                                : 0}
                              %
                            </div>
                          </div>
                        </ProgressBar>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 border_-left">
                    <div className="row align-items-center h-100 highest_-items text-left">
                      <div className="col-lg-12 col-sm-12">
                        <div className="let_-center">
                          <label className="mb-0 font-1r text-left mb-2">
                            Theme with the highest Comments Score
                          </label>
                          <h4 className="card-title mb-0 text-white text-left">
                            {high && (
                              <>
                                <span className="text-success">
                                  {parseFloat((highScore + 100) / 2).toFixed(1)}
                                  %
                                </span>
                                &nbsp;&nbsp; {high}
                              </>
                            )}
                          </h4>
                        </div>
                      </div>

                      <div className="col-lg-12 col-sm-12">
                        <div className="let_-center">
                          <label className="mb-0 font-1r text-left mb-2">
                            Theme with the lowest Comments Score
                          </label>
                          <h4 className="card-title mb-0 text-white text-left">
                            {low && (
                              <>
                                <span className="text-danger">
                                  {parseFloat((lowScore + 100) / 2).toFixed(1)}%
                                </span>
                                &nbsp;&nbsp; {low}
                              </>
                            )}
                          </h4>
                        </div>
                      </div>
                    </div>
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
                    <h2 className="card-title mb-0">Comments Score</h2>
                    <p className="small-_info">
                      Percentage of positive comments
                    </p>
                  </div>
                </div>

                <div className="row text-center">
                  <div className="col-lg-12">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      siScoreData &&
                      siScoreData.series && <SiScore data={siScoreData} />
                    )}
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
                    <h2 className="card-title mb-0">
                      No. of comments versus employees
                    </h2>
                    <p className="small-_info">
                      Breakdown of positive and negative comments and by which
                      group of employees
                    </p>
                  </div>
                </div>

                <div className="row text-center">
                  <div className="col-lg-12">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <CommentsNumber data={commentsNumber} />
                    )}
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
                    <h2 className="card-title mb-0">Location breakdown</h2>
                    <p className="small-_info">
                      Number of positive and negative comments broken down by
                      location
                    </p>
                  </div>
                </div>

                <div className="row text-center">
                  <div className="col-lg-12">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <LocationBreakDown data={locationBreakDownData} />
                    )}
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

export default FeedbackResults
