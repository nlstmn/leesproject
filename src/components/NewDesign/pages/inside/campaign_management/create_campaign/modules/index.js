import React, { useState } from "react"
import ModulesCard from "./module_card"

const CModulesSettings = () => {
  const workItems = [
    "Planned meetings",
    "Individual focused work away from your desk",
    "Reading",
    "Collaborating on focused work",
    "Learning from others",
    "Informal, un-planned meetings",
    "Individual routine tasks",
  ]
  const customItems = [
    "Custom item...",
    "Custom item...",
    "Custom item...",
    "Custom item...",
    "Custom item...",
    "Custom item...",
  ]

  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Modules</h3>
          <div className="row">
            <div className="col-lg-2">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input type="checkbox" name="Formal" value="Formal" />
                  <span className="label-_text">Formal Meetings</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input type="checkbox" name="Drivers" value="Drivers" />
                  <span className="label-_text">Super Drivers</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input type="checkbox" name="Individual" value="Individual" />
                  <span className="label-_text">Individual work</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input
                    type="checkbox"
                    name="Collaboration"
                    value="Collaboration"
                  />
                  <span className="label-_text">Collaboration</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="n__form_control">
                <label className="n__form_label dashboard_check">
                  <input type="checkbox" name="Wellbeing" value="Wellbeing" />
                  <span className="label-_text">Wellbeing</span>
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>

            <ModulesCard title={"Work Activities"} items={workItems} />

            <ModulesCard title={"Physical Features"} items={customItems} />

            <ModulesCard title={"Service Features"} items={customItems} />

            <ModulesCard title={"Workplace Impact"} items={customItems} />

            <ModulesCard title={"Workplace Agreement"} items={customItems} />

            <ModulesCard title={"Impact"} items={customItems} />

            <ModulesCard title={"Features"} items={customItems} />

            <ModulesCard title={"Return to Office"} items={customItems} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CModulesSettings
