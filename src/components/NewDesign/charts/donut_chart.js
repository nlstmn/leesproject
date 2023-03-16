import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { Pie, measureTextWidth, G2 } from "@ant-design/plots"

const DonutChart = ({ isItemNumber, hasLines }) => {
  const G = G2.getEngine("canvas")
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    )
    const R = containerWidth / 2 // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      )
    }

    const textStyleStr = `width:${containerWidth}px;`
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : "inherit"
    };">${text}</div>`
  }

  const data = [
    {
      type: "My organisations’s workplace(s)",
      value: 10,
    },
    {
      type: "Serviced offices or co-working spaces",
      value: 50,
    },
    {
      type: "Other workplaces (e.g.) those of clients, partners or suppliers)",
      value: 4,
    },
    {
      type: "Home",
      value: 20,
    },
    {
      type: "Working while travelling",
      value: 14,
    },
    {
      type: "Other location(s)",
      value: 2,
    },
  ]

  const data2 = [
    {
      type: "My organisations’s workplace(s)",
      value: 41,
    },
    {
      type: "Serviced offices or co-working spaces",
      value: 35,
    },
    {
      type: "Other workplaces (e.g.) those of clients, partners or suppliers)",
      value: 15,
    },
    {
      type: "Home",
      value: 9,
    },
  ]

  const data3 = [
    {
      type: "Yes",
      value: 46,
    },
    {
      type: "No, but I book it in advance",
      value: 29,
    },
    {
      type: "No, I use it when it’s unoccupied (without booking) ",
      value: 25,
    },
  ]

  const config = {
    appendPadding: isItemNumber === 3 ? 60 : isItemNumber === 4 ? 50 : 40,
    data: isItemNumber === 3 ? data3 : isItemNumber === 4 ? data2 : data,
    angleField: "value",
    colorField: "type",
    color:
      isItemNumber === 2
        ? ["#4793F8", "#2B5895", "#91BEFB"]
        : isItemNumber === 4
        ? ["#2B5895", "#91BEFB", "#DAE9FE", "#4793F8"]
        : ["#2B5895", "#4793F8", "#91BEFB", "#444749", "#71777A", "#AAADAF"],
    radius: 1,
    innerRadius: 0.8,
    pieStyle: {
      stroke: "white",
      lineWidth: 3,
    },
    legend: false,
    animation: false,
    meta: {
      value: {
        formatter: (v) => `${v} ¥`,
      },
    },

    label: hasLines
      ? {
          type: "spider",
          labelHeight: 0,
          autoHide: false,
          autoRotate: false,
          formatter: (data, mappingData) => {
            const group = new G.Group({})
            //   group.addShape({
            //     type: 'circle',
            //     attrs: {
            //       x: 0,
            //       y: 0,
            //       width: 40,
            //       height: 50,
            //       r: 5,
            //       fill: mappingData.color,
            //     },
            //   });
            //   group.addShape({
            //     type: 'text',
            //     attrs: {
            //       x: 10,
            //       y: 8,
            //       text: `${data.type}`,
            //       fill: mappingData.color,
            //     },
            //   });
            group.addShape({
              type: "text",
              attrs: {
                x: 0,
                y: 0,
                text: `${parseFloat(data.percent * 100).toFixed(0)}%`,
                fill: "#1E1E1E",
                fontWeight: 700,
                fontSize: 14,
              },
            })
            return group
          },
        }
      : false,
    statistic: !hasLines
      ? {
          title: {
            offsetY: -4,
            customHtml: (container, view, datum) => {
              const { width, height } = container.getBoundingClientRect()
              const d = Math.sqrt(
                Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
              )
              const text = `${9.8}` + `<span> / ${21}</span>`
              // const text = datum ? datum.type : '总计';
              return renderStatistic(d, text, {
                fontSize: 35,
                fontWeight: 700,
              })
            },
          },
          content: {
            offsetY: 4,
            style: {
              fontSize: "32px",
            },
            customHtml: (container, view, datum, data) => {
              const { width } = container.getBoundingClientRect()
              // const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
              const text = "Average number of activities"
              return renderStatistic(width, text, {
                fontSize: 12,
                fontWeight: 400,
              })
            },
          },
        }
      : {
          title: false,
          content: false,
        },

    interactions: [
      {
        type: "element-selected",
        enable: false,
      },
      {
        type: "element-active",
        enable: false,
      },
      {
        type: "pie-statistic-active",
        enable: false,
      },
      {
        type: "tooltip",
        enable: false,
      },
      {
        type: "animation",
        enable: false,
      },
    ],
  }
  return <Pie {...config} />
}

export default DonutChart
