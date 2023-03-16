import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class SparklineDefaultchart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          type: "bar",
          width: 51,
          height: 35,
          sparkline: {
            enabled: true,
          },
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: false,
          },
        },
        colors: ["#77797C"],
        plotOptions: {
          bar: {
            columnWidth: "40%",
          },
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        xaxis: {
          crosshairs: {
            width: 0,
          },
        },
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          marker: {
            show: false,
          },
        },
      },
      series: [
        {
          data: [5, 3, 7, 8, 6, 1, 4, 9],
        },
      ],
    }
  }
  render() {
    return (
      <ReactApexChart
        className="mb-point-c"
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height={35}
        width={51}
      />
    )
  }
}

export default SparklineDefaultchart
