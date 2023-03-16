import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { setBgImage } from "../../../actions/settingsAction"
import { Link } from "react-router-dom"
import axios from "axios"
import Loader from "../../common/LoaderSmall"
import { notification } from "antd"
const Alerts = ({ setBgImage, notifications }) => {
  const [notificationData, setNotifications] = useState([])
  const [preferences, setPreferences] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setBgImage("other-image")
    console.log("Image changed!!!")
    console.log(notifications)
    getData()
  }, [])
  const getData = () => {
    axios
      .get("/notifications")
      .then((res) => {
        setNotifications(res.data.types)
        setPreferences(res.data.preferences)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const sendPreferences = (id) => {
    console.log(id)
    axios
      .put(`/notifications/${id}`)
      .then((res) => {
        notification.success({ message: "Preferences updated" })
        getData()
      })
      .catch((err) => {
        notification.warning({ message: "Preferences cannot updated" })
        console.log(err)
      })
  }

  return (
    <>
      <div className="responder-_account-section alerts-_section">
        <div className="container">
          <div className="row bg-_account-section">
            <div className="col-lg-5 col-md-12 bg-_color-left none-992">
              <div className="form-_section">
                <h3>
                  <strong>Settings</strong>
                </h3>
                <div className="account-_inner-form">
                  <div className="form-group form-box text-leftt">
                    <Link to="/my-account" className="item-_-link">
                      <i
                        className="icon_a-editticon_a-"
                        aria-hidden="true"
                        title="Pencil icon"
                      ></i>{" "}
                      Edit profile
                    </Link>
                  </div>
                  <div className="form-group form-box text-leftt">
                    <Link to="/change-password" className="item-_-link">
                      <i
                        className="icon_a-passworddicon_a-"
                        aria-hidden="true"
                        title="Lock icon"
                      ></i>{" "}
                      Change password
                    </Link>
                  </div>
                  <div className="form-group form-box text-leftt">
                    <Link
                      to="/alert-settings"
                      className="item-_-link active-_-item"
                    >
                      <i
                        className="icon_a-alertssicon_a-"
                        aria-hidden="true"
                        title="Bell icon"
                      ></i>{" "}
                      Alert settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 bg-_color-right">
              <div className="form-_section">
                <h3 className="right--_h3">
                  <i
                    className="icon_a-alertssicon_a-"
                    aria-hidden="true"
                    title="Bell icon"
                  ></i>{" "}
                  Alert settings
                </h3>
                <div className="account-_inner-form ">
                  <div className="form-group form-box text-leftt">
                    <ul className="list-group mb-3 tp-setting">
                      {loading ? (
                        <Loader />
                      ) : (
                        notificationData
                          ?.sortAlphabetically("label")
                          .map((item) => {
                            return (
                              <li className="list-group-item">
                                <span>{item.label}</span>
                                <div className="float-right">
                                  <label className="switch" htmlFor={item.id}>
                                    <input
                                      type="checkbox"
                                      id={item.id}
                                      checked={preferences.includes(item.id)}
                                      onChange={() => {
                                        sendPreferences(item.id)
                                      }}
                                    />

                                    <span className="slider round"></span>
                                  </label>
                                </div>
                              </li>
                            )
                          })
                      )}
                    </ul>
                  </div>
                </div>
                <div className="bottom-_btns">
                  <Link to="/" className="mb-0 float-l btn btn-default">
                    Close
                  </Link>
                  <a className="mb-0 float-r btn btn-primary">Update</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  bgImage: state.settings.bgImage,
  notifications: state.user.notifications,
})

const mapDispatchToProps = (dispatch) => ({
  setBgImage: (e) => dispatch(setBgImage(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
