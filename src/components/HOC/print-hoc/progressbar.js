/* eslint-disable jsx-a11y/alt-text */
import React from "react"

export default function progressbar({ icon, title, value }) {
  return (
    <div className="print-prg">
      <div className="prg-_icon">
        <img src={icon}></img>
      </div>
      <div className="print-_progress">
        <div className="pr_infos">
          <p className="score-title-left">{title}</p>
          <p className="score-title-right">{value}%</p>
        </div>

        <div className="progress progress-xs">
          <div
            className="progress-bar progress-bar-blue"
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: value + "%" }}
          ></div>
        </div>
      </div>
    </div>
  )
}
