import { Button, Drawer, Tree, Space } from "antd"
import React, { useState } from "react"

const DrawerDependency = ({
  isDrawerDependency,
  setDrawerDependency,
  title,
}) => {
  return (
    <>
      <Drawer
        className="filter_drawer small xll maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setDrawerDependency(false)}
        visible={isDrawerDependency}
        extra={
          <Space>
            <Button onClick={() => setDrawerDependency(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setDrawerDependency(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setDrawerDependency(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <h5 className="d_sub_title">???</h5>
            </div>
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n_input_control has_icon in_drawer_small">
                <span className="cxv-search-l-icn icn"></span>
                <input
                  placeholder="Search..."
                  type="text"
                  className="n_input"
                  id="find-box"
                ></input>
              </div>
            </div>

            <div className="col-lg-12 mt-4">ACTIONS</div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setDrawerDependency(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setDrawerDependency(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerDependency
