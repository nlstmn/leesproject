import React from "react"

export default function tickQuestions({
  render,
  label,
  selections,
  handleActivity,
  handleSpecial,
  id,
  getOptionsById,
  code,
}) {
  return (
    render && (
      <>
        <div className="form-group form-box text-leftt">
          <h4>{label}</h4>
        </div>
        <div className="checkbox clearfix">
          {selections &&
            getOptionsById(id)
              .sort((a, b) => {
                if (a.option_label < b.option_label) return -1
                if (a.option_label > b.option_label) return 1
                return 0
              })
              .map((item) => {
                return (
                  <label
                    className="fancy-checkbox account-checkbox-form"
                    htmlFor={item.option_id}
                  >
                    <input
                      type="checkbox"
                      value={item.option_id}
                      id={item.option_id}
                      checked={selections.includes(item.option_id)}
                      onChange={(e) => {
                        code === "DEMO_PRES"
                          ? handleSpecial(e)
                          : handleActivity(e)
                      }}
                    />
                    <span className="light-black">{item.option_label}</span>
                  </label>
                )
              })}
        </div>
      </>
    )
  )
}
