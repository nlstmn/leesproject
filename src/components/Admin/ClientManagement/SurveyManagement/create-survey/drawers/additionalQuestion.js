import React, { useEffect, useState } from "react"
import axios from "axios"
import { connect } from "react-redux"
import * as settingsActions from "../../../../../../actions/settingsAction"
const AdditionalQuestion = ({ type, reset }) => {
  const [inputList, setInputList] = useState([{ option: "" }])
  const [questionText, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState("open")
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const surveyId = params.get("survey_id")
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const handleRemoveClick = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  const handleAddClick = () => {
    setInputList([...inputList, { option: "" }])
  }

  const send = () => {
    axios
      .put(`/admin/clients/${clientId}/surveys/${surveyId}/additional`, {
        type: type,
        label: questionText,
        options: inputList?.map((i) => i.option),
        questionType: questionType,
      })
      .then((val) => {
        reset()
        setInputList([{ option: "" }])
        setQuestionText("")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="aspect-tab ">
      <label htmlFor="item-6" className="aspect-label"></label>
      <div className="aspect-content">
        <div className="aspect-info">
          <div className="tab-_status"></div>
          <span className="aspect-name">
            {type === "Role" && "Tailored role options"}
            {type === "Demo" && "Additional demographics question"}
            {type === "Open" && "Additional open text question"}
          </span>
        </div>
      </div>
      <div className="">
        <div className="sentiment-wrapper">
          <div className="row clearfix">
            {type === "Open" && (
              <div className="col-lg-12 col-md-12 mb-3">
                <label>Question type</label>
                <select
                  className="form-control fl-input"
                  style={{ color: "white" }}
                  name="question_type"
                  onChange={(e) => {
                    setQuestionType(e.target.value)
                  }}
                  value={questionType}
                >
                  <option value="open">Open text</option>
                  <option value="dropdown">Dropdown</option>
                </select>
              </div>
            )}
            <div className="col-lg-12 col-md-12 add_emails">
              {
                <input
                  type="text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  name="option"
                  className="form-control required fl-input"
                  placeholder="Question text"
                />
              }
              {(type !== "Open" || questionType === "dropdown") &&
                inputList?.map((x, i) => {
                  return (
                    <>
                      <div className="add_fields_row">
                        <div className="form-group add_bottom_30">
                          <div className="fl-wrap fl-wrap-input fl-is-required">
                            <input
                              type="text"
                              value={x.option}
                              onChange={(e) => handleInputChange(e, i)}
                              name="option"
                              className="form-control required fl-input"
                              placeholder="Option..."
                            />
                          </div>
                        </div>

                        <div className="fields_btn_group">
                          {inputList.length !== 1 && (
                            <button
                              onClick={() => handleRemoveClick(i)}
                              className="btn btn-sm "
                              title="Remove domain"
                            >
                              <span className="iconx-minus1"></span>
                            </button>
                          )}

                          {inputList.length - 1 === i && (
                            <button
                              className="btn btn-sm"
                              onClick={handleAddClick}
                              title="Add domain"
                            >
                              <span
                                style={{ color: "black" }}
                                className="iconx-plus1"
                              ></span>
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )
                })}
            </div>
            <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
              <button
                onClick={reset}
                className="btn btn-sm btn-default mr-1 float-l"
              >
                Cancel
              </button>{" "}
              &nbsp;&nbsp;
              <button
                onClick={send}
                className="btn btn-sm btn-primary ml-2 float-l"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdditionalQuestion
