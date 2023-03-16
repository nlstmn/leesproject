import React from "react"

const Chart = ({ value, row, index, isItemNumber }) => {
  return (
    <>
      {isItemNumber === 3 ? (
        <span
          className={`heatmap_radial_block 
            ${index === 0 ? " aa44" : ""}
            ${index === 1 ? " aa11" : ""}
            ${index === 2 ? " aa22" : ""}
            `}
        >
          <div className="heat_color"></div>

          {value}
        </span>
      ) : isItemNumber === 4 ? (
        <span
          className={`heatmap_radial_block 
            ${index === 0 ? " aa11" : ""}
            ${index === 1 ? " aa22" : ""}
            ${index === 2 ? " aa33" : ""}
            ${index === 3 ? " aa44" : ""}
            `}
        >
          <div className="heat_color"></div>

          {value}
        </span>
      ) : (
        <span
          className={`heatmap_radial_block 
            ${index === 0 ? " aa1" : ""}
            ${index === 1 ? " aa2" : ""}
            ${index === 2 ? " aa3" : ""}
            ${index === 3 ? " aa4" : ""}
            ${index === 4 ? " aa5" : ""}
            ${index === 5 ? " aa6" : ""}
            `}
        >
          <div className="heat_color"></div>

          {value}
        </span>
      )}
    </>
  )
}

export default Chart
