import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"
import moment from "moment"
import NoData from "../noData"
// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class InternalComparisonLine extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "",
          data: [0],
        },
      ],
      options: {
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: true,
            export: {
              csv: {
                filename: "Internal comparison (Trends)",
              },
              svg: {
                filename: "Internal comparison (Trends)",
              },
              png: {
                filename: "Internal comparison (Trends)",
              },
            },
          },
          animations: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [1, 1, 1, 1, 1],
          curve: "straight",
          dashArray: [0, 0, 0, 0, 0],
        },
        colors: ["#ed7d31", "#7030a0", "#a5a5a5", "#ffc000", "#2793ff"],
        //   title: {
        //     text: 'Page Statistics',
        //     align: 'left'
        //   },
        // legend: {
        //   tooltipHoverFormatter: function(val, opts) {
        //     return val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + "%";
        //   },
        // },
        markers: {
          size: 5,
          hover: {
            size: 5,
            // sizeOffset: 3
          },
          strokeWidth: 0,
        },
        xaxis: {
          categories: [],
          tooltip: {
            enabled: false,
          },
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val + ""
            },
            style: {
              colors: ["#fff"],
            },
          },
          title: {
            text: "XP score",
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        // tooltip: {
        //   y: [
        //     {
        //       title: {
        //         formatter: function(val) {
        //           return val + "";
        //         },
        //       },
        //     },
        //     {
        //       title: {
        //         formatter: function(val) {
        //           return val + "";
        //         },
        //       },
        //     },
        //     {
        //       title: {
        //         formatter: function(val) {
        //           return val + "";
        //         },
        //       },
        //     },
        //   ],
        // },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    }
  }

  render() {
    console.log(this.props.data)
    let series =
      this.props.data && this.props.data.series
        ? this.props.data.series
        : this.state.series
    let categories =
      this.props.data && this.props.data.categories
        ? this.props.data.categories
        : [""]
    let options = {
      chart: {
        background: "#292b2b",
        foreColor: "#fff",
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: true,
          export: {
            csv: {
              filename: "Internal comparison (Trends)",
            },
            svg: {
              filename: "Internal comparison (Trends)",
            },
            png: {
              filename: "Internal comparison (Trends)",
            },
          },
        },
        animations: {
          enabled: categories.length <= 15 ? true : false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 1, 1, 1],
        curve: "straight",
        dashArray: [0, 0, 0, 0, 0],
      },
      colors: ["#ed7d31", "#7030a0", "#a5a5a5", "#ffc000", "#2793ff"],
      //   title: {
      //     text: 'Page Statistics',
      //     align: 'left'
      //   },
      // legend: {
      //   tooltipHoverFormatter: function(val, opts) {
      //     return val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + "%";
      //   },
      // },
      markers: {
        size: 5,
        hover: {
          size: 5,
          // sizeOffset: 3
        },
        strokeWidth: 0,
      },
      xaxis: {
        tickAmount:
          categories.length >= 200
            ? 5
            : categories.length < 200 && categories.length >= 90
            ? 15
            : categories.length < 90 && categories.length >= 30
            ? 10
            : undefined,
        categories: categories.map((item) => moment(item).format("DD MMM")),
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            colors: ["#fff"],
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            if (val == null) {
            } else {
              return parseFloat(val).toFixed(1) + ""
            }
          },
          style: {
            colors: ["#fff"],
          },
        },
        title: {
          text: "XP score",
          style: {
            colors: ["#fff"],
            fontSize: "14px",
            fontFamily: "Source Sans Pro, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
      // tooltip: {
      //   y: [
      //     {
      //       title: {
      //         formatter: function(val) {
      //           return val + "";
      //         },
      //       },
      //     },
      //     {
      //       title: {
      //         formatter: function(val) {
      //           return val + "";
      //         },
      //       },
      //     },
      //     {
      //       title: {
      //         formatter: function(val) {
      //           return val + "";
      //         },
      //       },
      //     },
      //   ],
      // },
      grid: {
        borderColor: "#f1f1f1",
      },
    }

    return (
      <div id="chart" className="mb-point-c line-chart-apex">
        {this.props.data && this.props.data.categories.length >= 1 ? (
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={300}
          />
        ) : (
          <NoData />
        )}
      </div>
    )
  }
}

export default InternalComparisonLine
