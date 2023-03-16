import React, { useState } from "react"

function AddIp() {
  const [inputList, setInputList] = useState([{ departmentName: "" }])

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { departmentName: "" }])
  }

  return (
    <>
      {inputList.map((x, i) => {
        return (
          <>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    value={x.departmentName}
                    onChange={(e) => handleInputChange(e, i)}
                    name="departmentName"
                    className="form-control"
                    placeholder="For example; 192.168.1.1"
                  />
                </div>
              </div>
              {inputList.length !== 1 && (
                <div className="col-lg-6 col-md-6">
                  <button
                    onClick={() => handleRemoveClick(i)}
                    className="btn btn-sm btn-default"
                    title=""
                  >
                    Remove
                  </button>
                </div>
              )}

              {inputList.length - 1 === i && (
                <div className="col-lg-6 col-md-6">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handleAddClick}
                  >
                    Add IP
                  </button>
                </div>
              )}
            </div>
          </>
        )
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </>
  )
}

export default AddIp
