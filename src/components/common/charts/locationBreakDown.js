import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan
const exportFileName = "Location breakdown"

class LocationBreakDown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [],
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
        colors: ["#bf1717", "#1d8739"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "15%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          //   type: 'datetime',
          categories: ["loading"],
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
        },
        yaxis: {
          opposite: false,
          reversed: false,
          logarithmic: false,
          labels: {
            style: {
              colors: ["#fff"],
            },
          },
          title: {
            text: "Comments",
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          // min: 0,
          // max: 100
        },
        legend: {
          show: true,
        },
        fill: {
          opacity: 1,
        },
        labels: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    }
  }
  render() {
    let series =
      this.props.data && this.props.data.series
        ? this.props.data.series
        : this.state.series
    let categories =
      this.props.data && this.props.data.categories
        ? this.props.data.categories
        : []
    let options = {
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
      colors: ["#bf1717", "#1d8739"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "15%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        //   type: 'datetime',
        categories: categories,
        labels: {
          rotate: 0,
          trim: true,
          formatter: (e) => {
            let words = e.toString().split(" ")
            let w = ""

            words.forEach((i, index) => {
              if (index % 3 === 0 && index !== 0) {
                w += "|"
              }
              w += i + " "
            })

            return w.split("|")
          },
          style: {
            colors: ["#fff"],
          },
        },
      },
      yaxis: {
        opposite: false,
        reversed: false,
        logarithmic: false,
        title: {
          text: "Comments",
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
        // min: 0,
        // max: 100
      },
      legend: {
        show: true,
      },
      fill: {
        opacity: 1,
      },
      labels: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    }
    return (
      <div id="chart" className="mb-point-c have-filter-btn">
        {series.length === 0 ? (
          <NoData />
        ) : (
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height="250px"
            // className="hide-y-numbers"
          />
        )}
      </div>
    )
  }
}

export default LocationBreakDown
