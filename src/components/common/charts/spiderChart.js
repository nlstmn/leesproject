import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class SpiderChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "Collaboration campaign",
          data: [80, 50, 30, 40, 100, 20],
        },
        {
          name: "Leesman Office Benchmark",
          data: [20, 30, 40, 80, 20, 80],
        },
        {
          name: "Leesman+",
          data: [44, 76, 78, 13, 43, 10],
        },
      ],
      options: {
        chart: {
          height: 500,
          type: "radar",
          dropShadow: {
            enabled: false,
            blur: 1,
            left: 1,
            top: 1,
          },
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: false,
          },
        },
        plotOptions: {
          radar: {
            size: 250,
            polygons: {
              strokeColors: "#e9e9e9",
              fill: {
                colors: ["#f8f8f8", "#fff"],
              },
            },
          },
        },
        stroke: {
          width: 2,
        },
        fill: {
          opacity: 0.5,
          colors: ["#41b9ff", "#f5a04c", "#2793ff"],
        },
        markers: {
          size: 2,
          colors: ["#f8f8f8"],
          strokeColor: "#fff",
          strokeWidth: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " %"
            },
          },
        },
        xaxis: {
          categories: [
            "Individual focused work, desk based",
            "Planned meetings",
            "Thinking/creative thinking",
            "Relaxing/taking a break",
            "Desk",
            "Learning from others",
          ],
          labels: {
            style: {
              colors: ["white"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro,sans-serif",
              fontWeight: 400,
            },
          },
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: "black",
              fontSize: "14px",
              fontFamily: "Source Sans Pro,sans-serif",
              fontWeight: 400,
            },
          },
        },
        colors: ["#41b9ff", "#f5a04c", "#2793ff"],
      },
    }
  }

  render() {
    return (
      <div id="chart" className="mb-point-c responsive-_chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radar"
          height="600px"
        />
      </div>
    )
  }
}

export default SpiderChart
