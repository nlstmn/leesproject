import React from "react"
import Nodata from "../../../common/noData"
import ProgressBar from "react-customizable-progressbar"

export default function Progress({ data }) {
  return (
    <div className="col-lg-12">
      {!data?.available ? (
        <Nodata></Nodata>
      ) : (
        <div
          className="donut-new donut-new-main campaign--status"
          style={{ height: "250px" }}
        >
          <ProgressBar
            radius={90}
            progress={data && data.stats && data.avg}
            strokeWidth={8}
            strokeColor={
              data && data.stats && data.avg <= 33
                ? "#bf1717"
                : data &&
                  data.stats &&
                  data.avg > 33 &&
                  data &&
                  data.stats &&
                  data.avg <= 66
                ? "#f5a04c"
                : "#119336"
            }
            strokeLinecap="square"
            trackStrokeColor="#70777a"
            trackStrokeWidth={5}
            transition="0.3s ease"
            initialAnimation={true}
          >
            <div className="indicator">
              <div>
                {data && data.stats && data.avg >= 0
                  ? data && data.stats && parseFloat(data.avg).toFixed(1)
                  : "0"}
                %
              </div>
            </div>
          </ProgressBar>
        </div>
      )}
    </div>
  )
}
