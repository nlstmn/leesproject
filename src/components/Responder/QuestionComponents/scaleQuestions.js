import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { notification } from "antd"

export default function Scale({
  question,
  send,
  loading,
  nextStep,
  previousStep,
  index,
  scale,
  setScale,
  updateLink,
  selectedLocationName,
  goToStep,
  checkBlockWords,
  setBackgroundColorCss,
}) {
  const history = useHistory()
  const { id, label, neutral, rule } = question
  const [comment, setComment] = useState("")
  setBackgroundColorCss("")

  useEffect(() => {
    console.log(index)
  }, [index])

  function change(e) {
    const { name, value } = e.target
    setScale(value)
  }
  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Answer a question</h2>

            {/* !!!! Seçilen Lokasyon burada gösterilecek */}

            {/* YA DA */}
            <span>{selectedLocationName}</span>
            <button
              className="change-_l btn btn-default"
              onClick={() => {
                sessionStorage.removeItem("selectedLocationType")
                sessionStorage.removeItem("selectedLocationId")
                sessionStorage.removeItem("selectedLocationName")
                window.location.reload()
              }}
              title="Change location"
            >
              <span className="iconx-edit-2"></span>
            </button>
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
            {/* !!! İFADE SEÇİMİ DEĞİŞTİ !!!*/}
            <div className="col-12">
              <input
                onChange={change}
                value="-2"
                className="checkbox-tools"
                type="radio"
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
                value="1"
                className="checkbox-tools"
                type="radio"
                name="workplace"
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
                value="2"
                className="checkbox-tools"
                type="radio"
                name="workplace"
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
            <div className="col-12">
              <div className="form-group pt-20">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Can you please tell us more?"
                  cols="30"
                  onChange={(e) => {
                    setComment(e.target.value)
                  }}
                  value={comment}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <button
          onClick={() => {
            previousStep()
          }}
          className="mb-0 float-l btn btn-default"
        >
          Back
        </button>{" "}
        <button
          className="mb-0 float-r btn btn-primary"
          disabled={!scale}
          onClick={() => {
            if (checkBlockWords(comment)) {
              notification.warning({
                message: "Your comment cannot be submitted using that language",
              })
            } else {
              return send(true, id, scale, comment).then(() => {
                return nextStep()
              })
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  )
}
