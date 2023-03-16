import React, { useState, useEffect, useLayoutEffect } from "react"
import GeneralSetup from "./general_setup"
import Sections from "./sections"
import Demographics from "./demographics"
import Locations from "./locations"
import Customizations from "./customization"
import Notifications from "./notifications"
import Translations from "./translations"
import Departments from "./departments"
import Summary from "./summary"
import axios from "axios"
import { useHistory } from "react-router-dom"
import validator from "validator"

import { notification } from "antd"
import { connect } from "react-redux"
import * as settingsActions from "../../../../../actions/settingsAction"
import LoaderLarge from "../../../../common/LoaderLarge"
const CreateSurvey = ({ ParentClientId }) => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const surveyId = params.get("survey_id")
  const history = useHistory()
  const [selectedTab, setSelectedTab] = useState("summary")
  const [initData, setInitData] = useState([])
  const [formData, setFormData] = useState([])
  const [loading, setLoading] = useState(true)

  const tabsAndComponents = [
    { tab: "summary", component: Summary },
    { tab: "general setup", component: GeneralSetup },
    { tab: "demographics", component: Demographics },
    { tab: "locations", component: Locations },
    { tab: "departments", component: Departments },
    { tab: "additional modules and questions", component: Sections },
    { tab: "customisations", component: Customizations },
    { tab: "notifications", component: Notifications },
    { tab: "translations", component: Translations },
  ]

  useLayoutEffect(() => {
    getInitData()
    getSurveyData()
  }, [])
  useEffect(() => {
    getSurveyData()
    getInitData()
  }, [surveyId])
  const getInitData = () => {
    axios.get(`/admin/clients/${clientId}/surveys/init`).then((res) => {
      console.log("init data", res.data)
      console.log(
        "location groups",
        res.data.locations?.filter((i) => i.is_location_group)
      )

      setInitData(res.data)
    })
  }
  const getSurveyData = () => {
    axios
      .get(`/admin/clients/${clientId}/surveys/${surveyId}`)
      .then((res) => {
        console.log("survey data", res.data)
        setFormData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        params.delete("survey_id")
        setLoading(false)

        //setCreateSurvey(false);
        //window.location.search = params;
      })
  }

  const send = (type, data) => {
    setLoading(true)
    setFormData((pre) => {
      return { ...pre, [type]: data }
    })

    if (!surveyId) {
      axios
        .post(`/admin/clients/${clientId}/surveys`, data)
        .then((surveyId) => {
          history.push(
            `/create-edit-survey?client_id=${clientId}&survey_id=${surveyId.data}`
          )
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          notification.warning({ message: "Error" })
        })
    } else {
      axios
        .put(`/admin/clients/${clientId}/surveys/${surveyId}`, {
          data: data,
          type: type,
        })
        .then((data) => {
          setLoading(false)
          getSurveyData(surveyId)
          getInitData()
          notification.success({ message: "Updated" })
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)

          notification.warning({ message: "Error" })
          getSurveyData(surveyId)
          getInitData()
        })
    }
  }

  return (
    <>
      <ul className="nav nav-tabs3 mt-4 mb-4">
        {!surveyId ? (
          <li className="nav-item">
            <a
              className={`nav-link ${
                selectedTab === "general setup" && " active"
              }`}
              onClick={() => setSelectedTab("general setup")}
              data-toggle="tab"
              href="#!"
            >
              General setup
            </a>
          </li>
        ) : (
          !loading &&
          surveyId &&
          tabsAndComponents.map((i) => {
            return (
              <li className="nav-item">
                <a
                  className={`nav-link ${selectedTab === i.tab && " active"}`}
                  onClick={() => setSelectedTab(i.tab)}
                  data-toggle="tab"
                  href="#!"
                >
                  {i.tab.capitalize()}
                </a>
              </li>
            )
          })
        )}
      </ul>
      {loading && <LoaderLarge />}

      <div id="aspect-content" className="create-_survey-main">
        <h1> {surveyId ? "Edit " : "Create "} survey</h1>{" "}
        {!surveyId ? (
          <GeneralSetup
            initData={initData}
            setInitData={setInitData}
            survey_id={surveyId}
            clientId={clientId}
            reset={getSurveyData}
            formData={formData}
            setFormData={setFormData}
            send={send}
            close={() => {
              history.push(`surveys?client_id=${clientId}`)
            }}
          />
        ) : (
          tabsAndComponents.map((i) => {
            if (selectedTab === i.tab) {
              return (
                <i.component
                  initData={initData}
                  setInitData={setInitData}
                  surveyId={surveyId}
                  clientId={clientId}
                  reset={getSurveyData}
                  formData={formData}
                  setFormData={setFormData}
                  send={send}
                  close={() => {
                    history.push(`surveys?client_id=${clientId}`)
                  }}
                />
              )
            }
          })
        )}
      </div>
    </>
  )
}

export default CreateSurvey
