import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
const Tabs = ({
  enable_feedbacks,
  enable_inside,
  enable_questions,
  enable_xp,
}) => {
  const show = localStorage.getItem("selectedClientId") ? true : false
  const clientId = localStorage.getItem("selectedClientId")
  return (
    <ul className="nav header-top-btns">
      <li className="nav-item mr--8">
        <Link
          to={"/client-main?client_id=" + clientId}
          className={`btn btn-default btn-block ${
            window.location.pathname === "/client-main" ? " active" : ""
          }`}
        >
          Main
        </Link>
      </li>

      {show && (
        <>
          <li className="nav-item mr--8">
            <Link
              to={"/departments?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/departments" ? " active" : ""
              }`}
            >
              Departments
            </Link>
          </li>
          <li className="nav-item mr--8">
            <Link
              to={"/locations?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/locations" ? " active" : ""
              }`}
            >
              Locations
            </Link>
          </li>
          <li className="nav-item mr--8">
            <Link
              to={"/languages?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/languages" ? " active" : ""
              }`}
            >
              Languages
            </Link>
          </li>
          <li className="nav-item mr--8">
            <Link
              to={"/user-management?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/user-management" ? " active" : ""
              }`}
            >
              User management
            </Link>
          </li>
          <li className="nav-item mr--8">
            <Link
              to={"/demographics?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/demographics" ? " active" : ""
              }`}
            >
              Demographics
            </Link>
          </li>
          {enable_inside && (
            <li className="nav-item mr--8">
              <Link
                to={"/campaigns-management?client_id=" + clientId}
                className={`btn btn-default btn-block ${
                  window.location.pathname === "/campaigns-management" ||
                  window.location.pathname === "/campaigns"
                    ? " active"
                    : ""
                }`}
              >
                Campaigns
              </Link>
            </li>
          )}
          {/* <li className="nav-item mr--8">
            <Link
              to={"/survey-management?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/survey-management" ? " active" : ""
              }`}
            >
              Survey management
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link
              to={"/access?client_id=" + clientId}
              className={`btn btn-default btn-block ${window.location.pathname === "/access" ? " active" : ""}`}
            >
              Access
            </Link>
          </li> */}

          {enable_inside && (
            <li className="nav-item">
              <Link
                to={"/helpdesk?client_id=" + clientId}
                className={`btn btn-default btn-block ${
                  window.location.pathname === "/helpdesk" ? " active" : ""
                }`}
              >
                Helpdesk
              </Link>
            </li>
          )}
          {enable_inside && enable_questions && (
            <li className="nav-item">
              <Link
                to={"/questions?client_id=" + clientId}
                className={`btn btn-default btn-block ${
                  window.location.pathname === "/questions" ? " active" : ""
                }`}
              >
                Questions
              </Link>
            </li>
          )}
          {enable_inside && (
            <li className="nav-item">
              <Link
                to={"/tags?client_id=" + clientId}
                className={`btn btn-default btn-block ${
                  window.location.pathname === "/tags" ? " active" : ""
                }`}
              >
                Tags
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link
              to={"/survey-management?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/survey-management"
                  ? " active"
                  : ""
              }`}
            >
              Modules
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/surveys?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/surveys" ? " active" : ""
              }`}
            >
              Surveys
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/domain-verify?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/domain-verify" ? " active" : ""
              }`}
            >
              Domain verification
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/identity-provider?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/identity-provider"
                  ? " active"
                  : ""
              }`}
            >
              Identity provider
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/notification-management?client_id=" + clientId}
              className={`btn btn-default btn-block ${
                window.location.pathname === "/notification-management"
                  ? " active"
                  : ""
              }`}
            >
              Notifications
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}
const mapStateToProps = (state) => ({
  enable_xp: state.client.enable_xp,
  enable_feedbacks: state.client.enable_feedbacks,
  enable_questions: state.client.enable_questions,
  enable_inside: state.client.enable_inside,
  isSurveyTab: state.settings.isSurveyTab,
})

const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
