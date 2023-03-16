import { Button, Drawer, Tree, Space } from "antd"
import React, { useState } from "react"

const DrawerSections = ({
  isDrawerSections,
  setDrawerSections,
  setDrawerAddItems,
  title,
}) => {
  return (
    <>
      <Drawer
        className="filter_drawer small right_filter"
        title=""
        placement={"right"}
        onClose={() => setDrawerSections(false)}
        visible={isDrawerSections}
        extra={
          <Space>
            <Button onClick={() => setDrawerSections(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setDrawerSections(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setDrawerSections(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>

            <div className="col-lg-12 mb-3">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Section name</span>
                  <input type="text" name="name" className="n__form_input" />
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>
            <div className="col-lg-12 title_with_button">
              <h5 className="d_sub_title">Selected pages</h5>

              <button onClick={() => setDrawerAddItems(true)} className="new_l">
                <span className="iconx-plus1"></span> Add new page
              </button>
            </div>

            <div className="col-lg-12 mt-4">
              <div className="n__added_list">
                <ul>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    DEMOGRAPHICS
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    ACTIVITYQUESTION1
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    AVERAGETIME
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    LOCATION
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    EXTERNALMOBILITY
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    OFFICEWORKSETTING
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    INTERNALMOBILITY
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setDrawerSections(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setDrawerSections(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerSections
