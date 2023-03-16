import React, { useEffect, useState } from "react"
import DailyActiveUsers from "../common/charts/dailyActiveUsers"
import LocationBreakDownWave from "../common/charts/locationBreakDownWave"
import AverageLogins from "../common/charts/averageLogins"
import AdvancedFilter from "../common/AdvancedFilter"
import LoaderLarge from "../common/LoaderLarge"
import Loader from "../common/Loader"
import LoaderSmall from "../common/LoaderSmall"
import { Menu, Dropdown } from "antd"
import { waveEngagementAction } from "../../actions/clientActions"
import { useSelector, useDispatch } from "react-redux"

const WaveEngagement = () => {
  const dispatch = useDispatch()
  const {
    error,
    activeUsersData,
    stats,
    locationBreakdownData,
    loginDaysData,
  } = useSelector((store) => store.waveEngagement)

  //let history = useHistory();
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAvgDateFilter, setAvgDateFilter] = useState(false)

  // CHART FILTER
  const [isChartFilter, setChartFilter] = useState(false)
  const [selectedDateFilter, setSelectedDateFilter] = useState("week")
  const [dateFilter, setDateFilter] = useState(<></>)
  const handleChartFilter = (flag) => {
    setChartFilter(flag)
  }
  const errorMessage = "Not enough data"

  useEffect(() => {
    console.log(filterData)
    filterData?.start && getData()
  }, [filterData])
  useEffect(() => {
    populate()
  }, [selectedDateFilter])

  const getData = () => {
    let fdata = {
      ...filterData,
      page: "usage",
    }
    dispatch(waveEngagementAction({ fdata }))

    setLoading(false)

    if (error) {
      sessionStorage.removeItem("filterData")
      //window.location.reload(false);
    }
  }
  const populate = () => {
    const dateFilter_ = (
      <Menu className="filter-dropdown">
        <div className="more-group-filters">
          <label className="fancy-radio">
            <input
              onChange={() => setSelectedDateFilter("year")}
              checked={selectedDateFilter === "year"}
              type="radio"
              name="filter"
              value="Year"
            />
            <span className="light-black">
              <i></i>Year
            </span>
          </label>
          <label className="fancy-radio">
            <input
              type="radio"
              name="filter"
              onChange={() => setSelectedDateFilter("month")}
              checked={selectedDateFilter === "month"}
              value="Month"
            />
            <span className="light-black">
              <i></i>Month
            </span>
          </label>
          <label className="fancy-radio">
            <input
              type="radio"
              name="filter"
              onChange={() => setSelectedDateFilter("week")}
              checked={selectedDateFilter === "week"}
              value="Week"
            />
            <span className="light-black">
              <i></i>Week
            </span>
          </label>
          <label className="fancy-radio">
            <input
              type="radio"
              name="filter"
              onChange={() => setSelectedDateFilter("day")}
              checked={selectedDateFilter === "day"}
              value="Day"
            />
            <span className="light-black">
              <i></i>Day
            </span>
          </label>
        </div>
      </Menu>
    )
    setDateFilter(dateFilter_)
  }
  return (
    <>
      {loading ? <LoaderLarge /> : <></>}

      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-3 col-sm-12">
              <h1>Usage</h1>
              <p className="small-_info for-title">
                How employees are engaging with the platform
              </p>
            </div>
            {/* FİLTRELEME SEÇENEKLERİ */}
            <AdvancedFilter setComponentFilterData={setFilterData} />
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mobil-kutu bv-1">
            <div className="card">
              <div className="body">
                {loading ? (
                  <LoaderSmall />
                ) : (
                  <>
                    <div className="m-0 text-center h4 light-black">
                      {stats.active_users > 0 ? (
                        <>{stats.active_users}</>
                      ) : (
                        errorMessage
                      )}
                    </div>
                    <div className="text-centerr light-black">
                      Active users today
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mobil-kutu bv-2">
            <div className="card">
              <div className="body">
                {loading ? (
                  <LoaderSmall />
                ) : (
                  <>
                    <div className="m-0 text-center h4 light-black">
                      {stats.engegament > 0 ? (
                        <>{stats.engegament && stats.engegament + "%"}</>
                      ) : (
                        errorMessage
                      )}
                    </div>
                    <div className="text-centerr light-black">
                      User engagement
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mobil-kutu bv-1">
            <div className="card">
              <div className="body">
                {loading ? (
                  <LoaderSmall />
                ) : (
                  <>
                    <div className="m-0 text-center h4 light-black">
                      {stats.responses > 0 ? (
                        <>{stats.responses}</>
                      ) : (
                        errorMessage
                      )}
                    </div>
                    <div className="text-centerr light-black">
                      Responses in campaigns
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mobil-kutu bv-2">
            <div className="card">
              <div className="body">
                {loading ? (
                  <LoaderSmall />
                ) : (
                  <>
                    <div className="m-0 text-center h4 light-black">
                      {stats.comments > 0 ? (
                        <>{stats.comments}</>
                      ) : (
                        errorMessage
                      )}
                    </div>
                    <div className="text-centerr light-black">
                      Comments logged
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row clearfix main-lssman_row">
          <div className="col-lg-12 col-md-12 leesman-section">
            <div className="card">
              <div className="body min-h-357">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Active users</h2>
                  </div>
                </div>

                <div className="row text-center">
                  <div className="col-lg-12 toolbar-_active-users">
                    {loading ? (
                      <Loader />
                    ) : (
                      <DailyActiveUsers data={activeUsersData} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 leesman-section leesman-campaigns-donut">
            <div className="card">
              <div className="body min-h-357">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Location breakdown</h2>
                    <p className="small-_info">
                      Total number of submitted comments and responses broken
                      down by location
                    </p>
                  </div>
                </div>

                <div className="row text-center">
                  <div className="col-lg-12 scrollable-_charts">
                    {loading ? (
                      <Loader />
                    ) : (
                      <LocationBreakDownWave data={locationBreakdownData} />
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
                    <h2 className="card-title mb-0">Average logins</h2>
                    <p className="small-_info">
                      Average number of logins in a given timeframe
                    </p>
                  </div>
                  {loading ? (
                    <></>
                  ) : (
                    <>
                      {loginDaysData[String(selectedDateFilter)]?.series
                        ?.length > 0 && (
                        <ul className="nav chart-_date-filter">
                          <Dropdown
                            overlay={dateFilter}
                            visible={isChartFilter}
                            onVisibleChange={handleChartFilter}
                            overlayClassName="chart-date-filter"
                          >
                            <li
                              className="nav-item"
                              onClick={(e) => e.preventDefault()}
                            >
                              <a className="nav-link" href="#">
                                <i className="iconx-filter_list"></i>
                              </a>
                            </li>
                          </Dropdown>
                        </ul>
                      )}
                    </>
                  )}
                </div>

                <div className="row text-center">
                  <div className="col-lg-12">
                    {loading ? (
                      <Loader />
                    ) : (
                      <AverageLogins
                        data={loginDaysData[String(selectedDateFilter)]}
                        setAvgDateFilter={setAvgDateFilter}
                      />
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

export default WaveEngagement
