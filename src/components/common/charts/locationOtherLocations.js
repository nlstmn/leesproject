import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class LocationOtherLocations extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "Location 1",
          data: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
        },
        {
          name: "Location 2",
          data: [12, 22, 5, 18, 9, 33, 42, 11, 10, 20, 21, 22],
        },
        {
          name: "Location 3",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
        {
          name: "Location 4",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        },
      ],
      options: {
        chart: {
          height: 100,
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
          dashArray: [0, 0, 0, 0],
        },
        colors: ["#119336", "#bf1717", "#70777a", "#bec3c5"],
        // title: {
        //   text: 'Page Statistics',
        //   align: 'left'
        // },
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
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height="200px"
        className="mb-point-c"
      />
    )
  }
}

export default LocationOtherLocations
