import React from "react"
import {
  VictoryBoxPlot,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory"
import PropTypes from "prop-types"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan
// ALL CHARTS: in tooltip, positivity scores should be to 1dp and with % sign

// To look like apex chart
class CustomTooltip extends React.Component {
  render() {
    const { datum, x, y, orientation } = this.props
    return (
      <>
        <g style={{ pointerEvents: "none" }}>
          <foreignObject x={x - 40} y={y - 50} width="210" height="90">
            <div
              className="range--chart-tooltip"
              xmlns="http://www.w3.org/1999/xhtml"
            >
              <div className="range--chart-title">{datum.x}</div>
              <div className="range--chart-content">
                <div className="range--chart-text-label">
                  Highest score: <strong>{datum.y[3]}%</strong>
                </div>
                <div className="range--chart-text-label">
                  Average score: <strong>{datum.y[2]}%</strong>
                </div>
                <div className="range--chart-text-label">
                  Lowest score: <strong>{datum.y[2]}%</strong>
                </div>
              </div>
            </div>
          </foreignObject>
        </g>
      </>
    )
  }
}

class RangeChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      series: [
        // (min, median, max, q1, q3)
        // İSTENİLEN CHART A UYARLAMA: lowest, lowest, average, high, high
        { x: "Planned meetings", y: [20.5, 45, 55, 60.5, 60.5] },
        { x: "Thinking/creative thinking", y: [0.5, 0.5, 25.5, 50.5, 50.5] },
        { x: "Relaxing/taking a break", y: [33.5, 33.5, 45.5, 57.5, 57.5] },
        { x: "Desk", y: [18.5, 18.5, 40.5, 62.5, 62.5] },
        { x: "General decor", y: [6.5, 6.5, 22.5, 38.5, 38.5] },
        {
          x: "Informal work areas/break-outzones",
          y: [48.5, 48.5, 69.5, 90.5, 90.5],
        },
        { x: "Meeting rooms (small)", y: [36.5, 36.5, 49.5, 62.5, 62.5] },
      ],
    }
  }

  render() {
    let data = this.state
    console.log(this.props)
    if (this.props.data && this.props.data.series) {
      let arr = []
      this.props.data.series.forEach((i) => {
        console.log(i)
        let score = parseInt(i.score)
        arr.push({
          x: i.heading,
          y: [score - 10, score - 5, score, score + 5, score + 10],
        })
      })
      data = {
        series: arr,
      }
    }

    return (
      <>
        <div className="range-victory responsive-_chart">
          <VictoryChart
            domainPadding={20}
            responsive={true}
            containerComponent={
              <VictoryVoronoiContainer
                style={{ fontSize: 5, padding: 5, fill: "#bbbec2" }}
                mouseFollowTooltips
                voronoiDimension="x"
                labels={true}
                labelComponent={
                  <VictoryTooltip
                    flyoutComponent={<CustomTooltip />}
                    // labelComponent={<VictoryLabel lineHeight={1.3}/>}
                    style={{ display: "none" }}
                    text={({ datum }) => [
                      `${datum.x}`,
                      `Highest score: ${datum.y[3]}%`,
                      `Average score: ${datum.y[2]}%`,
                      `Lowest score: ${datum.y[1]}%`,
                    ]}
                    // constrainToVisibleArea
                    // pointerOrientation="right"
                    // dy={0}
                    // dx={-12}
                    // centerOffset={{ x: 25 }}
                    // flyoutHeight={60}
                    // flyoutStyle={{ stroke: "transparent", strokeWidth: 0, fill: "#bbbec2", }}
                    // flyoutWidth={90}
                    // flyoutPadding={15}
                    // pointerLength={20}
                    // pointerWidth={25}
                    // cornerRadius={4}
                    // style={[
                    //   {fontSize: '5px'},
                    //   {fontSize: '5px'},
                    //   {fontSize: '5px'},
                    //   {fontSize: '5px'}
                    // ]}
                  />
                }
              />
            }
          >
            {/* Y EKSENİ */}
            <VictoryAxis
              crossAxis
              standalone={false}
              tickLabelComponent={<VictoryLabel angle={-25} textAnchor="end" />}
              style={{
                axis: { stroke: "#bbbec2" },
                axisLabel: { fontSize: 4, padding: 0 },
                grid: {
                  fill: "transparent",
                  stroke: "transparent",
                  pointerEvents: "auto",
                },
                ticks: {
                  fill: "#bbbec2",
                  size: 3,
                  stroke: "#bbbec2",
                  strokeWidth: 1,
                },
                tickLabels: { fontSize: 4, padding: 5, fill: "#bbbec2" },
              }}
            />

            {/* X EKSENİ */}
            <VictoryAxis
              dependentAxis
              crossAxis
              standalone={false}
              tickFormat={(t) => `${Math.round(t)}%`}
              label="% Positivity"
              style={{
                axis: { stroke: "transparent" },
                axisLabel: { fontSize: 5, padding: 15, fill: "#bbbec2" },
                grid: {
                  fill: "red",
                  stroke: "#3b3c3c",
                  pointerEvents: "none",
                },
                ticks: {
                  fill: "#bbbec2",
                  size: 0,
                  stroke: "#bbbec2",
                  strokeWidth: 1,
                },
                tickLabels: { fontSize: 5, padding: 0, fill: "#bbbec2" },
              }}
            />

            <VictoryBoxPlot
              labelComponent={
                <VictoryTooltip
                  flyoutComponent={<CustomTooltip />}
                  // pointerOrientation="right"
                  // dy={0}
                  // dx={-12}
                  // centerOffset={{ x: 25 }}
                  // flyoutHeight={60}
                  // flyoutStyle={{ stroke: "tomato", strokeWidth: 2 }}
                  // flyoutWidth={90}
                  // flyoutPadding={90}
                  // pointerLength={20}
                  // pointerWidth={25}
                  // cornerRadius={0}
                />
              }
              boxWidth={10}
              whiskerWidth={3}
              data={data.series}
              style={{
                min: { stroke: "#292b2b", strokeWidth: 0 },
                max: { stroke: "#292b2b", strokeWidth: 0 },
                q1: { fill: "white" },
                q3: { fill: "white" },
                median: { stroke: "#2793ff", strokeWidth: 2 },
                minLabels: { fill: "white" },
                maxLabels: { fill: "white" },
              }}
            />
          </VictoryChart>
        </div>
      </>
    )
  }
}

export default RangeChart
