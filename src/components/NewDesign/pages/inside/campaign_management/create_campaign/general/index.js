import React, { useState } from "react"
import { DatePicker, Space } from "antd"

const { RangePicker } = DatePicker

const GeneralSettings = () => {
  const [checkedAlways, setcheckedAlways] = useState(false)

  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">General</h3>
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Campaign name</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Campaign description</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_divider">
                    <div className="n__divider"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="un_flex_groups">
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Always"
                          value="Always"
                          onChange={() => setcheckedAlways(!checkedAlways)}
                        />
                        <span className="label-_text">Always on</span>
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    {!checkedAlways && (
                      <>
                        <div className="n_calendar_select mt-3">
                          <RangePicker
                            format={"DD / MM / YYYY"}
                            getCalendarContainer={(triggerNode) => {
                              return triggerNode.parentNode
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneralSettings
