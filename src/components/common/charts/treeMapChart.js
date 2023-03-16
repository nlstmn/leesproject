import React, { useState, useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import ApexCharts from "apexcharts"
import NoData from "../noData"

// Make date formats on all charts like this
// 01 Jan    02 Jan    03 Jan    04 Jan

export default function TreeMapChart(props) {
  const [series, setSeries] = useState([
    {
      data: [
        {
          x: "loading",
          y: 1.2,
        },
      ],
    },
  ])
  const [options, setOptions] = useState({
    legend: {
      show: false,
    },
    chart: {
      height: 350,
      id: "treeChartGraph",
      type: "treemap",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
    },
    // title: {
    //   text: 'Treemap with Color scale'
    // },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      formatter: function (text, op) {
        return [text, op.value]
      },
      offsetY: -4,
    },
    plotOptions: {
      treemap: {
        useFillColorAsStroke: false,
        enableShades: false,
        shadeIntensity: 1,
        reverseNegativeShade: false,
        distributed: false,
        colorScale: {
          ranges: [
            { from: 0, to: 14, color: "#bf1717" },
            { from: 14.001, to: 28, color: "#e95c0c" },
            { from: 28.001, to: 42, color: "#f5a04c" },
            { from: 42.001, to: 56, color: "#ffe054" },
            { from: 56.001, to: 68, color: "#b6d484" },
            { from: 68.001, to: 82, color: "#63b450" },
            { from: 82.001, to: 100, color: "#119336" },
          ],
        },
      },
    },
  })

  useEffect(() => {
    console.log(props.data)
    let series_ = props.data && props.data.series ? props.data.series : series
    let options_ =
      props.data && props.data.options ? props.data.options : options
    console.log(props.data, series_, options_)
  }, [props])

  return (
    <div id="chart" className="mb-point-c">
      {props.data && props.data.series ? (
        <ReactApexChart
          options={props.data ? props.data.options : options}
          series={props.data ? props.data.series : series}
          type="treemap"
          height="600px"
        />
      ) : (
        <NoData />
      )}
    </div>
  )
}
