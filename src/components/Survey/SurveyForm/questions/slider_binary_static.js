import React, { useState } from "react"
import { Range, getTrackBackground } from "react-range"

const SliderBinaryStatic = ({ item, i, arr }) => {
  const STEP = 1
  const MIN = 1
  const MAX = 3
  const [values, setValues] = useState([1])

  return (
    <>
      <div
        className={`form-group survey-slider-item labeled_-survey ${
          i === 0 ? " first-_itm" : arr.length - 1 === i ? " last-_itm" : " "
        } `}
        key={item.id}
      >
        <div className="slider__div survey-_slider">
          <p>{item.label1}</p>
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
              </div>
            )}
          />
          <p className="text-right">{item.label2}</p>
        </div>
      </div>
    </>
  )
}

export default SliderBinaryStatic
