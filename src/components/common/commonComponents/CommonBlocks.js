import React from "react"
import ImportExport from "../ImportExport"
import BasicBar from "../charts/basicBar"
import HeatMapChart from "../charts/heatMapChart"
import StackedChart from "../charts/stackedChart"
import RangeChart from "../charts/rangeChart"
import GroupedBar from "../charts/groupedBar"
import SpiderChart from "../charts/spiderChart"
import Loader from "../Loader"
import IndividualChartSection from "../../Client/campaignSpecificDashboards/components/IndividualSection"
import CombinedChart from "../charts/combinedChart"
export const Steps = (props) => {
  const dots = []
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i
    dots.push(
      <span
        key={`step-${i}`}
        className={`step-_dot ${isActive ? "step-_active" : ""}`}
        title="Dot of step"
        onClick={(e) => e.stopPropagation()}
      >
        &bull;
      </span>
    )
  }

  return (
    <div className="step-_nav" aria-hidden="true">
      {dots}
    </div>
  )
}
export const AuthSvg = () => {
  return (
    <svg
      id="leesmanInsideLogo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72.23 73.91"
    >
      <title id="leesmanInsideLogo">Leesman Inside Logo</title>
      <desc id="leesmanInsideLogo">
        If clicked, it will go to the Login page.
      </desc>
      <defs></defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className="cls-1"
            d="M65.45,57.14a36.09,36.09,0,1,0-12.76,11L66.6,73.91Z"
          />
          <g id="_4" data-name="4">
            <circle
              className="cls-2"
              cx="36.12"
              cy="36.12"
              r="5.02"
              transform="translate(-14.96 36.12) rotate(-45)"
            />
            <circle
              className="cls-2"
              cx="55.99"
              cy="36.12"
              r="5.02"
              transform="translate(-9.14 50.17) rotate(-45)"
            />
          </g>
          <g id="_4-2" data-name="4">
            <circle
              className="cls-2"
              cx="16.24"
              cy="36.12"
              r="5.02"
              transform="translate(-20.78 22.06) rotate(-45)"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export const campaignFilter = (
  module,
  basicBarData,
  heatData,
  rates,
  trends,
  setBasicBufferData,
  setHeatBufferData,
  setBufferRates,
  setBufferTrends
) => {
  let indexes = []
  indexes = basicBarData?.sections?.map((i, index) => {
    if (i === module) {
      return index
    }
  })
  indexes = indexes.filter((i) => i)
  let data = {
    categories: basicBarData.categories.filter((i, id) => indexes.includes(id)),
    series: basicBarData.series.filter((i, id) => indexes.includes(id)),
    distribution: Array.apply(null, Array(5)).map((i, index) => {
      return basicBarData.distribution[index].filter((i, id) =>
        indexes.includes(id)
      )
    }),
    responses: basicBarData.responses.filter((i, id) => indexes.includes(id)),
  }
  let dataHeat = {
    categories: heatData.categories,
    series: heatData.series.filter((i, id) => indexes.includes(id)),
  }
  let dataRates = {
    series: rates.questions.filter((i, id) => indexes.includes(id)),
  }
  let dataTrends = trends.filter((i) => i.section_label === module)
  setBasicBufferData(data)
  setHeatBufferData(dataHeat)
  setBufferRates(dataRates)
  setBufferTrends(dataTrends)
}

export const campaignCommentsSearchPart = (
  bufferCommentData,
  query,
  setQuery
) => {
  return (
    <div className="page-__header d-flex">
      <ImportExport
        data={bufferCommentData}
        export={true}
        import={false}
        type={`all_campaign_comments`}
      />
      <div className="input-group ml-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-search"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        {/* yeni arama */}
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          placeholder="Search"
        />
      </div>
    </div>
  )
}

export const campaignCommonPart = (
  chartType,
  loading,
  orderBy,
  basicBufferData,
  heatBufferData,
  bufferRates,
  bufferTrends
) => {
  return (
    <div className="col-lg-9 pt-20 scrollable-_charts">
      {chartType === "individual-chart" ? (
        <IndividualChartSection data={bufferTrends} />
      ) : (
        ""
      )}
      {chartType === "combined-chart" ? (
        <CombinedChart data={bufferTrends} />
      ) : (
        ""
      )}
      {/* Campaign Breakdown Charts */}
      {chartType === "bar-chart" ? (
        loading ? (
          <Loader></Loader>
        ) : (
          <BasicBar orderBy={orderBy} data={basicBufferData} />
        )
      ) : (
        ""
      )}
      {chartType === "stacked-chart" ? (
        !loading ? (
          <StackedChart orderBy={orderBy} data={basicBufferData} />
        ) : (
          <Loader></Loader>
        )
      ) : (
        ""
      )}
      {/* Internal Comparison Charts */}
      {chartType === "heat-map" ? <HeatMapChart data={heatBufferData} /> : ""}
      {chartType === "range-scores" ? <RangeChart data={bufferRates} /> : ""}
      {/* External Comparison Charts */}
      {chartType === "grouped-bar" ? <GroupedBar /> : ""}
      {chartType === "spider-chart" ? <SpiderChart /> : ""}
    </div>
  )
}
export const campaignSectionAll = (
  basicBarData,
  heatData,
  rates,
  trends,
  setBasicBufferData,
  setHeatBufferData,
  setBufferRates,
  setBufferTrends
) => {
  setBasicBufferData(basicBarData)
  setHeatBufferData(heatData)
  setBufferRates(rates)
  setBufferTrends(trends)
}
