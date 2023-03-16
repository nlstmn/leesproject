import React, { useState } from "react"

const ActivityCard = ({ data }) => {
  return (
    <>
      <div className="n_list c_4">
        <ul>
          <li>
            <span className="n_title n_strong sm">Activities</span>
            <span className="n_title n_strong sm">No.</span>
            <span className="n_title n_strong sm">Lmi</span>
            <span className="n_title n_strong sm">H-Lmi</span>
          </li>

          {/* { id: 1, activity_value:17, activity_label: "Up to 5", no:388, lmi:65.5, lmi_color: "green", hlmi:65.1, hlmi_color: "red"} */}

          {data.map((item) => (
            <>
              <li className={`bordered ${item.left_color} `}>
                <span className="n_result n_strong xl">
                  <div className="result_card">
                    <span className="up_to">{item.activity_label}</span>
                    <span className="percentage">{item.activity_value}%</span>
                  </div>
                </span>
                <span className="n_result n_strong xl">{item.no}</span>
                <span
                  className={`n_result n_strong green xl ${item.lmi_color} `}
                >
                  {item.lmi}
                </span>
                <span className={`n_result n_strong xl ${item.hlmi_color} `}>
                  {item.hlmi}
                </span>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ActivityCard
