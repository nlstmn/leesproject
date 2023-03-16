import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class LocationCompanyXP extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [63, 27],
      options: {
        chart: {
          type: "donut",
          toolbar: {
            show: true,
          },
          dropShadow: {
            enabled: false,
          },
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: false,
          },
        },
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: {
              size: "85%",
              labels: {
                show: true,
                //   total: {
                //     showAlways: true,
                //     show: true
                //   }
              },
            },
          },
        },
        stroke: {
          width: 0,
        },
        dataLabels: {
          dropShadow: {
            show: false,
          },
        },
        legend: {
          show: true,
          position: "bottom",
          offsetY: -15,
        },
        labels: ["Location XP", "Company XP"],
        colors: ["#70777a", "#2570e0"],
        grid: {
          padding: {
            bottom: 20,
            top: 0,
          },
        },
      },
    }
  }
  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="donut"
        height="250px"
        className="mb-point-c"
      />
    )
  }
}

export default LocationCompanyXP
