import { notification } from "antd"
import React, { useContext, useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
  setFullScreen,
  setLoginBackground,
  setOneTimeLoader,
} from "../../actions/settingsAction"
import { AuthContext } from "../../context/auth"
import AuthLogo from "../common/AuthLogo"
import { AuthSvg } from "../common/commonComponents/CommonBlocks"
import { commonAuthItem } from "../common/commonComponents/formItems"

function Login(props) {
  useEffect(() => {
    props.setFullScreen(false)
    props.setLoginBackground(true)
    setTimeout(() => {
      props.setOneTimeLoader(false)
    }, 1500)
    console.log("Loaded!!!")
  }, [])

  sessionStorage.setItem("isIntroActive", "false")

  const lightVersion = useSelector((state) => state.settings.lightVersion)
  const { user, storeEmail, signIn, resendSignUp } = useContext(AuthContext)

  const [loginSpinner, setLoginSpinner] = useState("")

  const openLoginSpinner = () => {
    setLoginSpinner("spin")
  }

  const closeLoginSpinner = () => {
    setLoginSpinner("")
  }

  const [formData, setFormData] = useState({
    email: user.email || "",
    password: "",
    remember: localStorage.getItem("remember") === "true" ? true : false,
  })

  function change(e) {
    const { name, value } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  function changeTicked(e) {
    const { name, checked } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]: checked,
      }
    })
  }

  function route(e) {
    console.log("entering")
    openLoginSpinner()
    e.preventDefault()
    if (formData.email && formData.password) {
      storeEmail(formData.email)
      signIn(formData.email, formData.password, formData.remember, {}) // user, password, additional info passed to lambda triggers
        .then((user) => {
          console.log("successful sign in")
          console.log(user)
          localStorage.setItem("remember", formData.remember)
          closeLoginSpinner()
          props.setLoginBackground(false)

          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            props.history.push("/updatepassword")
            closeLoginSpinner()
          } else {
            props.history.push("/")
            closeLoginSpinner()
            props.setLoginBackground(false)
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.code && err.code === "PasswordResetRequiredException") {
            notification.error({
              message: 'Password need to be reset. Please use "Reset Password"',
            })
            closeLoginSpinner()
          } else if (err.code && err.code === "UserNotConfirmedException") {
            resendSignUp(formData.email)
            notification.error({
              message: "User not confirmed. Please use link in email.",
            })
            closeLoginSpinner()
          } else if (err.code && err.code === "UserLambdaValidationException") {
            notification.error({
              message: "Please try again in a minute.",
            })
            closeLoginSpinner()
          } else {
            notification.error({
              message: "Wrong email or password",
            })
            closeLoginSpinner()
          }
        })
    } else {
      notification.error({ message: "Email and Password are required" })
      closeLoginSpinner()
    }
  }

  return (
    <>
      <div
        className={`lessmn-_preloader ${
          props.isOneTimeLoader ? "" : " hidden-_loader"
        }`}
      >
        <AuthLogo />
        <p className="powered__-copyright">
          <span>powered by</span> <strong>Leesman &#174; |</strong>{" "}
          Leesmanindex.com
        </p>
      </div>
      <section className="lssman-auth">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 hidden-_xs">
              <div className="lssman-_r-header">
                <Link to="/login" className="fxt-logo">
                  <AuthLogo></AuthLogo>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="lssman-_r-content">
                <h1 className="text-leftt">Get inside</h1>
                <div className="fxt-form">
                  <div className="form-group">
                    <label
                      htmlFor="signin-email"
                      className="input-label text-leftt"
                    >
                      Username
                    </label>
                    {commonAuthItem(change, formData, "email", route)}
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="signin-password"
                      className="input-label text-leftt"
                    >
                      Password
                    </label>
                    {commonAuthItem(change, formData, "password", route)}
                  </div>
                  <div className="form-group">
                    <div className="fxt-checkbox-area">
                      <Link to="/forgotpassword" className="switcher-text">
                        Forgot password?
                      </Link>
                      <Link to="/federatedlogin" className="switcher-text">
                        SSO Login
                      </Link>
                    </div>
                  </div>
                  <div className="form-group">
                    <button onClick={route} className="fxt-btn-fill">
                      {loginSpinner === "spin" ? (
                        <div className="sbl-circ"></div>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 hidden-_xl">
              <div className="lssman-_r-header">
                <Link to="/login" className="fxt-logo">
                  <AuthSvg />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state) => ({
  loginBackground: state.settings.loginBackground,
  isOneTimeLoader: state.settings.isOneTimeLoader,
})

const mapDispatchToProps = (dispatch) => ({
  setLoginBackground: (e) => dispatch(setLoginBackground(e)),
  setOneTimeLoader: (e) => dispatch(setOneTimeLoader(e)),
  setFullScreen: (e) => dispatch(setFullScreen(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
