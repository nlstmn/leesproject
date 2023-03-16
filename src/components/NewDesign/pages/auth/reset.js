/* eslint-disable jsx-a11y/alt-text */
import React, { useLayoutEffect, useState, useContext } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { notification } from "antd"
import validator from "validator"

import { setLoginBackground } from "../../../../actions/settingsAction"
import { AuthContext } from "../../../../context/auth"
import LoaderPage from "../../elements/loader_page"
import { commonAuthItem } from "../../../common/commonComponents/formItems"

const Reset = ({ setLoginBackground }) => {
  const history = useHistory()

  const { email, storeEmail, forgotPassword } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: email || "",
  })

  useLayoutEffect(() => {
    setLoginBackground(false)

    setTimeout(() => {
      document.body.classList.add("temp__class")
    }, 600)
  }, [])

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
          history.push("/forgotpasswordsubmit")
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

                <h1>Password reset ― </h1>
                <p className="auth_desc">
                  If you forgot your password, well, then we’ll email you
                  instructions to reset your password.
                </p>

                <div className="n_auth_form">
                  {commonAuthItem(change, formData, "email", changePassword)}

                  <Link to="/login" className="n__link">
                    Return to login
                  </Link>

                  <button className="btn-dash dark" onClick={changePassword}>
                    Send Reset Link
                  </button>
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
  loginBackground: state.settings.loginBackground,
})

const mapDispatchToProps = (dispatch) => ({
  setLoginBackground: (e) => dispatch(setLoginBackground(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
