import React, { useEffect, useState } from "react"
import { Select, notification } from "antd"
import { Link, useHistory } from "react-router-dom"
import Loader from "../../common/Loader"
const { Option } = Select

export default function BooleanScale({
  question,
  send,
  loading,
  nextStep,
  previousStep,
  index,
  scale,
  setScale,
  updateLink,
  selectLocationType,
  selectLocationId,
  questionLabel,
  questionOptions,
  otherLocations,
  checkBlockWords,
  setBackgroundColorCss,
}) {
  const history = useHistory()
  const { id, label, label_2, rule } = question
  const [state, setState] = useState(0)
  const [isOffice, setIsOffice] = useState(false)
  const [location_id, setLocationId] = useState()
  const [location_type, setLocationType] = useState()
  const [yesNo, setYesNo] = useState()
  const [comment, setComment] = useState("")
  setBackgroundColorCss("")

  useEffect(() => {
    console.log(index)
    setState(0)
    console.log(question)
  }, [index])

  function change(e) {
    console.log(e.target.value)
    let v = e.target.value
    setScale(v)
  }

  function changeBool(e) {
    if (e.target.value === "yes") {
      setYesNo(true)
    } else {
      setYesNo(false)
    }
  }

  function nextPart() {
    let part = state

    switch (part) {
      case 0:
        if (yesNo) {
          setState(1)
        } else {
          send(false, id, null)
          nextStep()
        }
        break
      case 1:
        if (
          !(
            location_type === undefined ||
            (location_type === "One of my organisation’s other offices" &&
              location_id === undefined)
          )
        ) {
          setState(2)
        }

        break

      default:
        break
    }
  }
  function backPart() {
    let part = state > 0 && state - 1
    setState(part)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        state === 0 && (
          <div className="multi-_step">
            <div className="row clearfix step-_header">
              <div className="col text-left">
                <h2 className="h4 m-0 font-600">Answer a question</h2>
              </div>
              <div className="col-auto">
                <div className="stamp" aria-hidden="true">
                  <i className="icon-rp-thinkrspo step-_icon"></i>
                </div>
              </div>
              <Link
                to={updateLink ? "/responder-home" : "/"}
                className="close-_step"
                title="Close"
              >
                <i className="iconx-x"></i>
              </Link>
            </div>

            <div className="form-_actions min-h-366">
              <p>{label}</p>

              <div className="row justify-content-center pb-5">
                <div className="col-12 pb-5">
                  <div className="radiobtn">
                    <input
                      onChange={changeBool}
                      type="radio"
                      id={"yes" + index}
                      name="yes-no"
                      value="yes"
                    />
                    <label htmlFor={"yes" + index}>Yes</label>
                  </div>

                  <div className="radiobtn">
                    <input
                      onChange={changeBool}
                      type="radio"
                      id={"no" + index}
                      name="yes-no"
                      value="no"
                    />
                    <label htmlFor={"no" + index}>No</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      {state === 1 && (
        <div className="form-_actions min-h-366 ">
          {/* <p>{questionLabel}</p> */}
          <p>Where were you?</p>

          <div className="row justify-content-center pb-5">
            <div className="col-12 pb-15">
              <Select
                aria-label="Location type selection; please double tap to open the list."
                getPopupContainer={(trigger) => trigger.parentElement}
                placeholder="Choose location"
                style={{ width: 200 }}
                onChange={(e, d) => {
                  selectLocationType(e)
                  setLocationType(d.children)
                  console.log(e, d)
                  if (d.children === "One of my organisation’s other offices") {
                    setIsOffice(true)
                  } else {
                    setIsOffice(false)
                    selectLocationId()
                    setLocationId()
                  }
                }}
                value={location_type}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {questionOptions
                  .sort((a, b) => {
                    if (a.position < b.position) return -1
                    if (a.position > b.position) return 1
                    return 0
                  })
                  .map((item) => {
                    return (
                      <Option
                        title={item.label}
                        aria-label={item.label}
                        tabIndex={0}
                        value={item.id}
                      >
                        {item.label}
                      </Option>
                    )
                  })}
              </Select>
            </div>
            {isOffice && (
              <div className="col-12">
                <Select
                  aria-label="Office selection; please double tap to open the list."
                  getPopupContainer={(trigger) => trigger.parentElement}
                  showSearch
                  placeholder="Choose location"
                  style={{ width: 200 }}
                  onChange={(e) => {
                    selectLocationId(e)
                    setLocationId(e)
                    console.log(e)
                  }}
                  value={location_id}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {otherLocations
                    .filter((i) => !i.code)
                    .map((item) => {
                      return (
                        <Option
                          title={item.label}
                          aria-label={item.label}
                          tabIndex={0}
                          value={item.id}
                        >
                          {item.label}
                        </Option>
                      )
                    })}
                </Select>
              </div>
            )}
          </div>
        </div>
      )}{" "}
      {state === 2 && (
        <div className="multi-_step">
          <div className="row clearfix step-_header">
            <div className="col text-left">
              <h2 className="h4 m-0 font-600">Answer a question</h2>
            </div>
            <div className="col-auto">
              <div className="stamp" aria-hidden="true">
                <i className="icon-rp-thinkrspo step-_icon"></i>
              </div>
            </div>
          </div>
          <div className="form-_actions min-h-366">
            <p>{label_2}</p>

            <div className="row justify-content-center pb-5">
              <div className="col-12">
                <input
                  onChange={change}
                  className="checkbox-tools"
                  type="radio"
                  value="-2"
                  name="workplace"
                  id={index + "1"}
                />
                <label className="for-checkbox-tools" htmlFor={index + "1"}>
                  <i
                    className="icon_f-very-badicon_f- uil rate-first"
                    aria-hidden="true"
                  ></i>
                  <small className="emoji-screen-reader">Very bad</small>
                </label>
                <input
                  onChange={change}
                  value="-1"
                  className="checkbox-tools"
                  type="radio"
                  name="workplace"
                  id={index + "2"}
                />
                <label className="for-checkbox-tools" htmlFor={index + "2"}>
                  <i
                    className="icon_f-badicon_f- uil rate-2"
                    aria-hidden="true"
                  ></i>
                  <small className="emoji-screen-reader">Bad</small>
                </label>
                {!rule.includes("A") && (
                  <>
                    <input
                      onChange={change}
                      value="0"
                      className="checkbox-tools"
                      type="radio"
                      name="workplace"
                      id={index + "3"}
                    />
                    <label className="for-checkbox-tools" htmlFor={index + "3"}>
                      <i
                        className="icon_f-neutralicon_f- uil rate-3"
                        aria-hidden="true"
                      ></i>
                      <small className="emoji-screen-reader">Normal</small>
                    </label>
                  </>
                )}
                <input
                  onChange={change}
                  className="checkbox-tools"
                  type="radio"
                  name="workplace"
                  value="1"
                  id={index + "4"}
                />
                <label className="for-checkbox-tools" htmlFor={index + "4"}>
                  <i
                    className="icon_f-goodicon_f- uil rate-4"
                    aria-hidden="true"
                  ></i>
                  <small className="emoji-screen-reader">Good</small>
                </label>
                <input
                  onChange={change}
                  className="checkbox-tools"
                  type="radio"
                  name="workplace"
                  value="2"
                  id={index + "5"}
                />
                <label className="for-checkbox-tools" htmlFor={index + "5"}>
                  <i
                    className="icon_f-very-goodicon_f- uil rate-_last"
                    aria-hidden="true"
                  ></i>
                  <small className="emoji-screen-reader">Very good</small>
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group pt-20">
                <textarea
                  className="form-control"
                  rows="5"
                  onChange={(e) => {
                    setComment(e.target.value)
                  }}
                  placeholder="Can you please tell us more?"
                  cols="30"
                >
                  {comment}
                </textarea>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bottom">
        <button
          onClick={() => {
            console.log(state)
            if (state > 0) {
              backPart()
            } else {
              if (updateLink === true) {
                index === 0 ? history.push("/responder-home") : previousStep()
              } else {
                index === 0 ? history.push("/") : previousStep()
              }
            }
          }}
          className="mb-0 float-l btn btn-default"
        >
          Back
        </button>
        <button
          className="mb-0 float-r btn btn-primary"
          disabled={
            state === 1 &&
            (location_type === undefined ||
              (location_type === "One of my organisation’s other offices" &&
                location_id === undefined))
          }
          onClick={() => {
            if (checkBlockWords(comment)) {
              notification.warning({
                message: "Your comment cannot be submitted using that language",
              })
            } else {
              nextPart()
              if (state === 2 && scale) {
                return send(true, id, scale, comment).then(() => {
                  return nextStep()
                })
              }
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  )
}
