import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { RadialBar } from "@ant-design/plots"

const Chart = () => {
  const data = [
    {
      name: "Office",
      star: 95,
    },
    {
      name: "Home",
      star: 75,
    },
  ]
  const config = {
    data,
    appendPadding: 0,
    xField: "name",
    yField: "star",
    maxAngle: 340,
    radius: 0.8,
    innerRadius: 0.5,
    animation: false,
    xAxis: false,

    colorField: "name",
    color: ({ name }) => {
      if (name === "Office") {
        return "#2B5895"
      } else if (name === "Home") {
        return "#91BEFB"
      }

      return "#ff4d4f"
    },
    annotations: data.map((d) => ({
      type: "html",
      position: [d.name, 0],
      html: `<div class="radial__info">
      <div class="info" style="${
        d.star > 75 ? "color:#33A700" : "color:#CC0000"
      }">${d.star}%</div>
      <div class="line_c">
        <div class="line"></div>
        <div class="dot"></div>
      </div>
    </div>`,
    })),
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
  return (
    <>
      <RadialBar {...config} />
      <div className="radial_legend">
        <ul>
          <li>
            <div className="name">Office</div>
            <div className="dot dark_blue"></div>
          </li>
          <li>
            <div className="name">Home</div>
            <div className="dot light_blue"></div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Chart
