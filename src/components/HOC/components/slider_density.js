import React, { useEffect, useState } from "react"
import { Range, getTrackBackground } from "react-range"

const SliderDensity = ({ setFormData, formData, name }) => {
  const STEP = 1
  const MIN = 6
  const MAX = 20
  const [values, setValues] = useState([6])
  useEffect(() => {
    console.log(values)
    setFormData((pre) => {
      return {
        ...pre,
        [name]: values[0],
      }
    })
  }, [values])
  useEffect(() => {
    setValues([formData[name]])
  }, [])
  useEffect(() => {
    formData[name] === 5 && setValues([6])
  }, [formData])
  return (
    <>
      <div className="form-group survey-slider-item labeled_-survey mt-3">
        <div className="slider__div">
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(values) => {
              console.log(values)
              setValues(values)
            }}
            renderTrack={({ props, children }) => (
              <div
                className="slider--line"
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{ ...props.style }}
              >
                <div
                  className="slider--line-track"
                  ref={props.ref}
                  style={{
                    background: getTrackBackground({
                      values,
                      colors: ["#449FDD", "#E9E8E8"],
                      min: MIN,
                      max: MAX,
                    }),
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                className="slider_thmb"
                {...props}
                style={{ ...props.style }}
              >
                <div
                  className="middle"
                  style={{ backgroundColor: isDragged ? "#fff" : "#449FDD" }}
                />
                <div
                  className={`thumb_labled ${
                    values[0] <= 6 ? " tr" : values[0] >= 20 ? " tl" : ""
                  }`}
                >
                  {`${values[0]}`}&nbsp;m2/desk
                </div>
              </div>
            )}
          />
          <div className="slider-labels">
            <span>6 m2/desk</span>
            <span>20 m2/desk</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SliderDensity
