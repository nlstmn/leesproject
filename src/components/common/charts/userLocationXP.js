import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class UserLocationXP extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "User XP",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: "Location XP",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: false,
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
        colors: ["#2570e0", "#70777a"],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            // endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "01-Dec",
            "02-Dec",
            "03-Dec",
            "04-Dec",
            "05-Dec",
            "06-Dec",
            "07-Dec",
            "08-Dec",
            "09-Dec",
          ],
        },
        yaxis: {
          title: {
            text: "User / Location",
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "%"
            },
          },
        },
      },
    }
  }

  render() {
    return (
      <div id="chart" className="mb-point-c">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="200px"
        />
      </div>
    )
  }
}

export default UserLocationXP
