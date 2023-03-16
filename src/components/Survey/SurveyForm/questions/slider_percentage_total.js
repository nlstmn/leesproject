import React, { useEffect, useState } from "react"
import { Range, getTrackBackground } from "react-range"
import { notification } from "antd"
import {
  findQuestionFromTranslations,
  findTranslationFromData,
} from "../../../../util/functions"

const SliderPercentageTotal = ({
  item,
  i,
  arr,
  setTotalValues,
  valuesTotal,
  setPivotData,
  pivotData,
  handleAnswer,
  answers,
  setAnswers,
  currentPage,
  options,
  setNextButtonDisabled,
  selectedLanguageId,
  initData,
  isRTL,
}) => {
  const STEP = 5
  const MIN = 0
  const MAX = 100
  const [values, setValues] = useState([0])
  const [isColor, setColor] = useState(false)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    handleAnswer({
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      page_id: currentPage[0].id,
      survey_page_id: currentPage[0].survey_page_id,

      question_id: item.type === "question" ? item.id : null,
      option_id: item.type === "option" ? item.id : null,
      value: decideValue(
        answers?.filter((i) => i.question_id === item.id)[0]?.value || 0,
        values,
        total
      ),
    })
  }, [values])

  useEffect(() => {
    values[0] !== answers?.filter((i) => i.question_id === item.id)[0]?.value &&
      setValues([
        answers?.filter((i) => i.question_id === item.id)[0]?.value || 0,
      ])
    let t = 0
    answers
      .filter((i) =>
        currentPage[0]?.questions.map((q) => q.id).includes(i.question_id)
      )
      .forEach((i) => {
        t += parseInt(i.value)
      })

    setTotal(t)
    setPivotData(t)
    t === 100 && setNextButtonDisabled(false)
  }, [answers])

  const decideValue = (previousVal, val, total_) => {
    if (total_ < 100) {
      if (val[0] <= total_) {
        return val[0]
      } else if (parseInt(total_) === parseInt(previousVal)) {
        return val[0]
      } else {
        return previousVal
      }
    } else if (previousVal > val[0]) {
      return val[0]
    } else {
      return previousVal - (total_ - 100) > 0 ? previousVal - (total_ - 100) : 0
    }
  }

  return (
    <>
      <div
        className={`form-group survey-slider-item ${
          i === 0 ? " first-_itm" : arr.length - 1 === i ? " last-_itm" : " "
        } `}
        key={item.id}
      >
        <div className="slider__div survey-_slider">
          <p>
            {findTranslationFromData(
              item.id,
              item.label,
              selectedLanguageId,
              initData
            )}
          </p>
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            rtl={isRTL}
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
                      rtl: isRTL,
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
            {`${values[0]}%`}
          </div>
        </div>
      </div>
    </>
  )
}

export default SliderPercentageTotal
