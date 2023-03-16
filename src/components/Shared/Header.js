import React, { useState, useContext, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { Modal, Badge } from "antd"
import API from "@aws-amplify/api"
import { useFullScreenHandle } from "react-full-screen"

import * as settingsActions from "../../actions/settingsAction"
import * as DemoActions from "../../actions/demographics"
import * as UserActions from "../../actions/user"
import * as filterActions from "../../actions/filter"
import { AuthContext } from "../../context/auth"

import LeesmanInsideLogo from "../../assets/images/leesman-inside.svg"
import LogoutModal from "../NewDesign/elements/modal_logout"
import MenuMobileDashboard from "./MenuMobileDashboard"

const Header = ({
  toggleNotificationBar,
  setOffcanvas,
  setLightTheme,
  offcanvas,
  lightVersion,
  history,
  isSetLogout,
  setLogout,
  userActions,
  user,
  setFullScreen,
  Handle,
  OpenResponder,
  removeFilter,
  isMenu,
  setMenu,
  isChangeModule,
  setChangeModule,
}) => {
  const auth = useContext(AuthContext)
  const { role, signOut } = auth
  const loggedIn = !!auth.user.signInUserSession
  const handle = useFullScreenHandle()
  const [currentUser, setCurrentUser] = useState([])

  const [burgerLines, setBurgerMenu] = useState(false)

  const [confirmLoading, setConfirmLoading] = useState(false)

  const [checkedMenu, setCheckedMenu] = useState(false)

  //  NEW LOGOUT
  const [isLogoutModal, setLogoutModal] = useState(false)
  const letLogout = () => {
    signOut().then(() => history.push("/login"))
    // history.push("/login-new")
  }
  //  NEW LOGOUT

  const goInside = () => {
    if (isChangeModule === "Surveys") {
      history.push("/")
      document.body.classList.remove("temp__class")
    } else {
      history.push("/")
      document.body.classList.add("temp__class")
    }
  }

  const [isAdminDrop, setAdminDrop] = useState(false)
  const [isOpenModule, setOpenModule] = useState(false)

  const showModal = () => {
    // setVisible(true);
    setLogout(true)
  }

  const handleCancel = () => {
    console.log("Clicked cancel button")
    {
      document.body.removeAttribute("style")
    }
    // setVisible(false);
    setLogout(false)
  }

  const onRemoveClick = () => {
    if (document.querySelector("#location-_link") !== null) {
      document.querySelector("#location-_link").classList.remove("active")
    }
    if (document.querySelector("#campaigns-_link") !== null) {
      document.querySelector("#campaigns-_link").classList.remove("active")
    }
    if (document.querySelector("#comments-_link") !== null) {
      document.querySelector("#comments-_link").classList.remove("active")
    }
  }

  useEffect(() => {
    if (loggedIn) {
      if (!user.isLoading && !user.lastFetched && !user.isError) {
        userActions.fetchInit()
        Promise.all([API.get("CoreAPI", "/account")])
          .then((value) => {
            const user_ = value[0]
            userActions.fetchSuccess(user_)
            setCurrentUser(user_)
            if (!user_.first_name && !role) {
              console.log(user_)
              history.push("/setup")
            } else {
              // notification.success({
              //   message:
              //     "Looks like it is not your first time. Intro is passed. If you want, you can see the intro again (for tests)",
              //   className: "cursorp",
              //   onClick: () => {
              //     console.log("button pressed");
              //     sessionStorage.setItem("isTour", false);
              //     history.push("/setup");
              //   },
              //   duration: 0
              // });
            }
          })
          .catch((err) => {
            console.error(err)
            userActions.fetchFailure()
            // history.push("/intro");
          })
      }
    }
  }, [])

  // CONTROL FOR CLIENT-ADMIN SIDE FOR RESPONDER MODE
  useEffect(() => {
    if (!role === false) {
      if (
        window.location.pathname === "/responder-home" ||
        window.location.pathname === "/share-thinking" ||
        window.location.pathname === "/answer-question" ||
        window.location.pathname === "/rate-my-xp"
      ) {
        setLightTheme(true)
        setFullScreen(true)
        localStorage.setItem("setresponderMode", "ON")
      }
    }
  }, [])

  const refHeaderDropLink = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.classList.contains("header_drop_select_item")) {
        setAdminDrop(false)
        setOpenModule(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [setAdminDrop])

  return (
    <>
      <LogoutModal
        setLogoutModal={setLogoutModal}
        isLogoutModal={isLogoutModal}
        letLogout={letLogout}
      />

      <Modal
        className={`${
          !role && lightVersion
            ? "responder-logout-modal"
            : "others-logout-modal"
        } `}
        title="Log out"
        centered
        visible={isSetLogout}
        // visible={visible}
        onOk={() => {
          setConfirmLoading(true)
          removeFilter([])
          setTimeout(() => {
            // setVisible(false);
            setLogout(false)
            setConfirmLoading(false)
            {
              document.body.removeAttribute("style")
            }
            signOut().then(() => history.push("/login"))
          }, 1000)
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>

      <nav className={`navbar top-navbar ${!role ? "transparent-bg" : ""} `}>
        <div className="container-fluid leesman__header">
          <div className="navbar-left">
            <div className="navbar-btn">
              {!role ? (
                <>
                  <Link
                    to={"/"}
                    aria-describedby="a-aria-describedby-clickhere"
                    title="this is a link title"
                    onClick={() => setBurgerMenu(false)}
                  >
                    {/* <strong>Leesman</strong>
                      <sup>&#174;</sup>Inside */}
                    <img src={LeesmanInsideLogo} alt="Leesman Inside Logo" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={"/"}
                    onClick={() => setBurgerMenu(false)}
                    className="admin-logo"
                  >
                    <img
                      src="/assets/images/svg-images/leesman-logo-admin.svg"
                      alt="Leesman Logo"
                      className="img-fluid logo"
                    />
                  </Link>

                  <div
                    className={`change__module ${isOpenModule ? " open" : ""} `}
                  >
                    <div className="module__items">
                      <div
                        onClick={() => {
                          setChangeModule(
                            isChangeModule === "Inside" ? "Surveys" : "Inside"
                          )
                          setOpenModule(false)
                          goInside()
                        }}
                        className="select__item"
                      >
                        {
                          /*isChangeModule === "Inside" ? */ "Surveys" /* : "Inside"*/
                        }
                      </div>
                      <div className="selected__item">
                        {/* <span>{isChangeModule}</span> */}
                        <span>Surveys</span>
                        {/* <span ref={refHeaderDropLink} onClick={() => setOpenModule(!isOpenModule)} className="header_drop_select_item icon cxv-expand-more-l-icn"></span> */}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!role ? (
                <>
                  <div
                    id="responder-_-burger"
                    className={!burgerLines ? " " : "open-_-burger"}
                  >
                    {/* {sessionStorage.getItem("notificationCount") && (
                      <Badge
                        className="badge-_-notifications respo-_badge"
                        count={
                          parseInt(sessionStorage.getItem("notificationCount")) >= 0
                            ? parseInt(sessionStorage.getItem("notificationCount"))
                            : "0"
                        }
                      ></Badge>
                    )} */}
                    <button
                      title="Open menu"
                      onClick={() => setBurgerMenu(!burgerLines)}
                      className={`responder--menu-btn cursorp ${
                        burgerLines ? " clicked" : ""
                      }`}
                    >
                      <i className="icont-accountxc"></i>
                    </button>
                    <ul className="responder-_-sub-menu">
                      <li>
                        <Link
                          to="/my-account"
                          className="item-_-link"
                          onClick={() => setBurgerMenu(false)}
                        >
                          <i
                            className="icon_a-editticon_a-"
                            aria-hidden="true"
                            title="Pencil icon"
                          ></i>{" "}
                          Edit profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/change-password"
                          className="item-_-link"
                          onClick={() => setBurgerMenu(false)}
                        >
                          <i
                            className="icon_a-passworddicon_a-"
                            aria-hidden="true"
                            title="Lock icon"
                          ></i>{" "}
                          Change password
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/alert-settings"
                          className="item-_-link"
                          onClick={() => setBurgerMenu(false)}
                        >
                          <i
                            className="icon_a-alertssicon_a-"
                            aria-hidden="true"
                            title="Alert icon"
                          ></i>{" "}
                          Alert settings
                        </Link>
                      </li>
                      {/* <li>
                        <Badge
                          className="badge-_-notifications respo-li_badge"
                          count={
                            parseInt(sessionStorage.getItem("notificationCount")) >= 0
                              ? parseInt(sessionStorage.getItem("notificationCount"))
                              : "0"
                          }
                        >
                          <a
                            href="#"
                            title="Notifications"
                            className="item-_-link cursorp"
                            onClick={() => {
                              toggleNotificationBar(true);
                              setBurgerMenu(false);
                            }}
                          >
                            <i className="iconx-bell" aria-hidden="true" title="Bell icon"></i> Notifications
                          </a>
                        </Badge>
                      </li> */}
                      <li>
                        <a
                          href="#"
                          title="Logout"
                          className="item-_-link logout--link cursorp"
                          onClick={() => {
                            setBurgerMenu(false)
                            showModal()
                          }}
                        >
                          <i
                            className="icont-logoutxc"
                            aria-hidden="true"
                            title="Power icon"
                          ></i>{" "}
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn-toggle-offcanvas btn-menu-l inside_mobile_btn"
                    onClick={() => setOffcanvas(!offcanvas)}
                  >
                    <i className={offcanvas ? "iconx-x" : "iconx-menu1"}></i>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="navbar-center">
            <div className="">
              <div className="n_menu_horizontal header">
                <NavLink
                  to="/surveys-management"
                  className={`${({ isActive }) =>
                    isActive ? " active" : " "}${
                    window.location.pathname === "/create-survey"
                      ? " active"
                      : " "
                  }`}
                  onClick={() => setMenu("")}
                >
                  Surveys
                </NavLink>
                <NavLink
                  to="/analytics-overview"
                  className={`${({ isActive }) =>
                    isActive ? " active" : " "}${
                    window.location.pathname === "/analytics-results"
                      ? " active"
                      : " "
                  }`}
                  onClick={() => setMenu("")}
                >
                  Results
                </NavLink>
                <NavLink
                  to="/custom-filters"
                  className={({ isActive }) => (isActive ? " active" : " ")}
                  onClick={() => setMenu("")}
                >
                  Custom
                </NavLink>
                <NavLink
                  to="/clients-management"
                  className={`${({ isActive }) =>
                    isActive ? " active" : " "}${
                    window.location.pathname === "/client-settings"
                      ? " active"
                      : " "
                  }`}
                  onClick={() => setMenu("")}
                >
                  Clients
                </NavLink>
              </div>

              {/* {isMenu === "Results" ?

              <div className="n_menu_horizontal header sub">
                <NavLink to="/analytics-results" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>Overview</NavLink>
                <NavLink to="/comparison-data-table" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#01</NavLink>
                <NavLink to="/sentiment-breakdown" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#02</NavLink>
                <NavLink to="/data-summary" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#03</NavLink>
                <NavLink to="/cross-tab" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#04</NavLink>
                <NavLink to="/comparison-table" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#05</NavLink>
                <NavLink to="/heatmap-table-blue-dark" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#06</NavLink>
                <NavLink to="/heatmap-table-green-red" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#07</NavLink>
                <NavLink to="/sentiment-breakdown" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#08</NavLink>
                <NavLink to="/survey-demographics" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#09</NavLink>
                <NavLink to="/dumbbell-table" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#10</NavLink>
                <NavLink to="/heatmap-table-radial" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#11</NavLink>
                <NavLink to="/mobility-profile" className={`${({ isActive }) => (isActive ? ' active' : ' ')}`} onClick={()=>setMenu("Results")}>#12</NavLink>
              </div> : <></>} */}
            </div>
          </div>

          <div className={`navbar-right ${!role ? "responder-top-right" : ""}`}>
            <MenuMobileDashboard
              checkedMenu={checkedMenu}
              setCheckedMenu={setCheckedMenu}
              img_src={"/assets/images/svg-images/leesman-logo-admin.svg"}
            />

            <div className="icon_menu_horizontal header">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? " active" : " ")}
              >
                <span className="cxv-home-l-icn"></span>
              </NavLink>

              {/*<a href="javascript:void(0)" */}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className={`has__drop 
                ${isAdminDrop ? " opened" : ""} 
                ${
                  window.location.pathname === "/supporting-docs"
                    ? " active"
                    : " "
                }
                ${
                  window.location.pathname === "/modules-analytics"
                    ? " active"
                    : " "
                }
                ${
                  window.location.pathname === "/translations-admin"
                    ? " active"
                    : " "
                }
                `}
                onClick={() => setAdminDrop(!isAdminDrop)}
              >
                <span
                  ref={refHeaderDropLink}
                  className="header_drop_select_item cxv-admin-l-icn"
                ></span>

                <div
                  className={` dropped__menu ${isAdminDrop ? " show" : ""} `}
                >
                  <div className="dropped__container">
                    <ul>
                      <li className="has__sub_list">
                        <a href="#!">Global set up</a>
                        <div className="sub__list">
                          <div className="hover__state"></div>
                          <ul>
                            {/* <li><a href="#!">Campaign Modules</a></li> */}
                            <li>
                              <NavLink to="/modules-analytics">Modules</NavLink>
                            </li>
                            <li>
                              <NavLink to="/translations-admin">
                                Translations
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <NavLink
                          to="/supporting-docs"
                          className={({ isActive }) =>
                            isActive ? " active" : " "
                          }
                        >
                          Supporting docs
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/logs-admin">Logs</NavLink>
                      </li>
                      {/* <li><a href="#!">Alerts</a></li> */}
                    </ul>
                  </div>
                </div>
              </a>

              <NavLink to="/all-settings" className="">
                <span className="cxv-settings-l-icn"></span>
              </NavLink>
              <a href="#!" className="">
                <span className="cxv-help-l-icn"></span>
              </a>
              <a onClick={() => setLogoutModal(true)} className="cursorp">
                <span className="cxv-logout-l-icn"></span>
              </a>
            </div>

            {/* OLD BUTTONS HERE */}
            <div id="navbar-menu" className="hidden-xs old__menu">
              <ul className="nav navbar-nav">
                {!role ? (
                  <>
                    {/* RESPONDER HEADER BUTTONS */}
                    <li>
                      <a
                        onClick={() => toggleNotificationBar(true)}
                        className="cursorp"
                      >
                        <i className="iconl-leesman-bell"></i>
                        <span className="icon-menu">Alerts</span>
                      </a>
                    </li>
                    {/* RESPONDER HEADER BUTTONS */}
                  </>
                ) : (
                  <></>
                )}

                {role === "Super Admin" || role === "Leesman Admin" ? (
                  <>
                    {/* ADMIN HEADER BUTTONS */}
                    <li>
                      <Link
                        to="responder-home"
                        // dont forget active the fullscreen module
                        // handle.enter()
                        onClick={() => {
                          setFullScreen(true)
                          setLightTheme(true)
                          OpenResponder()
                          onRemoveClick()
                          setTimeout(() => {
                            Handle.enter()
                          }, 500)
                        }}
                        className={`cursorp ${
                          window.location.pathname === "/responder-home"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="icont-responderxc"></i>
                        <span className="icon-menu">My Feedback</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={onRemoveClick}
                        to={{ pathname: "/questions", scope: "all" }}
                        className={`cursorp ${
                          window.location.pathname === "/questions"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="iconx-layers rcp-_icon"></i>
                        <span className="icon-menu">Modules</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={onRemoveClick}
                        to={{ pathname: "/tags", scope: "all" }}
                        className={`cursorp ${
                          window.location.pathname === "/tags"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="iconx-local_offer rcp-_icon"></i>
                        <span className="icon-menu">Tags</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={onRemoveClick}
                        to="/clients"
                        className={`cursorp ${
                          window.location.pathname === "/clients" ||
                          window.location.pathname === "/client-main" ||
                          window.location.pathname === "/departments" ||
                          window.location.pathname === "/locations" ||
                          window.location.pathname === "/languages" ||
                          window.location.pathname === "/demographics" ||
                          window.location.pathname === "/access" ||
                          window.location.pathname === "/helpdesk" ||
                          window.location.pathname === "/domain-verify" ||
                          window.location.pathname === "/identity-provider" ||
                          window.location.pathname ===
                            "/notification-management"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="icont-clientsxc"></i>
                        <span className="icon-menu">Clients</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={onRemoveClick}
                        to={{ pathname: "/campaigns-management", scope: "all" }}
                        className={`cursorp ${
                          window.location.pathname === "/campaigns-management"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="icont-campaign-managementxc"></i>
                        <span className="icon-menu">Campaign Management</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/survey-management"
                        className={`cursorp ${
                          window.location.pathname === "/survey-management"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="iconx-chat"></i>
                        <span className="icon-menu">Survey Management</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={onRemoveClick}
                        to="/user-management"
                        className={`cursorp ${
                          window.location.pathname === "/user-management"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="icont-user-managementxc"></i>
                        <span className="icon-menu">User Management</span>
                      </Link>
                    </li>
                    {/* ADMIN HEADER BUTTONS */}
                  </>
                ) : (
                  <></>
                )}

                {role === "Admin" ? (
                  <>
                    {/* CLIENT HEADER BUTTONS */}

                    <li>
                      <Link
                        to="responder-home"
                        // dont forget active the fullscreen module
                        // handle.enter()
                        onClick={() => {
                          setFullScreen(true)
                          setLightTheme(true)
                          OpenResponder()
                          setTimeout(() => {
                            Handle.enter()
                          }, 500)
                        }}
                        className={`cursorp ${
                          window.location.pathname === "/responder-home"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="icont-responderxc"></i>
                        <span className="icon-menu">My Feedback</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={onRemoveClick}
                        to="/user-management"
                        className={`cursorp ${
                          window.location.pathname === "/user-management"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="icont-user-managementxc"></i>
                        <span className="icon-menu">User Management</span>
                      </Link>
                    </li>
                    {/* CLIENT HEADER BUTTONS */}
                  </>
                ) : (
                  <></>
                )}
                {role === "Leesman Admin" || role === "Super Admin" ? (
                  <>
                    <li>
                      <Link
                        to="/logs"
                        className={`cursorp ${
                          window.location.pathname === "/logs"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="icont-summaryxc"></i>
                        <span className="icon-menu">Logs</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/migration"
                        className={`cursorp ${
                          window.location.pathname === "/migration"
                            ? " active-btn"
                            : ""
                        }`}
                      >
                        <i className="iconx-fiber_smart_record rcp-_icon"></i>
                        <span className="icon-menu">Migration</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <li>
                  <Link
                    onClick={onRemoveClick}
                    to="/my-account"
                    className={`cursorp ${
                      window.location.pathname === "/my-account" ||
                      window.location.pathname === "/change-password" ||
                      window.location.pathname === "/alert-settings"
                        ? " active-btn"
                        : ""
                    }`}
                  >
                    <i className="icont-accountxc"></i>
                    <span className="icon-menu">Profile</span>
                  </Link>
                </li>
                {/* <li>
                  <a onClick={() => toggleNotificationBar(true)} className={`badge-_-notifications cursorp`}>
                    {sessionStorage.getItem("notificationCount") && (
                      <Badge
                        count={
                          parseInt(sessionStorage.getItem("notificationCount")) >= 0
                            ? parseInt(sessionStorage.getItem("notificationCount"))
                            : "0"
                        }
                      ></Badge>
                    )}
                    <i className="iconx-notifications"></i>
                    <span className="icon-menu">Notifications</span>
                  </a>
                </li> */}
                <li>
                  <a onClick={showModal} className="cursorp">
                    <i className="icont-logoutxc"></i>
                    <span className="icon-menu">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

const mapStateToProps = (state) => ({
  offcanvas: state.settings.offcanvas,
  lightVersion: state.settings.lightVersion,
  isSetLogout: state.settings.isSetLogout,
  isMenu: state.settings.isMenu,
  isChangeModule: state.settings.isChangeModule,
  demographics: state.demographics,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  toggleSearchBar: (e) => dispatch(settingsActions.toggleSearchBar(e)),
  toggleNotificationBar: (e) =>
    dispatch(settingsActions.toggleNotificationBar(e)),
  setMenu: (e) => dispatch(settingsActions.setMenu(e)),
  setChangeModule: (e) => dispatch(settingsActions.setChangeModule(e)),
  setOffcanvas: (e) => dispatch(settingsActions.setOffcanvas(e)),
  setLightTheme: (e) => dispatch(settingsActions.setLightTheme(e)),
  setLogout: (e) => dispatch(settingsActions.setLogout(e)),
  setFullScreen: (e) => dispatch(settingsActions.setFullScreen(e)),
  removeFilter: (e) => dispatch(filterActions.removeFilter(e)),

  demoActions: {
    fetchInit: (e) => dispatch(DemoActions.fetchInit(e)),
    fetchSuccess: (e) => dispatch(DemoActions.fetchSuccess(e)),
    fetchFailure: (e) => dispatch(DemoActions.fetchFailure(e)),
  },
  userActions: {
    fetchInit: (e) => dispatch(UserActions.fetchInit(e)),
    fetchSuccess: (e) => dispatch(UserActions.fetchSuccess(e)),
    fetchFailure: (e) => dispatch(UserActions.fetchFailure(e)),
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
