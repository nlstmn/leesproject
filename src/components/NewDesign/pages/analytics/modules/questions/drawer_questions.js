import { Button, Drawer, Tree, Space } from "antd"
import React, { useState } from "react"
import CreateQuestion from "./create_question/index"

const DrawerQuestions = ({ isDrawerQuestions, setDrawerQuestions, title }) => {
  return (
    <>
      <Drawer
        className="filter_drawer small xll q_typee right_filter"
        title=""
        placement={"right"}
        onClose={() => setDrawerQuestions(false)}
        visible={isDrawerQuestions}
        extra={
          <Space>
            <Button onClick={() => setDrawerQuestions(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setDrawerQuestions(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setDrawerQuestions(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>

          <CreateQuestion />
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setDrawerQuestions(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setDrawerQuestions(false)}
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
