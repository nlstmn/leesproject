import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />

export default function Loader({ isMap }) {
  return (
    <Spin
      size="large"
      indicator={antIcon}
      className={`small-_loader ${isMap && " map_loader"} `}
    />
  )
}
