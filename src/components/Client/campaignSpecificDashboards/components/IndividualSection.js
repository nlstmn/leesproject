import React from "react"
import IndividualChart from "../../../common/charts/individualChart"

// Different bands to show length of campaign cycle

const IndividualSection = ({ data }) => {
  console.log(data)
  return (
    <>
      <div className="row">
        {data?.map((i, index) => {
          return (
            <div className="col-lg-4 col-md-4 col-xs-12">
              <IndividualChart
                key={index}
                title={i.title}
                series={i.series}
                categories={i.categories}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
export default IndividualSection
