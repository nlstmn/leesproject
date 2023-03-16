import React, { useState, useEffect, useCallback } from "react"
import InternalComparison from "../common/charts/internalComparison"
import InternalComparisonLine from "../common/charts/internalComparisonLine"
import ExperienceScore from "../common/charts/experienceScore"
import DonutChart from "../common/charts/donutChart"
// import { ChartDonut } from '@patternfly/react-charts';
import AdvancedFilter from "../common/AdvancedFilter"
import ProgressBar from "react-customizable-progressbar"
import { Tooltip } from "antd"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../common/Loader"
import LoaderLarge from "../common/LoaderLarge"
import NoData from "../common/noData"
import { xPScoreAction } from "../../actions/clientActions"

const XPScore = () => {
  const dispatch = useDispatch()
  const {
    isLoading,
    error,
    avg,
    donut,
    trends,
    comparisonCrossData,
    comparisonCrossLineData,
  } = useSelector((store) => store.xpScore)

  const [comparisonGroup, setComparisonGroup] = useState("location")
  const [orderBy, setOrderBy] = useState("employees")
  const [openOrder, setOrder] = useState("active")
  const [charType, setCharType] = useState("barChart")

  // useEffect(() => {
  //   console.log(comparisonGroup);
  //   if (comparisonCross) {
  //     if (comparisonGroup === "location") {
  //       comparisonCrossData(comparisonCross?.location);
  //       comparisonCrossLineData(comparisonCrossLine?.location);
  //     } else if (comparisonGroup === "location_option") {
  //      comparisonCrossData(comparisonCross?.location_option);
  //       comparisonCrossLineData(comparisonCrossLine?.location_option);
  //     } else if (comparisonGroup === "department") {
  //       comparisonCrossData(comparisonCross?.department);
  //       comparisonCrossLineData(comparisonCrossLine?.department);
  //     }
  //   }
  // }, [comparisonCross, comparisonGroup]);
  const filteringData = useSelector((state) => state.filter)
  const getData = useCallback(() => {
    let fdata = {
      ...filteringData.data,
      page: "xp",
    }
    dispatch(xPScoreAction({ ...fdata }))

    if (error) {
      sessionStorage.removeItem("filterData")
      //window.location.reload(false);
      return
    }
  }, [dispatch, error, filteringData])

  useEffect(() => {
    filteringData.data.start !== undefined && getData()
  }, [filteringData.data.start])

  function add(accumulator, a) {
    return accumulator + a
  }
  return (
    <>
      {isLoading ? <LoaderLarge /> : <></>}

      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-3 col-sm-12">
              <h1>XP Score</h1>
              <p className="small-_info for-title">
                How employees are feeling about their work environments
              </p>
            </div>
            {/* FİLTRELEME SEÇENEKLERİ */}
            <AdvancedFilter />
          </div>
        </div>
        <div className="row clearfix main-lssman_row">
          <div className="col-lg-6 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-357">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">XP Score</h2>
                  </div>
                </div>

                {!isLoading ? (
                  <div className="row text-center pt-20">
                    <div className="col-lg-6">
                      {avg ? (
                        <div
                          className="donut-new donut-new-main"
                          style={{ height: "200px" }}
                        >
                          <ProgressBar
                            radius={90}
                            progress={avg && avg.toFixed(1)}
                            strokeWidth={8}
                            strokeColor={
                              parseFloat(avg).toFixed(1) <= 20
                                ? "#bf1717"
                                : parseFloat(avg).toFixed(1) > 20 &&
                                  parseFloat(avg).toFixed(1) <= 40
                                ? "#e95c0c"
                                : parseFloat(avg).toFixed(1) > 40 &&
                                  parseFloat(avg).toFixed(1) <= 60
                                ? "#FFE054"
                                : parseFloat(avg).toFixed(1) > 60 &&
                                  parseFloat(avg).toFixed(1) <= 80
                                ? "#63B450"
                                : "#119336"
                            }
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

                    {donut.length ? (
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
                    ) : (
                      <NoData></NoData>
                    )}
                  </div>
                ) : (
                  <Loader></Loader>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-357">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Trends</h2>
                    <p className="small-_info">XP Score over time</p>
                  </div>
                </div>

                <div className="row text-center">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <div className="col-lg-12">
                      {<ExperienceScore data={trends} />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-xp-campaigns">
                <div className="text-leftt">
                  <h2 className="card-title mb-0 ">Internal comparison</h2>
                  <p className="small-_info">
                    Comparison of XP score between different groups
                  </p>
                </div>

                <div className="row text-center">
                  <div className="col-lg-3">
                    <div className="col-lg-12 col-md-12 text-leftt pt-40">
                      <label
                        onChange={() => {
                          setOrder("active")
                          setCharType("barChart")
                        }}
                        className="fancy-radio min-w-168"
                      >
                        <input
                          type="radio"
                          name="chartType"
                          value="barChart"
                          checked={charType === "barChart" ? "checked" : ""}
                        />
                        <span className="light-black">
                          <i></i>Cross section
                        </span>
                      </label>
                      <label
                        onChange={() => {
                          setOrder("")
                          setCharType("lineChart")
                        }}
                        className="fancy-radio min-w-168"
                      >
                        <input
                          type="radio"
                          name="chartType"
                          value="lineChart"
                          checked={charType === "lineChart" ? "checked" : ""}
                        />
                        <span className="light-black">
                          <i></i>Trends
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-12 col-md-12 text-leftt pt-20">
                      <h2 className="card-title mb-0 filter-title-card">
                        Parameters
                      </h2>
                    </div>

                    <div className="col-lg-12 col-md-12 pt-10">
                      <div className="form-group text-leftt">
                        <label className="text-leftt light-black">
                          Comparison group
                        </label>
                        <select
                          onChange={(e) => setComparisonGroup(e.target.value)}
                          className="form-control"
                        >
                          <option value="location">Locations</option>
                          <option value="department">Departments</option>
                          <option value="location_option">Location type</option>
                        </select>
                      </div>
                    </div>
                    {openOrder === "active" ? (
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
                            <option value="employees">Employees</option>
                            <option value="xp">XP Score</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  {comparisonCrossData?.series?.length > 0 &&
                    comparisonCrossLineData?.series?.length > 0 && (
                      <div className="col-lg-9 pt-20 short-list">
                        {charType === "barChart" ? (
                          <>
                            {isLoading ? (
                              <Loader />
                            ) : (
                              <InternalComparison
                                sort={orderBy}
                                data={comparisonCrossData}
                                avg={avg}
                              />
                            )}
                          </>
                        ) : (
                          <InternalComparisonLine
                            data={comparisonCrossLineData}
                          />
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

export default XPScore
