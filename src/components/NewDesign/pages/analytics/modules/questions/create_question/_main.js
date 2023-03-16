import React from "react"
import { Popover } from "antd"
import {
  DropdownContent,
  CheckboxContent,
  RadioContent,
  SliderContent,
  ScaleContent,
  CustomContent,
  MainOtherContent,
  CommentContent,
  PercentageContent,
} from "./_info_contents"

const EditQMain = ({ checkedQType, setQType }) => {
  return (
    <>
      <div className="col-lg-12">
        <h3 className="d_sub_title mt-0 mb-4">Question type & label</h3>

        <div className="un_flex_groups">
          <Popover content={DropdownContent} overlayClassName="maxt">
            <input
              className="checkbox_qq"
              type="radio"
              name="qtype"
              id="Dropdown"
              onChange={() => setQType("Dropdown")}
              checked={checkedQType === "Dropdown"}
            />
            <label className="for_checkbox_qq" for="Dropdown">
              <i className="mateo__qdd"></i>
              Dropdown
            </label>
          </Popover>
          <Popover content={CheckboxContent} overlayClassName="maxt">
            <input
              className="checkbox_qq"
              type="radio"
              name="qtype"
              id="Checkbox"
              onChange={() => setQType("Checkbox")}
              checked={checkedQType === "Checkbox"}
            />
            <label className="for_checkbox_qq" for="Checkbox">
              <i className="mateo__qchb"></i>
              Checkbox select
            </label>
          </Popover>
          <Popover content={RadioContent} overlayClassName="maxt">
            <input
              className="checkbox_qq"
              type="radio"
              name="qtype"
              id="Radio"
              onChange={() => setQType("Radio")}
              checked={checkedQType === "Radio"}
            />
            <label className="for_checkbox_qq" for="Radio">
              <i className="mateo__qmc"></i>
              Radio select
            </label>
          </Popover>
          <Popover content={SliderContent} overlayClassName="maxt">
            <input
              className="checkbox_qq"
              type="radio"
              name="qtype"
              id="Slider"
              onChange={() => setQType("Slider")}
              checked={checkedQType === "Slider"}
            />
            <label className="for_checkbox_qq" for="Slider">
              <i className="mateo__qsl"></i>
              Slider
            </label>
          </Popover>
          <Popover content={ScaleContent} overlayClassName="maxt">
            <input
              className="checkbox_qq"
              type="radio"
              name="qtype"
              id="Scale"
              onChange={() => setQType("Scale")}
              checked={checkedQType === "Scale"}
            />
            <label className="for_checkbox_qq" for="Scale">
              <i className="mateo__qmx"></i>
              Table / Scale
            </label>
          </Popover>
          <Popover content={CustomContent} overlayClassName="maxt">
            <input
              className="checkbox_qq"
              type="radio"
              name="qtype"
              id="Custom"
              onChange={() => setQType("Custom")}
              checked={checkedQType === "Custom"}
            />
            <label className="for_checkbox_qq" for="Custom">
              <i className="mateo__qmd"></i>
              Table / Custom
            </label>
          </Popover>
          <Popover content={MainOtherContent} overlayClassName="maxt">
            <input
              className="checkbox_qq"
              type="radio"
              name="qtype"
              id="MainOther"
              onChange={() => setQType("MainOther")}
              checked={checkedQType === "MainOther"}
            />
            <label className="for_checkbox_qq" for="MainOther">
              <i className="mateo__qmt"></i>
              Main / Other mode
            </label>
          </Popover>
          <Popover content={CommentContent} overlayClassName="maxt">
            <input
              className="checkbox_qq"
              type="radio"
              name="qtype"
              id="Comment"
              onChange={() => setQType("Comment")}
              checked={checkedQType === "Comment"}
            />
            <label className="for_checkbox_qq" for="Comment">
              <i className="mateo__qcb"></i>
              Comment box
            </label>
          </Popover>
          <Popover content={PercentageContent} overlayClassName="maxt">
            <input
              className="checkbox_qq"
              type="radio"
              name="qtype"
              id="Percentage"
              onChange={() => setQType("Percentage")}
              checked={checkedQType === "Percentage"}
            />
            <label className="for_checkbox_qq" for="Percentage">
              <i className="mateo__qrk"></i>
              Percentage
            </label>
          </Popover>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="n__form_control">
          <label className="n__form_label">
            <span>Question label</span>
            <input
              type="text"
              name="name"
              className="n__form_input"
              style={{ minHeight: "35px", maxWidth: "640px" }}
            />
          </label>
        </div>
      </div>

      <div className="col-lg-12 mt-3">
        <div className="n__form_divider">
          <div className="n__divider"></div>
        </div>
      </div>
    </>
  )
}
export default EditQMain
