import React from "react"

const Chart = ({ data }) => {
  return (
    <div className="range_bar_chart">
      <div className="bar_section">
        {data.map((item) => (
          <div className="item">
            <div className={`label ${item.label_color} `}>{item.label}</div>
            <div className="bar_container">
              <div className="bar_line"></div>
              <div
                style={{
                  height: `${item.bar_height}%`,
                  bottom: `${item.bar_bottom}%`,
                }}
                className={`bar ${item.bar_color} `}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="data_label_section">
        <ul>
          {data.map((item) => (
            <li>
              <span className={`marker ${item.legend_color} `}></span>{" "}
              {item.legend_label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Chart
