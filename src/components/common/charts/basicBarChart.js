import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
export default function BasicBarChart(props) {
  const [options, setOptions] = useState([])
  const [series, setSeries] = useState([])
  useEffect(() => {
    props?.data?.calc?.series &&
      setSeries([
        {
          data: props.data.calc.series,
        },
      ])
    props?.data?.calc?.series &&
      setOptions({
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
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
        xaxis: {
          categories: props.data.calc.categories,
        },
      })
    console.log(props.data, series, options)
  }, [props.data])

  return (
    props?.data && (
      <>
        <h6 className="chart-h6-title">{props?.data?.question}</h6>{" "}
        {series[0]?.data?.length && (
          <Chart
            options={options}
            series={series}
            type="bar"
            height={200 + series[0]?.data?.length * 20}
          />
        )}
      </>
    )
  )
}
