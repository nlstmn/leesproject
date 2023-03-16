import React, { useEffect, useState } from "react"
import { DatePicker, Popover } from "antd"
import { AccessInfo } from "../../../../HOC/components/info_contents"
import axios from "axios"
import moment from "moment"
import { notification, Tree, Tooltip } from "antd"
import ImportExport from "../../../../common/ImportExport"

const { RangePicker } = DatePicker
const GeneralSetup = ({
  initData,
  setInitData,
  surveyId,
  clientId,
  formData,
  setFormData,
  close,
  send,
  reset,
  previousData,
}) => {
  const [data, setData] = useState(formData?.general)
  const [demo, setDemo] = useState(false)

  const change = (e) => {
    const { name, value } = e.target
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  useEffect(() => {
    console.log(formData?.general)
    setDemo(
      formData?.general
        ? !["live", "in build"].includes(formData?.general?.status)
        : true
    )
  }, [formData])

  useEffect(() => {
    console.log(demo)
  }, [demo])
  useEffect(() => {
    if (formData?.general?.min_respondents) {
      setData({ ...formData.general, demo: demo })
    } else {
      setData({ ...formData?.general, min_respondents: 5, demo: demo })
    }
  }, [formData])
  useEffect(() => {
    setData({ ...data, demo: demo, min_respondents: 5 })
  }, [demo])
  const disabledDate = (current) => {
    // Can not select days before today and today
    var date = new Date()
    date.setDate(date.getDate() - 1)
    return current && current.valueOf() < date
  }

  const checkInput = () => {
    let message = ""
    if (
      !data?.title ||
      !data?.organisation_name ||
      !data?.agent_id ||
      !data?.survey_module_id ||
      !data?.access ||
      !data?.min_respondents ||
      (data.access !== 4 && !data?.domain) ||
      !data?.url ||
      !data?.language_id
    ) {
      if (!data?.title) {
        message += "Title "
      }
      if (!data?.organisation_name) {
        message += "Organisation name "
      }
      if (!data?.agent_id) {
        message += "Agent "
      }
      if (!data?.survey_module_id) {
        message += "Core module "
      }
      if (!data?.access) {
        message += "Login type "
      }
      if (!data?.min_respondents) {
        message += "Min respondents "
      }
      if (data.access !== 4 && !data?.domain) {
        message += "Domain "
      }
      if (!data?.url) {
        message += "Url "
      }
      if (!data?.language_id) {
        message += "Default language "
      }

      notification.warning({ message: "Please enter inputs: " + message })
      return false
    } else if (moment(data.end_date).isBefore(moment(data.start_date))) {
      notification.warning({ message: "End date cannot before start date" })
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <div className="aspect-tab">
        <label htmlFor="item-1" className="aspect-label"></label>
        <div className="aspect-content">
          <div className="aspect-info">
            <div className="tab-_status"></div>
            <span className="aspect-name">General Setup</span>
          </div>
        </div>
        <div className="">
          <div className="sentiment-wrapper">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 mb-3">
                <h6>General</h6>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="form-group">
                  <label>Survey name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Survey name..."
                    name="title"
                    onChange={change}
                    value={data?.title}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="form-group">
                  <label>Organisation name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Organisation name..."
                    name="organisation_name"
                    onChange={change}
                    value={data?.organisation_name}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="form-group">
                  <label>Agent</label>
                  <select
                    className="form-control"
                    name="agent_id"
                    onChange={change}
                    value={data?.agent_id}
                  >
                    <option>Select agent</option>
                    {initData?.agents?.map((a) => {
                      return <option value={a.id}>{a.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="form-group">
                  <label>Modules</label>
                  <select
                    className="form-control"
                    disabled={formData?.general?.status === "live"}
                    name="survey_module_id"
                    onChange={change}
                    value={data?.survey_module_id}
                  >
                    <option>Select core module</option>
                    {initData?.modules
                      ?.filter((i) => i.is_core)
                      ?.map((a) => {
                        return (
                          <option value={a.id}>{a.label.capitalize()}</option>
                        )
                      })}
                  </select>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                {!demo && (
                  <div className="form-group">
                    <label>Start date - end date</label>
                    <div className="d-block">
                      <>
                        <Tooltip title="Start date">
                          <DatePicker
                            className="takvim-select top-takvim"
                            dropdownClassName="advanced_-picker"
                            readOnly
                            disabled={formData?.general?.status === "live"}
                            onChange={(a, b) => {
                              setData((pre) => {
                                return { ...pre, start_date: b.splitDate() }
                              })
                            }}
                            showToday
                            disabledDate={disabledDate}
                            format="YYYY-MM-DD"
                            defaultPickerValue={moment()}
                            value={
                              data?.start_date
                                ? moment(
                                    data?.start_date
                                      ? data?.start_date.splitDate()
                                      : null
                                  )
                                : moment()
                            }
                          />
                        </Tooltip>
                        <Tooltip title="End date">
                          <DatePicker
                            className="takvim-select top-takvim ml-1 mr-2"
                            dropdownClassName="advanced_-picker"
                            readOnly
                            onChange={(a, b) => {
                              setData((pre) => {
                                return { ...pre, end_date: b.splitDate() }
                              })
                            }}
                            showToday
                            disabledDate={disabledDate}
                            format="YYYY-MM-DD"
                            defaultPickerValue={moment()}
                            value={
                              data?.end_date
                                ? moment(
                                    data?.end_date
                                      ? data?.end_date.splitDate()
                                      : null
                                  )
                                : moment()
                            }
                          />
                        </Tooltip>
                      </>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-lg-4 col-md-12 mt-2">
                <p className="mb-1">
                  Respondents will log in to the survey by using their own email
                  address or unique provided codes.
                </p>
                {initData?.login_types?.map((i) => {
                  return (
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="access"
                        disabled={formData?.general?.status === "live"}
                        value={i.id}
                        checked={data?.access === parseInt(i.id)}
                        onChange={change}
                      />
                      <span className="light-black">
                        <i></i>
                        {i.title.capitalize()}
                      </span>
                    </label>
                  )
                })}
                {data?.access === 2 && (
                  <ImportExport
                    import={true}
                    export={true}
                    type="survey_accepted_emails"
                    clientId={clientId}
                    surveyId={surveyId}
                    data={formData?.emails}
                    hideLine={true}
                    refresh={reset}
                  />
                )}
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="form-group">
                  <label>Domain(s) name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. leesmanindex.com, leesman.co.uk"
                    name="domain"
                    onChange={change}
                    value={data?.domain}
                  />
                </div>{" "}
              </div>
              <div className="col-lg-4 col-md-4 mb-3 mt-4">
                <label className="fancy-radio">
                  <input
                    type="radio"
                    name="demo"
                    disabled={formData?.general?.status === "live"}
                    checked={demo}
                    onChange={() => {
                      console.log(demo)
                      setDemo(true)
                    }}
                  />
                  <span className="light-black">
                    <i></i>
                    Demo
                  </span>
                </label>
                <label className="fancy-radio">
                  <input
                    type="radio"
                    name="demo"
                    disabled={formData?.general?.status === "live"}
                    checked={!demo}
                    onChange={() => {
                      console.log(demo)
                      setDemo(false)
                    }}
                  />
                  <span className="light-black">
                    <i></i>
                    Live
                  </span>
                </label>
              </div>
              <div className="col-lg-4 col-md-4 mb-3 mt-4">
                <h6>Access</h6>
                <Popover content={AccessInfo}>
                  <h4 className="more-info-class">
                    <span className="iconx-info-with-circle"></span> More info
                  </h4>
                </Popover>{" "}
              </div>
              <div className="col-lg-4 col-md-4 mb-3 mt-4">
                <div className="form-group">
                  <label>Minimum respondents for lmi charts (integer)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Minimum respondents for lmi charts..."
                    name="min_respondents"
                    onChange={change}
                    value={data?.min_respondents}
                    defaultValue={5}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mb-3 mt-4">
                {data?.code && (
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group mt-2 mb-0">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            window.location.origin +
                              "/survey?" +
                              `name=${data.url}&` +
                              `id=${surveyId}&` +
                              `code=${data.code}&` +
                              `referance=${data.access}`
                          )
                          notification.success({
                            message: "Invite link copied to clipboard!",
                          })
                        }}
                      >
                        Survey link
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="form-group">
                  <label>Tailored url</label>
                  <input
                    type="text"
                    disabled={formData?.general?.status === "live"}
                    className="form-control"
                    placeholder="Tailored url..."
                    name="url"
                    onChange={change}
                    value={data?.url}
                  />
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                <div className="form-group">
                  <label>Default language</label>
                  <select
                    className="form-control"
                    disabled={formData?.general?.status === "live"}
                    name="language_id"
                    onChange={change}
                    value={data?.language_id}
                  >
                    <option>Select default language</option>
                    {initData?.languages
                      ?.sortAlphabetically("label")
                      .map((a) => {
                        return <option value={a.id}>{a.label}</option>
                      })}
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                <div className="form-group">
                  <label>Location sort option</label>
                  <select
                    className="form-control show-tick"
                    value={data?.location_sort}
                    name="location_sort"
                    onChange={change}
                  >
                    <option value="alphabetical">Alphabetically</option>
                    <option value="id">Uploaded order</option>
                    <option value="setup">Survey setup order</option>
                    <option value="client">Client setup order</option>
                  </select>
                </div>
              </div>{" "}
              <div className="col-lg-2 col-md-12">
                <div className="form-group">
                  <label>Department sort option</label>
                  <select
                    className="form-control show-tick"
                    //value={selectedLanguage}
                    value={data?.department_sort}
                    name="department_sort"
                    onChange={change}
                  >
                    <option value="alphabetical">Alphabetically</option>
                    <option value="id">Uploaded order</option>
                    <option value="setup">Survey setup order</option>
                  </select>
                </div>
              </div>{" "}
              <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                <button
                  onClick={() => {
                    checkInput() && send("general", data)
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Save
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    close()
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneralSetup
