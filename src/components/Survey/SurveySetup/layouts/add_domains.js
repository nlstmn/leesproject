import React, { useState } from "react"

function AddDomains() {
  const [inputList, setInputList] = useState([{ domainName: "" }])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const handleRemoveClick = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  const handleAddClick = () => {
    setInputList([...inputList, { domainName: "" }])
  }

  return (
    <>
      {inputList.map((x, i) => {
        return (
          <>
            <div className="add_fields_row">
              <div className="form-group add_bottom_30">
                <div className="fl-wrap fl-wrap-input fl-is-required">
                  <input
                    type="text"
                    value={x.domainName}
                    onChange={(e) => handleInputChange(e, i)}
                    name="domainName"
                    className="form-control required fl-input"
                    placeholder="Type your answer here..."
                  />
                </div>
              </div>

              <div className="fields_btn_group">
                {inputList.length !== 1 && (
                  <button
                    onClick={() => handleRemoveClick(i)}
                    className="btn btn-sm btn-remove-domain"
                    title="Remove domain"
                  >
                    <span className="iconx-minus1"></span>
                  </button>
                )}

                {inputList.length - 1 === i && (
                  <button
                    className="btn btn-sm btn-add-domain"
                    onClick={handleAddClick}
                    title="Add domain"
                  >
                    <span className="iconx-plus1"></span>
                  </button>
                )}
              </div>
            </div>
          </>
        )
      })}
    </>
  )
}

export default AddDomains
