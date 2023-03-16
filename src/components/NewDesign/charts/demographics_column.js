import React from "react"

const Chart = ({ demographics }) => {
  return (
    <div className="stacked_column demog">
      {demographics.map((item) => {
        return (
          <>
            <div
              style={{
                left: "0%",
                width: demographics[0] + "%",
                backgroundColor: "#91BEFB",
              }}
              className={`column`}
            ></div>
            <div
              style={{
                left: demographics[0] + "%",
                width: demographics[1] + "%",
                backgroundColor: "#2B5895",
              }}
              className={`column`}
            ></div>
            <div
              style={{ left: demographics[0] + demographics[1] + 2 + "%" }}
              className="demog_result"
            >
              {demographics[0] + demographics[1]}%
            </div>
          </>
        )
      })}
    </div>
  )
}

export default Chart
