import { Button, Drawer, Tree, Space } from "antd"
import React, { useState } from "react"

const DrawerPages = ({
  isDrawerPages,
  setDrawerPages,
  setDrawerAddItems,
  title,
}) => {
  return (
    <>
      <Drawer
        className="filter_drawer small right_filter"
        title=""
        placement={"right"}
        onClose={() => setDrawerPages(false)}
        visible={isDrawerPages}
        extra={
          <Space>
            <Button onClick={() => setDrawerPages(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setDrawerPages(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setDrawerPages(false)}
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

            <div className="col-lg-6 mb-3">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Page title</span>
                  <input type="text" name="name" className="n__form_input" />
                </label>
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Page title</span>
                  <input type="text" name="name" className="n__form_input" />
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Popup message</span>
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
              <h5 className="d_sub_title">Selected questions</h5>

              <button onClick={() => setDrawerAddItems(true)} className="new_l">
                <span className="iconx-plus1"></span> Add new question
              </button>
            </div>

            <div className="col-lg-12 mt-4">
              <div className="n__added_list">
                <ul>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    Which of your organisation’s workplaces is the most
                    important for your work?
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    Role
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    Department
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    Employment type
                  </li>
                  <li>
                    <button className="icon__btn" title="Delete">
                      <span className="cxv-delete-l-icn clients_table_drop"></span>
                    </button>{" "}
                    Time with organisation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setDrawerPages(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setDrawerPages(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerPages
