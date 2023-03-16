import React, { Component, useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import NoData from "../noData"
import moment from "moment"

export default function IndividualChart({ title, series, categories, key }) {
  const [data, setData] = useState([])
  useEffect(() => {
    let d = {}
    if (series?.length > 0) {
      d = {
        series: [
          {
            name: "% positivity",
            data: series,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "line",
            dropShadow: {
              enabled: false,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
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
          colors: ["#2793ff"],
          dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,
            formatter: function (val) {
              return val + "%"
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
                opacity: 0.45,
              },
            },
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.45,
            },
          },
          stroke: {
            curve: "straight",
            width: 2,
          },
          title: {
            text: title,
            align: "center",
            margin: 0,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: "12px",
              fontWeight: "normal",
              color: "#fff",
            },
          },
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
            size: 5,
            colors: "#2793ff",
            strokeColors: "transparent",
            strokeWidth: 0,
            hover: {
              size: 5,
              // sizeOffset: 3
            },
          },

          xaxis: {
            categories: categories.map((item) => moment(item).format("DD MMM")),
            tooltip: {
              enabled: false,
            },
            //   title: {
            //     text: 'Month'
            //   }
          },
          yaxis: {
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
            labels: {
              show: true,
              formatter: function (val) {
                return val + "%"
              },
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
        },
      }
    }
    setData(d)
  }, [title, series, categories])

  useEffect(() => {
    console.log(data.series)
  }, [data])

  return (
    <div id="chart" className="mb-point-c responsive-_chart">
      {data?.series ? (
        <ReactApexChart
          options={data?.options}
          series={data?.series}
          type="line"
          height="200px"
          key={key}
          // className="hide-y-numbers"
        />
      ) : (
        <NoData />
      )}
    </div>
  )
}
