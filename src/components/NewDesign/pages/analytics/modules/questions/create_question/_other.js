import React, { useState } from "react"
import { Popover } from "antd"
import { DropdownAContent, ScaleContentB } from "./_info_contents"

const EditQOther = ({ checkedQType, setQType }) => {
  const [isOtherOnes, setOtherOnes] = useState(false)

  return (
    <>
      <div className="col-lg-12">
        <h3 className="d_sub_title">Other settings</h3>
      </div>

      {checkedQType === "Dropdown" && (
        <>
          <div className="col-lg-12">
            <Popover content={DropdownAContent} overlayClassName="maxt">
              <div
                className="n__form_control pr"
                style={{ width: "max-content" }}
              >
                <span className="iconx-info-with-circle"></span>
                <label className="n__form_label dashboard_check">
                  <input type="checkbox" name="Additional" value="Additional" />
                  <span className="label-_text">
                    Set as Additional question
                  </span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </Popover>
          </div>
        </>
      )}

      {checkedQType === "Checkbox" && (
        <>
          <div className="col-lg-12">
            <div className="n__form_control pr">
              <label className="n__form_label dashboard_check">
                <input
                  type="checkbox"
                  name="OtherOnes"
                  value="OtherOnes"
                  onChange={() => setOtherOnes(!isOtherOnes)}
                />
                <span className="label-_text">
                  Add an option to disable other selected ones
                </span>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>

          {isOtherOnes && (
            <div className="col-lg-12">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Option label</span>
                  <input
                    type="text"
                    name="name"
                    className="n__form_input"
                    style={{ maxWidth: "640px" }}
                  />
                </label>
              </div>
            </div>
          )}
        </>
      )}

      {checkedQType === "Scale" && (
        <>
          <div className="col-lg-12">
            <Popover content={ScaleContentB} overlayClassName="maxt">
              <div
                className="n__form_control pr"
                style={{ width: "max-content" }}
              >
                <span className="iconx-info-with-circle"></span>
                <label className="n__form_label dashboard_check">
                  <input type="checkbox" name="X" value="X" />
                  <span className="label-_text">
                    Add 'feature is not provided (X)' column
                  </span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </Popover>
          </div>
          <div className="col-lg-12">
            <div
              className="n__form_control pr"
              style={{ width: "max-content" }}
            >
              <label className="n__form_label dashboard_check">
                <input type="checkbox" name="X" value="X" />
                <span className="label-_text">Add '0 = Neutral' column</span>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          <div className="col-lg-12">
            <div
              className="n__form_control pr"
              style={{ width: "max-content" }}
            >
              <label className="n__form_label dashboard_check">
                <input type="checkbox" name="X" value="X" />
                <span className="label-_text">Add '-3...+3' columns</span>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </>
      )}

      {checkedQType === "Custom" && (
        <>
          {/* ADD NEW */}
          <div className="col-lg-12">
            <h3 className="d_sub_title mt-0">Question columns</h3>

            <div className="n__form_control input_has_btn">
              <label className="n__form_label">
                <span>Add new</span>

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
            <h5 className="d_sub_title">Added columns</h5>
          </div>

          {/* ADDED ITEMS */}
          {/* Item 1 */}
          <div className="col-lg-12">
            <div className="n__form_control input_has_btn">
              <label className="n__form_label">
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    className="n__form_input"
                    defaultValue="Columns 1"
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
                    defaultValue="Columns 2"
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
    </>
  )
}
export default EditQOther
