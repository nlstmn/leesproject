import React, { Component } from "react"
import Chart from "react-apexcharts"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan
// ALL CHARTS: in tooltip, positivity scores should be to 1dp and with % sign

class BasicBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          height: "auto",
          type: "bar",
          toolbar: {
            show: true,
            export: {
              csv: {
                filename: "Campaign breakdown (Question positivity)",
              },
              svg: {
                filename: "Campaign breakdown (Question positivity)",
              },
              png: {
                filename: "Campaign breakdown (Question positivity)",
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
        colors: ["#fff"],
        grid: {
          yaxis: {
            lines: {
              show: false,
            },
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        plotOptions: {
          bar: {
            barHeight: "40%",
            distributed: false,
            horizontal: true,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: false,
          // textAnchor: 'start',
          // offsetX: 0
          show: false,
          offsetX: 6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            show: true,
            align: "left",
            minWidth: 300,
            maxWidth: 300,
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
        legend: {
          show: false,
        },
      },
      series: [
        {
          name: "% Positivity",
          data: [],
        },
      ],
    }
  }
  render() {
    const sortByType = (type, series, responses, categories) => {
      let main = series.map((i, index) => {
        return {
          index: index,
          score: i,
          category: categories[index],
          respons: responses[index],
        }
      })
      if (type === "positivity") {
        let sortByPositivity = main.sort((b, a) => {
          if (a.score < b.score) return -1
          if (a.score > b.score) return 1
          return 0
        })
        return {
          series: sortByPositivity.map((i) => i.score),
          categories: sortByPositivity.map((i) => i.category),
        }
      } else if (type === "positivity_desc") {
        let sortByPositivity = main.sort((a, b) => {
          if (a.score < b.score) return -1
          if (a.score > b.score) return 1
          return 0
        })
        return {
          series: sortByPositivity.map((i) => i.score),
          categories: sortByPositivity.map((i) => i.category),
        }
      } else if (type === "responses") {
        let sortByResponses = main.sort((b, a) => {
          if (a.respons < b.respons) return -1
          if (a.respons > b.respons) return 1
          return 0
        })
        return {
          series: sortByResponses.map((i) => i.respons),
          categories: sortByResponses.map((i) => i.category),
        }
      } else if (type === "alphabetical") {
        let sortAlphabetically = main?.sortAlphabetically("category")
        return {
          series: sortAlphabetically.map((i) => i.score),
          categories: sortAlphabetically.map((i) => i.category),
        }
      }
    }
    let data = {}
    if (this.props.data) {
      let d = sortByType(
        this.props.orderBy,
        this.props.data.series,
        this.props.data.responses,
        this.props.data.categories
      )

      data = {
        options: {
          chart: {
            background: "#292b2b",
            foreColor: "#fff",
            height: "auto",
            type: "bar",
            width: "300px",
            toolbar: {
              show: true,
              export: {
                csv: {
                  filename: "Campaign breakdown (Question positivity)",
                },
                svg: {
                  filename: "Campaign breakdown (Question positivity)",
                },
                png: {
                  filename: "Campaign breakdown (Question positivity)",
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
          colors: ["#fff"],
          grid: {
            yaxis: {
              lines: {
                show: false,
              },
            },
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
          plotOptions: {
            bar: {
              barHeight: "40%",
              distributed: false,
              horizontal: true,
              dataLabels: {
                position: "bottom",
              },
            },
          },
          dataLabels: {
            // enabled: true,
            // textAnchor: 'start',
            // offsetX: 0
            enabled: false,
            offsetX: 6,
            style: {
              fontSize: "12px",
              colors: ["#fff"],
            },
          },
          xaxis: {
            categories: d.categories,
            max: 100,
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
                return value + ""
              },
            },
          },
          tooltip: {
            x: {
              show: true,
            },
            y: {
              formatter: (value) => {
                return (
                  Math.round(value * 100) / 100 +
                  `${this.props.orderBy === "responses" ? " people" : " %"}`
                )
              },
            },
          },
          legend: {
            show: false,
          },
        },
        series: [
          {
            name: `${
              this.props.orderBy === "responses"
                ? "Response count"
                : "% Positivity"
            }`,
            data: d.series,
          },
        ],
      }
    }
    let result = this.props.data ? data : this.state

    console.log(this.props)
    return (
      <div className="mb-point-c white-_-bars toolbar-_-top responsive-_chart">
        {this.props.data && this.props.data.categories.length >= 1 ? (
          <>
            <h6 className="chart-h6-title">% Positivity</h6>
            <Chart
              options={result.options}
              series={result.series}
              type="bar"
              height={
                this.props.data.categories.length <= 1
                  ? 100
                  : this.props.data.categories.length * 30 + 100
              }
            />
          </>
        ) : (
          <NoData />
        )}
      </div>
    )
  }
}

export default BasicBar
