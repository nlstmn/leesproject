import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

class donutChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [0],
      options: {
        chart: {
          type: "donut",
          width: 200,
          events: {
            dataPointSelection: function (event, chartContext, config) {
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
          },
          animations: {
            enabled: true,
          },
        },
        legend: {
          show: false,
          enabled: false,
        },
        plotOptions: {
          pie: {
            size: 200,
            startAngle: 0,
            endAngle: 360,
            expandOnClick: false,
            donut: {
              size: "88%",
              background: "transparent",
            },
            // customScale: 0.8
          },
        },
        dataLabels: {
          enabled: false,
          show: false,
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
        colors: ["#119336", "#63B450", "#FFE054", "#e95c0c", "#bf1717"],
        labels: [
          "Very positive",
          "Positive",
          "Neutral",
          "Negative",
          "Very negative",
        ],

        // Very positive → #bf1717 red
        // Positive → #e95c0c orange
        // Neutral → #FFE054 yellow
        // Negative → #63B450 green
        // Very negative → #119336 dark green
      },
    }
  }

  render() {
    return (
      <div id="chart" className="donut--chart mb-point-c">
        <ReactApexChart
          options={this.state.options}
          series={this.props.data ? this.props.data : this.state.series}
          type="donut"
          height="225px"
        />
      </div>
    )
  }
}

export default donutChart
