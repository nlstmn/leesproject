import React, { useState, useEffect, useRef, useLayoutEffect } from "react"

const TopSurveyActions = ({
  isMenu,
  isMenuSub,
  setCheckedLoginType,
  checkedLoginType,
  isLocationSurveyDrawer,
  setLocationSurveyDrawer,
  setLanguageDrawer,
  isLocationGroupDrawer,
  setLocationGroupDrawer,
  isModulesDrawer,
  setModulesDrawer,
  isDemographicsQuestionsDrawer,
  setDemographicsQuestionsDrawer,
  setTailorLocationDrawer,
  setDepartmentSurveyDrawer,
  isImportExportDrawer,
  setImportExportDrawer,
}) => {
  return (
    <>
      <div className="top__filter-dashboard b-t-b">
        {/* Left */}
        <div className="left__side">
          {isMenu !== "Summary" ? (
            <>
              <div className="left__item">
                <button className="n__btn dark icon">Save</button>
              </div>
              <div className="left__item">
                <button className="n__btn outline icon">Cancel</button>
              </div>
              <div className="h_divider qq"></div>
            </>
          ) : (
            <>
              <div className="left__item">
                <button className="n__btn dark icon">Launch survey</button>
              </div>
              <div className="h_divider qq"></div>
              <div className="left__item">
                <button className="btn-dash drop has-icn">
                  Update cache
                  <span className="iconx-sync"></span>
                </button>
              </div>
              <div className="left__item">
                <button className="btn-dash drop has-icn">
                  Delete cache
                  <span className="cxv-delete-l-icn"></span>
                </button>
              </div>
              <div className="h_divider qq"></div>
              <div className="left__item">
                <div className="n__form_control top_action_check">
                  <label className="n__form_label dashboard_check">
                    <input
                      type="checkbox"
                      name="oldUserData"
                      value="oldUserData"
                    />
                    <span className="label-_text">Delete old user data</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </>
          )}

          {isMenu === "General setup" && (
            <>
              <div className="left__item">
                <button className="btn-dash drop has-icn">
                  Get survey URL
                  <span className="iconx-globe icn xl"></span>
                </button>
              </div>
            </>
          )}

          {isMenu === "Demographics" && (
            <>
              <div className="left__item">
                <button
                  onClick={() => setDemographicsQuestionsDrawer(true)}
                  className="btn-dash drop has-icn"
                >
                  Add new question
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
            </>
          )}

          {isMenu === "Locations" && (
            <>
              <div className="left__item">
                <button
                  onClick={() => setTailorLocationDrawer(true)}
                  className="btn-dash drop has-icn"
                >
                  Tailor location questions
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
              <div className="h_divider qq"></div>
              <div className="left__item">
                <button
                  onClick={() => setLocationGroupDrawer(true)}
                  className="btn-dash drop has-icn"
                >
                  Select locations
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
              <div className="h_divider qq"></div>
              <div className="left__item">
                <div className="n__form_control top_action_check">
                  <label className="n__form_label dashboard_check">
                    <input
                      type="checkbox"
                      name="asLocationGroup"
                      value="asLocationGroup"
                    />
                    <span className="label-_text">
                      Use 'Other' as location group
                    </span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="h_divider qq"></div>
              <div className="left__item">
                <div className="n__form_control top_action_check">
                  <label className="n__form_label dashboard_check">
                    <input
                      type="checkbox"
                      name="asLocation"
                      value="asLocation"
                    />
                    <span className="label-_text">Use 'Other' as location</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="h_divider qq"></div>

              <div className="left__item">
                <button
                  onClick={() => setImportExportDrawer(true)}
                  className="btn-dash drop has-icn"
                >
                  Import / Export
                  <span className="cxv-export-l-icn"></span>
                </button>
              </div>
            </>
          )}

          {isMenu === "Departments" && (
            <>
              <div className="left__item">
                <button
                  onClick={() => setDepartmentSurveyDrawer(true)}
                  className="btn-dash drop has-icn"
                >
                  Select departments
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
              <div className="h_divider qq"></div>
              <div className="left__item">
                <div className="n__form_control top_action_check">
                  <label className="n__form_label dashboard_check">
                    <input
                      type="checkbox"
                      name="asDepartment"
                      value="asDepartment"
                    />
                    <span className="label-_text">
                      Use 'Other' as department
                    </span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </>
          )}

          {isMenu === "Languages" && (
            <>
              <div className="h_divider qq"></div>

              <div className="left__item">
                <button
                  onClick={() => {
                    setLanguageDrawer(true)
                  }}
                  className="btn-dash drop has-icn"
                >
                  Language settings
                  <span className="cxv-settings-l-icn"></span>
                </button>
              </div>
              <div className="h_divider qq"></div>

              <div className="left__item">
                <button
                  onClick={() => setImportExportDrawer(true)}
                  className="btn-dash drop has-icn"
                >
                  Import / Export (Translations)
                  <span className="cxv-export-l-icn"></span>
                </button>
              </div>
            </>
          )}

          {isMenu === "Notifications" && (
            <>
              <div className="left__item">
                <div className="n__form_control input_has_btn">
                  <label className="n__form_label">
                    <div className="group">
                      <input
                        type="email"
                        name="name"
                        className="n_input"
                        placeholder="Email..."
                      />
                      <button className="iconic__btn" title="Add">
                        <span className="iconx-plus1"></span>
                      </button>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          {isMenu === "Additional" && (
            <>
              <div className="left__item">
                <button
                  onClick={() => setModulesDrawer(true)}
                  className="btn-dash drop has-icn"
                >
                  Select additional modules
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right */}
        <div className="right__side">
          <div className="right__item">{/* Right item */}</div>
          <div className="h_divider"></div>
        </div>
      </div>
    </>
  )
}

export default TopSurveyActions
