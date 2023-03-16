import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import AdvancedFilter from "../common/AdvancedFilter"
import Loader from "../common/Loader"
import IsEmpty from "../common/IsDataEmpty"
import LoaderLarge from "../common/LoaderLarge"
import ImportExport from "../common/ImportExport"
import { feedBackThemeViewActions } from "../../actions/clientActions"

import { useDispatch, useSelector } from "react-redux"
const FeedbackThemeView = () => {
  const dispatch = useDispatch()
  const { scales, error } = useSelector((store) => store.feedBackThemeView)

  useEffect(() => {
    if (
      window.location.pathname === "/feedback-theme-view" &&
      document.querySelector("#comments-_link") !== null
    ) {
      document.querySelector("#comments-_link").classList.add("active")
    }
  }, [])

  const [clientData, setClientData] = useState([])

  const [trends, setTrends] = useState([])
  const [filterData, setFilterData] = useState([])

  const [populate, setPopulate] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(filterData)
    filterData?.start && getData()
  }, [filterData])

  useEffect(() => {
    scales.length > 0 && populateThemes()
  }, [scales])

  function getData() {
    let fdata = {
      ...filterData,
      page: "comment_themes",
    }
    dispatch(feedBackThemeViewActions({ fdata }))

    setLoading(false)

    if (error) {
      sessionStorage.removeItem("filterData")
      window.location.reload(false)
      return
    }
  }

  const decideColor = (score, type) => {
    switch (type) {
      case "arrow":
        return score.toFixed(0) <= 14
          ? " red--_arrow"
          : score.toFixed(0) > 14 && score.toFixed(0) <= 28
          ? " orange--_arrow"
          : score.toFixed(0) > 28 && score.toFixed(0) <= 42
          ? " orange-light--_arrow"
          : score.toFixed(0) > 42 && score.toFixed(0) <= 56
          ? " yellow--_arrow"
          : score.toFixed(0) > 56 && score.toFixed(0) <= 70
          ? " green-light--_arrow"
          : score.toFixed(0) > 70 && score.toFixed(0) <= 84
          ? " green--_arrow"
          : " green-dark--_arrow"
      case "bar":
        return score.toFixed(0) <= 14
          ? " red--_progress"
          : score.toFixed(0) > 14 && score.toFixed(0) <= 28
          ? " orange--_progress"
          : score.toFixed(0) > 28 && score.toFixed(0) <= 42
          ? " orange-light--_progress"
          : score.toFixed(0) > 42 && score.toFixed(0) <= 56
          ? " yellow--_progress"
          : score.toFixed(0) > 56 && score.toFixed(0) <= 70
          ? " green-light--_progress"
          : score.toFixed(0) > 70 && score.toFixed(0) <= 84
          ? " green--_progress"
          : " green-dark--_progress"
    }
  }
  const populateThemes = () => {
    let bufferTheme = []
    console.log(trends)
    console.log(scales)

    bufferTheme = scales.map((item) => {
      return (
        <div className="col-xl-3 col-lg-4 col-md-6  leesman-section  text-center theme-views">
          <div className="card">
            <div className="body min-h-290">
              <p className="question-text bold-it pn-padding">{item.label}</p>
              <div className="feedback-section">
                <div className="row clearfix pn-padding">
                  <div className="col-6">
                    <h6 className="score-title-left">Comments Score</h6>
                  </div>
                  <div className="col-6">
                    {/* AYRICA OK DEĞERİ İLE BİRLİKTE DEĞİŞECEK BAŞLIK KISMI */}
                    <h6 className="score-title-right">
                      {parseFloat(item.score.toFixed(0)).toFixed(1) + "%"}
                    </h6>
                  </div>
                </div>

                <>
                  <div className="progress progress-feedback">
                    <div
                      role="progressbar"
                      aria-valuenow={parseInt(item.score)}
                      aria-valuemin={-100}
                      aria-valuemax={100}
                      style={{ width: `${parseInt(item.score)}%` }}
                    >
                      <span
                        className={`iconx-triangle-down ${decideColor(
                          item.score,
                          "arrow"
                        )}`}
                      ></span>
                    </div>
                  </div>

                  <div className="progress progress-lg prog-feed">
                    <div
                      className={`progress-bar progress-bar-feedback ${decideColor(
                        item.score,
                        "bar"
                      )}`}
                      role="progressbar"
                      aria-valuenow={parseInt(item.score)}
                      aria-valuemin={-100}
                      aria-valuemax={100}
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </>

                <div className="row clearfix pn-padding">
                  <div className="col-6">
                    <h6 className="score-title-left feedback-rl-title">
                      Negative
                    </h6>
                  </div>
                  <div className="col-6">
                    <h6 className="score-title-right feedback-rl-title">
                      Positive
                    </h6>
                  </div>
                </div>
              </div>
              <div className="tags-section">
                <div className="row clearfix pn-padding">
                  <div className="col-12">
                    <h6 className="score-title-left">Most used</h6>
                    <ul className="nav">
                      {[...new Set(item.tags)]
                        .sort((a, b) => {
                          if (a.count < b.count) return -1
                          if (a.count > b.count) return 1
                          return 0
                        })
                        .slice(0, 3)
                        .map((i) => {
                          return (
                            <li className="nav-item">
                              <span className="feedback-tag">
                                {i.tag_label}
                              </span>
                            </li>
                          )
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="body card-bottom-section feed-bottom-s">
              <div className="row">
                <div className="col-lg-12 col-sm-12">
                  <Link
                    to="/feedback-comments-view"
                    className="mb-0 card-link float-r"
                  >
                    View comments
                    <span className="iconx-triangle-right"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })

    setPopulate(bufferTheme)
  }

  return (
    <>
      {loading ? <LoaderLarge /> : <></>}

      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-3 col-sm-12 user-feedback-top">
              <h1>Comments</h1>
              <p className="small-_info for-title">
                Tags submitted with each comment are organised into themes shown
                below
              </p>
            </div>
            {/* FİLTRELEME SEÇENEKLERİ */}
            <AdvancedFilter setComponentFilterData={setFilterData} />
          </div>
        </div>
        <div className="row clearfix theme-views-row">
          <div className="col-md-12 col-sm-12 mb-3">
            <ul className="nav">
              <li className="nav-item mr--8">
                <Link
                  to="/results-feedbacks"
                  className="btn btn-default btn-block"
                >
                  Summary
                </Link>
              </li>
              <li className="nav-item mr--8">
                <Link
                  to="/feedback-theme-view"
                  className="btn btn-default active btn-block"
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
              <li>
                <ImportExport
                  refresh={getData}
                  type={"tag-themes"}
                  data={scales}
                  import={false}
                  export={true}
                  hideLine={true}
                />
              </li>
            </ul>
          </div>

          {loading && <Loader />}

          {populate}
          {!loading && populate.length < 1 && <IsEmpty />}
        </div>
      </div>
    </>
  )
}

export default FeedbackThemeView
