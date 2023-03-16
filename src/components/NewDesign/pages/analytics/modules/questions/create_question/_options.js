import React from "react"

const EditQOptions = ({ checkedQType, setQType }) => {
  return (
    <>
      {/* ADD NEW */}
      <div className="col-lg-12">
        <h3 className="d_sub_title">Question options</h3>

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
        <h5 className="d_sub_title">Added options</h5>
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
                defaultValue="Option 1"
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
                defaultValue="Option 2"
              />
              <button className="iconic__btn" title="Delete">
                <span className="iconx-minus1"></span>
              </button>
            </div>
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
export default EditQOptions
