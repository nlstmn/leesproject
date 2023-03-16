import React, { useState } from "react"
import { Range, getTrackBackground } from "react-range"

const SliderBinary = ({ item, i, arr }) => {
  const STEP = 1
  const MIN = 0
  const MAX = 5
  const [values, setValues] = useState([0])
  const [isColor, setColor] = useState(false)

  return (
    <>
      <div
        className={`form-group survey-slider-item ${
          i === 0 ? " first-_itm" : arr.length - 1 === i ? " last-_itm" : " "
        } `}
        key={item.id}
      >
        <div className="slider__div survey-_slider">
          <p>{item.option}</p>
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(values) => {
              setValues(values)
            }}
            renderTrack={({ props, children }) => (
              <div
                className="slider--line"
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{ ...props.style }}
              >
                <span className="arrow_line iconx-chevron-left1"></span>
                <div
                  className="slider--line-track"
                  ref={props.ref}
                  style={{
                    background: getTrackBackground({
                      values,
                      colors: ["#4793F8", "#BFC3C5"],
                      min: MIN,
                      max: MAX,
                    }),
                  }}
                >
                  {children}
                </div>
                <span className="arrow_line iconx-chevron-right1"></span>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                className={`slider_thmb ${isDragged && "opacity_it"} `}
                {...props}
                style={{ ...props.style }}
              >
                <div className="middle" />
                {isDragged ? setColor(true) : setColor(false)}
              </div>
            )}
          />
          <div
            className={`slider-value ${"fix-broke-" + values[0]} `}
            style={{ color: isColor ? "#4793F8" : "#1E1E1E" }}
          >
            {`${values[0]}`}
          </div>
        </div>
      </div>
    </>
  )
}

export default SliderBinary
