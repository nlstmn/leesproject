import React, { useState, useEffect } from "react"
import { Range, getTrackBackground } from "react-range"
import {
  findQuestionFromTranslations,
  findTranslationFromData,
} from "../../../../util/functions"

const SliderPercentage = ({
  item,
  i,
  arr,
  handleAnswer,
  currentPage,
  answers,
  selectedLanguageId,
  initData,
  setAnswers,
  isRTL,
}) => {
  const STEP = 10
  const MIN = 0
  const MAX = 100
  const [values, setValues] = useState([
    answers?.filter(
      (i) =>
        i.question_id === item.question_id &&
        i.option_id === item.id &&
        i.page_id === currentPage[0].id
    )[0]?.value || 0,
  ])
  useEffect(() => {
    setValues([
      answers?.filter(
        (i) =>
          i.question_id === item.question_id &&
          i.option_id === item.id &&
          i.page_id === currentPage[0].id
      )[0]?.value || 0,
    ])
  }, [currentPage[0].id])
  const [isColor, setColor] = useState(false)

  const handleOptionAnswer = (answer) => {
    let currentAnswers = answers
    let sameAnswer = currentAnswers.filter(
      (i) =>
        i.page_id === currentPage[0].id &&
        i.question_id === item.question_id &&
        i.option_id === item.id
    )

    if (sameAnswer.length > 0) {
      currentAnswers = currentAnswers.filter(
        (i) =>
          i.page_id !== currentPage[0].id ||
          i.question_id !== item.question_id ||
          i.option_id !== item.id
      )
    }

    currentAnswers = [...currentAnswers, answer]
    setAnswers([...currentAnswers])
  }

  useEffect(() => {
    handleOptionAnswer({
      module_id: currentPage[0].survey_module_id,
      page_group_id: currentPage[0].page_group_id,
      page_id: currentPage[0].id,
      survey_page_id: currentPage[0].survey_page_id,
      type: "continuous",
      question_id: item.type === "question" ? item.id : item.question_id,
      option_id: item.type === "option" ? item.id : null,
      value: values[0],
    })
  }, [values])

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

export default SliderPercentage
