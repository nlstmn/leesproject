import React, { useState } from "react"

function Notifications() {
  const [inputList, setInputList] = useState([{ userName: "", userEmail: "" }])

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
    setInputList([...inputList, { userName: "", userEmail: "" }])
  }

  return (
    <>
      {inputList.map((x, i) => {
        return (
          <>
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    value={x.userName}
                    onChange={(e) => handleInputChange(e, i)}
                    name="userName"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="form-group">
                  <input
                    type="email"
                    value={x.userEmail}
                    onChange={(e) => handleInputChange(e, i)}
                    name="userEmail"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              {inputList.length !== 1 && (
                <div className="col-lg-4 col-md-4">
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
                <div className="col-lg-4 col-md-4">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handleAddClick}
                  >
                    Add another
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

export default Notifications
