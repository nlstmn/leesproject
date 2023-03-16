import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan
// ALL CHARTS: in tooltip, positivity scores should be to 1dp and with % sign

class GroupedBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "Collaboration campaign",
          data: [44, 55, 41, 64, 22, 43, 21, 44, 55, 41, 64, 22, 43],
        },
        {
          name: "Baseline survey",
          data: [53, 32, 33, 52, 13, 44, 32, 53, 32, 33, 52, 13, 44],
        },
      ],
      options: {
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          type: "bar",
          height: 830,
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
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        colors: ["#fff", "#2793ff"],
        dataLabels: {
          enabled: false,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["#fff"],
        },
        fill: {
          opacity: 1,
          type: "solid",
        },
        xaxis: {
          categories: [
            "Indivldual focused work, desk based",
            "Planned meetings",
            "Thinking/creative thinking",
            "Relaxing/taking a break ",
            "Desk",
            "Learning from others",
            "General decor",
            "Informal oork areas/break-outzones",
            "Meeting rooms (small)",
            "Toilets/W.C.",
            "Tea, coffee & other refreshment facilities",
            "General tidiness",
            "Noise levels",
          ],
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
        },
        yaxis: {
          labels: {
            show: true,
            align: "left",
            minWidth: 150,
            maxWidth: 300,
            style: {
              cssClass: "for-_long-label",
              colors: ["#fff"],
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: (value) => {
              return value + " "
            },
          },
        },
        tooltip: {
          x: {
            show: true,
          },
          y: {
            formatter: (value) => {
              return value + "%"
            },
          },
        },
      },
    }
  }

  render() {
    return (
      <div>
        <h6 className="chart-h6-title">% Positivity</h6>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="500px"
          className="mb-point-c toolbar-_-top white-_-y responsive-_chart"
        />
      </div>
    )
  }
}

export default GroupedBar
