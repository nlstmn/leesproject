import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import ProgressBar from "react-customizable-progressbar"
import Slider from "react-slick"
import { Tooltip, notification } from "antd"
import axios from "axios"
import { AuthContext } from "../../context/auth"
import CampaignList from "./CampaignList"
import Tabs from "../Admin/ClientManagement/Tabs"
import LoaderLarge from "../common/LoaderLarge"
import Loader from "../common/Loader"
import ImportExport from "../common/ImportExport"
import moment from "moment"
import { getCampaingCurrentStatus } from "../../util/functions"
import {
  campaignsGrafAction,
  bufferCampaignsAction,
  campaignsAction,
} from "../../actions/clientActions"
import { useDispatch, useSelector } from "react-redux"

const slideSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
}
const Campaigns = (props) => {
  const dispatch = useDispatch()
  const { graphs } = useSelector((store) => store.campaignsGraf)
  const { campaigns } = useSelector((store) => store.campaignsReducer)
  const { bufferCampaigns } = useSelector(
    (store) => store.bufferCampaignsReducer
  )

  const { role } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  const [val, setVal] = useState("")
  const [scope, setScope] = useState("")

  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  useEffect(() => {
    console.log(props.location.scope)
    setScope(props.location.scope)
  }, [props])

  useEffect(() => {
    getData()
  }, [scope])

  const change = (e) => {
    const { value } = e.target
    setVal(value)
    filterFeedbacks(value)
  }

  const filterFeedbacks = (e) => {
    let buffer = []
    console.log("filter", campaigns)
    campaigns.forEach((item) => {
      if (
        String(item.client).toLowerCase().includes(e.toLowerCase()) ||
        String(getCampaingCurrentStatus(item))
          .toLowerCase()
          .includes(e.toLowerCase()) ||
        String(item.title).toLowerCase().includes(e.toLowerCase()) ||
        String(item.description).toLowerCase().includes(e.toLowerCase()) ||
        String(item.avg).toLowerCase().includes(e.toLowerCase()) ||
        String(moment(item.start_date.splitDate()).format("DD MMM"))
          .toLowerCase()
          .includes(e.toLowerCase()) ||
        (item.end_date &&
          String(moment(item.end_date.splitDate()).format("DD MMM"))
            .toLowerCase()
            .includes(e.toLowerCase())) ||
        String(item.respondents).toLowerCase().includes(e.toLowerCase())
      ) {
        buffer.push(item)
      }
    })
    bufferCampaigns(buffer)
  }
  const getData = () => {
    console.log(role)
    if (role === "Admin") {
      getCampaignsByUserSub()
    } else if (role === "Leesman Admin" || role === "Super Admin") {
      getCampaignsByClientId()
    }
  }

  const getCampaignsByUserSub = () => {
    dispatch(campaignsGrafAction())

    dispatch(campaignsAction())

    setLoading(false)

    dispatch(bufferCampaignsAction())
  }
  const getCampaignsByClientId = () => {
    console.log(scope)
    let id = !clientId ? "0" : clientId
    axios
      .get(`admin/clients/${id}/campaigns`)
      .then((res) => {
        console.log(res.data)
        let data = res.data
        if (data.length === 0) {
          notification.warning({ message: "No data found!" })
        }

        data = data.filter((i) => i.title !== "" && i.start_date !== null)
        campaigns(data)
        bufferCampaigns(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        notification.warning({ message: "No client found!" })
      })
  }
  const changeStatus = (id, state) => {
    console.log(id, state)
    axios
      .put(`admin/clients/${0}/campaigns/${id}`, { status: state })
      .then((res) => {
        notification.success({ message: "Status changed!" })
        getData()
      })
      .catch((err) => {
        console.log(err)
        notification.warning({ message: "No client found!" })
      })
  }
  return (
    <>
      {loading && role === "Admin" ? <LoaderLarge /> : <></>}
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              {role !== "Admin" ? (
                <h1>Admin management</h1>
              ) : (
                <h1>Campaigns</h1>
              )}
              {/* {("the role is", role)} */}

              {role !== "Admin" && scope !== "all" && <Tabs></Tabs>}

              {role !== "Admin" ? (
                ""
              ) : (
                <p className="small-_info for-title">
                  Sets of questions aimed to explore a particular topic in more
                  depth
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CAMPAIGNS SLIDER SECTION IS JUST FOR CLIENT */}
        <div className="row clearfix">
          {role !== "Admin" ? (
            ""
          ) : (
            <>
              <div className="col-lg-6 col-md-12 leesman-section campaigns-block-main">
                <div className="card">
                  <div className="body scroll-campaigns">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="card-title mb-0">Live</h2>
                        <p className="small-_info">
                          Current score for each live campaign
                        </p>
                      </div>
                    </div>

                    <div className="row text-center">
                      {/* BU HER ZAMAN AÇIK OLAN CAMPAING - ALWAYS ON - BU YÜZDEN RENGİ FARKLI!! */}

                      <div className="col-sm-12 col-md-12 col-lg-12 mobile-top-p">
                        {loading ? (
                          <Loader />
                        ) : (
                          <Slider {...slideSettings}>
                            {/* ALWAYS ON */}
                            {graphs &&
                              graphs.length > 0 &&
                              graphs
                                .filter(
                                  (i) =>
                                    i.status === "Always on" ||
                                    i.status === "Live"
                                )
                                .map((i, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="campaign-multi-small"
                                    >
                                      <div
                                        className="donut-new donut-new-main"
                                        style={{ height: "180px" }}
                                      >
                                        <ProgressBar
                                          radius={80}
                                          progress={parseFloat(i.avg).toFixed(
                                            1
                                          )}
                                          strokeWidth={8}
                                          strokeColor={
                                            i.status === "Always on"
                                              ? "#2793ff"
                                              : "#fff"
                                          }
                                          strokeLinecap="square"
                                          trackStrokeColor="#70777a"
                                          trackStrokeWidth={5}
                                          transition="0.3s ease"
                                          initialAnimation={true}
                                        >
                                          <Tooltip
                                            title="Campaign score"
                                            placement="right"
                                          >
                                            <div className="progress-hover-info is--list-campaign"></div>
                                          </Tooltip>
                                          <div className="indicator xy-small">
                                            <div>
                                              {parseFloat(i.avg).toFixed(1)}%
                                            </div>
                                          </div>
                                        </ProgressBar>

                                        <Link
                                          to={`/campaign-details?campaign_id=${i.id}`}
                                          className="mb-0 sub-title convert-link small-chart-link"
                                        >
                                          {truncate(i.title, 20)}
                                          <span className="iconx-controller-play"></span>
                                        </Link>
                                        <span className="mb-0 sub-title donut-txt-b">
                                          Status: {i.status}
                                        </span>
                                      </div>
                                    </div>
                                  )
                                })}
                          </Slider>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="body card-bottom-campaigns min-h-71">
                    <div className="row">
                      <div className="col-lg-12 col-sm-12">
                        <nav className="d-flex text-muted top-icons-bar float-leftt chart-keys">
                          <span className="icon mr-3 font-13px d-flex">
                            <i className="iconx-controller-stop icon-blue" />{" "}
                            Always on campaign
                          </span>
                          <span className="icon mr-3 font-13px d-flex">
                            <i className="iconx-controller-stop icon-white" />{" "}
                            Active campaign
                          </span>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 leesman-section closed-campaigns-s campaigns-block-main">
                <div className="card">
                  <div className="body scroll-campaigns">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="card-title mb-0">Recently closed</h2>
                        <p className="small-_info">
                          Finalised score for each completed campaign
                        </p>
                      </div>
                    </div>

                    <div className="row text-center">
                      <div className="col-sm-12 col-md-12 col-lg-12 mobile-top-p">
                        {loading ? (
                          <Loader />
                        ) : (
                          <Slider {...slideSettings}>
                            {graphs
                              .filter((i) => i.status === "Closed")
                              .map((i) => {
                                return (
                                  <div className="campaign-multi-small">
                                    <div
                                      className="donut-new donut-new-main"
                                      style={{ height: "180px" }}
                                    >
                                      <ProgressBar
                                        radius={80}
                                        progress={parseFloat(i.avg).toFixed(1)}
                                        strokeWidth={8}
                                        strokeColor={
                                          i.avg <= 33
                                            ? "#bf1717"
                                            : i.avg > 33 && i.avg <= 66
                                            ? "#f5a04c"
                                            : "#119336"
                                        }
                                        strokeLinecap="square"
                                        trackStrokeColor="#70777a"
                                        trackStrokeWidth={5}
                                        transition="0.3s ease"
                                        initialAnimation={true}
                                      >
                                        <Tooltip
                                          title="Campaign score"
                                          placement="right"
                                        >
                                          <div className="progress-hover-info is--list-campaign"></div>
                                        </Tooltip>
                                        <div className="indicator xy-small">
                                          <div>
                                            {parseFloat(i.avg).toFixed(1)}%
                                          </div>
                                        </div>
                                      </ProgressBar>

                                      <Link
                                        to={`/campaign-details?campaign_id=${i.id}`}
                                        className="mb-0 sub-title convert-link small-chart-link"
                                      >
                                        {truncate(i.title, 20)}
                                        <span className="iconx-controller-play"></span>
                                      </Link>
                                      <span className="mb-0 sub-title donut-txt-b">
                                        Close date: {i.end}
                                      </span>
                                    </div>
                                  </div>
                                )
                              })}
                          </Slider>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="body card-bottom-campaigns min-h-71">
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <nav className="d-flex text-muted top-icons-bar float-leftt">
                          <nav className="d-flex text-muted top-icons-bar float-leftt"></nav>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="col-lg-12 col-md-12 leesman-section new-2022_class">
            <div className="row clearfix">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="row mb-4 page-__header">
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <h2 className="card-title mt-4">Campaigns</h2>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                    {role !== "Admin" && clientId && (
                      <Link
                        to={`/create-campaign?client_id=${clientId}`}
                        className="btn btn-primary ml-3"
                        title=""
                      >
                        New campaign
                      </Link>
                    )}
                    <ImportExport
                      refresh={getData}
                      type={"campaigns"}
                      data={campaigns}
                      import={false}
                      export={true}
                    />
                    <div className="input-group ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-search"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      {/* yeni arama */}
                      <input
                        type="text"
                        className="form-control"
                        value={val}
                        onChange={change}
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="card">
                  <CampaignList
                    getStatus={getCampaingCurrentStatus}
                    changeStatus={changeStatus}
                    role={role}
                    campaigns={bufferCampaigns.map((i) => {
                      return { ...i, status: getCampaingCurrentStatus(i) }
                    })}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Campaigns
