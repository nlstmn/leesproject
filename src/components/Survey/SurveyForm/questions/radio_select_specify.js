import React, { useState } from "react"

const RadioSelectSpecify = () => {
  const [isSpecify, setSpecify] = useState(false)

  return (
    <>
      <div className="question_div" id="scroll__that">
        {/* Question Title */}
        <h3 className="main_question">
          Q ― Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua?
        </h3>

        {/* Answers */}
        <div className="form-group right-_bordered">
          <label className="container_radio version_2 survey tt">
            <input
              type="radio"
              name="q22"
              value="1"
              onChange={() => setSpecify(false)}
            />
            <span className="label-_text">
              Quis autem vel eum iure reprehenderit qui
            </span>
            <span className="checkmark"></span>
          </label>
          <label className="container_radio version_2 survey tt">
            <input
              type="radio"
              name="q22"
              value="2"
              onChange={() => setSpecify(false)}
            />
            <span className="label-_text">
              Neque porro quisquam est, qui dolorem ipsum quia dolor
            </span>
            <span className="checkmark"></span>
          </label>
          <label className="container_radio version_2 survey tt">
            <input
              type="radio"
              name="q22"
              value="3"
              onChange={() => setSpecify(false)}
            />
            <span className="label-_text">
              At vero eos et accusamus et iusto odio dignissimos
            </span>
            <span className="checkmark"></span>
          </label>
          <label className="container_radio version_2 survey tt">
            <input
              type="radio"
              name="q22"
              value="4"
              onChange={() => setSpecify(true)}
            />
            <span className="label-_text">Other (please specify)</span>
            <span className="checkmark"></span>
          </label>
          {isSpecify && (
            <textarea
              name="specify"
              id="specify"
              className="form-control fl-textarea"
              placeholder="Et harum quidem rerum facilis est et expedita distinctio."
            ></textarea>
          )}
        </div>
      </div>
    </>
  )
}

export default RadioSelectSpecify
