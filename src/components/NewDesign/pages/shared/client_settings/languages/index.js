import React, { useEffect } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  getOtherSurveySetupAction,
  getSurveyLanguagesAction,
  surveySetupDrawerData,
  surveySetupFormData,
} from "../../../../../../actions/adminActions"
import TranslationsModal from "./modal_translations"
import { useState } from "react"
import ImportExport from "../../../../../common/ImportExport"

const LanguageSettings = ({
  isMenuSub,
  setMenuSub,
  isLanguageDrawer,
  setLanguageDrawer,
  isTranslationsDrawer,
  setTranslationsDrawer,
  isSurvey,
}) => {
  const dispatch = useDispatch()
  const languagesData = useSelector((store) => store.getSurveysLanguages)
  /* TODO: clientId has to be dynamic */
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const selectedLanguages = useSelector(
    (store) => store.getOtherSurveySetupData?.data?.surveyLanguages
  )
  const translations = useSelector(
    (store) => store.getOtherSurveySetupData?.data?.translations
  )
  const allLanguages = useSelector(
    (store) => store?.getOtherSurveySetupData?.data?.languages
  )
  const [translationsModal, setTranslationsModal] = useState(false)
  const [tab, setTab] = useState("locations")
  const [selectedTranslation, setSelectedTranslation] = useState([])

  useEffect(() => {
    dispatch(getSurveyLanguagesAction(clientId, surveyId))
    dispatch(
      getOtherSurveySetupAction({
        clientId: clientId,
        tab: "languages",
        surveyId: surveyId,
      })
    )
  }, [])

  useEffect(() => {
    dispatch(
      surveySetupDrawerData({
        selectedLanguages,
        allLanguages,
        selectedTranslation,
      })
    )
  }, [allLanguages, selectedLanguages, selectedTranslation])

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "English (UK)",
      dataIndex: "label",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Translations",
      dataIndex: "translations",
      render: (text) => (
        <ul className="table-__ul">
          {text
            ?.sort((a, b) => a.language_id - b.language_id)
            .map((tem) => (
              <li>{tem.language + ": " + tem.label}</li>
            ))}
        </ul>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (record) => (
        <>
          <button
            onClick={() => {
              setTranslationsDrawer(true)
              setSelectedTranslation(record)
            }}
            className="icon__btn"
            title="Edit/Create"
          >
            <span className="cxv-settings-l-icn clients_table_drop"></span>
          </button>
        </>
      ),
    },
  ]

  return (
    <>
      <TranslationsModal
        translationsModal={translationsModal}
        setTranslationsModal={setTranslationsModal}
      />
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Languages & translations</h3>
          <div className="row">
            <div className="col-lg-12">
              <button
                onClick={() => {
                  setLanguageDrawer(true)
                }}
                className="n__btn dark icon"
              >
                Add / Edit Languages
              </button>
            </div>

            {!isSurvey && (
              <div className="l__block">
                <h5>Default language</h5>
                <ul>
                  <li>English (UK)</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="n__form_divider">
            <div className="n__divider"></div>
          </div>
        </div>

        <div className="col-lg-12">
          <h4 className="sub_title">Translations</h4>
        </div>

        <div className="col-lg-12 col-md-12 without-btn-table">
          <div className="n_menu_horizontal sub bottom" role="tablist">
            <a
              href="#!"
              className={` ${tab === "locations" && " active"}`}
              onClick={() => setTab("locations")}
            >
              Locations
            </a>
            <a
              href="#!"
              className={` ${tab === "departments" && " active"}`}
              onClick={() => setTab("departments")}
            >
              Departments
            </a>
            <a
              className={` ${tab === "questions" && " active"}`}
              onClick={() => setTab("questions")}
              href="#!"
            >
              Questions
            </a>
            <a
              className={` ${tab === "options" && " active"}`}
              onClick={() => setTab("options")}
              href="#!"
            >
              Options
            </a>
            <a
              className={` ${tab === "customisations" && " active"}`}
              onClick={() => setTab("customisations")}
              href="#!"
            >
              Customisations
            </a>
            <a
              className={` ${tab === "tailored" && " active"}`}
              onClick={() => setTab("tailored")}
              href="#!"
            >
              Tailored
            </a>
            <a
              className={` ${tab === "departmentLabels" && " active"}`}
              onClick={() => setTab("departmentLabels")}
              href="#!"
            >
              Department labels
            </a>

            <ImportExport
            //TODO: will implement later
            />

            <a className={` `}>
              <input
                type="text"
                onChange={(e) => {
                  //setQuery(e.target.value)
                }}
                // value={query}
                className="form-control"
                placeholder="Search"
              />
            </a>

            <ImportExport
            //TODO: will implement later
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="n_table center_labels first_not_center respo">
            <Table
              columns={columns}
              dataSource={translations && translations[tab]}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default LanguageSettings
