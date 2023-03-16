import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class UserBreakdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "Users",
          data: [1400, 930, 348],
        },
      ],
      options: {
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          type: "bar",
          height: 380,
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
            barHeight: "70%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        colors: ["#2793ff", "#2793ff", "#2793ff"],
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"],
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: false,
          },
        },
        legend: {
          show: false,
          markers: {
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: ["#3d7ff7", "#bec3c5"],
          },
        },
        stroke: {
          width: 0,
          colors: ["#fff"],
        },
        xaxis: {
          categories: [
            "Registered users",
            "Active users in last 30 days",
            "Active users in last 7 days",
          ],
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
        },
        yaxis: {
          labels: {
            show: false,
            style: {
              colors: ["#fff"],
            },
          },
        },
        // title: {
        //     text: 'Custom DataLabels',
        //     align: 'center',
        //     floating: true
        // },
        // subtitle: {
        //     text: 'Category Names as DataLabels inside bars',
        //     align: 'center',
        // },
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

export default UserBreakdown
