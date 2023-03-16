import React, { useState } from "react"

const DataCard = ({ title, value, color }) => {
  return (
    <>
      <li>
        <span className="title">{title}</span>
        <span className={`value ${color && color} `}>{value}</span>
      </li>
    </>
  )
}

export default DataCard
