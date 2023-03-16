import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"
import moment from "moment"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

class ExperienceScore extends Component {
  constructor(props) {
    super(props)

    this.state = {
      xpLineShow: true,
      series: [
        {
          name: "Employees",
          type: "column",
          data: [0],
        },
        {
          name: "XP Score",
          type: "line",
          data: [0],
        },
        {
          name: "Moving average XP",
          type: "line",
          data: [0],
        },
      ],
      options: {
        width: "100%",
        chart: {
          background: "#292b2b",
          foreColor: "#fff",
          height: 350,
          type: "line",
          toolbar: {
            show: true,
            export: {
              csv: {
                filename: "XP Score over time",
              },
              svg: {
                filename: "XP Score over time",
              },
              png: {
                filename: "XP Score over time",
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
        colors: ["#70777a", "#2793ff", "#fff"],
        stroke: {
          width: [0, 1],
        },
        // title: {
        //   text: 'Traffic Sources'
        // },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [1],
        },
        markers: {
          size: 5,
          colors: ["#fff", "#2793ff"],
          strokeColors: "transparent",
          strokeWidth: 0,
          hover: {
            size: 5,
            // sizeOffset: 3
          },
        },

        // labels: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan'],
        xaxis: {
          //   type: 'datetime'
          categories: ["Loading"],
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
              text: "Employees",
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
        ],
      },
    }
  }

  render() {
    let categories =
      this.props.data && this.props.data.weeks ? this.props.data.weeks : []
    let options = {
      width: "100%",
      chart: {
        background: "#292b2b",
        foreColor: "#fff",
        height: 350,
        type: "line",
        toolbar: {
          show: true,
          export: {
            csv: {
              filename: "XP Score over time",
            },
            svg: {
              filename: "XP Score over time",
            },
            png: {
              filename: "XP Score over time",
            },
          },
        },
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: categories.length < 30 ? true : false,
        },
        events: {
          legendClick: (chartContext, seriesIndex, config) => {
            console.log("series- " + seriesIndex + "'s legend was clicked")
            if (seriesIndex === 1) {
              this.setState({ xpLineShow: !this.state.xpLineShow })
            }
          },
        },
      },
      colors: ["#70777a", "#fff", "#2793ff"],
      stroke: {
        width: [0, 1],
      },
      // title: {
      //   text: 'Traffic Sources'
      // },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],
      },
      markers: {
        size: categories.length < 30 ? 5 : 0,
        colors: ["#2793ff", "#fff"],
        strokeColors: "transparent",
        strokeWidth: 0,
        hover: {
          size: 5,
          // sizeOffset: 3
        },
      },

      // labels: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan'],
      xaxis: {
        //   type: 'datetime'
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
      yaxis: [
        {
          title: {
            text: "Employees",
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          labels: {
            formatter: (e) => {
              return parseFloat(e).toFixed(0)
            },
            style: {
              colors: ["#fff"],
            },
          },
        },
        {
          opposite: true,
          min: 0,
          max: 100,
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
            show: this.state.xpLineShow ? true : false,
            style: {
              colors: ["#fff"],
            },
          },
        },
        {
          opposite: true,
          min: 0,
          max: 100,
          title: {
            text: this.state.xpLineShow ? "" : "XP Score",
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          labels: {
            show: this.state.xpLineShow ? false : true,
            style: {
              colors: ["#fff"],
            },
          },
        },
      ],
    }

    let series =
      this.props.data && this.props.data.series
        ? this.props.data.series
        : this.state.series

    return (
      <div id="chart">
        {this.props.data && categories.length >= 1 ? (
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height="250px"
            className="chart-number-blue left-side-chart mb-point-c have-filter-btn xp-_xhart"
          />
        ) : (
          <NoData />
        )}
      </div>
    )
  }
}

export default ExperienceScore
