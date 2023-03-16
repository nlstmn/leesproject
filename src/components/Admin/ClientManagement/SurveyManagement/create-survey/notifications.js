import React, { useEffect, useState } from "react"

const Notifications = ({
  initData,
  setInitData,
  surveyId,
  clientId,
  formData,
  setFormData,
  close,
  send,
}) => {
  const [inputList, setInputList] = useState([{ emailName: "" }])

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
    setInputList([...inputList, { emailName: "" }])
  }

  useEffect(() => {
    let list = [{ emailName: "" }]
    formData?.notification_emails?.length &&
      formData.notification_emails.forEach((i, index) => {
        list.push({ emailName: i.email })
      })
    console.log(list)
    setInputList(list)
  }, [formData])

  return (
    <>
      {/* Client email (text) – to receive daily notifications at 5pm everyday (until survey closes) */}

      <div className="aspect-tab ">
        <label htmlFor="item-6" className="aspect-label"></label>
        <div className="aspect-content">
          <div className="aspect-info">
            <div className="tab-_status green"></div>
            <span className="aspect-name">Survey Notifications</span>
          </div>
        </div>
        <div className="">
          <div className="sentiment-wrapper">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 mb-3">
                <h6>Notifications</h6>
              </div>
              <div className="col-lg-12 col-md-12 add_emails">
                <p className="mb-2">Notification emails</p>
                {inputList?.map((x, i) => {
                  return (
                    <>
                      <div className="add_fields_row">
                        <div className="form-group add_bottom_30">
                          <div className="fl-wrap fl-wrap-input fl-is-required">
                            <input
                              type="text"
                              value={x.emailName}
                              onChange={(e) => handleInputChange(e, i)}
                              name="emailName"
                              className="form-control required fl-input"
                              placeholder="Email..."
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
              </div>
              <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    send(
                      "emails",
                      inputList.map((i) => i.emailName)
                    )
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Save
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    close()
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications
