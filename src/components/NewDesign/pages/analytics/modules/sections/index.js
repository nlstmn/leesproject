import React from "react"
import { Table } from "antd"
import SectionsTable from "./table"

const SectionsSettings = ({ isDrawerSections, setDrawerSections }) => {
  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Sections</h3>
          <span className="card_desc">
            Total: <strong>11 sections</strong>
          </span>
          <div className="row">
            <div className="col-lg-12">
              <div className="n_table pr__10 first_not_center respo">
                <SectionsTable
                  isDrawerSections={isDrawerSections}
                  setDrawerSections={setDrawerSections}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SectionsSettings
