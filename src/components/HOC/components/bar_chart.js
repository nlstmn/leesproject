import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

const BarChartHOC = (props) => {
  const [series, setSeries] = useState([
    {
      name: "Expected Load",
      data: [570, 570, 570],
    },
    {
      name: "Level Load",
      data: [481, 717, 765],
    },
  ])
  const [options, setOptions] = useState({})

  useEffect(() => {
    const dataPeak = props?.data
      ?.map((i) => i["Peak Load"]?.toFixed(0) || 0)
      .reverse()
    const dataLevel = props?.data
      ?.map((i) => i["Level Load"]?.toFixed(0))
      .reverse()
    let d = [
      {
        name: "Expected Load",
        data: dataPeak,
      },
      {
        name: "Level Load",
        data: dataLevel,
      },
    ]
    console.log(d)
    setSeries([...d])
    setOptions({
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
        fontFamily: "Arial",
      },
      colors: ["#009BDC", "#92CDEE"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#000000"],
          fontFamily: "Arial",
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Mon", "Tues", "Wed", "Thurs", "Fri"],
        labels: {
          style: {
            fontFamily: "Arial",
          },
        },
      },
      yaxis: {
        title: {
          text: "Employees",
          style: {
            fontFamily: "Arial",
          },
        },

        labels: {
          formatter: function (val) {
            return val.toFixed(0)
          },
          style: {
            fontFamily: "Arial",
          },
        },
        max:
          dataLevel?.length === 0
            ? 10
            : Math.ceil((Math.max(...dataPeak) + 10) / 10) * 10,
      },
      fill: {
        opacity: 1,
      },
      legend: {
        fontFamily: "Arial",
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          },
        },
      },
    })
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 300)
  }, [props.data])

  return (
    <>
      <div id="bar-chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={props.height}
        />
      </div>
    </>
  )
}

export default BarChartHOC
