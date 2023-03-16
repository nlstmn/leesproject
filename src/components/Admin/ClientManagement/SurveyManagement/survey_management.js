import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../../../context/auth"
import { connect } from "react-redux"
import * as settingsActions from "../../../../actions/settingsAction"
import Tabs from "../Tabs"
import Pages from "./layouts/pages"
import Sections from "./layouts/sections"
import Questions from "./layouts/questions"
import Translations from "./layouts/translations"
import Surveys from "./layouts/surveys"
import Dependencies from "./layouts/dependencies"

const SurveyManagement = ({ isSurveyTab, setSurveyTab }) => {
  const { role } = useContext(AuthContext)
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id") ? params.get("client_id") : 0
  useEffect(() => {
    //setSurveyTab("Surveys");
  }, [])

  return (
    <>
      <div className="container-fluid new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Survey Management</h1>
              {role !== "Admin" && clientId !== 0 && <Tabs />}

              <ul className="nav nav-tabs3 mt-4 mb-4">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isSurveyTab === "Translations" && " active"
                    }`}
                    onClick={() => setSurveyTab("Translations")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Translations
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isSurveyTab === "Surveys" && " active"
                    }`}
                    onClick={() => setSurveyTab("Surveys")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Surveys
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isSurveyTab === "Sections" && " active"
                    }`}
                    onClick={() => setSurveyTab("Sections")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Sections
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isSurveyTab === "Pages" && " active"
                    }`}
                    onClick={() => setSurveyTab("Pages")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Pages
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isSurveyTab === "Questions" && " active"
                    }`}
                    onClick={() => setSurveyTab("Questions")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Questions
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isSurveyTab === "Dependencies" && " active"
                    }`}
                    onClick={() => setSurveyTab("Dependencies")}
                    data-toggle="tab"
                    href="#!"
                  >
                    Dependencies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {isSurveyTab === "Translations" && <Translations />}
        {isSurveyTab === "Pages" && <Pages />}
        {isSurveyTab === "Sections" && <Sections />}
        {isSurveyTab === "Surveys" && <Surveys />}
        {isSurveyTab === "Questions" && <Questions />}
        {isSurveyTab === "Dependencies" && <Dependencies />}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  isSurveyTab: state.settings.isSurveyTab,
})

const mapDispatchToProps = (dispatch) => ({
  setSurveyTab: (e) => dispatch(settingsActions.setSurveyTab(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SurveyManagement)
