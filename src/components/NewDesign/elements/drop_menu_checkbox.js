import React, { useState, useRef, useEffect } from "react"

const DropMenuCheckbox = ({
  data,
  setTopSelectFlag,
  isTopSelectFlag,
  isComparison,
  setDatasetModal,
}) => {
  // Top Select Functions
  const [isTopSelect, setTopSelect] = useState(false)
  // Top Select Functions

  return (
    <>
      {isTopSelect && isTopSelectFlag === data.label ? (
        <div
          onClick={() => setTopSelect(false)}
          className="n_modal_bg trans"
        ></div>
      ) : (
        <></>
      )}

      <div
        className={`drop_dash_container ${
          isTopSelect && isTopSelectFlag === data.label ? " show" : ""
        } ${isComparison && isComparison ? " comparison" : ""}`}
        key={data.key}
      >
        <button
          className="btn-dash drop has-icn drop_check_item"
          onClick={() => {
            setTopSelect(isTopSelectFlag === data.label ? !isTopSelect : true)
            setTopSelectFlag(data.label)
          }}
        >
          {data.label}
          <span className="cxv-expand-more-l-icn"></span>
        </button>
        <div className="drop_dash-menu">
          <div className="drop_dash-search">
            <span className="cxv-search-l-icn icn"></span>
            <input type="text" placeholder="Search" />

            {isComparison && isComparison ? (
              <button
                onClick={() => setDatasetModal(true)}
                className="btn-dash-export"
              >
                <span className="cxv-create-new-group-l-icn"></span>
              </button>
            ) : (
              <></>
            )}
          </div>
          <ul className="drop_dash_items">
            {data.options.map((item, i, arr) => (
              <li>
                <label className="dashboard_check">
                  <input type="checkbox" name={data.label} value={item} />
                  <span className="label-_text">{item}</span>
                  <span className="checkmark"></span>
                </label>
              </li>
            ))}
          </ul>
          <button
            className="btn-dash dark float-right"
            onClick={() => setTopSelect(false)}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  )
}

export default DropMenuCheckbox
