import React, { useEffect, useState } from "react"
import axios from "axios"
import MultiSelect from "react-multi-select-component"
import { notification } from "../../../../../node_modules/antd/lib/index"

export default function QuestionModal({ selectedQuestion, close }) {
  const [formData, setFormData] = useState([])
  const [modules, setModules] = useState([])
  const [selectedModules, setSelectedModules] = useState([{ title: "" }])
  const [sections, setSections] = useState([])
  const [types, setTypes] = useState([])
  const [options, setOptions] = useState([])
  const [questionOptions, setQuestionOptions] = useState([])
  const [locations, setLocations] = useState([])
  const [dependencies, setDependencies] = useState([])
  const [selectedTab, setSelectedTab] = useState("question")
  const [newOptionLabel, setNewOptionLabel] = useState("")
  const search = window.location.search
  const params = new URLSearchParams(search)
  const urlParam = params.get("client_id")
  const clientId = urlParam ? urlParam : 0

  useEffect(() => {
    console.log(clientId, selectedQuestion.id)
    if (!selectedQuestion.id) {
      setFormData([])
      getData(0)
      setSelectedModules([])
      setOptions([])
      setQuestionOptions([])
    } else {
      ;(clientId || clientId === 0) && getData(selectedQuestion.id)
    }
  }, [selectedQuestion])

  useEffect(() => {
    if (selectedQuestion.id) {
      if (modules.length > 0 && !selectedQuestion.modules.includes(null)) {
        let selections = []
        selectedQuestion.modules.forEach((i) => {
          if (modules.filter((o) => o.name === i).length > 0) {
            selections.push({
              value: modules.filter((o) => o.name === i)[0].id,
              label: modules.filter((o) => o.name === i)[0].name,
            })
          }
        })

        setSelectedModules(selections)
      }
      let d = selectedQuestion
      let dd = {
        section_id: d.section_id,
        type_id: d.type_id,
        rule: d.rule,
      }
      setFormData((pre) => {
        return { ...pre, ...dd }
      })
    }
  }, [modules])
  useEffect(() => {
    formData.rule && selectOptionsBasedOnRules(formData.rule)
  }, [formData])

  function getData(id) {
    axios
      .get(`/admin/clients/${clientId}/questions/${id}`)
      .then((res) => {
        console.log(res.data, clientId)
        let d = res.data
        let m = {}
        if (!clientId) {
          m = d.modules.filter((i) => !i.client_id)
        } else {
          m = d.modules.filter((i) => i.client_id === parseInt(clientId))
        }
        setModules(m)
        setSections(d.sections)
        setTypes(d.types)
        setLocations(d.locations)
        setDependencies(d.dependencies.map((i) => i.option_id))
        setQuestionOptions(d.options)

        let fd =
          d.question && d.question.heading
            ? {
                heading: d.question.heading,
                label: d.question.label,
                label2: d.question.label_2,
              }
            : {}
        setFormData({ ...selectedQuestion, ...fd })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function change(e) {
    const { name, value } = e.target
    setFormData((pre) => {
      return { ...pre, [name]: value }
    })
  }
  function changeDependency(id) {
    let d = dependencies
    if (d.includes(id)) {
      d = d.filter((i) => i !== id)
    } else {
      d.push(id)
    }
    setDependencies([...d])
  }
  function changeOption(e) {
    const { name, value } = e.target
    let options_ = options
    if (options_.includes(name)) {
      options_ = options.filter((i) => i !== name)
    } else {
      options_.push(name)
    }
    setOptions([...options_])
  }
  function selectOptionsBasedOnRules(rule) {
    let a1 = ["behavioural", "notOffice"]
    let a2 = ["notOffice"]
    let f1 = ["behavioural", "notOffice", "neutral"]
    let f2 = ["notOffice", "neutral"]
    let f11 = ["neutral", "behavioural"]
    let f3 = ["neutral", "behavioural", "notOffice"]
    let f4 = ["neutral", "behavioural", "notOffice", "neverAskFirst"]
    let i1 = ["neutral", "locationAtTheEnd"]
    let i2 = ["neutral", "notOffice"]
    let i3 = ["neutral", "notOffice", "locationAtTheEnd"]
    let arr = {
      A1: a1,
      A2: a2,
      F1: f1,
      F2: f2,
      F11: f11,
      F3: f3,
      F4: f4,
      I1: i1,
      I2: i2,
      I3: i3,
    }
    setOptions(arr[rule] ? arr[rule] : [])
  }

  const checkRequired = (data) => {
    console.log(data)
    let err_messages = ["Missing"]
    let ok = false
    if (!data.heading) {
      err_messages.push("question heading")
    } else if (!data.label) {
      err_messages.push("question label")
    } else if (!data.type_id) {
      err_messages.push("question type")
    } else if (!data.section_id) {
      err_messages.push("section")
    } else {
      ok = true
      err_messages = []
    }

    return {
      ok: ok,
      err: err_messages.join(" "),
    }
  }
  function send() {
    let d = {
      ...formData,
      modules: selectedModules.map((i) => i.value),
      client_id: clientId === 0 ? null : clientId,
      neutral: options.includes("neutral"),
      dependencies: dependencies,
    }
    console.log(d)
    if (checkRequired(d).ok) {
      if (selectedQuestion.id) {
        axios
          .put(`/admin/clients/${clientId}/questions/${selectedQuestion.id}`, d)
          .then((res) => {
            close()
          })
          .catch((err) => console.log(err))
      } else {
        axios
          .post(`/admin/clients/${clientId}/questions`, d)
          .then((res) => {
            close()
          })
          .catch((err) => console.log(err))
      }
    } else {
      notification.warning({ message: checkRequired(d).err })
    }
  }
  function changeQuestionOption(type, id, value) {
    let optionArr = questionOptions

    let buffer = { ...optionArr.filter((i) => i.id === id)[0], [type]: value }
    optionArr = optionArr.filter((i) => i.id !== id)
    optionArr.push(buffer)

    setQuestionOptions(
      optionArr.sort((a, b) => {
        return a.id - b.id
      })
    )
  }
  function sendOption() {
    let data = questionOptions.map((i) => {
      return { ...i, position: parseInt(i.position) }
    })
    axios
      .put(`/admin/clients/${clientId}/options`, data)
      .then((res) => {
        close()
      })
      .catch((err) => console.log(err))
  }
  function sendNewOption() {
    const data = {
      question_id: selectedQuestion.id,
      option_label: newOptionLabel,
    }
    axios
      .post(`/admin/clients/${clientId}/options`, data)
      .then((res) => {
        getData(selectedQuestion.id)
        setNewOptionLabel("")
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="modal-dialog modal-lg modal-dialog-centered scrollable-__modal">
      <div className="modal-content" style={{ padding: "15px" }}>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <button
              onClick={() => setSelectedTab("question")}
              className={`btn btn-sm btn-default mr-1 float-l ${
                selectedTab === "question" ? "active" : ""
              }`}
            >
              Question settings
            </button>
            <button
              onClick={() => setSelectedTab("option")}
              className={`btn btn-sm btn-default mr-1 float-l ${
                selectedTab === "option" ? "active" : ""
              }`}
            >
              Option settings
            </button>
          </div>
          <div className="col-lg-12 col-md-12">
            <hr />
          </div>
        </div>

        {selectedTab === "question" && (
          <div className="row clearfix centered-_row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <h2 className="card-title mb-0">
                  Additional campaign question edit/update
                </h2>
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12">
              <label className="light-black" style={{ marginBottom: "15px" }}>
                Question heading
              </label>
              <div className="form-group">
                <input
                  type="text"
                  value={formData.heading}
                  onChange={change}
                  name="heading"
                  className="form-control"
                  placeholder="Question heading "
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12">
              <label className="light-black" style={{ marginBottom: "15px" }}>
                Question label
              </label>
              <div className="form-group">
                <input
                  type="text"
                  value={formData.label}
                  onChange={change}
                  name="label"
                  className="form-control"
                  placeholder="label  "
                />
              </div>
            </div>
            {types.length > 0 &&
              String(formData.type_id) ===
                String(
                  types.filter((i) => i.name === "boolean_scale")[0].id
                ) && (
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <label
                    className="light-black"
                    style={{ marginBottom: "15px" }}
                  >
                    Question label 2
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      value={formData.label2}
                      onChange={change}
                      name="label2"
                      className="form-control"
                      placeholder="label 2 "
                    />
                  </div>
                </div>
              )}

            <div
              className="col-lg-3 col-md-3 col-sm-12"
              style={{ marginBottom: "15px" }}
            >
              <div className="form-group">
                <select
                  value={formData.type_id}
                  onChange={change}
                  name="type_id"
                  className="form-control show-tick"
                >
                  <option>Question type</option>
                  {types.map((i) => {
                    return <option value={i.id}>{i.name}</option>
                  })}
                </select>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-3 col-sm-12"
              style={{ marginBottom: "15px" }}
            >
              <div className="form-group">
                <select
                  value={formData.section_id}
                  onChange={change}
                  name="section_id"
                  className="form-control show-tick"
                >
                  <option>Sections</option>
                  {sections.map((i) => {
                    return <option value={i.id}>{i.name}</option>
                  })}
                </select>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-3 col-sm-12"
              style={{ marginBottom: "15px" }}
            >
              <div className="form-group">
                <select
                  value={formData.rule}
                  onChange={change}
                  name="rule"
                  className="form-control show-tick"
                >
                  <option>Dependency rule group</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="F1">F1</option>
                  <option value="F2">F2</option>
                  <option value="F3">F3</option>
                  <option value="F4">F4</option>
                  <option value="I1">I1</option>
                  <option value="I2">I2</option>
                  <option value="I3">I3</option>
                </select>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-3 col-sm-12"
              style={{ marginBottom: "15px" }}
            >
              <div className="form-group">
                <input
                  type="number"
                  value={formData.position}
                  onChange={change}
                  name="position"
                  className="form-control"
                  placeholder="Position"
                />
              </div>
            </div>

            <div className="col-lg-3 col-md-3">
              <label className="fancy-checkbox">
                <input
                  disabled
                  checked={options.includes("neutral")}
                  onChange={changeOption}
                  type="checkbox"
                  name="neutral"
                />
                <span className="light-black">Neutral option</span>
              </label>
            </div>
            <div className="col-lg-3 col-md-3">
              <label className="fancy-checkbox">
                <input
                  checked={options.includes("behavioural")}
                  onChange={changeOption}
                  type="checkbox"
                  name="behavioural"
                />
                <span className="light-black">Behaviour related</span>
              </label>
            </div>

            <div className="col-lg-3 col-md-3">
              <label className="fancy-checkbox">
                <input
                  checked={options.includes("neverAskFirst")}
                  onChange={changeOption}
                  type="checkbox"
                  name="neverAskFirst"
                />
                <span className="light-black">Never ask first</span>
              </label>
            </div>
            <div className="col-lg-3 col-md-3">
              <label className="fancy-checkbox">
                <input
                  checked={options.includes("locationAtTheEnd")}
                  onChange={changeOption}
                  type="checkbox"
                  name="locationAtTheEnd"
                />
                <span className="light-black">
                  Location question asked at the end
                </span>
              </label>
            </div>
            {locations
              .filter((i) => !i.label.includes("main"))
              .map((i) => {
                return (
                  <div className="col-lg-3 col-md-3">
                    <label className="fancy-checkbox">
                      <input
                        checked={dependencies.includes(i.id)}
                        onChange={() => changeDependency(i.id)}
                        type="checkbox"
                      />
                      <span className="light-black">{i.label}</span>
                    </label>
                  </div>
                )
              })}

            <div
              className="col-lg-12 col-md-12"
              style={{ marginBottom: "20px", marginTop: "20px" }}
            >
              <label className="text-leftt light-black">
                Select Modules(s)
              </label>
              <MultiSelect
                options={modules.map((i) => {
                  return {
                    value: i.id,
                    label: i.name,
                  }
                })}
                value={selectedModules}
                disableSearch={false}
                hasSelectAll={true}
                onChange={setSelectedModules}
                maxSelectedItems={2}
                labelledBy={"Select modules"}
                overrideStrings={{
                  allItemsAreSelected: "(All)",
                  clearSearch: "Clear search",
                  noOptions: "No options",
                  search: "Search",
                  selectAll: "(All)",
                  selectSomeItems: "Select module(s)",
                }}
              />
            </div>
          </div>
        )}
        {selectedTab === "option" && (
          <div className="row clearfix centered-_row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <h2 className="card-title mb-0">
                  Question options edit/update
                </h2>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-8">
              <label className="light-black">Option label</label>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <label className="light-black">Position</label>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <label className="light-black">Code</label>
            </div>
            <div className="scrollable--content col-lg-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 form-group">
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewOptionLabel(e.target.value)
                    }}
                    className="form-control"
                    placeholder="Add new option"
                    value={newOptionLabel}
                  />
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 form-group">
                  <button
                    type="button"
                    onClick={sendNewOption}
                    className="btn btn-sm btn-primary"
                  >
                    Save
                  </button>
                </div>
                {questionOptions
                  .sort((a, b) => {
                    return a.id - b.id
                  })

                  .map((i) => {
                    return (
                      <>
                        <div className="col-lg-8 col-md-8 col-sm-8 form-group">
                          <input
                            type="text"
                            value={i.label}
                            onChange={(e) =>
                              changeQuestionOption(
                                "label",
                                i.id,
                                e.target.value
                              )
                            }
                            className="form-control"
                            placeholder="Question heading "
                          />
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 form-group">
                          <input
                            type="number"
                            value={i.position}
                            onChange={(e) =>
                              changeQuestionOption(
                                "position",
                                i.id,
                                e.target.value
                              )
                            }
                            className="form-control"
                            placeholder="Question heading "
                          />
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 form-group">
                          <input
                            type="text"
                            value={i.type}
                            onChange={(e) =>
                              changeQuestionOption("type", i.id, e.target.value)
                            }
                            className="form-control"
                            placeholder="Question code "
                            onFocus={() => {
                              if (i.type && i.type.length > 0) {
                                document.getElementById(
                                  "warningMessage" + i.id + i.label
                                ).innerHTML =
                                  "Changing this value may cause some errors."
                              }
                            }}
                          />
                          <p
                            style={{ color: "red" }}
                            id={"warningMessage" + i.id + i.label}
                          ></p>
                        </div>
                      </>
                    )
                  })}
              </div>
            </div>
          </div>
        )}
        <div className="row clearfix">
          <div className="col-12 pt-40">
            <button
              type="button"
              data-dismiss="modal"
              onClick={() => {
                selectedTab === "question" ? send() : sendOption()
              }}
              className="btn btn-sm btn-primary"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              data-dismiss="modal"
              onClick={() => close()}
              style={{ marginLeft: "15px" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
