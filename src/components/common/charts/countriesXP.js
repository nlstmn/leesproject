import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class CountriesXP extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [45, 55],
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
        labels: ["Country X", "Country Y"],
        stroke: {
          width: 0,
        },
        dataLabels: {
          dropShadow: {
            show: false,
          },
        },
        legend: {
          show: false,
          position: "bottom",
          offsetY: -15,
        },
        colors: ["#2570e0", "#70777a"],
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            donut: {
              size: "88%",
              labels: {
                show: true,
                // name: {
                //   show: true,
                //   fontSize: '52px',
                //   fontFamily: 'Helvetica, Arial, sans-serif',
                //   fontWeight: 600,
                //   color: '#fff',
                //   offsetY: -10,
                //   },
                value: {
                  show: true,
                  fontSize: "56px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  color: "#fff",
                  offsetY: 0,
                  formatter: function (val) {
                    return val + "%"
                  },
                },
                total: {
                  showAlways: false,
                  show: true,
                  label: "",
                  fontSize: "0px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#fff",
                  formatter: function () {
                    return "%"
                  },
                },
              },
            },
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height="250px"
          className="mb-point-c"
        />
      </div>
    )
  }
}

export default CountriesXP
