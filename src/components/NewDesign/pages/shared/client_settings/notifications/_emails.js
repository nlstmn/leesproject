import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState } from "react"

const DrawerEmails = ({ isEmailsDrawer, setEmailsDrawer, title }) => {
  const [isMenu, setMenu] = useState("Locations")

  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setEmailsDrawer(false)}
        visible={isEmailsDrawer}
        extra={
          <Space>
            <Button onClick={() => setEmailsDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setEmailsDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setEmailsDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            {/* ADD NEW */}
            <div className="col-lg-12">
              <div className="n__form_control input_has_btn">
                <label className="n__form_label">
                  <span>Add new email</span>

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
              <h5 className="d_sub_title">Added emails</h5>
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
                      defaultValue="a@example.com"
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
                      defaultValue="b@example.com"
                    />
                    <button className="iconic__btn" title="Delete">
                      <span className="iconx-minus1"></span>
                    </button>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setEmailsDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setEmailsDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerEmails
