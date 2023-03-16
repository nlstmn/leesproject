import React, { useState } from "react"

const SummaryInfo = () => {
  return (
    <>
      <div className="col-lg-12">
        <div className="n_list c_2 min__height405">
          <ul>
            <li>
              <span className="n_title">Number of buildings</span>
              <span className="n_result n_strong xxl">5</span>
            </li>
            <li>
              <span className="n_title">Employees invited</span>
              <span className="n_result n_strong xxl">2,679</span>
            </li>
            <li>
              <span className="n_title">Employee responses</span>
              <span className="n_result n_strong xxl">1,768</span>
            </li>
            <li>
              <span className="n_title">Response rate</span>
              <span className="n_result n_strong xxl">66%</span>
            </li>
            <li>
              <span className="n_title">Lmi / 100</span>
              <span className="n_result n_strong xxl green">66.4</span>
            </li>
            <li>
              <span className="n_title">H-Lmi / 100</span>
              <span className="n_result n_strong xxl red">64.6</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default SummaryInfo
