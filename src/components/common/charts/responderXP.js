import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

class responderXP extends Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: "Score",
          data: [33, 42, 12, 11, 3],
        },
      ],
      options: {
        colors: ["#138d3a", "#63b450", "#70777a", "#e95c0c", "#bf1717"],
        chart: {
          height: 350,
          type: "bar",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "60%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          //   textAnchor: 'middle',
          // distributed: false,
          offsetX: 25,
          formatter: function (val, opts) {
            return val + "%"
          },
          style: {
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: ["#70777a"],
          },
        },
        stroke: {
          width: 0,
        },

        grid: {
          row: {
            colors: ["#fff", "#fff"],
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ["Very good", "Good", "Normal", "Bad", "Very bad"],
          //   tickPlacement: 'off',
          show: false,
        },
        yaxis: {
          title: {
            text: "",
          },
          show: false,
        },
        legend: {
          show: false,
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
            name: "Score",
            data: this.props.data,
          },
        ],
        options: {
          colors: ["#138d3a", "#63b450", "#70777a", "#e95c0c", "#bf1717"],
          chart: {
            height: 350,
            type: "bar",
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          plotOptions: {
            bar: {
              columnWidth: "60%",
              distributed: true,
              horizontal: true,
              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            enabled: true,
            //   textAnchor: 'middle',
            // distributed: false,
            offsetX: 25,
            formatter: function (val, opts) {
              return val + "%"
            },
            style: {
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "bold",
              colors: ["#70777a"],
            },
          },
          stroke: {
            width: 0,
          },

          grid: {
            row: {
              colors: ["#fff", "#fff"],
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
            },
            categories: ["Very good", "Good", "Normal", "Bad", "Very bad"],
            //   tickPlacement: 'off',
            show: false,
          },
          yaxis: {
            title: {
              text: "",
            },
            show: false,
          },
          legend: {
            show: false,
          },
        },
      }
    } else {
      data = this.state
    }
    return (
      <div id="chart" className="mb-point-c responder-xp-bar">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          height={200}
        />
        <ul className="respo-xp-icons text-muted top-icons-bar step-by-step">
          <li title="Very good">
            <i
              className="icon_f-very-goodicon_f- chart-_icons"
              title="Very good"
              aria-hidden="true"
            ></i>
          </li>
          <li title="Good">
            <i
              className="icon_f-goodicon_f- chart-_icons"
              title="Good"
              aria-hidden="true"
            ></i>
          </li>
          <li title="Normal">
            <i
              className="icon_f-neutralicon_f- chart-_icons"
              title="Normal"
              aria-hidden="true"
            ></i>
          </li>
          <li title="Bad">
            <i
              className="icon_f-badicon_f- chart-_icons"
              title="Bad"
              aria-hidden="true"
            ></i>
          </li>
          <li title="Very bad">
            <i
              className="icon_f-very-badicon_f- chart-_icons"
              title="Very bad"
              aria-hidden="true"
            ></i>
          </li>
        </ul>
      </div>
    )
  }
}

export default responderXP
