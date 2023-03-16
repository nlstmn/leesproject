import React from "react"

const Chart = ({ supported }) => {
  return (
    <div className="dumbbell_column">
      <>
        <div
          style={{
            left:
              (supported[0] > supported[1] ? supported[1] : supported[0]) -
              5 +
              "%",
          }}
          className="left result"
        >
          {supported[0]}%
        </div>

        <div
          style={{ left: supported[0] + "%" }}
          className="circle purple"
        ></div>
        <div
          style={{ left: supported[1] + "%" }}
          className="circle green"
        ></div>
        <div
          style={{ left: supported[2] + "%" }}
          className="circle orange"
        ></div>

        <div
          style={{ left: supported[0] + "%", right: 100 - supported[2] + "%" }}
          className="line"
        ></div>

        <div
          style={{
            left:
              (supported[2] > supported[1] ? supported[2] : supported[1]) +
              2.5 +
              "%",
          }}
          className="right result"
        >
          94.6%
        </div>
      </>
    </div>
  )
}

export default Chart
