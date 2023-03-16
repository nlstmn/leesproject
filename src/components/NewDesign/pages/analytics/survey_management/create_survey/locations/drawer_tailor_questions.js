import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState } from "react"

const DrawerTailorLocationQuestions = ({
  isTailorLocationDrawer,
  setTailorLocationDrawer,
  title,
}) => {
  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setTailorLocationDrawer(false)}
        visible={isTailorLocationDrawer}
        extra={
          <Space>
            <Button onClick={() => setTailorLocationDrawer(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => setTailorLocationDrawer(false)}
            >
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setTailorLocationDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Tailored location group question</span>
                  <textarea
                    type="text"
                    name="name"
                    className="n__form_input"
                    defaultValue="What region are you primarily based in?"
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
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Tailored floor question</span>
                  <textarea
                    type="text"
                    name="name"
                    className="n__form_input"
                    defaultValue="What floor do you primarily work on?"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setTailorLocationDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setTailorLocationDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerTailorLocationQuestions
