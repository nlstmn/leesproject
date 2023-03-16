import React from "react"

const BasicBarColumn = ({ demographics }) => {
  return (
    <div className="horizontal_bar_chart for_table">
      <div className="item">
        <div className="bar_section">
          <div className="bar_container">
            <div style={{ width: demographics + "%" }} className="bar"></div>
            <div style={{ left: demographics + "%" }} className="bar_result">
              {demographics}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicBarColumn
