import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan
const exportFileName = "Internal comparison (Cross section)"
class AverageLogins extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "XP Score",
          type: "column",
          data: [0],
        },
        {
          name: "Employees",
          type: "line",
          data: [0],
        },
      ],

      options: {
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          id: "tb",
          group: "social",
          type: "line",
          height: 350,
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
            enabled: false,
          },
        },
        colors: ["#2793ff"],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "12%",
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
          categories: [""],
          tooltip: {
            enabled: false,
          },
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
        },
        yaxis: [
          {
            title: {
              text: "XP Score",
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
          {
            opposite: true,
            title: {
              // text: 'Employees',
              style: {
                colors: ["#fff"],
                fontSize: "14px",
                fontFamily: "Source Sans Pro, sans-serif",
                fontWeight: 400,
                cssClass: "apexcharts-yaxis-label",
              },
            },
            labels: {
              show: false,
              style: {
                colors: ["#fff"],
              },
            },
          },
        ],
        annotations: {
          yaxis: [
            {
              y: 34,
              borderColor: "#bec3c5",
              strokeDashArray: 8,
              label: {
                borderColor: "#70777a",
                style: {
                  color: "#fff",
                  background: "#70777a",
                },
                text: "Organisation XP Score: 72.5",
                offsetX: 5,
              },
            },
          ],
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ""
            },
            marker: {
              show: false,
            },
          },
        },
      },
    }
  }

  render() {
    let series =
      this.props.data && this.props.data.series
        ? this.props.data.series
        : this.state.series
    let categories = this.props.data ? this.props.data.categories : [""]
    function sortByType(type) {
      let buffer = series.filter((i) => i.name === type)[0].data
      buffer = buffer.map((i, index) => {
        return { data: i, index: index }
      })
      buffer = buffer.sort((a, b) => b.data - a.data)
      let order = buffer.map((i) => i.index)
      let xp_data = series.filter((i) => i.name === "XP Score")[0].data
      let xp_data_buffer = []
      let employee_data = series.filter((i) => i.name === "Employees")[0].data
      let employee_data_buffer = []
      let categories_data = categories
      let categories_data_buffer = []
      order.forEach((i) => {
        xp_data_buffer.push(xp_data[i])
        employee_data_buffer.push(employee_data[i])
        categories_data_buffer.push(categories_data[i])
      })
      categories = categories_data_buffer
      series = [
        {
          name: "XP Score",
          type: "column",
          data: xp_data_buffer,
        },
        {
          name: "Employees",
          type: "line",
          data: employee_data_buffer,
        },
      ]
    }

    if (this.props.sort === "employees") {
      sortByType("Employees")
    } else if (this.props.sort === "xp") {
      sortByType("XP Score")
    }

    let options = {
      chart: {
        background: "#292b2b",
        foreColor: "#fff",
        id: "tb",
        group: "social",
        type: "line",
        height: 350,
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
          enabled: false,
        },
      },
      colors: ["#ffffff"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "12%",
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
        categories: categories,
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            colors: ["#fff"],
          },
        },
      },
      yaxis: [
        {
          title: {
            text: "XP Score",
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
        {
          opposite: true,
          title: {
            // text: 'Employees',
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          labels: {
            show: false,
            style: {
              colors: ["#fff"],
            },
          },
        },
      ],
      annotations: {
        yaxis: [
          {
            y: parseFloat(this.props.avg).toFixed(1),
            borderColor: "#2793ff",
            strokeDashArray: 8,
            label: {
              borderColor: "#2793ff",
              style: {
                color: "#fff",
                background: "#2793ff",
                colors: ["#fff"],
                fontSize: "13px",
                fontWeight: 500,
              },
              text:
                "Organisation XP Score:" +
                parseFloat(this.props.avg).toFixed(1),
              offsetX: 5,
            },
          },
        ],
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ""
          },
          marker: {
            show: false,
          },
        },
      },
    }

    return (
      <div id="wrapper" className="mb-point-c internal-comp">
        <div id="chart-line">
          {/* {" "} */}
          {series[0].data.reduce(
            (previousScore, currentScore, index) =>
              previousScore + currentScore,
            0
          ) <= 0 &&
          series[1].data.reduce(
            (previousScore, currentScore, index) =>
              previousScore + currentScore,
            0
          ) <= 0 ? (
            <NoData />
          ) : (
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={300}
            />
          )}
        </div>
      </div>
    )
  }
}

export default AverageLogins
