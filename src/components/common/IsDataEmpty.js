import React from "react"
import { Empty } from "antd"
export default function IsDataEmpty() {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12  leesman-section  text-center">
      <div className="card no-data-section">
        <div className="body min-h-290">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>Not enough data yet!</span>}
          />
        </div>
      </div>
    </div>
  )
}
