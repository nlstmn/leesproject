import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { exportClientsAction } from "../../../actions/adminActions"

const DropMenuExport = ({ setTopSelectFlag, isTopSelectFlag }) => {
  const dispatch = useDispatch()

  // Top Select Functions
  const [isTopSelect, setTopSelect] = useState(false)
  // Top Select Functions

  const onClickCreate = async () => {
    dispatch(exportClientsAction())
  }

  return (
    <>
      {isTopSelect && isTopSelectFlag === "export" ? (
        <div
          onClick={() => setTopSelect(false)}
          className="n_modal_bg trans"
        ></div>
      ) : (
        <></>
      )}

      <div
        className={`drop_dash_container ${
          isTopSelect && isTopSelectFlag === "export" ? " show" : ""
        } `}
        key={"export"}
      >
        <button
          className="btn-dash-export"
          onClick={() => {
            setTopSelect(isTopSelectFlag === "export" ? !isTopSelect : true)
            setTopSelectFlag("export")
          }}
        >
          <span className="cxv-export-l-icn"></span>
        </button>
        <div className="drop_dash-menu export">
          <button
            className="btn-close_mdl"
            onClick={() => {
              setTopSelect(false)
              setTopSelectFlag("")
            }}
          >
            <span className="cxv-close-l-icn"></span>
          </button>
          <h2>Export data</h2>
          <ul className="drop_dash_items">
            <li>
              <label className="dashboard_radio">
                <input type="radio" name="q1s" value="2" />
                <span className="label-_text">
                  <strong>CSV – </strong>The data exported in a Comma Seperated
                  Value.{" "}
                </span>
                <span className="checkmark"></span>
              </label>
            </li>
            <li>
              <label className="dashboard_radio">
                <input type="radio" name="q1s" value="2" />
                <span className="label-_text">
                  <strong>XLS – </strong>The data exported in an Excel
                  spreadsheet format.
                </span>
                <span className="checkmark"></span>
              </label>
            </li>
            <li>
              <label className="dashboard_check">
                <input type="checkbox" name="q1" value="1" />
                <span className="label-_text">
                  <strong>Include filter – </strong>Includes the filter summary
                  of the exported file.
                </span>
                <span className="checkmark"></span>
              </label>
            </li>
          </ul>
          <button className="btn-dash drop has-icn mb-4">
            More options
            <span className="cxv-direct-to-other-page-l-icn"></span>
          </button>
          <button
            className="btn-dash outline float-left"
            onClick={() => {
              setTopSelect(false)
              setTopSelectFlag("")
            }}
          >
            Cancel
          </button>
          <button className="btn-dash dark float-right" onClick={onClickCreate}>
            Create
          </button>
        </div>
      </div>
    </>
  )
}

export default DropMenuExport
