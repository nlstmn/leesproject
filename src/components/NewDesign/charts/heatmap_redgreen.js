import React from "react"

const Chart = ({ text }) => {
  return (
    <span
      className={`heatmap__block 
            ${text >= 0 && text <= 33 ? " bb1" : ""}
            ${text > 33 && text <= 66 ? " bb2" : ""}
            ${text > 66 ? " bb3" : ""}
            `}
    >
      {text === null ? "–" : text + "%"}
    </span>
  )
}

export default Chart
