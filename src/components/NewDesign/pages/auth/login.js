/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useLayoutEffect, useState } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { notification } from "antd"

import { AuthContext } from "../../../../context/auth"
import { setLoginBackground, setMenu } from "../../../../actions/settingsAction"
import LoaderPage from "../../elements/loader_page"
import { commonAuthItem } from "../../../common/commonComponents/formItems"

const Login = ({ setLoginBackground, setMenu }) => {
  sessionStorage.setItem("isIntroActive", "false")

  const history = useHistory()
  const { user, storeEmail, signIn, resendSignUp } = useContext(AuthContext)

  useLayoutEffect(() => {
    setLoginBackground(false)
    setMenu("")

    setTimeout(() => {
      document.body.classList.add("temp__class")
    }, 600)
  }, [])

  const [loginSpinner, setLoginSpinner] = useState("")
  const [formData, setFormData] = useState({
    email: user.email || "",
    password: "",
    remember: localStorage.getItem("remember") === "true" ? true : false,
  })

  const openLoginSpinner = () => {
    setLoginSpinner("spin")
  }

  const closeLoginSpinner = () => {
    setLoginSpinner("")
  }

  const change = (e) => {
    const { name, value } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  const handleLogin = (e) => {
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
          setLoginBackground(false)

          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            history.push("/updatepassword")
            closeLoginSpinner()
          } else {
            history.push("/")
            closeLoginSpinner()
            setLoginBackground(false)
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
      <LoaderPage />

      <div className="n__header">
        <a href="#!" className="n__logo">
          <img
            className=""
            src="/assets/images/svg-images/leesman-logo-admin.svg"
          ></img>
        </a>
        {/* <div className="n__header-right">
        <select className="custom-select dash_-language-select">
          <option selected="EN">EN</option>
          <option value="DE">DE</option>
          <option value="TR">TR</option>
          <option value="ZH">ZH</option>
        </select>
      </div> */}
      </div>

      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="n_auth__section">
              <div className="n_auth__container">
                <img
                  className="auth_hero_img"
                  src="/assets/images/svg-images/leesman_analytics.svg"
                ></img>

                <h1>Login ― </h1>
                <p className="auth_desc">
                  If you are a current Leesman client and already have access to
                  Leesman’s Analytics engine, please use the access logins
                  granted to you.
                </p>

                <p className="auth_desc">
                  If you are a new user and would like to register for a trial
                  account to see the benefits of the Leesman Index free of
                  charge, please register here.*
                </p>

                <div className="n_auth_form">
                  {commonAuthItem(
                    change,
                    formData,
                    "email",
                    handleLogin,
                    "Email"
                  )}
                  {commonAuthItem(
                    change,
                    formData,
                    "password",
                    handleLogin,
                    "Password"
                  )}

                  {/* <input placeholder="Email" type="text" className="n_input"></input>
                  <input placeholder="Password" type="text" className="n_input"></input> */}

                  <Link to="/reset-password" className="n__link">
                    Forgotten Password?
                  </Link>

                  <button
                    className="btn-dash dark"
                    onClick={handleLogin}
                    disabled={loginSpinner === "spin"}
                  >
                    {loginSpinner === "spin" ? (
                      <div className="sbl-circ"></div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>

                <p className="n_terms">
                  *Access to the Leesman Analytics is by permission only. In
                  accessing this site, you agree to be bound by our{" "}
                  <a href="#!">Web Terms & Conditions</a>. All client
                  information accessed should be treated as Privileged and
                  Strictly Confidential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  loginBackground: state.settings.loginBackground,
})

const mapDispatchToProps = (dispatch) => ({
  setLoginBackground: (e) => dispatch(setLoginBackground(e)),
  setMenu: (e) => dispatch(setMenu(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
