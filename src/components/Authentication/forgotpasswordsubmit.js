import React, { useState, useContext, useEffect } from "react"
import { notification } from "antd"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth"
import { connect } from "react-redux"
import { setLoginBackground } from "../../actions/settingsAction"
import PasswordChecklist from "react-password-checklist"
import AuthLogo from "../common/AuthLogo"
import { AuthSvg } from "../common/commonComponents/CommonBlocks"
import { commonAuthItem } from "../common/commonComponents/formItems"
function ForgotPasswordSubmit(props) {
  useEffect(() => {
    props.setLoginBackground(true)
    console.log("Login BG changed!!!")
  }, [])

  const { email, forgotPasswordSubmit } = useContext(AuthContext)
  const lightVersion = useSelector((state) => state.settings.lightVersion)
  const [formData, setFormData] = useState({
    email: email || "",
    code: "",
    password: "",
    passwordConfirm: "",
  })
  const [isValid, setIsValid] = useState(false)

  const change = (e) => {
    const { name, value } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  const changePassword = (e) => {
    e.preventDefault()
    const { email, code, password } = formData
    if (!isValid) {
      notification.error({
        message: "Please enter a valid password",
      })
    } else {
      forgotPasswordSubmit(email, code, password)
        .then(() => {
          notification.success({
            message: "Password reset",
          })
          props.history.push("/login")
        })
        .catch((err) => {
          console.log(err)
          notification.error({
            message: "Unable to complete action",
          })
        })
    }
  }
  return (
    <>
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
                <h1 className="text-leftt">Password update</h1>
                <h2>Please update your password.</h2>
                <div className="fxt-form">
                  <div className="form-group">
                    {commonAuthItem(change, formData, "email", changePassword)}
                  </div>
                  <div className="form-group">
                    {commonAuthItem(change, formData, "code", changePassword)}
                  </div>
                  <div className="form-group">
                    {commonAuthItem(
                      change,
                      formData,
                      "password",
                      changePassword
                    )}
                  </div>
                  <div className="form-group">
                    {commonAuthItem(
                      change,
                      formData,
                      "passwordConfirm",
                      changePassword,
                      "Confirm password"
                    )}
                  </div>
                  <div className="form-group password-_-check">
                    <PasswordChecklist
                      rules={[
                        "minLength",
                        "specialChar",
                        "number",
                        "capital",
                        "match",
                      ]}
                      minLength={8}
                      value={formData.password}
                      valueAgain={formData.passwordConfirm}
                      onChange={(isValid) => {
                        setIsValid(isValid)
                      }}
                      messages={{
                        minLength: "8 characters long.",
                        specialChar: "At least 1 symbol.",
                        number: "At least 1 number.",
                        capital: "At least 1 upper case.",
                        match: "Password do match.",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <div className="fxt-checkbox-area">
                      <Link to="/login" className="switcher-text">
                        Login
                      </Link>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      onClick={changePassword}
                      className="fxt-btn-fill reset-_btn"
                    >
                      Update password
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
})

const mapDispatchToProps = (dispatch) => ({
  setLoginBackground: (e) => dispatch(setLoginBackground(e)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordSubmit)
