import React from "react"
import { Link } from "react-router-dom"
import AddDomain from "./AddFields/AddDomains"
import AddIp from "./AddFields/AddIp"
import AddNotification from "./AddFields/Notifications"
import Tabs from "./Tabs"
const Access = () => {
  return (
    <>
      <div className="container-fluid survey-page">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              <Tabs></Tabs>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12 settings-row-admin">
            <div className="card">
              <div className="body">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <h2 className="card-title mb-0">Access setup</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="card">
              <div className="body min-h-381">
                <h2 className="card-title mb-0">
                  Access to the survey - Email domains
                </h2>
                <div className="row clearfix pt-20 pb-34">
                  <div className="col-lg-12 col-md-12">
                    <AddDomain />
                  </div>
                </div>
                <div className="bottom-btns">
                  <a href="#" className="btn btn-sm btn-default mr-1 float-l">
                    Cancel
                  </a>{" "}
                  &nbsp;&nbsp;
                  <a href="#" className="btn btn-sm btn-primary mr-1 float-r">
                    Save
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="card">
              <div className="body min-h-381">
                <h2 className="card-title mb-0">
                  Access to the survey - IP Whitelist
                </h2>
                <div className="row clearfix pt-20 pb-34">
                  <div className="col-lg-12 col-md-12">
                    <AddIp />
                  </div>
                </div>
                <div className="bottom-btns">
                  <a href="#" className="btn btn-sm btn-default mr-1 float-l">
                    Cancel
                  </a>{" "}
                  &nbsp;&nbsp;
                  <a href="#" className="btn btn-sm btn-primary mr-1 float-r">
                    Save
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="card">
              <div className="body min-h-381">
                <h2 className="card-title mb-0">
                  Notifications when the survey is live
                </h2>
                <div className="row clearfix pt-20 pb-34">
                  <div className="col-lg-12 col-md-12">
                    <AddNotification />
                  </div>
                </div>
                <div className="bottom-btns">
                  <a href="#" className="btn btn-sm btn-default mr-1 float-l">
                    Cancel
                  </a>{" "}
                  &nbsp;&nbsp;
                  <a href="#" className="btn btn-sm btn-primary mr-1 float-r">
                    Save
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Access
