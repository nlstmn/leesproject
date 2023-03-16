import React, { Component } from "react"
import { Link, useHistory } from "react-router-dom"
import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  GeolocateControl,
  FlyToInterpolator,
} from "react-map-gl"
import Geocoder from "react-mapbox-gl-geocoder"
import { Modal, Tooltip } from "antd"
import ProgressBar from "react-customizable-progressbar"
import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import axios from "../../../node_modules/axios/index"
import LoaderLarge from "../common/LoaderLarge"
import { connect } from "react-redux"

const navStyle = {
  position: "relative",
  top: 0,
  left: 0,
  padding: "10px",
}

const MyInput = (props) => <input {...props} placeholder="Search.." />

class MapBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 16,
        longitude: 31,
        zoom: 1.5,
        bearing: 0,
        pitch: 0,
        width: "100%",
        height: "calc(100vh - 240px)",
        speed: 500,
        smooth: true,
        maxBounds: 0,
        attributionControl: false,
        interactive: false,
        minZoom: 1.5,
      },
      popupInfo: null,
      summaryModal: null,
      loading: false,
      visible: false,
      loader: false,
    }

    // this.goToCountry = this.goToCountry.bind(this);
    this.resetView = this.resetView.bind(this)
    this.openLoader = this.openLoader.bind(this)
    this.closeLoader = this.closeLoader.bind(this)
    this.handleGeocoderViewportChange =
      this.handleGeocoderViewportChange.bind(this)
    this.zoomInOutViewportChange = this.zoomInOutViewportChange.bind(this)
  }

  mapRef = React.createRef()

  handleOk = () => {
    this.setState({ loading: false, summaryModal: null })
  }

  openLoader = () => {
    this.setState({ loader: true })
  }

  closeLoader = () => {
    this.setState({ loader: false })
  }

  handleCancel = () => {
    this.setState({ summaryModal: null })
  }

  resetView = () => {
    this.setState({
      viewport: {
        latitude: 16,
        longitude: 31,
        zoom: 1.5,
        bearing: 0,
        pitch: 0,
        width: "100%",
        height: "calc(100vh - 240px)",
        speed: 500,
        smooth: true,
        maxBounds: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        minZoom: 1.5,
      },
    })
  }

  handleGeocoderViewportChange = (viewport, item) => {
    this.setState({
      viewport: {
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom,
        bearing: 0,
        pitch: 0,
        width: viewport.width,
        height: viewport.height,
        speed: 500,
        smooth: true,
        maxBounds: 0,
        minZoom: 1.5,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
      },
    })

    console.log(viewport)
  }

  zoomInOutViewportChange = (viewport, item) => {
    this.setState({
      viewport: {
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom,
        bearing: 0,
        pitch: 0,
        width: viewport.width,
        height: viewport.height,
        smooth: true,
        maxBounds: 0,
        minZoom: 1.5,
      },
    })

    console.log(viewport)
  }

  _renderCityMarker = (marker, index) => {
    const fetchSummary = (id) => {
      let data = {
        ...this.props?.reduxFilterData,
        page: "location_summary_by_location_id",
        locations: [id],
      }
      console.log(id, data, this.props?.reduxFilterData)
      axios
        .post(`/metrics`, data)
        .then((res) => {
          let p = {
            id: res.data[0].id,
            long: res.data[0].long,
            lat: res.data[0].lat,
            name: res.data[0].label,
            xp: res.data[0].data.xp_avg,
            comment: res.data[0].data.comment_scores,
            users: res.data[0].data.responded_count,
            engaged: res.data[0].data.active_user_count,
            themes: res.data[0].data.themes,
            campaigns: res.data[0].data.campaign_charts,
          }

          this.setState({ summaryModal: p })
          this.closeLoader()
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return (
      <div key={index}>
        {" "}
        <Marker longitude={marker.long} latitude={marker.lat}>
          <div
            className="map--marker-div"
            onClick={() => {
              fetchSummary(marker.id)
              this.openLoader()
              // this.goToCountry(marker);
            }}
            onMouseLeave={() => this.setState({ popupInfo: null })}
            onMouseEnter={() => this.setState({ popupInfo: marker })}
          >
            <div
              className={`map--marker ${
                marker.xp === null
                  ? " s-default"
                  : marker.xp >= 0 && marker.xp <= 20
                  ? " s-red"
                  : marker.xp > 20 && marker.xp <= 40
                  ? " s-orange"
                  : marker.xp > 40 && marker.xp <= 60
                  ? " s-orange-s"
                  : marker.xp > 60 && marker.xp <= 80
                  ? " s-green-s"
                  : " s-green"
              }`}
            ></div>
          </div>
        </Marker>{" "}
      </div>
    )
  }

  renderPopup() {
    return (
      this.state.popupInfo &&
      (this.state.popupInfo.xp === null ? (
        <></>
      ) : (
        <>
          <Popup
            tipSize={5}
            anchor="bottom-right"
            longitude={this.state.popupInfo.long}
            latitude={this.state.popupInfo.lat}
          >
            <p>
              <strong>{this.state.popupInfo.name}</strong>
              <br />
            </p>
            <div className="tab-pane map-tooltips">
              <div className="form-group">
                <label className="d-block">
                  XP Score{" "}
                  <span className="float-right">
                    {parseFloat(this.state.popupInfo.xp).toFixed(1)}
                  </span>
                </label>
                <div className="progress progress-xxs">
                  <div
                    className={`progress-bar ${
                      this.state.popupInfo.xp <= 20
                        ? " progress-bar-red-map"
                        : this.state.popupInfo.xp > 20 &&
                          this.state.popupInfo.xp <= 40
                        ? " progress-bar-orange-map"
                        : this.state.popupInfo.xp > 40 &&
                          this.state.popupInfo.xp <= 60
                        ? " progress-bar-orange-soft-map"
                        : this.state.popupInfo.xp > 60 &&
                          this.state.popupInfo.xp <= 80
                        ? " progress-bar-green-soft-map"
                        : " progress-bar-green-map"
                    }`}
                    role="progressbar"
                    aria-valuenow={`${this.state.popupInfo.xp}%`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${this.state.popupInfo.xp}%` }}
                  ></div>
                </div>
              </div>
              {/* <div className="form-group">
                <label className="d-block">
                  Comments Score{" "}
                  <span className="float-right">
                    {this.state.popupInfo.comment >= 0 ? this.state.popupInfo.comment : 0}%
                  </span>
                </label>
                <div className="progress progress-xxs">
                  <div
                    className={`progress-bar ${
                      this.state.popupInfo.comment <= 14
                        ? " progress-bar-red"
                        : this.state.popupInfo.comment > 14 && this.state.popupInfo.comment <= 28
                        ? " progress-bar-orange"
                        : this.state.popupInfo.comment > 28 && this.state.popupInfo.comment <= 42
                        ? " progress-bar-orange-soft"
                        : this.state.popupInfo.comment > 42 && this.state.popupInfo.comment <= 56
                        ? " progress-bar-yellow"
                        : this.state.popupInfo.comment > 56 && this.state.popupInfo.comment <= 70
                        ? " progress-bar-green-soft-soft"
                        : this.state.popupInfo.comment > 70 && this.state.popupInfo.comment <= 84
                        ? " progress-bar-green-soft"
                        : " progress-bar-green"}`}
                    role="progressbar"
                    aria-valuenow={`${this.state.popupInfo.comment >= 0 ? this.state.popupInfo.comment : 0}%`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${this.state.popupInfo.comment >= 0 ? this.state.popupInfo.comment : 0}%` }}
                  ></div>
                </div>
              </div> */}
              <div className="form-group">
                <label className="d-block">
                  No. of active users{" "}
                  <span className="float-right">
                    {this.state.popupInfo.users}{" "}
                    <i className="fa fa-long-arrow-up"></i>
                  </span>
                </label>
                <div className="progress progress-xxs">
                  <div
                    className="progress-bar progress-bar-white"
                    role="progressbar"
                    aria-valuenow={`${this.state.popupInfo.users}%`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${this.state.popupInfo.users}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Popup>
        </>
      ))
    )
  }

  _summaryModal = () => {
    const truncate = (str, n) => {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str
    }

    return (
      this.state.summaryModal &&
      (this.state.summaryModal.xp === null ? (
        <></>
      ) : (
        <>
          <Modal
            className="more-filters-modal summary-_mdl"
            key="ModalModalBundles"
            wrapClassName="ModalModalBundles"
            title={this.state.summaryModal.name}
            centered
            width={1100}
            visible={this.state.summaryModal ? true : false}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Link
                to={{
                  pathname: "/results",
                  location_id: this.state.summaryModal.id,
                }}
                className="ant-btn ant-btn-link ant-btn-sm"
              >
                <span>View dashboard</span>
              </Link>,
            ]}
          >
            <div className="row clearfix">
              <div className="col-xl-4 col-lg-6 col-md-6 more-group-filters  a--summary-s">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">XP Score</h2>
                  </div>
                </div>
                <div
                  className="donut-new donut-new-main"
                  style={{ height: "200px" }}
                >
                  <ProgressBar
                    radius={90}
                    progress={this.state.summaryModal.xp}
                    strokeWidth={8}
                    strokeColor={
                      parseFloat(this.state.summaryModal.xp).toFixed(1) <= 20
                        ? "#bf1717"
                        : parseFloat(this.state.summaryModal.xp).toFixed(1) >
                            20 &&
                          parseFloat(this.state.summaryModal.xp).toFixed(1) <=
                            40
                        ? "#e95c0c"
                        : parseFloat(this.state.summaryModal.xp).toFixed(1) >
                            40 &&
                          parseFloat(this.state.summaryModal.xp).toFixed(1) <=
                            60
                        ? "#FFE054"
                        : parseFloat(this.state.summaryModal.xp).toFixed(1) >
                            60 &&
                          parseFloat(this.state.summaryModal.xp).toFixed(1) <=
                            80
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
                      <div>
                        {parseFloat(this.state.summaryModal.xp).toFixed(1)}
                      </div>
                    </div>
                  </ProgressBar>
                </div>
                <div className="row info-section-b">
                  <div className="col-lg-6 col-sm-6 max-h-200">
                    <h4 className="font-16r text-white text-leftt">
                      {this.state.summaryModal.users}
                    </h4>
                    <label className="mb-0 font-1r text-leftt light-black">
                      Registered users
                    </label>
                  </div>
                  <div className="col-lg-6 col-sm-6 max-h-200">
                    <h4 className="font-16r text-white text-leftt">
                      {this.state.summaryModal.engaged}
                    </h4>
                    <label className="mb-0 font-1r text-leftt light-black">
                      Active users
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 more-group-filters  b--summary-s">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Comments Score</h2>
                  </div>
                </div>
                <div
                  className="donut-new donut-new-main"
                  style={{ height: "200px" }}
                >
                  <ProgressBar
                    radius={90}
                    progress={
                      this.state.summaryModal.comment >= 0
                        ? this.state.summaryModal.comment
                        : 0
                    }
                    strokeWidth={8}
                    strokeColor={
                      this.state.summaryModal.comment <= 14
                        ? "#bf1717"
                        : this.state.summaryModal.comment > 14 &&
                          this.state.summaryModal.comment <= 28
                        ? "#e95c0c"
                        : this.state.summaryModal.comment > 28 &&
                          this.state.summaryModal.comment <= 42
                        ? "#f5a04c"
                        : this.state.summaryModal.comment > 42 &&
                          this.state.summaryModal.comment <= 56
                        ? "#ffe054"
                        : this.state.summaryModal.comment > 56 &&
                          this.state.summaryModal.comment <= 70
                        ? "#b6d484"
                        : this.state.summaryModal.comment > 70 &&
                          this.state.summaryModal.comment <= 84
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
                      <div>
                        {parseFloat(this.state.summaryModal.comment).toFixed(
                          1
                        ) >= 0
                          ? parseFloat(this.state.summaryModal.comment).toFixed(
                              1
                            )
                          : 0}
                        %
                      </div>
                    </div>
                  </ProgressBar>
                </div>
                <div className="tags-section info-section-b map">
                  <div className="row clearfix pn-padding">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h2 className="card-title mb-0">Trending</h2>
                        </div>
                      </div>
                      <ul className="nav">
                        {this.state.summaryModal.themes
                          ?.sort((a, b) => {
                            return b.tags.length - a.tags.length
                          })
                          .slice(0, 5)
                          .map((i) => {
                            return (
                              <li className="nav-item">
                                <span className="feedback-tag">{i.label}</span>
                              </li>
                            )
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12 more-group-filters c--summary-s">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="card-title mb-0">Live campaigns</h2>
                  </div>
                </div>

                {this.state.summaryModal.campaigns
                  ?.filter(
                    (i) => i.status === "Live" || i.status === "Always on"
                  )
                  ?.sort((a, b) => a.id - b.id)
                  .slice(0, 3)
                  .map((i) => {
                    return (
                      <div className="response-section pb--23">
                        <div className="row clearfix">
                          <div className="col-9">
                            <h6 className="score-title-left text-nowrap">
                              {truncate(i.title, 40)}
                            </h6>
                          </div>
                          <div className="col-3">
                            <h6 className="score-title-right">
                              {parseFloat(i.avg).toFixed(1)}%
                            </h6>
                          </div>
                        </div>

                        {/* BURADAKİ PROGRESSBAR DA YER ALAN WIDTH DEĞERİ DE ÜSTTEKİ YÜZDE DEĞERİ ALACAK - WIDTH DEĞİŞİNCE ÇUBUK OTOMATİK ARTIP AZALIYOR */}
                        <div className="progress progress-xs">
                          <div
                            className="progress-bar progress-bar-cyan"
                            role="progressbar"
                            aria-valuenow={87}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: i.avg + "%" }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}

                <div className="d-flex justify-content-between align-items-center info-section-c">
                  <div>
                    <h2 className="card-title mb-0">
                      Recently closed campaigns
                    </h2>
                  </div>
                </div>

                {this.state.summaryModal.campaigns
                  ?.filter((i) => i.status === "Closed")
                  ?.sort((a, b) => new Date(a.end) - new Date(b.end))
                  .slice(0, 3)
                  .map((i) => {
                    return (
                      <div className="response-section pb--23">
                        <div className="row clearfix">
                          <div className="col-9">
                            <h6 className="score-title-left text-nowrap">
                              {truncate(i.title, 40)}
                            </h6>
                          </div>
                          <div className="col-3">
                            <h6 className="score-title-right">
                              {parseFloat(i.avg).toFixed(1)}%
                            </h6>
                          </div>
                        </div>

                        {/* BURADAKİ PROGRESSBAR DA YER ALAN WIDTH DEĞERİ DE ÜSTTEKİ YÜZDE DEĞERİ ALACAK - WIDTH DEĞİŞİNCE ÇUBUK OTOMATİK ARTIP AZALIYOR */}
                        <div className="progress progress-xs">
                          <div
                            className="progress-bar progress-bar-white"
                            role="progressbar"
                            aria-valuenow={87}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: i.avg + "%" }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </Modal>
        </>
      ))
    )
  }

  render = () => {
    const { viewport } = this.state

    return (
      <>
        {this.state.loader ? <LoaderLarge /> : <></>}
        <Geocoder
          onSelected={this.handleGeocoderViewportChange}
          viewport={viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          hideOnSelect={true}
          className="mapbox-search-top"
          mapRef={this.mapRef}
          updateInputOnSelect={true}
          inputComponent={MyInput}
        />
        <MapGL
          {...viewport}
          ref={this.mapRef}
          className="mapbox-_area"
          onViewportChange={(viewport) => this.setState({ viewport })}
          attributionControl={false}
          dragPan={true}
          dragRotate={true}
          mapStyle="mapbox://styles/havci/ckky60rui28wx17p8ercxdls6"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={this.zoomInOutViewportChange}
            />
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              onViewportChange={this.handleGeocoderViewportChange}
            />

            <div className="mapboxgl-ctrl mapboxgl-ctrl-group ">
              <button
                type="button"
                title="Reset View"
                onClick={this.resetView}
                className="mapboxgl-ctrl-icon mapboxgl-ctrl-reset"
              ></button>
            </div>
          </div>

          {this.props.data.map((i) => this._renderCityMarker(i))}

          {this.renderPopup(this.index)}

          {this._summaryModal(this.marker, this.index)}
        </MapGL>
      </>
    )
  }
}

export default MapBox
