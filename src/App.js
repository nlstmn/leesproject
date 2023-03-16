import React, { useEffect, useLayoutEffect } from "react"
import { connect } from "react-redux"
import "./App.css"
import Layout from "./components/Shared/Layout"
import Login from "./components/Authentication/login"
import SignUp from "./components/Authentication/signup"
import FederatedLogin from "./components/Authentication/federatedlogin"
import ForgotPasswordSubmit from "./components/Authentication/forgotpasswordsubmit"
import UpdatePassword from "./components/Authentication/updatepassword"
import NewUser from "./components/Authentication/newUser"
import ForgotPassword from "./components/Authentication/forgotpassword"
import axios from "axios"
import AuthProvider, { amplifyConfig } from "./context/auth"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { createBrowserHistory } from "history"
import Amplify from "@aws-amplify/core"
import API from "@aws-amplify/api"
import Auth from "@aws-amplify/auth"
import DetectURL from "./components/Shared/detect_url"
import packageJson from "../package.json"
// Survey Form & Survey Setup
import SurveyForm from "./components/Survey/SurveyForm/index"
import SurveyFormTest from "./components/Survey/SurveyForm/test"
import SurveySetup from "./components/Survey/SurveySetup/survey_setup"
// HOC
import HOC from "./components/HOC/hoc"
// New Auth Pages
import LoginNew from "./components/NewDesign/pages/auth/login"
import ResetNew from "./components/NewDesign/pages/auth/reset"
import SSONew from "./components/NewDesign/pages/auth/sso"
// Analytics Supporting Documents
import AnalyticsSupportingDocs from "./components/NewDesign/pages/analytics/supporting/index"

const history = createBrowserHistory()
Amplify.configure(amplifyConfig)
Auth.configure(amplifyConfig)
API.configure()

const App = ({
  themeColor,
  fontStyle,
  lightVersion,
  RtlVersion,
  loginBackground,
  offcanvas,
  miniSidebar,
  horizontalMenu,
  miniHover,
}) => {
  useEffect(() => {
    //localStorage.setItem("lang", navigator.language || navigator.userLanguage);
    //seting default language
    localStorage.setItem("lang", "en-GB")
    sessionStorage.removeItem("filterData")
  }, [])

  axios.defaults.baseURL = process.env.REACT_APP_LOCAL_BACKEND_URL
    ? process.env.REACT_APP_LOCAL_BACKEND_URL
    : process.env.REACT_APP_API_URL

  //put it to see env variables (not sure if it is 'NODE_ENV')
  console.log(process.env)
  if (process.env.NODE_ENV !== "development") {
    //if env is not develop, then disable all the console messages
    console.log = () => {}
    console.table = () => {}
  }
  // For disabling all the console messages

  useEffect(() => {
    console.log(
      themeColor,
      fontStyle,
      lightVersion,
      RtlVersion,
      loginBackground,
      offcanvas,
      miniSidebar,
      horizontalMenu,
      miniHover
    )
    document.getElementsByTagName("body")[0].className = `
    ${themeColor} 
    ${fontStyle}
    ${lightVersion ? " light_version " : " dark_version "} 
    ${RtlVersion ? " rtl " : ""} 
    ${loginBackground ? " login-bg " : ""} 
    ${offcanvas ? " offcanvas-active " : ""} 
    ${horizontalMenu ? " h-menu " : ""} 
    ${miniSidebar ? " mini_sidebar " : ""} 
    ${miniHover ? " mini_hover " : ""}
    ${window.location.pathname === "/hoc" ? " hoc-bg " : ""}
    ${window.location.pathname === "/pdf-export" ? " hoc-bg print-_bg" : ""}
    ${window.location.pathname === "/survey" ? " survey__first " : ""}
    ${
      window.location.pathname === "/survey-setup"
        ? " survey__first survey-_body "
        : ""
    }`
  }, [
    themeColor,

    fontStyle,

    lightVersion,

    RtlVersion,

    loginBackground,

    offcanvas,

    miniSidebar,

    horizontalMenu,

    miniHover,
    ,
  ])

  const checkVersion = () => {
    let version = localStorage.getItem("version")
    if (version !== packageJson.version) {
      if ("caches" in window) {
        caches.keys().then((names) => {
          // Delete all the cache files
          names.forEach((name) => {
            caches.delete(name)
          })
        })

        // Makes sure the page reloads. Changes are only visible after you refresh.
        window.location.reload(true)
      }

      localStorage.clear()
      localStorage.setItem("version", packageJson.version)
    }
  }

  useLayoutEffect(() => {
    checkVersion()
  }, [])

  return (
    <>
      <AuthProvider>
        <Router history={history} basename="dashboards">
          <DetectURL />
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/new" component={NewUser} />
            <Route path="/federatedlogin" component={FederatedLogin} />
            {/* <Route path="/forgotpassword" component={ForgotPassword} /> */}
            <Route
              path="/forgotpasswordsubmit"
              component={ForgotPasswordSubmit}
            />
            {/* <Route path="/updatepassword" component={UpdatePassword} /> */}
            {/* Survey URL */}
            <Route path="/survey" component={SurveyForm} />
            {/* <Route path="/survey-test" component={SurveyFormTest} /> */}
            <Route path="/survey-setup" component={SurveySetup} />

            {/* HOC URL */}
            <Route path="/hoc" component={HOC} />
            {/* <Route path="/pdf-export" component={PrintHOC} /> */}

            {/* New Auth */}
            <Route path="/login" component={LoginNew} />
            <Route path="/reset-password" component={ResetNew} />
            <Route path="/sso-new" component={SSONew} />

            {/* Analytics Supporting Documents */}
            <Route
              path="/supporting-docs"
              component={AnalyticsSupportingDocs}
            />

            <Route component={Layout} />
          </Switch>
        </Router>
      </AuthProvider>
    </>
  )
}

const mapStateToProps = (state) => ({
  themeColor: state.settings.themeColor,
  fontStyle: state.settings.fontStyle,
  lightVersion: state.settings.lightVersion,
  RtlVersion: state.settings.RtlVersion,
  offcanvas: state.settings.offcanvas,
  horizontalMenu: state.settings.horizontalMenu,
  miniSidebar: state.settings.miniSidebar,
  miniHover: state.settings.miniHover,
  loginBackground: state.settings.loginBackground,
})

export default connect(mapStateToProps)(App)
