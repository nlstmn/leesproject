import React, { useLayoutEffect } from "react"
import { connect } from "react-redux"
import { setLoginBackground } from "../../../../actions/settingsAction"
import LoaderPage from "../../elements/loader_page"
import { Link } from "react-router-dom"

const SSO = ({ setLoginBackground }) => {
  useLayoutEffect(() => {
    setLoginBackground(false)
  }, [])

  useLayoutEffect(() => {
    setTimeout(() => {
      document.body.classList.add("temp__class")
    }, 600)
  }, [])

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

                <h1>SSO login ― </h1>
                <p className="auth_desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>

                <div className="n_auth_form">
                  <input
                    placeholder="Email"
                    type="text"
                    className="n_input"
                  ></input>

                  <Link to="/login" className="n__link">
                    Return to login
                  </Link>

                  <button className="btn-dash dark">Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SSO)
