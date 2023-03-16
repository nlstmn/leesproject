import React, { useEffect, useState } from "react"
import { Range, getTrackBackground } from "react-range"

const SliderBuffer = ({ setFormData, formData, name }) => {
  const STEP = 5
  const MIN = 0
  const MAX = 30
  const [values, setValues] = useState([0])

  useEffect(() => {
    setFormData((pre) => {
      return {
        ...pre,
        [name]: String(parseInt(values[0]) / 5),
      }
    })
  }, [values])
  useEffect(() => {
    formData[name] && setValues([formData[name]])
  }, [])
  useEffect(() => {
    formData[name] === 0 && setValues([0])
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
            renderMark={({ props, index }) => (
              <div
                className="slider--render-mark"
                {...props}
                style={{ ...props.style, backgroundColor: "#C4C4C4" }}
              />
            )}
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
                className="slider_thmb square"
                {...props}
                style={{ ...props.style }}
              >
                <div
                  className="middle"
                  style={{ backgroundColor: isDragged ? "#fff" : "#449FDD" }}
                />
              </div>
            )}
          />
          <div className="slider-labels">
            <span>0%</span>
            <span className="middled-labeled">5%</span>
            <span className="middled-labeled">10%</span>
            <span className="middled-labeled">15%</span>
            <span className="middled-labeled">20%</span>
            <span className="middled-labeled">25%</span>
            <span>30%</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SliderBuffer
