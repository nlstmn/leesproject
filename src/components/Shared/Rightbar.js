import React, { useContext, useEffect, useState } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { toggleNotificationBar } from "../../actions/settingsAction"
import { setNotifications } from "../../actions/user"
import { AuthContext } from "../../context/auth"

const Rightbar = ({ isNotificationbar }) => {
  const auth = useContext(AuthContext)
  const { role } = auth
  const [campaignNotifications, setCampaignNotifications] = useState([])
  const [demographicsNotifications, setDemographicsNotifications] = useState([])
  const loggedIn = !!auth.user.signInUserSession
  useEffect(() => {
    axios
      .get("/notifications")
      .then((res) => {
        setCampaignNotifications(res.data.campaign)
        setDemographicsNotifications(res.data.demographics)
        console.log([...res.data.campaign, ...res.data.demographics])
        sessionStorage.setItem(
          "notificationCount",
          [...res.data.campaign, ...res.data.demographics].length
        )
        setNotifications(res.data)

        //asked to disable for now

        // if (loggedIn && (res.data.campaign.length > 0 || res.data.demographics.length > 0)) {
        //   notification.warning({
        //     message: "You have new notifications!",
        //     onClick: () => {
        //       toggleNotificationBar(true);
        //     },
        //   });
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div
        id="rightbar"
        className={`z-index-noti rightbar${isNotificationbar ? " open" : ""}`}
      >
        <div className={`body ${!role ? " responder-mode" : ""}`}>
          <ul className="nav nav-tabs2  text-centerr">
            <button
              title="Close notifications"
              type="button"
              className="btn-toggle-offcanvas btn btn-sm float-right z-index-15 noti-btn"
              onClick={() => toggleNotificationBar(false)}
            >
              <i className="iconx-x"></i>
            </button>

            <h2 className="lead light-black notification-title z-index-9">
              Notifications
            </h2>
          </ul>
          <hr />
          <div className={`tab-content${!role ? " responder-alerts" : ""}`}>
            <div
              className="tab-pane vvivify fadeIn delay-100 active"
              id="Chat-list"
            >
              <ul className="right_chat list-unstyled mb-0 noti-list row">
                {campaignNotifications.map((i, index) => {
                  return (
                    // unread: YENİ BİLDİRİM İSE
                    <li key={index} className="unread col-lg-12">
                      <a>
                        <div className="media">
                          <div className="media-body col-2">
                            <span className="badge badge-outline status"></span>
                          </div>
                          <div className="media-body col-10">
                            <span className="name">
                              <strong>Campaign Notification</strong>
                            </span>
                            <span className="name">{i.label}</span>
                            <small className="name">{i.label}</small>
                            <span className="message">24.09.2021 - 12:25</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                })}
                {demographicsNotifications.map((i, index) => {
                  return (
                    // read: OKUNDU, GÖRÜLDÜ İSE
                    <li key={index} className="read col-lg-12">
                      <a>
                        <div className="media">
                          <div className="media-body col-2">
                            <span className="badge badge-outline status"></span>
                          </div>
                          <div className="media-body col-10">
                            <span className="name">
                              <strong>Demographics Notification</strong>
                            </span>
                            <span className="name">{i.label}</span>
                            <span className="message">01.01.2021 - 17:00</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  isNotificationbar: state.settings.isNotificationbar,
  setNotifications: state.user.setNotifications,
})

const mapDispatchToProps = (dispatch) => ({
  toggleNotificationBar: (e) => dispatch(toggleNotificationBar(e)),
  setNotifications: (e) => dispatch(setNotifications(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Rightbar)
