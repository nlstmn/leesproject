import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { notification } from "../../../../../../../node_modules/antd/lib/index"
import {
  CreateSurveyAction,
  putSurveySetupAction,
  surveySetupDrawerData,
  surveySetupFormData,
} from "../../../../../../actions/adminActions"
import { saveSurveyId } from "../../../../../../actions/surveysManagement"
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
  const dispatch = useDispatch()
  const history = useHistory()
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
  const surveyGeneralData = useSelector(
    (store) => store.setSurveySetupGeneralData.data
  )

  const activeTabData = useSelector(
    (store) => store.setSurveySetupFormData.data
  )

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  return (
    <>
      <div className="top__filter-dashboard b-t-b">
        {/* Left */}
        <div className="left__side">
          {isMenu !== "Summary" ? (
            <>
              <div className="left__item">
                <button
                  className="n__btn dark icon"
                  onClick={() => {
                    dispatch(
                      surveyId
                        ? putSurveySetupAction({
                            clientId,
                            surveyId,
                            type: activeTabData.requestType,
                            data: activeTabData.data,
                            successMessage: activeTabData.successMessage,
                          })
                        : CreateSurveyAction({
                            clientId,
                            data: activeTabData.data,
                            successMessage: "Survey created successfully",
                          })
                    )
                  }}
                >
                  Save
                </button>
              </div>
              <div className="left__item">
                <button
                  className="n__btn outline icon"
                  onClick={() => {
                    dispatch(surveySetupDrawerData({ data: [] }))
                    dispatch(surveySetupFormData({ data: [] }))
                    dispatch(saveSurveyId({ data: null }))
                    history.push("/surveys-management")
                  }}
                >
                  Cancel
                </button>
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
                <button
                  className="btn-dash drop has-icn"
                  onClick={() => {
                    dispatch(
                      putSurveySetupAction({
                        clientId,
                        surveyId,
                        type: "update_cache",
                        data: [],
                        successMessage: "Cache updated successfully",
                      })
                    )
                  }}
                >
                  Update cache
                  <span className="iconx-sync"></span>
                </button>
              </div>
              <div className="left__item">
                <button
                  className="btn-dash drop has-icn"
                  onClick={() => {
                    dispatch(
                      putSurveySetupAction({
                        clientId,
                        surveyId,
                        type: "delete_cache",
                        data: [],
                        successMessage: "Cache deleted successfully",
                      })
                    )
                  }}
                >
                  Delete cache
                  <span className="cxv-delete-l-icn"></span>
                </button>
              </div>
              <div className="h_divider qq"></div>
              <div className="left__item">
                <div className="n__form_control top_action_check">
                  <label className="n__form_label dashboard_check">
                    <input
                      value={activeTabData?.deleteOldData}
                      onChange={(e) => {
                        dispatch(
                          surveySetupFormData({
                            deleteOldData: !e.target.checked,
                          })
                        )
                      }}
                      type="checkbox"
                      name="oldUserData"
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
                <button
                  className="btn-dash drop has-icn"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.origin +
                        "/survey?" +
                        `name=${surveyGeneralData?.url}&` +
                        `id=${surveyId}&` +
                        `code=${surveyGeneralData?.code}&` +
                        `referance=${surveyGeneralData?.survey_login_type_id}`
                    )
                    notification.success({
                      message: "Invite link copied to clipboard!",
                    })
                  }}
                >
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
                  onClick={() => {
                    setDemographicsQuestionsDrawer(true)
                    dispatch(surveySetupDrawerData([]))
                  }}
                  className="btn-dash drop has-icn"
                >
                  Add question
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
                      checked={activeTabData?.other_location_group}
                      onChange={() => {
                        dispatch(
                          putSurveySetupAction({
                            clientId,
                            surveyId,
                            type: "toggle_other_location_group_enabled",
                            data: [],
                            successMessage:
                              "Location group other option toggled successfully",
                          })
                        )
                      }}
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
                      checked={activeTabData?.other_department}
                      onChange={() => {
                        dispatch(
                          putSurveySetupAction({
                            clientId,
                            surveyId,
                            type: "toggle_other_department_enabled",
                            data: [],
                            successMessage:
                              "Department other option toggled successfully",
                          })
                        )
                      }}
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
                        type="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="name"
                        className="n_input"
                        placeholder="Name..."
                      />
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="name"
                        className="n_input"
                        placeholder="Email..."
                      />
                      <button
                        className="iconic__btn"
                        title="Add"
                        onClick={() => {
                          name?.length && email.length
                            ? dispatch(
                                putSurveySetupAction({
                                  clientId,
                                  surveyId,
                                  type: "emails",
                                  data: [
                                    ...activeTabData.map((i) => {
                                      return {
                                        name: i.name,
                                        emailName: i.email,
                                      }
                                    }),
                                    { name: name, emailName: email },
                                  ],
                                  successMessage:
                                    "Name and email saved successfully",
                                })
                              )
                            : notification.warning({
                                message: "Please enter name and email",
                              })
                          setName("")
                          setEmail("")
                        }}
                      >
                        <span className="iconx-plus1"></span>
                      </button>
                    </div>
                  </label>{" "}
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
