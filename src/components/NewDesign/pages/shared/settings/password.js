import React, { useState } from "react"

const ChangePasswordSettings = () => {
  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Change password</h3>
          <div className="row">
            <div className="col-lg-3">
              <div className="row">
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Current password</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                        placeholder="*****"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>New password</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                        placeholder="*****"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Confirm password</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                        placeholder="*****"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">PASSWORD CHECK AREA...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePasswordSettings
