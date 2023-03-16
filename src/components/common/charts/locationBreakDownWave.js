import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan
const exportFileName = "Location breakdown"
const fontName = "Source Sans Pro, sans-serif"
class LocationBreakDownWave extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        // OFFICES - Stacked olması gereken bar - değerleri sıraya ve başta
        {
          name: "Not enough data",
          data: [0],
        },
      ],
      options: {
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
            export: {
              csv: {
                filename: exportFileName,
              },
              svg: {
                filename: exportFileName,
              },
              png: {
                filename: exportFileName,
              },
            },
          },
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: true,
          },
        },
        colors: ["#2793ff", "#bec3c5", "#70777a", "#2793ff"],
        legend: {
          show: false,
          markers: {
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: ["#ffffff", "#bec3c5", "#70777a", "#5a5a5a"],
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
              enabled: false,
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
            show: false,
            style: {
              colors: ["#333"],
            },
            offsetX: 30,
          },
        },
        stroke: {
          width: 0,
          colors: ["#fff"],
        },
        // title: {
        //   text: 'Fiction Books Sales'
        // },
        dataLabels: {
          enabled: false,
          textAnchor: "start",
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
        },
        xaxis: {
          categories: ["Office locations", "Home", "Other"],
          title: {
            text: "Responses / comments",
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: fontName,
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          labels: {
            formatter: function (val) {
              return val + "K"
            },
            style: {
              colors: ["#fff"],
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "K"
            },
          },
        },
        fill: {
          opacity: 1,
        },
        // legend: {
        //   position: 'top',
        //   horizontalAlign: 'left',
        //   offsetX: 40
        // }
      },
    }
  }

  render() {
    let data = {}
    if (this.props.data && this.props.data.series) {
      data = {
        series: this.props.data.series,
        options: {
          chart: {
            background: "#292b2b",
            foreColor: "#fff",
            type: "bar",
            height: 350,
            stacked: true,
            toolbar: {
              show: true,
              export: {
                csv: {
                  filename: exportFileName,
                },
                svg: {
                  filename: exportFileName,
                },
                png: {
                  filename: exportFileName,
                },
              },
            },
            zoom: {
              enabled: false,
            },
            animations: {
              enabled: true,
            },
          },
          colors: ["#2793ff", "#bec3c5", "#70777a", "#2793ff"],
          legend: {
            show: false,
            markers: {
              strokeWidth: 0,
              strokeColor: "#fff",
              fillColors: ["#ffffff", "#bec3c5", "#70777a", "#5a5a5a"],
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: "top",
                enabled: false,
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
              show: false,
              style: {
                colors: ["#333"],
              },
              offsetX: 30,
            },
          },
          stroke: {
            width: 0,
            colors: ["#fff"],
          },
          // title: {
          //   text: 'Fiction Books Sales'
          // },
          dataLabels: {
            enabled: false,
            textAnchor: "start",
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
            },
            offsetX: 0,
          },
          xaxis: {
            categories: this.props.data.categories,
            title: {
              text: "Responses / comments",
              rotate: -90,
              offsetX: 0,
              offsetY: 0,
              style: {
                colors: ["#fff"],
                fontSize: "14px",
                fontFamily: fontName,
                fontWeight: 400,
                cssClass: "apexcharts-yaxis-label",
              },
            },
            labels: {
              formatter: function (val) {
                return val
              },
            },
            style: {
              colors: ["#fff"],
            },
          },
          yaxis: {
            labels: {
              enabled: false,
              show: false,
              style: {
                colors: ["#fff"],
              },
            },
            title: {
              text: ["Office locations,", "Home, Other"],
              rotate: -90,
              offsetX: 12,
              offsetY: 20,
              style: {
                colors: ["#fff"],
                fontSize: "14px",
                fontFamily: fontName,
                fontWeight: 400,
                cssClass: "apexcharts-yaxis-label location-_br-y",
              },
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              },
            },
          },
          fill: {
            opacity: 1,
          },
          // legend: {
          //   position: 'top',
          //   horizontalAlign: 'left',
          //   offsetX: 40
          // }
        },
      }
    } else {
      data = this.state
    }
    return (
      <div id="chart" className="mb-point-c have-filter-btn responsive-_chart">
        {this.props.data &&
        data.series[0].data.reduce(
          (previousScore, currentScore, index) => previousScore + currentScore,
          0
        ) >= 1 ? (
          <ReactApexChart
            options={data.options}
            series={data.series}
            type="bar"
            height="250px"
          />
        ) : (
          <NoData />
        )}
      </div>
    )
  }
}

export default LocationBreakDownWave
