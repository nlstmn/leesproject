import React from "react"
import { Range, getTrackBackground } from "react-range"

const SliderPercentage = ({
  name,
  setFormData,
  formData,
  info,
  valuePercentage,
  checkPercentage,
}) => {
  const STEP = 1
  const MIN = 0
  const MAX = 100

  const decideValue = (previousVal, val, check) => {
    console.log(previousVal, val, check)
    if (check < 100) {
      if (val[0] <= check) {
        return val[0]
      } else if (parseInt(check) === parseInt(previousVal)) {
        return val[0]
      } else {
        return previousVal
      }
    } else if (previousVal > val[0]) {
      return val[0]
    } else {
      return previousVal - (check - 100) > 0 ? previousVal - (check - 100) : 1
    }
  }

  return (
    <>
      <div className="form-group survey-slider-item labeled_-survey mt-3">
        <div className="slider__div w-t-info">
          <div className="slider-labels">
            <span>{info}</span>
            <span>{formData[name] + "%"}</span>
          </div>
          <Range
            values={[formData[name]]}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={(value) => {
              setFormData((pre) => {
                console.log(pre)
                return {
                  ...pre,
                  [name]: decideValue(pre && pre[name], value, checkPercentage),
                }
              })
            }}
            renderTrack={({ props, children }) => (
              <div className="slider--line" style={{ ...props.style }}>
                <div
                  className="slider--line-track"
                  ref={props.ref}
                  style={{
                    background: getTrackBackground({
                      values: [formData[name]],
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
              </div>
            )}
          />
        </div>
      </div>
    </>
  )
}

export default SliderPercentage
