import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class HeatMapChart extends Component {
  render() {
    let data = {}
    if (this.props.data) {
      data = {
        series: this.props.data.series,
        options: {
          chart: {
            background: "#292b2b",
            foreColor: "#fff",
            height: 350,
            type: "heatmap",
            toolbar: {
              show: true,
              export: {
                csv: {
                  filename: "Internal comparison (Respondent breakdown)",
                },
                svg: {
                  filename: "Internal comparison (Respondent breakdown)",
                },
                png: {
                  filename: "Internal comparison (Respondent breakdown)",
                },
              },
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
              barHeight: "20%",
            },
            heatmap: {
              shadeIntensity: 0.5,
              radius: 0,
              useFillColorAsStroke: false,
              enableShades: false,
              colorScale: {
                ranges: [
                  {
                    from: 0,
                    to: 0,
                    name: "0%",
                    color: "#70777a",
                    foreColor: "#fff",
                  },
                  {
                    from: 0.1,
                    to: 19,
                    name: "0.1 - 20.0%",
                    color: "#bf1717",
                    foreColor: "#fff",
                  },
                  {
                    from: 20,
                    to: 39,
                    name: "20.1 - 40.0%",
                    color: "#f5a04c",
                    foreColor: "#000",
                  },
                  {
                    from: 40,
                    to: 59,
                    name: "40.1 - 60.0%",
                    color: "#ffe054",
                    foreColor: "#000",
                  },
                  {
                    from: 60,
                    to: 79,
                    name: "60.1 - 80.0%",
                    color: "#b6d484",
                    foreColor: "#000",
                  },
                  {
                    from: 80,
                    to: 100,
                    name: "80.1 - 100.0%",
                    color: "#119336",
                    foreColor: "#fff",
                  },
                ],
              },
            },
          },
          xaxis: {
            axisTicks: { show: true },
            axisBorder: { show: true },
            categories: this.props.data.categories,
            tooltip: {
              enabled: false,
            },
          },
          yaxis: {
            labels: {
              show: true,
              align: "left",
              minWidth: 290,
              maxWidth: 290,
              style: {
                cssClass: "for-_long-label",
              },
              offsetX: 0,
              offsetY: 0,
              rotate: 0,
              formatter: (value) => {
                return value
              },
            },
          },
          tooltip: {
            y: {
              formatter: function (value) {
                return Number.isInteger(value)
                  ? value + "%"
                  : parseFloat(value).toFixed(0) + "%"
              },
            },
          },
          dataLabels: {
            formatter: function (value) {
              return Number.isInteger(value)
                ? value + "%"
                : parseFloat(value).toFixed(0) + "%"
            },
            enabled: true,
            style: {
              colors: ["#fff"],
            },
          },
          // stroke: {
          //   width: 20,
          //   colors: ['#fff']
          // },
        },
      }
    }
    console.log(data)
    return (
      <>
        {this.props.data && data.series.length >= 1 ? (
          <ReactApexChart
            options={data.options}
            series={data.series}
            type="heatmap"
            height={`${
              data.series.length <= 1
                ? "200"
                : data.series.length === 2
                ? "260"
                : data.series.length === 3
                ? "280"
                : data.series.length === 4
                ? "300"
                : data.series.length === 5
                ? "320"
                : data.series.length === 6 && data.series.length < 11
                ? data.series.length * 70
                : data.series.length * 40
            }px`}
            className="heatmap-section mb-point-c toolbar-_-top stacked-_-chart shadow-_-text responsive-_chart"
          />
        ) : (
          <NoData />
        )}
      </>
    )
  }
}

export default HeatMapChart
