import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"

const PieChartHOC = (props) => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpointMAX = 1727
  const breakpointMIN = 1200
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth))
  }, [])

  const options = {
    chart: {
      type: "donut",
      width: "50%",
      fontFamily: "Arial",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        expandOnClick: false,
        donut: {
          size: "65%",
        },
      },
    },
    title: {
      text: "% employees",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY:
        props.offsetY === 105
          ? 100
          : width < breakpointMAX && width > breakpointMIN
          ? 140
          : 150,
      floating: false,
      style: {
        fontSize: "12px",
        fontWeight: "400",
        fontFamily: "Arial",
        color: "#000000",
      },
    },
    colors: ["#f29492", "#a1a5a7", "#8bc6c6"],
    labels: ["Remote-leaning", "Balanced hybrid", "Office-leaning"],
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex]
        return val.toFixed(0) + "%"
      },
      style: {
        fontSize: "11px",
        fontFamily: "Arial",
        fontWeight: "600",
        colors: ["#ffffff", "#ffffff", "#ffffff"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Arial",
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return parseFloat(value * 100).toFixed(0) + "%"
        },
      },
    },
  }
  const [series, setSeries] = useState([0, 0, 0])
  const scaleData = (remote, balanced, office) => {
    let constant = parseFloat(
      1.0 /
        parseFloat(
          parseFloat(Math.abs(remote)) +
            parseFloat(Math.abs(balanced)) +
            parseFloat(Math.abs(office))
        )
    )

    return [
      constant * Math.abs(remote),
      constant * Math.abs(balanced),
      constant * Math.abs(office),
    ]
  }
  useEffect(() => {
    setSeries(
      scaleData(
        props?.data?.remoteLearning,
        props?.data?.balancedHybrid,
        props?.data?.officeLearning
      )
    )
  }, [props.data])

  return (
    <>
      <div id="pie-chart">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={props.height}
        />
      </div>
    </>
  )
}

export default PieChartHOC
