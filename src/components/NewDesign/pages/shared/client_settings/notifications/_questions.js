import { Button, Drawer, Tree, Space } from "antd"
import React, { useState } from "react"

const DrawerQuestions = ({ isQuestionsDrawer, setQuestionsDrawer, title }) => {
  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setQuestionsDrawer(false)}
        visible={isQuestionsDrawer}
        extra={
          <Space>
            <Button onClick={() => setQuestionsDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setQuestionsDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setQuestionsDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Module</span>
                  <div className="n__form_select">
                    <select name="industry" id="industry">
                      <option value="Option 1...">Super Drivers</option>
                      <option value="Option 2...">Formal Meetings</option>
                      <option value="Option 3...">Individual work</option>
                      <option value="Option 1...">Collaboration</option>
                      <option value="Option 2...">Wellbeing</option>
                      <option value="Option 3...">Conversations</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
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
              <h5 className="d_sub_title">Questions of selected module</h5>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Planned meetings"
                    value="Planned meetings"
                  />
                  <span className="label-_text">Planned meetings</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Learning from others"
                    value="Learning from others"
                  />
                  <span className="label-_text">Learning from others</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Individual focused work at a desk"
                    value="Individual focused work at a desk"
                  />
                  <span className="label-_text">
                    Individual focused work at a desk
                  </span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Thinking/creative thinking"
                    value="Thinking/creative thinking"
                  />
                  <span className="label-_text">
                    Thinking/creative thinking
                  </span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Relaxing/taking a break"
                    value="Relaxing/taking a break"
                  />
                  <span className="label-_text">Relaxing/taking a break</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Small meeting rooms"
                    value="Small meeting rooms"
                  />
                  <span className="label-_text">Small meeting rooms</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input type="checkbox" name="Desk" value="Desk" />
                  <span className="label-_text">Desk</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="General décor"
                    value="General décor"
                  />
                  <span className="label-_text">General décor</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Custom item..."
                    value="Custom item..."
                  />
                  <span className="label-_text">Custom item...</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Custom item..."
                    value="Custom item..."
                  />
                  <span className="label-_text">Custom item...</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Custom item..."
                    value="Custom item..."
                  />
                  <span className="label-_text">Custom item...</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Custom item..."
                    value="Custom item..."
                  />
                  <span className="label-_text">Custom item...</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Custom item..."
                    value="Custom item..."
                  />
                  <span className="label-_text">Custom item...</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setQuestionsDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setQuestionsDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerQuestions
