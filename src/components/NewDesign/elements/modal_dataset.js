import React, { useState } from "react"

const DatasetModal = ({ setDatasetModal, visibleDatasetModal }) => {
  return (
    <>
      {/* MODAL */}
      {visibleDatasetModal && (
        <div
          onClick={() => setDatasetModal(false)}
          className="n_modal_bg"
        ></div>
      )}
      <div className={`n_modal ${visibleDatasetModal ? " show" : ""} `}>
        <button onClick={() => setDatasetModal(false)} className="modal__close">
          <span className="cxv-close-l-icn"></span>
        </button>
        <div className="n_modal_body">
          <h2 className="n_modal_title">New dataset</h2>
          <div className="n_modal_container">
            <input type="text" placeholder="Name"></input>

            <label className="dashboard_check default__it">
              <input type="checkbox" name="q1" value="1" />
              <span className="label-_text">Public to all</span>
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="n_modal_bottom_btns">
            <button
              onClick={() => setDatasetModal(false)}
              className="btn-dash dark float-left"
            >
              Create
            </button>
            <button
              onClick={() => setDatasetModal(false)}
              className="btn-dash outline float-right"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* MODAL */}
    </>
  )
}

export default DatasetModal
