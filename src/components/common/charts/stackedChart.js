import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class StackedChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "Very negative",
          data: [],
        },
        {
          name: "Negative",
          data: [],
        },
        {
          name: "Neutral",
          data: [],
        },
        {
          name: "Positive",
          data: [],
        },
        {
          name: "Very positive",
          data: [],
        },
      ],
      options: {
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          type: "bar",
          height: "auto",
          stacked: true,
          stackType: "100%",

          toolbar: {
            show: true,
            export: {
              csv: {
                filename: "Campaign breakdown (Question breakdown)",
              },
              svg: {
                filename: "Campaign breakdown (Question breakdown)",
              },
              png: {
                filename: "Campaign breakdown (Question breakdown)",
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
        colors: ["#bf1717", "#f5a04c", "#ffe054", "#63b450", "#119336"],

        plotOptions: {
          bar: {
            barHeight: "40%",
            horizontal: true,
          },
        },
        stroke: {
          width: 0,
          // colors: ['#fff']
        },
        xaxis: {
          categories: [
            // "Indivldual focused work, desk based",
            // "Planned meetings",
            // "Thinking/creative thinking",
            // "Relaxing/taking a break ",
            // "Desk",
            // "Learning from others",
            // "General decor",
            // "Informal oork areas/break-outzones",
            // "Meeting rooms (small)",
            // "Toilets/W.C.",
            // "Tea, coffee & other refreshment facilities",
            // "General tidiness",
            // "Noise levels",
          ],
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
        },
        yaxis: {
          labels: {
            show: true,
            align: "left",
            minWidth: 300,
            maxWidth: 300,
            style: {
              cssClass: "for-_long-label",
              colors: ["#fff"],
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
            formatter: function (val) {
              return val + "%"
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          //   horizontalAlign: 'left',
          //   offsetX: 40
        },
        dataLabels: {
          enabled: false,
        },
      },
    }
  }
  render() {
    const sortByType = (type, series, responses, categories, distribution) => {
      const transpose = (matrix) => {
        return matrix.reduce(
          (prev, next) =>
            next.map((item, i) => (prev[i] || []).concat(next[i])),
          []
        )
      }
      console.log(series, responses, categories, distribution, distribution[4])
      let main = series.map((i, index) => {
        return {
          order: index,
          score: i,
          category: categories[index],
          respons: responses[index],
          distribution: [
            distribution[0][index],
            distribution[1][index],
            distribution[2][index],
            distribution[3][index],
            distribution[4][index],
          ],
        }
      })
      if (type === "positivity") {
        let sortByPositivity = main.sort((b, a) => {
          if (a.score < b.score) return -1
          if (a.score > b.score) return 1
          return 0
        })

        return {
          series: transpose(sortByPositivity.map((i) => i.distribution)),
          categories: sortByPositivity.map((i) => i.category),
        }
      } else if (type === "positivity_desc") {
        let sortByPositivity = main.sort((a, b) => {
          if (a.score < b.score) return -1
          if (a.score > b.score) return 1
          return 0
        })

        return {
          series: transpose(sortByPositivity.map((i) => i.distribution)),
          categories: sortByPositivity.map((i) => i.category),
        }
      } else if (type === "responses") {
        let sortByResponses = main.sort((b, a) => {
          if (a.respons < b.respons) return -1
          if (a.respons > b.respons) return 1
          return 0
        })

        return {
          series: transpose(sortByResponses.map((i) => i.distribution)),
          categories: sortByResponses.map((i) => i.category),
        }
      } else if (type === "alphabetical") {
        let sortAlphabetically = main?.sortAlphabetically("category")

        return {
          series: transpose(sortAlphabetically.map((i) => i.distribution)),
          categories: sortAlphabetically.map((i) => i.category),
        }
      }
      console.log(main)
    }
    let data = {}
    if (this.props.data) {
      let d = sortByType(
        this.props.orderBy,
        this.props.data.series,
        this.props.data.responses,
        this.props.data.categories,
        this.props.data.distribution
      )
      console.log(d)

      data = {
        series: [
          {
            name: "Very negative",
            data: d.series[0],
          },
          {
            name: "Negative",
            data: d.series[1],
          },
          {
            name: "Neutral",
            data: d.series[2],
          },
          {
            name: "Positive",
            data: d.series[3],
          },
          {
            name: "Very positive",
            data: d.series[4],
          },
        ],
        options: {
          chart: {
            background: "#292b2b",
            foreColor: "#fff",
            type: "bar",
            height: "auto",
            stacked: true,
            stackType: "100%",

            toolbar: {
              show: true,
              export: {
                csv: {
                  filename: "Campaign breakdown (Question breakdown)",
                },
                svg: {
                  filename: "Campaign breakdown (Question breakdown)",
                },
                png: {
                  filename: "Campaign breakdown (Question breakdown)",
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
          colors: ["#bf1717", "#f5a04c", "#ffe054", "#63b450", "#119336"],

          plotOptions: {
            bar: {
              barHeight: "40%",
              horizontal: true,
            },
          },
          stroke: {
            width: 0,
            // colors: ['#fff']
          },
          xaxis: {
            categories: d.categories,
            labels: {
              style: {
                colors: ["#fff"],
              },
            },
          },
          yaxis: {
            labels: {
              show: true,
              align: "left",
              minWidth: 300,
              maxWidth: 300,
              style: {
                cssClass: "for-_long-label",
                colors: ["#fff"],
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
              formatter: function (val) {
                return Math.round(val * 100) / 100 + "%"
              },
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: "top",
            //   horizontalAlign: 'left',
            //   offsetX: 40
          },
          dataLabels: {
            enabled: false,
          },
        },
      }
    }
    let result = this.props.data ? data : this.state
    console.log(this.props.data)
    console.log(result)
    return (
      <>
        {this.props.data && this.props.data.categories.length >= 1 ? (
          <ReactApexChart
            options={data.options}
            series={data.series}
            type="bar"
            height={
              this.props.data.categories.length <= 1
                ? 120
                : this.props.data.categories.length * 30 + 100
            }
            className="mb-point-c toolbar-_-top stacked-_-chart responsive-_chart"
          />
        ) : (
          <NoData />
        )}
      </>
    )
  }
}

export default StackedChart
