import React from "react"

const Chart = ({ text }) => {
  return (
    <span
      className={`heatmap__block 
            ${text >= 0 && text <= 20 ? " aa1" : ""}
            ${text > 20 && text <= 40 ? " aa2" : ""}
            ${text > 40 && text <= 60 ? " aa3" : ""}
            ${text > 60 && text <= 80 ? " aa4" : ""}
            ${text > 80 ? " aa5" : ""}
            ${text === null ? " aa6" : ""}
            `}
    >
      {text === null ? "–" : text + "%"}
    </span>
  )
}

export default Chart
