import React from "react"

const Chart = ({ respondents }) => {
  return (
    <div className="stacked_column main">
      {respondents.map((item) => {
        return (
          <>
            <div
              style={{
                left: "0%",
                width: respondents[0] + "%",
                backgroundColor: "#CC0000",
              }}
              className={`column`}
            ></div>
            <div
              style={{
                left: respondents[0] + "%",
                width: respondents[1] + "%",
                backgroundColor: "#FD5F1E",
              }}
              className={`column`}
            ></div>
            <div
              style={{
                left: respondents[0] + respondents[1] + "%",
                width: respondents[2] + "%",
                backgroundColor: "#FD9D04",
              }}
              className={`column`}
            ></div>
            <div
              style={{
                left: respondents[0] + respondents[1] + respondents[2] + "%",
                width: respondents[3] + "%",
                backgroundColor: "#66DB33",
              }}
              className={`column`}
            ></div>
            <div
              style={{
                left:
                  respondents[0] +
                  respondents[1] +
                  respondents[2] +
                  respondents[3] +
                  "%",
                width: respondents[4] + "%",
                backgroundColor: "#33A700",
              }}
              className={`column`}
            ></div>
            <div
              style={{
                left:
                  respondents[0] +
                  respondents[1] +
                  respondents[2] +
                  respondents[3] +
                  respondents[4] +
                  "%",
                width: respondents[5] + "%",
                backgroundColor: "#007500",
              }}
              className={`column`}
            ></div>
          </>
        )
      })}
    </div>
  )
}

export default Chart
