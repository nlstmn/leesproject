import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState } from "react"

const DrawerLocationSurvey = ({
  isLocationSurveyDrawer,
  setLocationSurveyDrawer,
  title,
}) => {
  return (
    <>
      <Drawer
        className="filter_drawer small right_filter"
        title=""
        placement={"right"}
        onClose={() => setLocationSurveyDrawer(false)}
        visible={isLocationSurveyDrawer}
        extra={
          <Space>
            <Button onClick={() => setLocationSurveyDrawer(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => setLocationSurveyDrawer(false)}
            >
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setLocationSurveyDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>All occupants invited to survey?</span>
                  <div className="n__form_select">
                    <select name="industry" id="industry">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Assessment type</span>
                  <div className="n__form_select">
                    <select name="industry" id="industry">
                      <option value="Unclassified">Unclassified</option>
                      <option value="Standard">Standard</option>
                      <option value="Pre">Pre</option>
                      <option value="Post">Post</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Survey workplace target population</span>
                  <input type="number" name="name" className="n__form_input" />
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Number of workstations</span>
                  <input type="number" name="name" className="n__form_input" />
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Survey reason</span>
                  <div className="n__form_select">
                    <select name="industry" id="industry">
                      <option value="Wider business transformation">
                        Wider business transformation
                      </option>
                      <option value="New ways of working">
                        New ways of working
                      </option>
                      <option value="Expansion">Expansion</option>
                      <option value="Relocation">Relocation</option>
                      <option value="Refurbishment of existing workplace">
                        Refurbishment of existing workplace
                      </option>
                      <option value="Merger or acquisition">
                        Merger or acquisition
                      </option>
                      <option value="Pilot project or test site">
                        Pilot project or test site
                      </option>
                      <option value="New construction">New construction</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Mandate to use the workplace?</span>
                  <div className="n__form_select">
                    <select name="industry" id="industry">
                      <option value="Mandate to work in the office full-time">
                        Mandate to work in the office full-time
                      </option>
                      <option value="Mandate to work in the office a certain number of days">
                        Mandate to work in the office a certain number of days
                      </option>
                      <option value="Decisions made at local or business unit/team level">
                        Decisions made at local or business unit/team level
                      </option>
                      <option value="No mandate - employees have full choice">
                        No mandate - employees have full choice
                      </option>
                      <option value="Employees are fully remote">
                        Employees are fully remote
                      </option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Total net internal/usable area</span>
                  <input type="number" name="name" className="n__form_input" />
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Number of floors / levels</span>
                  <input type="number" name="name" className="n__form_input" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setLocationSurveyDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setLocationSurveyDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerLocationSurvey
