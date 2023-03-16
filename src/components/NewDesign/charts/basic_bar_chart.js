import React from "react"

const Chart = ({ data }) => {
  return (
    <div className="horizontal_bar_chart">
      {/* { id: 1, label: "Assigned work setting", bar_width:75, legend_label:"Lmi", legend_color:"red", legend_value:58.2 } */}

      {data.map((item, index) => (
        <div className="item">
          <div className="label">
            <span>{item.label}</span>
          </div>
          <div className="bar_section">
            <div className="bar_container">
              <div
                style={{ width: `${item.bar_width}%` }}
                className="bar"
              ></div>
              <div
                style={{ left: `${item.bar_width}%` }}
                className="bar_result"
              >
                {item.bar_width}%
              </div>
            </div>
          </div>
          <div className="result has_title">
            <div className="result_container">
              {index === 0 ? (
                <span className="title">{item.legend_label}</span>
              ) : (
                <></>
              )}
              <span className={`results ${item.legend_color} `}>
                {item.legend_value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chart
