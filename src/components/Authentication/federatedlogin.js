import React, { useState, useContext, useEffect } from "react"
import { notification } from "antd"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth"
import { connect } from "react-redux"
import { setLoginBackground } from "../../actions/settingsAction"
import { AuthSvg } from "../common/commonComponents/CommonBlocks"
import AuthLogo from "../common/AuthLogo"

import { commonAuthItem } from "../common/commonComponents/formItems"
function FederatedLogin(props) {
  useEffect(() => {
    props.setLoginBackground(true)
    console.log("Login BG changed!!!")
  }, [])

  const lightVersion = useSelector((state) => state.settings.lightVersion)
  const { email, storeEmail, federatedLogin } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    type: "leesman",
    email: email || "",
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

  function login(e) {
    e.preventDefault()
    if (formData.email) {
      storeEmail(formData.email)
      federatedLogin(formData.email)
    } else {
      notification.error({ message: "Email is required" })
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
                <h1 className="text-leftt">SSO login</h1>
                <h2>Type email to login.</h2>
                <div className="fxt-form">
                  <div className="form-group">
                    {commonAuthItem(change, formData, "email", login)}
                  </div>
                  <div className="form-group">
                    <div className="fxt-checkbox-area">
                      <Link to="/forgotpassword" className="switcher-text">
                        Forgot password?
                      </Link>
                      <Link to="/login" className="switcher-text">
                        Login
                      </Link>
                    </div>
                  </div>
                  <div className="form-group">
                    <button onClick={login} className="fxt-btn-fill">
                      Login
                    </button>
                  </div>
                </div>
                {/* <div className="fxt-footer">
                  <p><Link to="/" className="switcher-text2 inline-text">Register</Link></p>
              </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(FederatedLogin)
