import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState } from "react"

const DrawerLocation = ({ isLocationDrawer, setLocationDrawer, title }) => {
  const [isMenu, setMenu] = useState("Locations")

  return (
    <>
      <Drawer
        className="filter_drawer small right_filter"
        title=""
        placement={"right"}
        onClose={() => setLocationDrawer(false)}
        visible={isLocationDrawer}
        extra={
          <Space>
            <Button onClick={() => setLocationDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setLocationDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setLocationDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <div className="n_menu_horizontal top">
                <a
                  onClick={() => setMenu("Locations")}
                  href="#!"
                  className={`${isMenu === "Locations" ? " active" : ""} `}
                >
                  Locations
                </a>
                <a
                  onClick={() => setMenu("Floors")}
                  href="#!"
                  className={`${isMenu === "Floors" ? " active" : ""} `}
                >
                  Floors
                </a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>

            {isMenu === "Locations" ? (
              <>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Location name</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Region</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Country</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>City</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Postcode</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Number of floor</span>
                      <input
                        type="number"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Building location</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Building style</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Occupancy status</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Occupancy mix</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Total area (m2)</span>
                      <input
                        type="number"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Date of organisation moved in</span>
                      <div className="n_calendar_select">
                        <DatePicker
                          format={"DD / MM / YYYY"}
                          getCalendarContainer={(triggerNode) => {
                            return triggerNode.parentNode
                          }}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* ADD NEW */}
                <div className="col-lg-12">
                  <div className="n__form_control input_has_btn">
                    <label className="n__form_label">
                      <span>Add new floor</span>

                      <div className="group">
                        <input
                          type="text"
                          name="name"
                          className="n__form_input"
                          placeholder="Floor label..."
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
                  <h5 className="d_sub_title">Added floors</h5>
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
                          defaultValue="Floor 1..."
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
                          defaultValue="Floor 2..."
                        />
                        <button className="iconic__btn" title="Delete">
                          <span className="iconx-minus1"></span>
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setLocationDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setLocationDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerLocation
