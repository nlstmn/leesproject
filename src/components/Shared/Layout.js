import React, { useEffect, useState, useContext } from "react"
import { Link, useHistory, Route, Switch, Redirect } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import Menu from "./Menu"
import Header from "./Header"
import axios from "axios"
import BgImage from "../Responder/BgImage"
import Rightbar from "./Rightbar"
import Responder from "../Routes/Responder"
import Client from "../Routes/Client"
import Admin from "../Routes/Admin"
import Home from "../Responder/Home"
import LeesmanAdmin from "../Routes/LeesmanAdmin"
import SuperAdmin from "../Routes/LeesmanAdmin"
import Analytics_Main from "../NewDesign/pages/shared/main/index"
import { AuthContext } from "../../context/auth"
import {
  setLightTheme,
  setLoginBackground,
  setFullScreen,
} from "../../actions/settingsAction"
import { useFullScreenHandle } from "react-full-screen"
import { fetchClientSuccess, fetchClientFailure } from "../../actions/client"
import { notification } from "antd"

function Layout(props) {
  const { role, isLoading, user } = useContext(AuthContext)
  const [responderMode, setresponderMode] = useState("OFF")
  const dispatch = useDispatch()
  const openResponderModal = () => {
    localStorage.setItem("setresponderMode", "ON")
    setresponderMode(localStorage.getItem("setresponderMode"))
    console.log(
      responderMode + " " + "responder mode status for admin/client side"
    )
  }

  const closeResponderModal = () => {
    setresponderMode("OFF")
  }

  const handle = useFullScreenHandle()

  useEffect(() => {
    if (
      props.location.pathname !== "/responder-home" &&
      props.location.pathname !== "/share-thinking" &&
      props.location.pathname !== "/answer-question" &&
      props.location.pathname !== "/rate-my-xp" &&
      props.openFullScreen === true &&
      props.lightVersion === true
    ) {
      props.setLightTheme(false)
      props.setFullScreen(false)
      setresponderMode("OFF")
      props.history.push("/")
    }
  }, [
    props.location.pathname,
    props.lightVersion,
    props.openFullScreen,
    responderMode,
  ])

  useEffect(() => {
    if (
      props.location.pathname === "/results" ||
      props.location.pathname === "/organisation-xp-score" ||
      props.location.pathname === "/all-campaigns" ||
      props.location.pathname === "/results-feedbacks" ||
      props.location.pathname === "/wave-engagement" ||
      props.location.pathname === "/questions" ||
      props.location.pathname === "/tags" ||
      props.location.pathname === "/clients" ||
      props.location.pathname === "/campaigns-management" ||
      props.location.pathname === "/survey-management" ||
      props.location.pathname === "/user-management" ||
      props.location.pathname === "/logs" ||
      props.location.pathname === "/campaigns" ||
      (props.location.pathname === "/campaign-details" &&
        props.lightVersion === true) ||
      (props.location.pathname === "/survey-details" &&
        props.lightVersion === true)
    ) {
      props.setLightTheme(false)
    }
  }, [props.location.pathname, props.lightVersion])

  useEffect(() => {
    if (
      props.location.pathname !== "/updatepassword" ||
      props.location.pathname !== "/forgotpasswordsubmit" ||
      props.location.pathname !== "/forgotpassword" ||
      props.location.pathname !== "/federatedlogin" ||
      props.location.pathname !== "/new" ||
      props.location.pathname !== "/login" ||
      props.location.pathname !== "/signup"
    ) {
      props.setLoginBackground(false)
    }
  }, [props.location.pathname])

  useEffect(() => {
    if (!isLoading && !user.signInUserSession) {
      console.log("layout")
      props.setLightTheme(false)
      props.setLoginBackground(false)
      props.history.push("/login")
    } else {
    }
  }, [isLoading, user])

  const [locationKeys, setLocationKeys] = useState([])
  const history = useHistory()

  // CONTROL FOR BACK OR FORWARD CLICK ON BROWSER
  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key])
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys)

          if (props.location.pathname === "/responder-home") {
            props.history.push("/")
            props.setLightTheme(false)
            props.setFullScreen(false)
          }
          if (
            props.location.pathname === "/share-thinking" &&
            responderMode === "ON"
          ) {
            props.setLightTheme(true)
            props.setFullScreen(true)
          }
          if (
            props.location.pathname === "/answer-question" &&
            responderMode === "ON"
          ) {
            props.setLightTheme(true)
            props.setFullScreen(true)
          }
          if (
            props.location.pathname === "/rate-my-xp" &&
            responderMode === "ON"
          ) {
            props.setLightTheme(true)
            props.setFullScreen(true)
          }
        } else {
          setLocationKeys((keys) => [location.key, ...keys])

          if (props.location.pathname === "/responder-home") {
            props.history.push("/")
            props.setLightTheme(false)
            props.setFullScreen(false)
          }
          if (
            props.location.pathname === "/share-thinking" &&
            responderMode === "ON"
          ) {
            props.setLightTheme(true)
            props.setFullScreen(true)
          }
          if (
            props.location.pathname === "/answer-question" &&
            responderMode === "ON"
          ) {
            props.setLightTheme(true)
            props.setFullScreen(true)
          }
          if (
            props.location.pathname === "/rate-my-xp" &&
            responderMode === "ON"
          ) {
            props.setLightTheme(true)
            props.setFullScreen(true)
          }
        }
      }
    })
  }, [locationKeys])

  // CONTROL FOR REFRESH PAGE
  useEffect(() => {
    if (window.performance) {
      console.info("window.performance works fine on this browser")
    }
    console.info(performance.navigation.type)
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info("This page is reloaded")
      if (props.location.pathname === "/responder-home") {
        props.history.push("/responder-home")
        props.setLightTheme(true)
        props.setFullScreen(true)
      }
      if (
        props.location.pathname === "/share-thinking" &&
        responderMode === "ON"
      ) {
        props.history.push("/share-thinking")
        props.setLightTheme(true)
        props.setFullScreen(true)
      }
      if (
        props.location.pathname === "/answer-question" &&
        responderMode === "ON"
      ) {
        props.history.push("/answer-question")
        props.setLightTheme(true)
        props.setFullScreen(true)
      }
      if (props.location.pathname === "/rate-my-xp" && responderMode === "ON") {
        props.history.push("/rate-my-xp")
        props.setLightTheme(true)
        props.setFullScreen(true)
      }
    } else {
      console.info("This page is not reloaded")
    }
  }, [])

  const routes = {
    "Super Admin": SuperAdmin.routes,
    "Leesman Admin": LeesmanAdmin.routes,
    Admin: Admin.routes,
    Client: Client.routes,
    [null]: Responder.routes, // Responder
    [undefined]: Responder.routes, // Responder
  }

  return (
    !isLoading && (
      <>
        <div className="overlay" />
        <div id="wrapper">
          {!props.openFullScreen &&
          props.location.pathname !== "/responder-home" ? (
            <Header
              {...props}
              Handle={handle}
              OpenResponder={openResponderModal}
            />
          ) : (
            <></>
          )}
          <Rightbar />
          {!props.openFullScreen &&
          props.location.pathname !== "/responder-home" ? (
            <Menu {...props} />
          ) : (
            <></>
          )}
          {/* <FullScreen handle={handle} {...props}> */}
          {props.openFullScreen &&
          props.location.pathname === "/responder-home" ? (
            <Link
              to="/"
              onClick={() => {
                props.setFullScreen(!props.openFullScreen)
                props.setLightTheme(false)
                closeResponderModal()
              }}
              className="mb-0 float-r btn btn-danger exit-_btn"
            >
              Exit
            </Link>
          ) : (
            <></>
          )}
          <div id="main-content">
            {!role ||
            props.location.pathname === "/responder-home" ||
            props.location.pathname === "/share-thinking" ||
            props.location.pathname === "/answer-question" ||
            props.location.pathname === "/rate-my-xp" ? (
              <BgImage {...props} />
            ) : (
              <></>
            )}
            <Switch>
              {routes[role]?.map((layout, i) => {
                return (
                  <Route
                    key={`r${i}`}
                    exact={layout.exact}
                    path={layout.path}
                    component={layout.component}
                  ></Route>
                )
              })}

              {/* Fallback route */}
              <Route exact={true} path="/test" component={Home}></Route>

              <Route component={Analytics_Main}>
                <Redirect to="/" />
              </Route>
            </Switch>
          </div>
          {/* </FullScreen> */}
        </div>
      </>
    )
  )
}
const mapStateToProps = (state) => ({
  lightVersion: state.settings.lightVersion,
  openFullScreen: state.settings.openFullScreen,
  client: state.client,
})

const mapDispatchToProps = (dispatch) => ({
  setLightTheme: (e) => dispatch(setLightTheme(e)),
  setFullScreen: (e) => dispatch(setFullScreen(e)),
  setLoginBackground: (e) => dispatch(setLoginBackground(e)),
  fetchClientSuccess: (e) => dispatch(fetchClientSuccess(e)),
  fetchClientFailure: (e) => dispatch(fetchClientFailure(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Layout)
