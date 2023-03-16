import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class UserActivityChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          type: "bar",
          height: 280,
          stacked: true,
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
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: 20,
            width: 5,
          },
        },
        legend: {
          show: true,
          markers: {
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: ["#3d7ff7", "#bec3c5"],
          },
        },
        fill: {
          colors: ["#3d7ff7", "#bec3c5"],
        },
        yaxis: {
          show: true,
        },
        xaxis: {
          axisTicks: { show: false },
          axisBorder: { show: false },
          categories: [
            "10-Nov",
            "11-Nov",
            "12-Nov",
            "13-Nov",
            "14-Nov",
            "15-Nov",
            "16-Nov",
            "17-Nov",
            "18-Nov",
            "19-Nov",
            "20-Nov",
            "21-Nov",
            "22-Nov",
            "23-Nov",
            "24-Nov",
            "25-Nov",
            "26-Nov",
            "27-Nov",
            "28-Nov",
            "29-Nov",
            "30-Nov",
            "01-Dec",
            "02-Dec",
            "03-Dec",
          ],
        },
        grid: {
          bottom: 20,
          top: 0,
          left: 6,
        },
      },
      series: [
        {
          name: "Office",
          data: [
            70, 12, 75, 37, 219, 152, 50, 92, 25, 42, 18, 100, 70, 12, 75, 37,
            219, 152, 50, 92, 25, 42, 18, 100,
          ],
        },
        {
          name: "Home",
          data: [
            110, 81, 158, 108, 149, 217, 10, 81, 58, 78, 149, 117, 110, 81, 158,
            108, 149, 217, 10, 81, 58, 78, 149, 117,
          ],
        },
      ],
    }
  }
  render() {
    return (
      <div className="mb-point-c">
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

export default UserActivityChart
