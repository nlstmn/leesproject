import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import LoaderPage from "../../../elements/loader_page"

const ExportData = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  return (
    <>
      <LoaderPage />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard
              isShow={true}
              mainTitle={"Results overview"}
              mainURL={"/analytics-overview"}
              secondTitle={"Export data"}
              secondURL={"/export-data"}
            />
            <h1>Export data</h1>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-6">
            <div className="left__side">
              <h2>Export options</h2>
              <div className="clickable_list">
                <ul>
                  <li className="">
                    <span>Export all data</span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                  <li className="">
                    <span>Export demographics</span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                  <li className=""></li>
                  <li className="">
                    <span>Admin (admin)</span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                  <li className="">
                    <span>Department export (departments)</span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                  <li className="">
                    <span>Building export (buildings)</span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                  <li className="">
                    <span>
                      Location and department breakdowns (location-demographics)
                    </span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                  <li className="">
                    <span>
                      Demographics breakdown by department
                      (demographics-department)
                    </span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                  <li className="">
                    <span>
                      Demographics breakdown by location (demographics-location)
                    </span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                  <li className=""></li>
                  <li className="">
                    <span>English (UK)</span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                  <li className="">
                    <span>Chinese (Traditional)</span>
                    <button className="btn-dash-export">
                      <span className="cxv-export-l-icn"></span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="right__side">
              <h2>Applied filters</h2>
              <div className="blocked__list applied__filters">
                <ul className="ul_type_2">
                  <li>
                    <div className="dashboard_check border__it">
                      <span className="label-_text">Building</span>
                    </div>
                  </li>
                  <li>
                    <div className="dashboard_check border__it">
                      <span className="label-_text">This is dummy text</span>
                    </div>
                  </li>
                  <li>
                    <div className="dashboard_check border__it">
                      <span className="label-_text">
                        It is intended to be read
                      </span>
                    </div>
                  </li>
                </ul>
                <ul className="ul_type_2">
                  <li>
                    <div className="dashboard_check border__it">
                      <span className="label-_text">Industry</span>
                    </div>
                  </li>
                  <li>
                    <div className="dashboard_check border__it">
                      <span className="label-_text">This is dummy text</span>
                    </div>
                  </li>
                  <li>
                    <div className="dashboard_check border__it">
                      <span className="label-_text">
                        It is intended to be read
                      </span>
                    </div>
                  </li>
                </ul>
                <ul className="ul_type_2">
                  <li>
                    <div className="dashboard_check border__it">
                      <span className="label-_text">Building info</span>
                    </div>
                  </li>
                  <li>
                    <div className="dashboard_check border__it">
                      <span className="label-_text">This is dummy text</span>
                    </div>
                  </li>
                  <li>
                    <div className="dashboard_check border__it">
                      <span className="label-_text">
                        It is intended to be read
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExportData
