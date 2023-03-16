import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { notification } from "antd"
import { AuthContext } from "../../context/auth"
import { connect } from "react-redux"
import { setLoginBackground } from "../../actions/settingsAction"
import AuthLogo from "../common/AuthLogo"
import validator from "validator"

import { commonAuthItem } from "../common/commonComponents/formItems"
function ForgotPassword(props) {
  useEffect(() => {
    props.setLoginBackground(true)
    console.log("Login BG changed!!!")
  }, [])

  const { email, storeEmail, forgotPassword } = useContext(AuthContext)
  const lightVersion = useSelector((state) => state.settings.lightVersion)
  const [formData, setFormData] = useState({
    email: email || "",
  })

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
    storeEmail(formData.email)
    if (validator.isEmail(formData.email)) {
      forgotPassword(formData.email)
        .then(() => {
          props.history.push("/forgotpasswordsubmit")
        })
        .catch((err) => {
          console.log(err)
          notification.error({
            message: "Unable to send forgot password email",
          })
        })
    } else {
      notification.warning({ message: "Please enter a valid email" })
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
                  <AuthLogo />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="lssman-_r-content">
                <h1 className="text-leftt">Password reset</h1>
                <h2>Type email to recover password.</h2>
                <div className="fxt-form">
                  <div className="form-group">
                    {commonAuthItem(change, formData, "email", changePassword)}
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
                      Reset password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 hidden-_xl">
              <div className="lssman-_r-header">
                <Link to="/login" className="fxt-logo">
                  <AuthLogo />
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
