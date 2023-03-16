import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import ApexCharts from "apexcharts"
import moment from "moment"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

export default function SiScore(props) {
  const [series, setSeries] = useState([
    {
      name: "Comments Score",
      data: [0],
    },
    {
      name: "",
      data: [0],
    },
    {
      name: "",
      data: [0],
    },
  ])
  const [options, setOptions] = useState({
    chart: {
      background: "#292b2b",
      foreColor: "#fff",
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: "Comments Score",
          },
          svg: {
            filename: "Comments Score",
          },
          png: {
            filename: "Comments Score",
          },
        },
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#fff", "#bf1717"],
    dataLabels: {
      enabled: true,
      enabledOnSeries: false,
      formatter: function (val) {
        if (val == null) {
        } else {
          return val + "%"
        }
      },
      textAnchor: "middle",
      distributed: false,
      offsetX: 0,
      offsetY: -8,
      style: {
        fontSize: "11px",
        fontFamily: "Source Sans Pro, Arial, sans-serif",
        fontWeight: "300",
        colors: undefined,
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 5,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: "#2793ff",

        opacity: 0,
        //   OPACITY DEĞERİ ARTARSA BACKGROUND ORATAYA ÇIKACAKTIR

        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0,
      },
    },
    stroke: {
      curve: "smooth",
      width: [2, 0, 0],
    },
    // title: {
    //   text: 'Average High & Low Temperature',
    //   align: 'left'
    // },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 20,
      },
    },
    markers: {
      size: [0, 5, 5],
      colors: ["#bf1717", "#bf1717", "#119336"],
      strokeColors: "transparent",
      strokeWidth: 0,
      hover: {
        size: 5,
        // sizeOffset: 3
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
      ],
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: ["#fff"],
        },
      },
      //   title: {
      //     text: 'Month'
      //   }
    },
    yaxis: {
      title: {
        text: "Comments Score",
        style: {
          colors: ["#fff"],
          fontSize: "14px",
          fontFamily: "Source Sans Pro, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-yaxis-label",
        },
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + "%"
        },
        style: {
          colors: ["#fff"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      // min: 5,
      // max: 40
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  })

  useEffect(() => {
    let series_ = props.data && props.data.series ? props.data.series : series
    setSeries(series_)

    let categories_ =
      props.data && props.data.categories ? props.data.categories : []
    setOptions({
      chart: {
        background: "#292b2b",
        foreColor: "#fff",
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: true,
          export: {
            csv: {
              filename: "Comments Score",
            },
            svg: {
              filename: "Comments Score",
            },
            png: {
              filename: "Comments Score",
            },
          },
        },
        animations: {
          enabled: categories_.length <= 15 ? true : false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#fff", "#bf1717"],
      dataLabels: {
        enabled: true,
        enabledOnSeries: false,
        formatter: function (val) {
          if (val == null) {
          } else {
            return parseFloat(val).toFixed(1) + "%"
          }
        },
        textAnchor: "middle",
        distributed: false,
        offsetX: 0,
        offsetY: -8,
        style: {
          fontSize: "11px",
          fontFamily: "Source Sans Pro, Arial, sans-serif",
          fontWeight: "300",
          colors: undefined,
        },
        background: {
          enabled: true,
          foreColor: "#fff",
          padding: 5,
          borderRadius: 0,
          borderWidth: 1,
          borderColor: "#2793ff",

          opacity: 0,
          //   OPACITY DEĞERİ ARTARSA BACKGROUND ORATAYA ÇIKACAKTIR

          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0,
          },
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0,
        },
      },
      stroke: {
        curve: "smooth",
        width: [2, 0, 0],
      },
      // title: {
      //   text: 'Average High & Low Temperature',
      //   align: 'left'
      // },
      grid: {
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 20,
        },
      },
      markers: {
        size: [0, 5, 5],
        colors: ["#fff", "#fff", "#fff"],
        strokeColors: "transparent",
        strokeWidth: 0,
        hover: {
          size: 5,
          // sizeOffset: 3
        },
      },

      xaxis: {
        tickAmount:
          categories_.length >= 90
            ? 4
            : categories_.length < 90 && categories_.length >= 30
            ? 6
            : categories_.length < 30 && categories_.length >= 20
            ? 8
            : 12,
        categories: categories_.map((item) => moment(item).format("DD MMM")),
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            colors: ["#fff"],
          },
        },
        //   title: {
        //     text: 'Month'
        //   }
      },
      yaxis: {
        title: {
          text: "Comments Score",
          style: {
            colors: ["#fff"],
            fontSize: "14px",
            fontFamily: "Source Sans Pro, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
        labels: {
          show: true,
          formatter: function (val) {
            return parseFloat(val).toFixed(1) + "%"
          },
          style: {
            colors: ["#fff"],
          },
        },
        dataLabels: {
          enabled: false,
        },
        // min: 5,
        // max: 40
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    })
    ApexCharts.exec(
      "siScore",
      "updateOptions",
      {
        xaxis: {
          categories: categories_.map((item) => moment(item).format("DD MMM")),
        },
      },
      false,
      true
    )

    ApexCharts.exec(
      "siScore",
      "updateSeries",
      [
        {
          data: series_,
        },
      ],
      true
    )
  }, [props])

  return (
    <div id="chart" className="mb-point-c comments-_chart">
      {props?.data?.categories?.length >= 1 ? (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height="220px"
        />
      ) : (
        <NoData />
      )}
    </div>
  )
}
