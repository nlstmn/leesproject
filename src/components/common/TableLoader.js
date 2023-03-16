import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />

export default function TableLoader() {
  return (
    <div className="table-_loader">
      <Spin size="large" indicator={antIcon} />
    </div>
  )
}
