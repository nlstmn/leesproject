import React, { useState } from "react"
import ReactApexChart from "react-apexcharts"

const Chart = () => {
  const seriesArray = [
    {
      name: "Office",
      data: [66, 74, 73, 60],
    },
    {
      name: "Home",
      data: [74, 60, 66, 73],
    },
  ]

  const [series, setSeries] = useState(seriesArray)

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#2B5895", "#91BEFB"],
    fill: {
      opacity: 1,
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      enabled: false,
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      fontWeight: 600,
      fontFamily: "Helvetica, Arial",
      colors: ["#1E1E1E"],
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return val + "%"
      },
      offsetX: 0,
      offsetY: -35,
      style: {
        fontSize: "14px",
        fontFamily: "Source Sans Pro",
        fontWeight: "600",
        colors: ["#1E1E1E"],
      },
    },
    stroke: {
      colors: ["transparent"],
      width: 5,
    },
    plotOptions: {
      bar: {
        borderRadius: 1,
        horizontal: false,
        expandOnClick: false,
        columnWidth: "40px",
        dataLabels: {
          position: "top",
        },
        // rangeBarOverlap: true,
        // rangeBarGroupRows: false,
        // colors: {
        //     ranges: [{
        //         from: 0,
        //         to: 0,
        //         color: undefined
        //     }],
        //     backgroundBarColors: [],
        //     backgroundBarOpacity: 1,
        //     backgroundBarRadius: 0,
        // },
      },
    },
    xaxis: {
      show: false,
      max: 100,
      categories: [
        "Planned meetings",
        ["Using technical/specialist", "equipment or materials"],
        "Reading",
        ["Individual focused work", "away from your desk"],
      ],
      labels: {
        show: true,
        style: {
          fontSize: "12px",
          fontFamily: "Source Sans Pro",
          fontWeight: "600",
          colors: ["#1E1E1E"],
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      max: 100,
      tickAmount: 4,
      labels: {
        show: true,
        align: "left",
        trim: true,
        style: {
          fontSize: "14px",
          fontFamily: "Source Sans Pro",
          fontWeight: "600",
          colors: ["#1E1E1E"],
        },
        formatter: (val) => {
          return val + "%"
        },
      },
      title: {
        text: "% Support",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#1E1E1E",
          fontSize: "14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-title",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      position: "back",
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    responsive: [
      {
        breakpoint: 1570,
        options: {
          xaxis: {
            labels: {
              rotate: 0,
              rotateAlways: false,
              minHeight: 100,
              maxHeight: 180,
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
    ],
  })

  return (
    <div id="chart">
      <div id="chart" className="center_div">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height="300px"
        />
      </div>
    </div>
  )
}

export default Chart
