import React from "react"
import { Table } from "antd"
import PagesTable from "./table"

const PagesSettings = ({ isDrawerPages, setDrawerPages }) => {
  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Pages</h3>
          <span className="card_desc">
            Total: <strong>11 pages</strong>
          </span>
          <div className="row">
            <div className="col-lg-12">
              <div className="n_table pr__10 first_not_center respo">
                <PagesTable
                  isDrawerPages={isDrawerPages}
                  setDrawerPages={setDrawerPages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PagesSettings
