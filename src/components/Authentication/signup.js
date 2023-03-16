import React, { useState, useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector, connect } from "react-redux"
import { notification } from "antd"
import { AuthContext } from "../../context/auth"
import axios from "axios"
import PasswordChecklist from "react-password-checklist"
import { setLoginBackground } from "../../actions/settingsAction"
import { AuthSvg } from "../common/commonComponents/CommonBlocks"
import AuthLogo from "../common/AuthLogo"

import { commonAuthItem } from "../common/commonComponents/formItems"
function SignUp(props) {
  const history = useHistory()
  const query = new URLSearchParams(props.location.search)
  const inviteCode = query.get("invite_code")
  const [domain, setDomain] = useState("")

  useEffect(() => {
    props.setLoginBackground(true)
    console.log("Login BG changed!!!")
    if (!inviteCode) {
      notification.error({
        message: "Please use the invite link provided to your admin",
      })
      props.history.push("/login")
    } else {
      axios
        .get(`/client/invitecode/${inviteCode}`)
        .then((res) => {
          console.log(res.data.map((i) => i.name))
          setDomain(res.data.map((i) => i.name))
        })
        .catch((err) => {
          notification.warning({ message: "Incorrect invite link" })
          history.push("/login")
          console.log(err)
        })
    }
  }, [])

  const { email, storeEmail, signUp } = useContext(AuthContext)
  const lightVersion = useSelector((state) => state.settings.lightVersion)
  const [formData, setFormData] = useState({
    email: email || "",
    password: "",
    passwordConfirm: "",
  })

  const change = (e) => {
    const { name, value } = e.target
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }))
  }

  const submit = (e) => {
    e.preventDefault()
    const { email, password, passwordConfirm } = formData
    if (password !== passwordConfirm) {
      notification.error({ message: "Passwords do not match" })
    } else if (email && password && passwordConfirm) {
      if (domain.includes(email.split("@")[1])) {
        storeEmail(email)
        signUp(email, password, inviteCode)
          .then(() => {
            notification.success({
              message:
                "Please confirm account by using the link sent to your email",
            })
            props.history.push("/login")
          })
          .catch((e) => {
            console.error(e)
            if (e.code === "InvalidPasswordException") {
              notification.error({ message: e.message })
            } else {
              notification.error({ message: "Error submitting sign up" })
            }
          })
      } else {
        notification.error({ message: "Unauthorised domain" })
      }
    } else {
      notification.error({ message: "Email and Password are required" })
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
                <h1 className="text-leftt">Register</h1>
                <h2>Create an account</h2>
                <div className="fxt-form">
                  <div className="form-group">
                    {commonAuthItem(change, formData, "email", submit)}
                  </div>
                  <div className="form-group">
                    {commonAuthItem(change, formData, "password", submit)}
                  </div>
                  <div className="form-group">
                    {commonAuthItem(
                      change,
                      formData,
                      "passwordConfirm",
                      submit,
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
                      onChange={(isValid) => {}}
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
                      type="submit"
                      onClick={submit}
                      className="fxt-btn-fill"
                    >
                      Register
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
