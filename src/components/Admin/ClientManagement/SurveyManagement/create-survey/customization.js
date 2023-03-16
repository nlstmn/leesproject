import React, { useState, useRef, useEffect } from "react"
import { Popover, Drawer } from "antd"
import JoditEditor from "jodit-react"
import { CustomizationsInfo } from "../../../../HOC/components/info_contents"

const Customization = ({
  initData,
  setInitData,
  surveyId,
  clientId,
  formData,
  setFormData,
  close,
  send,
}) => {
  const [contentIntro, setContentIntro] = useState("")
  const [contentClosing, setContentClosing] = useState("")
  const [contentWelcome, setContentWelcome] = useState("")
  const [contentPagePopup, setContentPagePopup] = useState("")
  const [selectedPage, setSelectedPage] = useState("")
  const [popupVisible, setPopupVisible] = useState(false)

  const [data, setData] = useState([])

  useEffect(() => {
    setData([
      { name: "intro", value: contentIntro },
      { name: "close", value: contentClosing },
      { name: "welcome_popup", value: contentWelcome },
      { name: `page_${selectedPage}_popup`, value: contentPagePopup },
    ])

    console.log(data)
  }, [
    contentIntro,
    contentClosing,
    contentWelcome,
    contentPagePopup,
    selectedPage,
  ])

  useEffect(() => {
    console.log(
      formData?.customisations?.filter(
        (i) => i.type === "intro" && i.language_id === 12
      )[0]?.label
    )
    setContentIntro(
      formData?.customisations?.filter(
        (i) => i.type === "intro" && i.language_id === 12
      )[0]?.label
    )
    setContentClosing(
      formData?.customisations?.filter(
        (i) => i.type === "close" && i.language_id === 12
      )[0]?.label
    )
    setContentWelcome(
      formData?.customisations?.filter(
        (i) => i.type === "welcome_popup" && i.language_id === 12
      )[0]?.label
    )
    selectedPage &&
      setContentPagePopup(
        formData?.customisations?.filter(
          (i) => i.type === `page_${selectedPage}_popup` && i.language_id === 12
        )[0]?.label || ""
      )
  }, [formData, selectedPage])

  return (
    <>
      {" "}
      <div className="drawer_sc-div create--sr" id="survey-_section">
        <Drawer
          title="Popups"
          placement="right"
          width="30%"
          onClose={() => setPopupVisible(false)}
          visible={popupVisible}
        >
          <div className="col-lg-12 col-md-12 mt-3">
            <div className="form-group">
              <label>Page Popup</label>
              <div className="form-group">
                <select
                  onChange={(e) => {
                    setSelectedPage(e.target.value)
                  }}
                  className="form-control show-tick"
                  //value={selectedLanguage}
                >
                  <option>Select page</option>
                  {formData?.pagesAndQuestions?.pages.map((i) => {
                    return (
                      <option value={i.page_id}>
                        {
                          initData?.pages?.filter((p) => p.id === i.page_id)[0]
                            ?.name
                        }
                      </option>
                    )
                  })}
                </select>
              </div>
              <textarea
                style={{
                  width: "100%",
                  height: "400px",
                  backgroundColor: "#303030",
                  color: "white",
                  fontSize: "20px",
                }}
                onChange={(e) => {
                  setContentPagePopup(e.target.value)
                }}
                value={contentPagePopup}
              ></textarea>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
            &nbsp;&nbsp;
            <button
              onClick={() => {
                send("customisations", data)
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
        </Drawer>
      </div>
      <div className="aspect-tab ">
        <label htmlFor="item-5" className="aspect-label"></label>
        <div className="aspect-content">
          <div className="aspect-info">
            <div className="tab-_status orange"></div>
            <span className="aspect-name">Customisations</span>
          </div>
        </div>
        <div className="">
          <div className="sentiment-wrapper">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 mb-3">
                <h6>Customisations</h6>
                <Popover content={CustomizationsInfo}>
                  <h4 className="more-info-class">
                    <span className="iconx-info-with-circle"></span> More info
                  </h4>
                </Popover>
              </div>
              <div className="col-lg-12 col-md-12 mt-3">
                <div className="form-group">
                  <label>Intro Text</label>
                  <textarea
                    style={{
                      width: "100%",
                      height: "400px",
                      backgroundColor: "#303030",
                      color: "white",
                      fontSize: "20px",
                    }}
                    onChange={(e) => {
                      setContentIntro(e.target.value)
                    }}
                    value={contentIntro}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 mt-3">
                <div className="form-group">
                  <label>Closing Text</label>
                  <textarea
                    style={{
                      width: "100%",
                      height: "400px",
                      backgroundColor: "#303030",
                      color: "white",
                      fontSize: "20px",
                    }}
                    onChange={(e) => {
                      setContentClosing(e.target.value)
                    }}
                    value={contentClosing}
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 mt-3">
                <div className="form-group">
                  <label>Welcome Popup</label>
                  <textarea
                    style={{
                      width: "100%",
                      height: "400px",
                      backgroundColor: "#303030",
                      color: "white",
                      fontSize: "20px",
                    }}
                    onChange={(e) => {
                      setContentWelcome(e.target.value)
                    }}
                    value={contentWelcome}
                  ></textarea>
                </div>
              </div>{" "}
              <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    send("customisations", data)
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
                <button
                  onClick={() => {
                    send("customisations", data)
                    setPopupVisible(true)
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Add Popup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Customization
