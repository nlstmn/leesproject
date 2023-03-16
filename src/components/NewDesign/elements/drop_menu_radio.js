import React, { useState, useRef, useEffect } from "react"

const DropMenuRadio = ({ data, setTopSelectFlag, isTopSelectFlag }) => {
  // Top Select Functions
  const [isTopSelect, setTopSelect] = useState(false)
  // Top Select Functions

  const ref_drop_radio_item = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.classList.contains("drop_radio_item")) {
        setTopSelect(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [setTopSelect])

  return (
    <>
      <div
        className={`drop_dash_container ${
          isTopSelect && isTopSelectFlag === data.label ? " show" : ""
        } `}
        key={data.key}
      >
        <button
          className="btn-dash drop has-icn drop_radio_item"
          onClick={() => {
            setTopSelect(isTopSelectFlag === data.label ? !isTopSelect : true)
            setTopSelectFlag(data.label)
          }}
          ref={ref_drop_radio_item}
        >
          {data.label}
          <span className="cxv-expand-more-l-icn"></span>
        </button>
        <div className="drop_dash-menu">
          <div className="drop_dash-search">
            <span className="cxv-search-l-icn icn"></span>
            <input type="text" placeholder="Search" />
          </div>
          <ul className="drop_dash_items">
            {data.options.map((item, i, arr) => (
              <li>
                <label className="dashboard_radio">
                  <input type="radio" name={data.label} value={item} />
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

export default DropMenuRadio
