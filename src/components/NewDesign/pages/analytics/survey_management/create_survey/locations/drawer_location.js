import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const DrawerLocationSurvey = ({
  isLocationSurveyDrawer,
  setLocationSurveyDrawer,
  title,
}) => {
  const dispatch = useDispatch()
  const drawerData = useSelector((store) => store.setSurveySetupDrawerData.data)

  const dropdownQuestion = (item) => {
    return (
      <div className="col-lg-12">
        <div className="n__form_control">
          <label className="n__form_label">
            <span>{item?.label}</span>
            <div className="n__form_select">
              <select name="industry" id="industry">
                {item?.options?.map((option, index) => {
                  return (
                    <option value={option?.option_id}>{option?.label}</option>
                  )
                })}
              </select>
              <div className="icn cxv-expand-more-l-icn"></div>
            </div>
          </label>
        </div>
      </div>
    )
  }

  const textQuestion = (item) => {
    return (
      <div className="col-lg-12">
        <div className="n__form_control">
          <label className="n__form_label">
            <span>{item?.label}</span>
            <input type="text" name="name" className="n__form_input" />
          </label>
        </div>
      </div>
    )
  }

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
            {drawerData?.attributes?.map((item, index) => {
              return (
                <>
                  {item?.type === "dropdown"
                    ? dropdownQuestion(item)
                    : textQuestion(item)}
                </>
              )
            })}
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
