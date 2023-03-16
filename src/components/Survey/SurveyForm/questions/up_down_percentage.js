import React, { useState } from "react"

const UpDown = ({ item, i, arr }) => {
  let [num, setNum] = useState(0)
  let incNum = () => {
    if (num < 100) {
      setNum(Number(num) + 1)
    }
  }
  let decNum = () => {
    if (num > 0) {
      setNum(num - 1)
    }
  }
  let handleChange = (e) => {
    setNum(e.target.value)
  }

  return (
    <>
      <div
        className={`up_down_item ${arr.length - 1 === i ? " last_itm" : " "}`}
        key={item.id}
      >
        <div className="label">
          <div className="label_p">
            <span className="strong">{item.title}</span>
            &nbsp;– {item.label}
          </div>
        </div>
        <div className="buttons">
          <button
            type="button"
            onClick={incNum}
            id="hover-_hand"
            className="up"
          >
            <span className="cxv-expand-less-l-icn"></span>
          </button>
          <button
            type="button"
            onClick={decNum}
            id="hover-_hand"
            className="down"
          >
            <span className="cxv-expand-more-l-icn"></span>
          </button>
        </div>
        <div className="result">
          <input
            value={num}
            onChange={handleChange}
            type="number"
            className="form_control"
          ></input>
          <span>%</span>
        </div>
      </div>
    </>
  )
}

export default UpDown
