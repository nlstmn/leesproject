import React, { useState } from "react"
import { Switch } from "antd"

const AlertSettings = () => {
  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Alert settings</h3>
          <div className="row">
            <div className="col-lg-3">
              <div className="row">
                {/* item */}
                <div className="col-lg-12 mb-2">
                  <div className="n__form_control has__swtch">
                    <label className="n__form_label">
                      <Switch size="small" defaultChecked />
                      <span className="swtch__itm">
                        Campaign and Survey notifications
                      </span>
                    </label>
                  </div>
                </div>

                {/* item */}
                <div className="col-lg-12 mb-2">
                  <div className="n__form_control has__swtch">
                    <label className="n__form_label">
                      <Switch size="small" defaultChecked />
                      <span className="swtch__itm">
                        Custom campaign triggered notifications
                      </span>
                    </label>
                  </div>
                </div>

                {/* item */}
                <div className="col-lg-12 mb-2">
                  <div className="n__form_control has__swtch">
                    <label className="n__form_label">
                      <Switch size="small" />
                      <span className="swtch__itm">
                        Custom feedback triggered notifications
                      </span>
                    </label>
                  </div>
                </div>

                {/* item */}
                <div className="col-lg-12 mb-2">
                  <div className="n__form_control has__swtch">
                    <label className="n__form_label">
                      <Switch size="small" />
                      <span className="swtch__itm">
                        Custom question triggered notifications
                      </span>
                    </label>
                  </div>
                </div>

                {/* item */}
                <div className="col-lg-12 mb-2">
                  <div className="n__form_control has__swtch">
                    <label className="n__form_label">
                      <Switch size="small" defaultChecked />
                      <span className="swtch__itm">
                        Custom xp triggered notifications
                      </span>
                    </label>
                  </div>
                </div>

                {/* item */}
                <div className="col-lg-12 mb-2">
                  <div className="n__form_control has__swtch">
                    <label className="n__form_label">
                      <Switch size="small" defaultChecked />
                      <span className="swtch__itm">
                        Notify me when a new campaign available
                      </span>
                    </label>
                  </div>
                </div>

                {/* item */}
                <div className="col-lg-12 mb-2">
                  <div className="n__form_control has__swtch">
                    <label className="n__form_label">
                      <Switch size="small" />
                      <span className="swtch__itm">
                        Notify me when demographics options updated
                      </span>
                    </label>
                  </div>
                </div>

                {/* item */}
                <div className="col-lg-12 mb-2">
                  <div className="n__form_control has__swtch">
                    <label className="n__form_label">
                      <Switch size="small" defaultChecked />
                      <span className="swtch__itm">
                        Notify me when xp question available
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlertSettings
