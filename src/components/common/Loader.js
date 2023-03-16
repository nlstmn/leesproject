import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />

export default function Loader() {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12  leesman-section  text-center">
      <div className="card loading-data-section">
        <div className="body min-h-200">
          <Spin size="large" indicator={antIcon} />
        </div>
      </div>
    </div>
  )
}
