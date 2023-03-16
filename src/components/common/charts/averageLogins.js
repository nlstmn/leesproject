import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class AverageLogins extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "Avreage login",
          data: [44, 55, 57, 56, 61, 22, 14],
        },
        //   {
        //     name: 'Revenue',
        //     data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        //   },
        //   {
        //     name: 'Free Cash Flow',
        //     data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        //   }
      ],

      options: {
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          type: "bar",
          height: 350,
          toolbar: {
            show: true,
            export: {
              csv: {
                filename: "Average logins",
              },
              svg: {
                filename: "Average logins",
              },
              png: {
                filename: "Average logins",
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
        colors: ["#fff", "#bf1717", "#bec3c5"],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "15%",
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
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
        },
        yaxis: {
          title: {
            text: "Logins",
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          labels: {
            style: {
              colors: ["#fff"],
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
    let data = {}
    if (this.props.data) {
      data = {
        series: [
          {
            name: "Avreage login",
            data: this.props.data.series,
          },
          //   {
          //     name: 'Revenue',
          //     data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          //   },
          //   {
          //     name: 'Free Cash Flow',
          //     data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
          //   }
        ],

        options: {
          chart: {
            background: "#292b2b",
            foreColor: "#fff",
            type: "bar",
            height: 350,
            toolbar: {
              show: true,
              export: {
                csv: {
                  filename: "Average logins",
                },
                svg: {
                  filename: "Average logins",
                },
                png: {
                  filename: "Average logins",
                },
              },
            },
            zoom: {
              enabled: false,
            },
            animations: {
              enabled: this.props.data.categories <= 30 ? true : false,
            },
          },
          colors: ["#fff", "#bf1717", "#bec3c5"],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "15%",
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
            categories: this.props.data.categories,
            labels: {
              style: {
                colors: ["#fff"],
              },
            },
          },
          yaxis: {
            title: {
              text: "Logins",
              style: {
                colors: ["#fff"],
                fontSize: "14px",
                fontFamily: "Source Sans Pro, sans-serif",
                fontWeight: 400,
                cssClass: "apexcharts-yaxis-label",
              },
            },
            labels: {
              style: {
                colors: ["#fff"],
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
    } else {
      data = this.state
    }

    return (
      <div id="chart" className="mb-point-c have-filter-btn">
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

export default AverageLogins
