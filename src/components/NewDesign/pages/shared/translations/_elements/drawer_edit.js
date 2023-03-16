import { Button, Drawer, Tree, Space } from "antd"
import React, { useState } from "react"

const DrawerEditTranslation = ({
  isDrawerEditTranslation,
  setDrawerEditTranslation,
  title,
}) => {
  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setDrawerEditTranslation(false)}
        visible={isDrawerEditTranslation}
        extra={
          <Space>
            <Button onClick={() => setDrawerEditTranslation(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => setDrawerEditTranslation(false)}
            >
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setDrawerEditTranslation(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="col-lg-12">
            <div className="n__form_divider">
              <div className="n__divider"></div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <small>
                <strong>English translation:</strong> How much do you agree with
                the following statements about your organisation’s workplace
                (Workplace X / Other workplace)?
              </small>
              <br />
              <br />
              <small>
                <strong>Selected language translation:</strong> How much do you
                agree with the following statements about your organisation’s
                workplace (Workplace X / Other workplace)?
              </small>
            </div>

            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Language</span>
                  <div className="n__form_select">
                    <select name="industry" id="industry">
                      <option value="English (UK)">English (UK)</option>
                      <option value="Chinese (Hong Kong)">
                        Chinese (Hong Kong)
                      </option>
                      <option value="Czech">Czech</option>
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="flex_groups">
                <button className="btn-dash xss drop has-icn mr-4">
                  Add Organisation code
                  <span className="cxv-create-l-icn"></span>
                </button>
                <button className="btn-dash xss drop has-icn">
                  Add selected location code
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Edit selected language</span>
                  <textarea
                    type="text"
                    name="name"
                    className="n__form_input"
                    defaultValue="How much do you agree with the following statements about your organisation’s workplace (Workplace X / Other workplace)?"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setDrawerEditTranslation(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setDrawerEditTranslation(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerEditTranslation
