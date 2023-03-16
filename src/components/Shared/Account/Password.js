import React, { useState, useEffect, useContext } from "react"
import { Input, notification } from "antd"
import { connect } from "react-redux"
import { setBgImage } from "../../../actions/settingsAction"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../context/auth"
import PasswordChecklist from "react-password-checklist"

const Password = ({ setBgImage }) => {
  useEffect(() => {
    setBgImage("other-image")
    console.log("Image changed!!!")
  }, [])
  const { role, changePassword } = useContext(AuthContext)
  //let history = useHistory();
  const [inputs, setInputs] = useState({
    new1: "",
    new2: "",
    old: "",
  })
  const [isValid, setIsValid] = useState(false)
  const change = (e) => {
    const { name, value } = e.target
    setInputs((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }
  const send = () => {
    if (inputs.new1 !== inputs.new2) {
      notification.warning({ message: "Passwords did not matched!" })
    } else if (inputs.new2.length < 6 && inputs.new1.length < 6) {
      notification.warning({ message: "Password should be longer" })
    } else if (inputs.old.length < 1) {
      notification.warning({ message: "Please enter your old password" })
    } else {
      changePassword(String(inputs.old), String(inputs.new1))
        .then((res) => {
          notification.success({ message: "Your password has been changed!" })
        })
        .catch((err) => {
          console.log(err)
          notification.warning({
            message: err.code,
            description: err.message,
          })
        })
    }
  }
  return (
    <>
      <div className="responder-_account-section">
        <div className="container">
          <div className="row bg-_account-section">
            <div className="col-lg-5 col-md-12 bg-_color-left none-992">
              <div className="form-_section">
                <h3>
                  <strong>Settings</strong>
                </h3>
                <div className="account-_inner-form">
                  <div className="form-group form-box text-leftt">
                    <Link to="/my-account" className="item-_-link">
                      <i
                        className="icon_a-editticon_a-"
                        aria-hidden="true"
                        title="Pencil icon"
                      ></i>{" "}
                      Edit profile
                    </Link>
                  </div>
                  <div className="form-group form-box text-leftt">
                    <Link
                      to="/change-password"
                      className="item-_-link active-_-item"
                    >
                      <i
                        className="icon_a-passworddicon_a-"
                        aria-hidden="true"
                        title="Lock icon"
                      ></i>{" "}
                      Change password
                    </Link>
                  </div>
                  <div className="form-group form-box text-leftt">
                    <Link to="/alert-settings" className="item-_-link">
                      <i
                        className="icon_a-alertssicon_a-"
                        aria-hidden="true"
                        title="Bell icon"
                      ></i>{" "}
                      Alert settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 bg-_color-right">
              <div className="form-_section">
                <h3 className="right--_h3">
                  <i
                    className="icon_a-passworddicon_a-"
                    aria-hidden="true"
                    title="Lock icon"
                  ></i>{" "}
                  Change password
                </h3>
                <div className="account-_inner-form">
                  <div className="form-group form-box text-leftt">
                    <label className="info--_text" htmlFor="old">
                      <span className="info--sub-title">Current password</span>
                    </label>
                    <Input
                      type="password"
                      name="old"
                      id="old"
                      value={inputs.old}
                      onChange={change}
                      className="gri-input-alani"
                      placeholder="****"
                      style={{ width: 300 }}
                    />
                  </div>
                  <div className="form-group form-box text-leftt">
                    <label className="info--_text" htmlFor="new1">
                      <span className="info--sub-title">New password</span>
                    </label>
                    <Input
                      type="password"
                      name="new1"
                      id="new1"
                      value={inputs.new1}
                      onChange={change}
                      className="gri-input-alani"
                      placeholder="****"
                      style={{ width: 300 }}
                    />
                  </div>
                  <div className="form-group form-box text-leftt mb-1">
                    <label className="info--_text" htmlFor="new2">
                      <span className="info--sub-title">Confirm password</span>
                    </label>
                    <Input
                      type="password"
                      name="new2"
                      id="new2"
                      value={inputs.new2}
                      onChange={change}
                      placeholder="****"
                      style={{ width: 300 }}
                    />
                  </div>
                  <div className="form-group form-box text-leftt password-_-check mb-0 account-_password">
                    <PasswordChecklist
                      rules={[
                        "minLength",
                        "specialChar",
                        "number",
                        "capital",
                        "match",
                      ]}
                      minLength={8}
                      value={inputs.new1}
                      valueAgain={inputs.new2}
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
                </div>
                <div className="bottom-_btns">
                  <Link to="/" className="mb-0 float-l btn btn-default">
                    Close
                  </Link>
                  {isValid && (
                    <a
                      onClick={() => send()}
                      className="mb-0 float-r btn btn-primary"
                    >
                      Update
                    </a>
                  )}
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
  bgImage: state.settings.bgImage,
})

const mapDispatchToProps = (dispatch) => ({
  setBgImage: (e) => dispatch(setBgImage(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Password)
