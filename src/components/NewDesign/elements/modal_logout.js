import React, { useState } from "react"

const LogoutModal = ({ setLogoutModal, isLogoutModal, letLogout }) => {
  const onLogout = () => {
    setLogoutModal(false)
    letLogout()
    localStorage.setItem("remember", false)
  }

  return (
    <>
      {/* MODAL */}
      {isLogoutModal && (
        <div onClick={() => setLogoutModal(false)} className="n_modal_bg"></div>
      )}
      <div className={`n_modal delete ${isLogoutModal ? " show" : ""} `}>
        <div className="n_modal_body">
          <div className="n_modal_container">
            <h3>Are you sure you want to log out?</h3>
          </div>
          <div className="n_modal_bottom_btns">
            <button onClick={onLogout} className="btn-dash outline float-left">
              Yes
            </button>
            <button
              onClick={() => setLogoutModal(false)}
              className="btn-dash dark float-right"
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

export default LogoutModal
