import React from "react"
import { Empty } from "antd"

export default function Loader(props) {
  return (
    <div className="no-data-div">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span style={{ color: props?.fontColor || "white" }}>
            Not enough data yet!
          </span>
        }
      />
    </div>
  )
}
