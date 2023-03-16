import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { notification } from "antd"
import Auth from "@aws-amplify/auth"
import { connect } from "react-redux"
import { setLoginBackground } from "../../actions/settingsAction"
import AuthLogo from "../common/AuthLogo"

import { commonAuthItem } from "../common/commonComponents/formItems"
function NewUser(props) {
  useEffect(() => {
    props.setLoginBackground(true)
    console.log("Login BG changed!!!")
  }, [])

  const [formData, setFormData] = useState({
    type: "leesman",
    email: "",
    password: "",
  })
  function showNotification(text) {
    notification.open({ message: text })
  }
  useEffect(() => {
    console.log("rendered", formData)
  }, [formData])
  function change(e) {
    const { name, value } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  function changeType(e) {
    const { value } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        type: value,
      }
    })
  }

  function signUp(e) {
    e.preventDefault()
    const { email, password, passwordConfirm } = formData
    if (password !== passwordConfirm) {
      showNotification("Passwords do not match")
    } else if (email && password && passwordConfirm) {
      signUp_()
    } else {
      showNotification("Email and Password are required")
    }
  }
  async function signUp_() {
    try {
      const { user } = await Auth.signUp({
        username: formData.email,
        password: formData.password,
        attributes: {
          "custom:role": formData.type, // optional
          "custom:type": formData.type, // optional
          // optional - E.164 number convention
          // other custom attributes
        },
      })
      if (user) {
        showNotification("Success!")
      }
      console.log(user)
    } catch (error) {
      console.log(error.message)
      showNotification(String(error.message))
      console.log(formData)
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
                <h1 className="text-leftt">Regsiter</h1>
                <h2>Create an account</h2>
                <div className="fxt-form">
                  <div className="form-group">
                    {commonAuthItem(change, formData, "email", signUp)}
                  </div>
                  <div className="form-group">
                    {commonAuthItem(change, formData, "password", signUp)}
                  </div>
                  <div className="form-group">
                    {commonAuthItem(
                      change,
                      formData,
                      "passwordConfirm",
                      signUp,
                      "Confirm password"
                    )}
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="user-type"
                      className="control-label sr-only"
                    >
                      User Type
                    </label>
                    <select
                      className="form-control"
                      name="user-type"
                      id="user-type"
                      onChange={changeType}
                      defaultChecked=""
                    >
                      <option disabled selected value="">
                        Select User Type
                      </option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Leesman Admin">Leesman Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Client">Client</option>
                      <option value="Responder">Responder</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="fxt-checkbox-area">
                      <Link to="/login" className="switcher-text">
                        Login
                      </Link>
                    </div>
                  </div>
                  <div className="form-group">
                    <button onClick={signUp} className="fxt-btn-fill">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 hidden-_xl">
              <div className="lssman-_r-header">
                <Link to="/login" className="fxt-logo">
                  <svg
                    id="leesmanInsideLogo"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 72.23 73.91"
                  >
                    <title id="leesmanInsideLogo">Leesman Inside Logo</title>
                    <desc id="leesmanInsideLogo">
                      If clicked, it will go to the Login page.
                    </desc>
                    <defs></defs>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path
                          className="cls-1"
                          d="M65.45,57.14a36.09,36.09,0,1,0-12.76,11L66.6,73.91Z"
                        />
                        <g id="_4" data-name="4">
                          <circle
                            className="cls-2"
                            cx="36.12"
                            cy="36.12"
                            r="5.02"
                            transform="translate(-14.96 36.12) rotate(-45)"
                          />
                          <circle
                            className="cls-2"
                            cx="55.99"
                            cy="36.12"
                            r="5.02"
                            transform="translate(-9.14 50.17) rotate(-45)"
                          />
                        </g>
                        <g id="_4-2" data-name="4">
                          <circle
                            className="cls-2"
                            cx="16.24"
                            cy="36.12"
                            r="5.02"
                            transform="translate(-20.78 22.06) rotate(-45)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewUser)
