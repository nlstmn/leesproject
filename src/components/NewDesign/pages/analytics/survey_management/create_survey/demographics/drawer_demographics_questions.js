import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState } from "react"

const DrawerDemographicsQuestions = ({
  isDemographicsQuestionsDrawer,
  setDemographicsQuestionsDrawer,
  title,
}) => {
  const [isQType, setQType] = useState("role")
  const [isSQType, setSQType] = useState("dropdown")

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
              <div className="flex_groups vert">
                <div className="n__form_control">
                  <label className="n__form_label dashboard_radio">
                    <input
                      type="radio"
                      name="status"
                      value="demographics"
                      onChange={() => setQType("demographics")}
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
                      onChange={() => setQType("question")}
                      checked={isQType === "question"}
                    />
                    <span className="label-_text">Add additional question</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>

            {isQType === "question" && (
              <>
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
                    className="n__form_input"
                    placeholder="Type here..."
                  />
                </label>
              </div>
            </div>

            {isSQType !== "text" ? (
              <>
                <div className="col-lg-12">
                  <div className="n__form_control input_has_btn">
                    <label className="n__form_label">
                      <span>Question options</span>

                      <div className="group">
                        <input
                          type="text"
                          name="name"
                          className="n__form_input"
                          placeholder="Type here..."
                        />
                        <button className="iconic__btn" title="Add">
                          <span className="iconx-plus1"></span>
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_divider">
                    <div className="n__divider"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <h5 className="d_sub_title">Added options</h5>
                </div>

                {/* ITEMS */}
                {/* Item 1 */}
                <div className="col-lg-12">
                  <div className="n__form_control input_has_btn">
                    <label className="n__form_label">
                      <div className="group">
                        <input
                          type="text"
                          name="name"
                          className="n__form_input"
                          defaultValue="Lorem ipsum dolor sit amet"
                        />
                        <button className="iconic__btn" title="Delete">
                          <span className="iconx-minus1"></span>
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
                {/* Item 1 */}
                <div className="col-lg-12">
                  <div className="n__form_control input_has_btn">
                    <label className="n__form_label">
                      <div className="group">
                        <input
                          type="text"
                          name="name"
                          className="n__form_input"
                          defaultValue="Excepteur sint occaecat cupidatat"
                        />
                        <button className="iconic__btn" title="Delete">
                          <span className="iconx-minus1"></span>
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
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
            onClick={() => setDemographicsQuestionsDrawer(false)}
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
