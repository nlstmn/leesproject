import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { notification } from "antd"
import { putSurveySetupAdditionalQuestion } from "../../../../../../../actions/adminActions"
const DrawerDemographicsQuestions = ({
  isDemographicsQuestionsDrawer,
  setDemographicsQuestionsDrawer,
  title,
}) => {
  const dispatch = useDispatch()
  const [inputList, setInputList] = useState([{ option: "" }])
  const [questionText, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState("open")
  const [type, setType] = useState("open")

  const [isQType, setQType] = useState("role")
  const [isSQType, setSQType] = useState("dropdown")

  const selectedQuestion = useSelector(
    (store) => store.setSurveySetupDrawerData?.data?.selectedQuestion
  )
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
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
  const close = () => {
    setInputList([{ option: "" }])
    setQuestionText("")
    setDemographicsQuestionsDrawer(false)
  }

  useEffect(() => {
    selectedQuestion?.type == "demographics" && setQType("demographics")
    selectedQuestion?.type == "additional" && setQType("additional")

    setQuestionType(selectedQuestion?.type == "Demo" ? "dropdown" : "open")
    setQuestionText("")
    setInputList([{ option: "" }])
    setType(selectedQuestion?.type && "Edit")
    if (selectedQuestion?.id) {
      setQuestionType(
        selectedQuestion?.options[0]?.option_label != "" ? "dropdown" : "open"
      )
      setQuestionText(selectedQuestion?.heading)
      setInputList(
        selectedQuestion?.options
          ?.sort((a, b) => a.position - b.position)
          .map((i) => {
            return { id: i.option_id, option: i.option_label }
          })
      )
    }
  }, [selectedQuestion])

  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setDemographicsQuestionsDrawer(false)}
        visible={isDemographicsQuestionsDrawer}
        extra={
          <Space>
            <Button onClick={() => setDemographicsQuestionsDrawer(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => setDemographicsQuestionsDrawer(false)}
            >
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setDemographicsQuestionsDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            {/* Question Type */}
            <div className="col-lg-12 title_with_button">
              <h5 className="d_sub_title">Question type</h5>
            </div>
            <div className="col-lg-12">
              {!selectedQuestion?.type && (
                <div className="flex_groups vert">
                  <div className="n__form_control">
                    <label className="n__form_label dashboard_radio">
                      <input
                        type="radio"
                        name="status"
                        value="demographics"
                        onChange={() => {
                          setQType("demographics")
                          setType("Demo")
                        }}
                        checked={isQType === "demographics"}
                      />
                      <span className="label-_text">
                        Add additional demographics question
                      </span>
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="n__form_control">
                    <label className="n__form_label dashboard_radio">
                      <input
                        type="radio"
                        name="status"
                        value="question"
                        onChange={() => {
                          setQType("additional")
                          setType("Open")
                        }}
                        checked={isQType === "additional"}
                      />
                      <span className="label-_text">
                        Add additional question
                      </span>
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {isQType === "additional" && (
              <>
                {!selectedQuestion?.type && (
                  <div className="col-lg-12 sub__c">
                    <h5 className="d_sub_title">Additional question type</h5>
                    <div className="flex_groups">
                      <div className="n__form_control">
                        <label className="n__form_label dashboard_radio">
                          <input
                            type="radio"
                            name="status2"
                            value="dropdown"
                            onChange={() => setSQType("dropdown")}
                            checked={isSQType === "dropdown"}
                            defaultChecked
                          />
                          <span className="label-_text">Dropdown</span>
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="n__form_control">
                        <label className="n__form_label dashboard_radio">
                          <input
                            type="radio"
                            name="status2"
                            value="text"
                            onChange={() => setSQType("text")}
                            checked={isSQType === "text"}
                          />
                          <span className="label-_text">Open text</span>
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>

            {/* ADD NEW */}
            <div className="col-lg-12 title_with_button">
              <h5 className="d_sub_title">New question</h5>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Question text</span>
                  <textarea
                    type="text"
                    name="name"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="n__form_input"
                    placeholder="Type here..."
                  />
                </label>
              </div>
            </div>

            {isSQType !== "text" ? (
              <>
                {inputList?.map((x, i) => {
                  return (
                    <div className="col-lg-12">
                      <div className="n__form_control input_has_btn">
                        <label className="n__form_label">
                          <div className="group">
                            <input
                              type="text"
                              name="option"
                              value={x.option}
                              onChange={(e) => handleInputChange(e, i)}
                              className="n__form_input"
                              defaultValue="Lorem ipsum dolor sit amet"
                            />
                            {inputList.length - 1 === i && (
                              <button
                                onClick={handleAddClick}
                                className="iconic__btn"
                                title="Add"
                              >
                                <span className="iconx-plus1"></span>
                              </button>
                            )}
                            {inputList.length !== 1 && (
                              <button
                                className="iconic__btn"
                                onClick={() => handleRemoveClick(i)}
                                title="Delete"
                              >
                                <span className="iconx-minus1"></span>
                              </button>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setDemographicsQuestionsDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(
                putSurveySetupAdditionalQuestion(
                  {
                    type: type,
                    label: questionText,
                    options: inputList?.map((i) => i.option),
                    questionType: questionType,
                    selectedQuestion: {
                      ...selectedQuestion,
                      changedOptions: inputList.map((i, index) => {
                        return { ...i, position: index }
                      }),
                      heading: questionText,
                    },
                  },
                  close,
                  clientId,
                  surveyId
                )
              )
            }}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerDemographicsQuestions
