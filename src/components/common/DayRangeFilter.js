import React, { useState } from "react"
import { DatePicker } from "antd"
import moment from "moment"

const { RangePicker } = DatePicker
const dateFormat = "DD/MM/YYYY"

// Show the dates that are currently applied (for all)
// Dont select/active after today
// Select minimum 7 days

const DayRangeFilter = () => {
  const disabledDate = (current) => {
    return current > moment()
  }

  return (
    <RangePicker
      className="takvim-select"
      disabledDate={disabledDate}
      showToday
      defaultValue={[
        moment("2021/02/10", dateFormat),
        moment("2021/02/20", dateFormat),
      ]}
      format={dateFormat}
    />
  )
}

export default DayRangeFilter
