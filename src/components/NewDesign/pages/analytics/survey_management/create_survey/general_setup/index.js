import React, { useState } from "react"
import { DatePicker, Space } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getSurveySetupAction,
  getOtherSurveySetupAction,
  surveySetupFormData,
  surveySetupGeneralData,
  selectedSurveyStatusData,
} from "../../../../../../../actions/adminActions"
import { setLocationType } from "react-geocode"
import { Tooltip } from "antd"
import moment from "moment"
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
  const formData_ = useSelector((store) => store.setSurveySetupFormData?.data)
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const [formData, setFormData] = useState(formData_)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
  const statusData = useSelector(
    (store) => store.setSelectedSurveyStatusData?.data
  )
  useEffect(() => {
    setFormData(otherSelector)
    setCheckedLoginType(otherSelector?.survey_login_type_id)
    dispatch(surveySetupGeneralData(otherSelector))
    dispatch(
      selectedSurveyStatusData({
        status: otherSelector?.status,
        end_date: otherSelector?.end_date,
        start_date: otherSelector?.start_date,
        id: otherSelector?.id,
      })
    )
  }, [otherSelector?.title])

  useEffect(() => {
    dispatch(
      surveySetupFormData({
        data: {
          ...formData,
          access: otherSelector?.survey_login_type_id,
          demo: formData?.status == "demo",
        },
        requestType: "general",
        successMessage: "General setup data updated successfully",
      })
    )
  }, [JSON.stringify(formData)])

  const change = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const getData = () => {
    dispatch(
      getSurveySetupAction({
        clientId: clientId,
        tab: "generalSetup",
        surveyId: surveyId,
      })
    )
  }
  const getOtherData = () => {
    dispatch(
      getOtherSurveySetupAction({
        clientId: clientId,
        tab: "generalSetup",
        surveyId: surveyId,
      })
    )
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
    var date = new Date()
    date.setDate(date.getDate() - 1)
    return current && current.valueOf() < date
  }
  useEffect(() => {
    getData()
    getOtherData()
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

  useEffect(() => {
    console.log("formData", formData)
  }, [formData])

  useEffect(() => {
    console.log("checkedLoginType", checkedLoginType)
    setFormData({ ...formData, access: checkedLoginType })
  }, [checkedLoginType])

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
                    name="title"
                    onChange={change}
                    value={formData?.title}
                    className="n__form_input"
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
                    className="n__form_input"
                    name="organisation_name"
                    onChange={change}
                    value={formData?.organisation_name}
                  />
                </label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Agent</span>
                  <div className="n__form_select">
                    <select
                      name="agent_id"
                      onChange={change}
                      disabled={["live", "closed"]?.includes(
                        statusData?.status
                      )}
                      value={formData?.agent_id}
                      id="industry"
                    >
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
                      id="industry"
                      disabled={["live", "closed"]?.includes(
                        statusData?.status
                      )}
                      name="survey_module_id"
                      onChange={change}
                      value={formData?.survey_module_id}
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
                    className="n__form_input"
                    disabled={["live", "closed"]?.includes(statusData?.status)}
                    placeholder="leesmanindex.com, leesman.co.uk"
                    name="domain"
                    onChange={change}
                    value={formData?.domain}
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
                    disabled={["live", "closed"]?.includes(statusData?.status)}
                    className="n__form_input"
                    name="url"
                    onChange={change}
                    value={formData?.url}
                  />
                </label>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Minimum respondents for lmi charts (integer)</span>
                  <input
                    type="number"
                    className="n__form_input"
                    name="min_respondents"
                    onChange={change}
                    value={formData?.min_respondents}
                  />
                </label>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Default language</span>
                  <div className="n__form_select">
                    <select
                      id="industry"
                      disabled={["live", "closed"]?.includes(
                        statusData?.status
                      )}
                      name="language_id"
                      onChange={change}
                      value={formData?.language_id}
                    >
                      <option>Select default language</option>
                      {dataSelector?.languages?.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.label?.capitalize()}
                        </option>
                      ))}
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Location sort option</span>
                  <div className="n__form_select">
                    <select
                      id="industry"
                      name="location_sort"
                      onChange={change}
                      value={formData?.location_sort}
                    >
                      <option value="alphabetical">Alphabetically</option>
                      <option value="id">Uploaded order</option>
                      <option value="setup">Survey setup order</option>
                      <option value="client">Client setup order</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Department sort option</span>
                  <div className="n__form_select">
                    <select
                      id="industry"
                      name="department_sort"
                      onChange={change}
                      value={formData?.department_sort}
                    >
                      <option value="alphabetical">Alphabetically</option>
                      <option value="id">Uploaded order</option>
                      <option value="setup">Survey setup order</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="n__form_control top_action_check mt-4">
                <label className="n__form_label dashboard_check">
                  <span className="label-_text">Use client logo</span>
                  <input
                    type="checkbox"
                    name="use_client_logo"
                    checked={formData?.use_client_logo}
                    onChange={() => {
                      setFormData((pre) => {
                        return { ...pre, use_client_logo: !pre.use_client_logo }
                      })
                    }}
                  />

                  <span className="checkmark"></span>
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
                      disabled={["live", "closed"]?.includes(
                        statusData?.status
                      )}
                      name="status"
                      value="demo"
                      onChange={change}
                      checked={formData?.status === "demo"}
                    />
                    <span className="label-_text">Demo</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="n__form_control">
                  <label className="n__form_label dashboard_radio">
                    <input
                      type="radio"
                      disabled={["live", "closed"]?.includes(
                        statusData?.status
                      )}
                      name="status"
                      value="in build"
                      onChange={change}
                      checked={["live", "in build", "closed"].includes(
                        formData?.status
                      )}
                    />
                    <span className="label-_text">Live</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              {["live", "in build", "closed"].includes(formData?.status) ? (
                <>
                  <div className="n_calendar_select d_flex_items">
                    <Tooltip title="Start date">
                      <DatePicker
                        className=""
                        dropdownClassName="advanced_-picker"
                        readOnly
                        disabled={["live", "closed"]?.includes(
                          statusData?.status
                        )}
                        onChange={(a, b) => {
                          setFormData((pre) => {
                            return { ...pre, start_date: b.splitDate() }
                          })
                        }}
                        disabledDate={disabledDate}
                        format="YYYY-MM-DD"
                        value={
                          formData?.start_date
                            ? moment(
                                formData?.start_date
                                  ? formData?.start_date.splitDate()
                                  : null
                              )
                            : null
                        }
                      />
                    </Tooltip>
                    <Tooltip title="End date">
                      <DatePicker
                        className=" ml-1 mr-2"
                        dropdownClassName="advanced_-picker"
                        readOnly
                        onChange={(a, b) => {
                          setFormData((pre) => {
                            return { ...pre, end_date: b.splitDate() }
                          })
                        }}
                        disabledDate={disabledDate}
                        format="YYYY-MM-DD"
                        value={
                          formData?.end_date
                            ? moment(
                                formData?.end_date
                                  ? formData?.end_date.splitDate()
                                  : null
                              )
                            : null
                        }
                      />
                    </Tooltip>
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
                  {dataSelector.surveyLoginTypes !== undefined &&
                    dataSelector.surveyLoginTypes.map((item) => (
                      <span className="mr-2">
                        <label className="n__form_label dashboard_radio">
                          <input
                            type="radio"
                            name={item.id}
                            disabled={["live", "closed"]?.includes(
                              statusData?.status
                            )}
                            value={item.title}
                            onChange={() => {
                              setCheckedLoginType(item.id)
                            }}
                            checked={formData?.survey_login_type_id === item.id}
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
