import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class FeedbackChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "Lorem Ipsum",
          data: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
        },
        {
          name: "Lorem Ipsum",
          data: [],
        },
        {
          name: "Lorem Ipsum",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
        {
          name: "Lorem Ipsum",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
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
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [2, 2, 2, 2],
          curve: "straight",
          dashArray: [8, 0, 0, 0],
        },
        colors: ["#119336", "#bf1717", "#70777a", "#bec3c5"],
        // title: {
        //   text: 'Page Statistics',
        //   align: 'left'
        // },
        legend: {
          //   tooltipHoverFormatter: function(val, opts) {
          //     return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          //   },
          position: "right",
          offsetY: 90,
          markers: {
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: ["#119336", "#bf1717", "#70777a", "#bec3c5"],
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            "01 Jan",
            "02 Jan",
            "03 Jan",
            "04 Jan",
            "05 Jan",
            "06 Jan",
            "07 Jan",
            "08 Jan",
            "09 Jan",
            "10 Jan",
            "11 Jan",
            "12 Jan",
          ],
          labels: {
            show: false,
            // rotate: -45,
            // rotateAlways: false,
            // hideOverlappingLabels: true,
            // showDuplicates: false,
            // trim: false,
            // minHeight: undefined,
            // maxHeight: 120,
            // style: {
            //     colors: [],
            //     fontSize: '12px',
            //     fontFamily: 'Helvetica, Arial, sans-serif',
            //     fontWeight: 400,
            //     cssClass: 'apexcharts-xaxis-label',
            // },
            // offsetX: 0,
            // offsetY: 0,
            // format: undefined,
            // formatter: undefined,
            // datetimeUTC: true,
            // datetimeFormatter: {
            //     year: 'yyyy',
            //     month: "MMM 'yy",
            //     day: 'dd MMM',
            //     hour: 'HH:mm',
            // },
          },
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)"
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session"
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    }
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height="200px"
          className="mb-point-c"
        />
      </div>
    )
  }
}

export default FeedbackChart
