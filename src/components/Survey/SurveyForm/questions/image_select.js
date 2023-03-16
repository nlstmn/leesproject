/* eslint-disable jsx-a11y/alt-text */
import React from "react"

const ImageSelect = () => {
  return (
    <>
      <div className="question_div" id="scroll__that">
        {/* Question Title */}
        <h3 className="main_question">
          Q ― Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua?
        </h3>

        {/* Answers */}
        <div className="form-group">
          <div className="line-radio-select image-_select">
            <div className="radio__item">
              <input
                type="radio"
                id="image_radio_01"
                name="image_radio_select"
                value="1"
              />
              <label htmlFor="image_radio_01">
                <img src="/assets/images/temp/1.jpg"></img>
              </label>
            </div>
            <div className="radio__item">
              <input
                type="radio"
                id="image_radio_02"
                name="image_radio_select"
                value="2"
              />
              <label htmlFor="image_radio_02">
                <img src="/assets/images/temp/2.jpg"></img>
              </label>
            </div>
            <div className="radio__item">
              <input
                type="radio"
                id="image_radio_03"
                name="image_radio_select"
                value="3"
              />
              <label htmlFor="image_radio_03">
                <img src="/assets/images/temp/3.jpg"></img>
              </label>
            </div>
            <div className="radio__item">
              <input
                type="radio"
                id="image_radio_04"
                name="image_radio_select"
                value="4"
              />
              <label htmlFor="image_radio_04">
                <img src="/assets/images/temp/4.jpg"></img>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageSelect
