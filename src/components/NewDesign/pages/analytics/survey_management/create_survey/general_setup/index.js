import React, { useState } from "react"
import { DatePicker, Space } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getSurveySetupAction,
  getOtherSurveySetupAction,
} from "../../../../../../../actions/adminActions"
import { setLocationType } from "react-geocode"
const { RangePicker } = DatePicker

const GeneralSetupSettings = ({
  setCheckedLoginType,
  checkedLoginType,
  isImportExportDrawer,
  setImportExportDrawer,
}) => {
  const [checkedStatus, setCheckedStatus] = useState("demo")
  // Redux Store and Dispatch Function Initializers
  const dispatch = useDispatch()
  const dataSelector = useSelector((store) => store.getSurveySetupData.data)
  const otherSelector = useSelector(
    (store) => store.getOtherSurveySetupData?.data
  )

  const surveyId = useSelector((store) => store.saveSurveyId.data)

  const getData = () => {
    dispatch(
      getSurveySetupAction({
        clientId: 0,
        tab: "generalSetup",
        surveyId: surveyId,
      })
    )
  }
  const getOtherData = () => {
    dispatch(
      getOtherSurveySetupAction({
        clientId: 0,
        tab: "generalSetup",
        surveyId: surveyId,
      })
    )
  }

  useEffect(() => {
    getData()
    getOtherData()
    console.log(dataSelector, otherSelector)
  }, [])

  useEffect(() => {
    otherSelector?.survey_login_type_id &&
      dataSelector?.surveyLoginTypes &&
      setCheckedLoginType(
        dataSelector?.surveyLoginTypes?.filter(
          (i) => i.id == otherSelector?.survey_login_type_id
        )[0]?.title
      )
  }, [otherSelector, dataSelector])

  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">General setup</h3>
          <div className="row">
            <div className="col-lg-4">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Survey name</span>
                  <input
                    type="text"
                    name="name"
                    className="n__form_input"
                    value={otherSelector?.title}
                  />
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Organisation name</span>
                  <input
                    type="text"
                    name="name"
                    className="n__form_input"
                    value={otherSelector?.organisation_name}
                  />
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Agent</span>
                  <div className="n__form_select">
                    <select name="industry" id="industry">
                      {dataSelector?.agents !== undefined &&
                        dataSelector?.agents?.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Core module</span>
                  <div className="n__form_select">
                    <select
                      name="industry"
                      id="industry"
                      value={otherSelector?.survey_module_id}
                    >
                      <option>Select core module</option>
                      {dataSelector?.coreModules?.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.title?.capitalize()}
                        </option>
                      ))}
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Domains name</span>
                  <input
                    type="text"
                    name="name"
                    className="n__form_input"
                    placeholder="e.g. leesmanindex.com, leesman.co.uk"
                    value={otherSelector?.domains}
                  />
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Tailored url</span>
                  <input
                    type="text"
                    name="name"
                    className="n__form_input"
                    value={otherSelector?.url}
                  />
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Minimum respondents for lmi charts (integer)</span>
                  <input
                    type="number"
                    name="name"
                    className="n__form_input"
                    value={otherSelector?.min_respondents}
                  />
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="flex_groups">
                <div className="n__form_control">
                  <label className="n__form_label dashboard_radio">
                    <input
                      type="radio"
                      name="status"
                      value="demo"
                      onChange={() => setCheckedStatus("demo")}
                      checked={otherSelector?.status === "demo"}
                    />
                    <span className="label-_text">Demo</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="n__form_control">
                  <label className="n__form_label dashboard_radio">
                    <input
                      type="radio"
                      name="status"
                      value="live"
                      onChange={() => setCheckedStatus("live")}
                      checked={otherSelector?.status === "live"}
                    />
                    <span className="label-_text">Live</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              {checkedStatus === "live" ? (
                <>
                  <div className="n_calendar_select">
                    <RangePicker
                      format={"DD / MM / YYYY"}
                      getCalendarContainer={(triggerNode) => {
                        return triggerNode.parentNode
                      }}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <span className="card_desc">
                Respondents will log in to the survey by using their own email
                address or unique provided codes.
              </span>
            </div>
            <div className="col-lg-12">
              <div className="flex_groups">
                <div className="n__form_control">
                  {/* TODO: We'll add the login types here */}
                  {dataSelector.surveyLoginTypes !== undefined &&
                    dataSelector.surveyLoginTypes.map((item) => (
                      <span className="mr-2">
                        <label className="n__form_label dashboard_radio">
                          <input
                            type="radio"
                            name={item.title}
                            value={item.title}
                            onChange={() => setCheckedLoginType(item.title)}
                            checked={checkedLoginType === item.title}
                          />
                          <span
                            className="label-_text"
                            style={{
                              textTransform:
                                checkedLoginType !== "sso"
                                  ? "uppercase"
                                  : "capitalize",
                            }}
                          >
                            {item.title}
                          </span>
                          <span className="checkmark"></span>
                        </label>
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              {checkedLoginType === "email with pre uploaded email list" ? (
                <>
                  <div className="left__item">
                    <button
                      onClick={() => setImportExportDrawer(true)}
                      className="n__btn outline icon"
                    >
                      Import / Export (Emails)
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneralSetupSettings
