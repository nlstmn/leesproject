import React, { useState, useRef, useEffect } from "react"
import { Drawer, notification } from "antd"
import AdditionalQuestion from "./drawers/additionalQuestion"
import { truncate } from "../../../../../util/functions"
import axios from "axios"
const Demographics = ({
  initData,
  setInitData,
  surveyId,
  clientId,
  formData,
  setFormData,
  close,
  send,
  reset,
}) => {
  let drawerContainer = useRef()
  const [selectedOptions, setSelectedOptions] = useState([])
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState("")
  useEffect(() => {
    setSelectedOptions(formData.demographics)
  }, [formData])

  const toggleQuestion = (q) => {
    let options = q.options.map((i) => i.option_id)
    let arr = selectedOptions
    if (options.isSubset(arr)) {
      arr = arr.filter((i) => !options.includes(i))
    } else {
      options.forEach((o) => {
        arr.push(o)
      })
    }
    setSelectedOptions([...new Set(arr)])
  }

  const handleCheck = (e) => {
    let { name, value } = e.target
    let arr = selectedOptions
    if (selectedOptions.includes(parseInt(name))) {
      arr = arr.filter((i) => i !== parseInt(name))
    } else {
      arr.push(parseInt(name))
    }
    setSelectedOptions([...new Set(arr)])
  }
  const deleteAdditionalQuestion = (id) => {
    if (formData?.general?.status === "live") {
      notification.warning({ message: "Cannot delete question after launch" })
    } else {
      axios
        .put(
          `/admin/clients/${clientId}/surveys/${surveyId}/deleteadditionalquestion`,
          { question_id: id }
        )
        .then((data) => {
          reset()
          notification.success({ message: "Deleted" })
        })
        .catch((err) => {
          console.log(err)

          notification.warning({ message: "Error" })
        })
    }
  }
  const questionComponent = (demo, isDeletable) => {
    console.log(demo)
    return (
      <div className="col-lg-3 col-md-3 surveys-fancy  pt-20">
        <div className="text-leftt light-black pb-20">
          {truncate(demo?.heading, 20)}
        </div>
        <div className="form-group">
          <span className="light-black list-group-item min-h-316">
            <strong>{truncate(demo?.heading, 30)}</strong>
            <div className="float-right">
              <label className="switch">
                <input
                  onChange={() => {
                    toggleQuestion(demo)
                  }}
                  type="checkbox"
                  name="Age"
                  checked={selectedOptions.hasIntersection(
                    demo?.options?.map((i) => i.option_id)
                  )}
                />
                <span className="slider round"></span>
              </label>
              {isDeletable && (
                <button
                  onClick={() => {
                    deleteAdditionalQuestion(demo.id)
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l mr-3"
                >
                  Delete
                </button>
              )}
            </div>

            {demo?.options
              ?.sort((a, b) => a.position - b.position)
              .map((o) => {
                return (
                  <label className="fancy-checkbox">
                    {o.optional && (
                      <input
                        onChange={handleCheck}
                        type="checkbox"
                        name={o.option_id}
                        checked={selectedOptions?.includes(o.option_id)}
                      />
                    )}
                    <span className="light-black">{o.option_label}</span>
                  </label>
                )
              })}
          </span>
        </div>
      </div>
    )
  }
  return (
    <>
      <div
        className="drawer_sc-div create--sr"
        id="survey-_section"
        ref={drawerContainer}
      >
        <Drawer
          title="Additional question/option"
          placement="right"
          width="40%"
          onClose={() => setVisible(false)}
          visible={visible}
          getContainer={() => drawerContainer.current}
        >
          <AdditionalQuestion
            reset={() => {
              reset()
              setVisible(false)
            }}
            type={type}
            setVisible={setVisible}
          />
        </Drawer>
      </div>
      <div className="aspect-tab ">
        <label htmlFor="item-2" className="aspect-label"></label>
        <div className="aspect-content">
          <div className="aspect-info">
            <div className="tab-_status green"></div>
            <span className="aspect-name">Demographics</span>
          </div>
        </div>
        <div className="">
          <div className="sentiment-wrapper">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 mt-4 mb-3">
                <h6>Demographics</h6>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="row">
                  {/* POPULATED WILL BE HERE */}
                  {formData?.demos
                    ?.filter(
                      (i) =>
                        i?.options?.sort((a, b) => a.position - b.position)
                          .length > 0
                    )
                    .map((d) => {
                      return questionComponent(d, false)
                    })}
                  {formData?.openQuestions?.length > 0 && (
                    <div className="col-lg-12 col-md-12 mt-4 mb-3">
                      <h6>Additional questions</h6>
                    </div>
                  )}
                  {formData?.openQuestions?.length > 0 &&
                    formData?.openQuestions.map((i) => {
                      return questionComponent(
                        {
                          heading: i.label,
                          id: i.id,
                          options: i.options,
                        },
                        true
                      )
                    })}
                </div>
              </div>

              <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                <button
                  onClick={() => {
                    setVisible(true)
                    setType("Demo")
                  }}
                  className="btn btn-sm btn-default mr-1 float-l"
                >
                  Add additional demographics question
                </button>
                <button
                  onClick={() => {
                    setVisible(true)
                    setType("Open")
                  }}
                  className="btn btn-sm btn-default mr-1 float-l"
                >
                  Add additional question
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => send("demographics", selectedOptions)}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Demographics
