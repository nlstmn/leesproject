import React, { useState } from "react"

const DatasetModalLarge = ({ setDatasetModal, visibleDatasetModal }) => {
  const [isSelect, setSelect] = useState("Building")

  return (
    <>
      {/* MODAL */}
      <div className={`n_modal large ${visibleDatasetModal ? " show" : ""} `}>
        <button onClick={() => setDatasetModal(false)} className="modal__close">
          <span className="cxv-close-l-icn"></span>
        </button>

        <div className="n_modal_body">
          <h3>Create new dataset</h3>

          <div className="n_drawer_body">
            <div className="main__side">
              <div className="left_side">
                <ul>
                  <li
                    className={`${
                      isSelect === "Building" ? " active strong" : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setSelect("Building")
                      }}
                    >
                      Building
                    </button>
                  </li>
                  <li
                    className={`${
                      isSelect === "Department" ? " active strong" : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setSelect("Department")
                      }}
                    >
                      Department
                    </button>
                  </li>
                  <li
                    className={`${
                      isSelect === "Demographics" ? " active strong" : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setSelect("Demographics")
                      }}
                    >
                      Demographics
                    </button>
                  </li>
                  <li
                    className={`${
                      isSelect === "Regions" ? " active strong" : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setSelect("Regions")
                      }}
                    >
                      Regions
                    </button>
                  </li>
                  <li
                    className={`${
                      isSelect === "Industry" ? " active strong" : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setSelect("Industry")
                      }}
                    >
                      Industry
                    </button>
                  </li>
                  <li
                    className={`${
                      isSelect === "Client" ? " active strong" : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setSelect("Client")
                      }}
                    >
                      Client
                    </button>
                  </li>
                  <li
                    className={`${
                      isSelect === "Building info" ? " active strong" : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setSelect("Building info")
                      }}
                    >
                      Building info
                    </button>
                  </li>
                  <li
                    className={`${
                      isSelect === "Work environment" ? " active strong" : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setSelect("Work environment")
                      }}
                    >
                      Work environment
                    </button>
                  </li>
                  <li
                    className={`${
                      isSelect === "Additional questions"
                        ? " active strong"
                        : ""
                    } `}
                  >
                    <button
                      onClick={() => {
                        setSelect("Additional questions")
                      }}
                    >
                      Additional questions
                    </button>
                  </li>
                </ul>
              </div>
              <div className="right_side">
                <div className="scroll_ul">
                  <ul>
                    <li>
                      <label className="dashboard_check default__it">
                        <input type="checkbox" name="q1" value="1" />
                        <span className="label-_text">This is dummy text</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="dashboard_check default__it">
                        <input type="checkbox" name="q1" value="1" />
                        <span className="label-_text">
                          As a simulation of actual copy
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="dashboard_check default__it">
                        <input type="checkbox" name="q1" value="1" />
                        <span className="label-_text">
                          As a simulation of actual copy
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="dashboard_check default__it">
                        <input type="checkbox" name="q1" value="1" />
                        <span className="label-_text">
                          It is intended to be read
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom_side">
            <div>
              <button className="btn-dash dark float-right tt">Next</button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL */}
    </>
  )
}

export default DatasetModalLarge
