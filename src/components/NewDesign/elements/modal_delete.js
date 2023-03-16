import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteSelectedClient } from "../../../actions/adminActions"

const DeleteModal = ({ setDeleteModal, visibleDatasetModal }) => {
  const dispatch = useDispatch()
  const clientId = useSelector((store) => store.saveClientIdForSurveys)

  return (
    <>
      {/* MODAL */}
      {visibleDatasetModal && (
        <div onClick={() => setDeleteModal(false)} className="n_modal_bg"></div>
      )}
      <div className={`n_modal delete ${visibleDatasetModal ? " show" : ""} `}>
        <div className="n_modal_body">
          <div className="n_modal_container">
            <h3>Are you sure you want to delete this client?</h3>
          </div>
          <div className="n_modal_bottom_btns">
            <button
              onClick={() => setDeleteModal(false)}
              className="btn-dash outline float-left"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setDeleteModal(false)
                dispatch(deleteSelectedClient(clientId))
              }}
              className="btn-dash dark float-right"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* MODAL */}
    </>
  )
}

export default DeleteModal
