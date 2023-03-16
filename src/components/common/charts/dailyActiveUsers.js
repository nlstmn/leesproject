import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"
import moment from "moment"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class DailyActiveUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "Active users",
          data: [0],
        },
      ],
      options: {
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          type: "area",
          stacked: false,
          toolbar: {
            show: true,
            autoSelected: "zoom",
            export: {
              csv: {
                filename: "Usage (Active users)",
              },
              svg: {
                filename: "Usage (Active users)",
              },
              png: {
                filename: "Usage (Active users)",
              },
            },
          },
          height: 350,
          zoom: {
            type: "x",
            enabled: false,
            autoScaleYaxis: true,
          },
          animations: {
            enabled: true,
          },
        },
        colors: ["#fff", "#bf1717", "#bec3c5"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        markers: {
          size: 0,
        },
        // title: {
        //   text: 'Stock Price Movement',
        //   align: 'left'
        // },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0,
            inverseColors: false,
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0],
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value + ""
            },
            style: {
              colors: ["#fff"],
            },
          },
          title: {
            text: "Active users",
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        xaxis: {
          categories: ["loading"],
          tooltip: {
            enabled: false,
          },
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (value) {
              return value + " Users"
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#b6b6b6",
          strokeDashArray: 0,
          position: "back",
        },
      },
    }
  }

  render() {
    let data = {}

    if (this.props.data && this.props.data.series) {
      data = {
        series: [
          {
            name: "Active users",
            data: this.props.data.series,
          },
        ],
        options: {
          chart: {
            background: "#292b2b",
            foreColor: "#fff",
            type: "area",
            stacked: false,
            toolbar: {
              show: true,
              autoSelected: "zoom",
              export: {
                csv: {
                  filename: "Usage (Active users)",
                },
                svg: {
                  filename: "Usage (Active users)",
                },
                png: {
                  filename: "Usage (Active users)",
                },
              },
            },
            height: 350,
            zoom: {
              type: "x",
              enabled: false,
              autoScaleYaxis: true,
            },
            animations: {
              enabled: this.props.data.categories.length <= 20 ? true : false,
            },
          },
          colors: ["#fff", "#bf1717", "#bec3c5"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          markers: {
            size: 0,
          },
          // title: {
          //   text: 'Stock Price Movement',
          //   align: 'left'
          // },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 0,
              inverseColors: false,
              opacityFrom: 0,
              opacityTo: 0,
              stops: [0],
            },
          },
          yaxis: {
            min: 0,
            labels: {
              formatter: function (val) {
                return val.toFixed(0)
              },
              style: {
                colors: ["#fff"],
              },
            },

            title: {
              text: "Active users",
              style: {
                colors: ["#fff"],
                fontSize: "14px",
                fontFamily: "Source Sans Pro, sans-serif",
                fontWeight: 400,
                cssClass: "apexcharts-yaxis-label",
              },
            },
          },
          xaxis: {
            min: "date",
            tickAmount:
              this.props.data.categories.length >= 200
                ? 5
                : this.props.data.categories.length < 200 &&
                  this.props.data.categories.length >= 90
                ? 15
                : this.props.data.categories.length < 90 &&
                  this.props.data.categories.length >= 30
                ? 10
                : 0,
            categories: this.props.data.categories.map((item) =>
              moment(item).format("DD MMM")
            ),
            tooltip: {
              enabled: false,
            },
            labels: {
              style: {
                colors: ["#fff"],
              },
            },
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (value) {
                return value + " Users"
              },
            },
          },
          grid: {
            show: true,
            borderColor: "#b6b6b6",
            strokeDashArray: 0,
            position: "back",
          },
        },
      }
    } else {
      data = this.state
    }
    console.log(this.props)
    return (
      <div id="chart">
        {this.props?.data?.series?.length >= 1 ? (
          <ReactApexChart
            options={data.options}
            series={data.series}
            type="area"
            height="250px"
            className="mb-point-c"
          />
        ) : (
          <NoData />
        )}
      </div>
    )
  }
}

export default DailyActiveUsers
