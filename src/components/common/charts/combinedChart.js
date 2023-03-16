import React, { Component, useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import moment from "moment"
import NoData from "../noData"
import randomColor from "randomcolor"

export default function CombinedChart({ data }) {
  const [buffer, setBuffer] = useState([])
  useEffect(() => {
    let d = {
      series: data?.map((i) => {
        return {
          name: i.title,
          data: i.series,
        }
      }),
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: true,
          },
          animations: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [1, 1, 1, 1, 1],
          curve: "straight",
          dashArray: [0, 0, 0, 0, 0],
        },
        colors: data.map((i) => {
          return randomColor()
        }),
        //   title: {
        //     text: 'Page Statistics',
        //     align: 'left'
        //   },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              "%"
            )
          },
        },
        markers: {
          size: 5,
          hover: {
            size: 5,
            // sizeOffset: 3
          },
          strokeWidth: 0,
        },
        xaxis: {
          categories: data[0]?.categories?.map((item) =>
            moment(item).format("DD MMM")
          ),
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          // labels: {
          //   formatter: function (val) {
          //     return (val / 1000000).toFixed(0);
          //   },
          // },
          title: {
            text: "% positivity",
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        tooltip: {
          y: data.map((i) => {
            return {
              title: {
                formatter: function (val) {
                  return val + " %"
                },
              },
            }
          }),
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    }
    setBuffer(d)
    console.log(d)
  }, [data])
  return buffer?.series?.length > 0 ? (
    <div id="chart" className="mb-point-c line-chart-apex responsive-_chart">
      <ReactApexChart
        options={buffer?.options}
        series={buffer?.series}
        type="line"
        height={300}
      />
    </div>
  ) : (
    <NoData />
  )
}
