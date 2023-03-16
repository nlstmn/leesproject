import { Button, Drawer, Radio, Space } from "antd"
import React, { useState } from "react"

const LeftFilter = ({ visibleDrawer, setVisibleDrawer, setDatasetModal }) => {
  const [isSelect, setSelect] = useState("Building")
  const [isReviewFilters, setReviewFilters] = useState(false)

  return (
    <>
      <Drawer
        className="filter_drawer"
        title=""
        placement={"left"}
        onClose={() => setVisibleDrawer(false)}
        visible={visibleDrawer}
        extra={
          <Space>
            <Button onClick={() => setVisibleDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setVisibleDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setVisibleDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>
          <div className="main__side">
            <div className="left_side">
              <h3>Filters</h3>
              <ul>
                <li
                  className={`${
                    isSelect === "Building" ? " active strong" : ""
                  } `}
                >
                  <button
                    onClick={() => {
                      setSelect("Building")
                    }}
                  >
                    Building
                  </button>
                </li>
                <li
                  className={`${
                    isSelect === "Department" ? " active strong" : ""
                  } `}
                >
                  <button
                    onClick={() => {
                      setSelect("Department")
                    }}
                  >
                    Department{" "}
                    <span className="cxv-filter-applied-l-icn"></span>
                  </button>
                </li>
                <li
                  className={`${
                    isSelect === "Demographics" ? " active strong" : ""
                  } `}
                >
                  <button
                    onClick={() => {
                      setSelect("Demographics")
                    }}
                  >
                    Demographics
                  </button>
                </li>
                <li
                  className={`${
                    isSelect === "Regions" ? " active strong" : ""
                  } `}
                >
                  <button
                    onClick={() => {
                      setSelect("Regions")
                    }}
                  >
                    Regions
                  </button>
                </li>
                <li
                  className={`${
                    isSelect === "Industry" ? " active strong" : ""
                  } `}
                >
                  <button
                    onClick={() => {
                      setSelect("Industry")
                    }}
                  >
                    Industry <span className="cxv-filter-applied-l-icn"></span>
                  </button>
                </li>
                <li
                  className={`${
                    isSelect === "Client" ? " active strong" : ""
                  } `}
                >
                  <button
                    onClick={() => {
                      setSelect("Client")
                    }}
                  >
                    Client
                  </button>
                </li>
                <li
                  className={`${
                    isSelect === "Building info" ? " active strong" : ""
                  } `}
                >
                  <button
                    onClick={() => {
                      setSelect("Building info")
                    }}
                  >
                    Building info{" "}
                    <span className="cxv-filter-applied-l-icn"></span>
                  </button>
                </li>
                <li
                  className={`${
                    isSelect === "Work environment" ? " active strong" : ""
                  } `}
                >
                  <button
                    onClick={() => {
                      setSelect("Work environment")
                    }}
                  >
                    Work environment
                  </button>
                </li>
                <li
                  className={`${
                    isSelect === "Additional questions" ? " active strong" : ""
                  } `}
                >
                  <button
                    onClick={() => {
                      setSelect("Additional questions")
                    }}
                  >
                    Additional questions
                  </button>
                </li>
              </ul>

              <button onClick={() => setReviewFilters(true)} className="r__btn">
                <span className="cxv-edit-l-icn"></span> Review filters
              </button>
            </div>
            <div className="right_side">
              <div className="top_side">
                {!isReviewFilters ? (
                  <div className="drop_dash-search">
                    <span className="cxv-search-l-icn icn"></span>
                    <input type="text" placeholder="Search" />
                  </div>
                ) : (
                  <h3>Review filters</h3>
                )}
                <button
                  onClick={() => setReviewFilters(false)}
                  className="r__btn_2"
                >
                  Manage filters{" "}
                  <span className="cxv-direct-to-other-page-l-icn"></span>
                </button>
              </div>

              {!isReviewFilters ? (
                <div className="scroll_ul">
                  <ul>
                    <li>
                      <label className="dashboard_check default__it">
                        <input type="checkbox" name="q1" value="1" />
                        <span className="label-_text">This is dummy text</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="dashboard_check default__it">
                        <input type="checkbox" name="q1" value="1" />
                        <span className="label-_text">
                          As a simulation of actual copy
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="dashboard_check default__it">
                        <input type="checkbox" name="q1" value="1" />
                        <span className="label-_text">
                          As a simulation of actual copy
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="dashboard_check default__it">
                        <input type="checkbox" name="q1" value="1" />
                        <span className="label-_text">This is dummy text</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="dashboard_check default__it">
                        <input type="checkbox" name="q1" value="1" />
                        <span className="label-_text">
                          It is intended to be read
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>

                    {/* Create filter group */}
                    <li>
                      <button
                        onClick={() => setDatasetModal(true)}
                        className="r__btn create"
                      >
                        <span className="cxv-create-new-group-l-icn"></span>{" "}
                        Create filter group
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="scroll_ul">
                  <ul className="ul_type_2">
                    <li>
                      <h4>Building</h4>
                    </li>
                    <li>
                      <label className="dashboard_check border__it">
                        <input
                          type="checkbox"
                          name="q1"
                          value="1"
                          defaultChecked
                        />
                        <span className="label-_text">This is dummy text</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="dashboard_check border__it">
                        <input
                          type="checkbox"
                          name="q1"
                          value="1"
                          defaultChecked
                        />
                        <span className="label-_text">
                          It is intended to be read
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                  <ul className="ul_type_2">
                    <li>
                      <h4>Industry</h4>
                    </li>
                    <li>
                      <label className="dashboard_check border__it">
                        <input
                          type="checkbox"
                          name="q1"
                          value="1"
                          defaultChecked
                        />
                        <span className="label-_text">This is dummy text</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="dashboard_check border__it">
                        <input
                          type="checkbox"
                          name="q1"
                          value="1"
                          defaultChecked
                        />
                        <span className="label-_text">
                          It is intended to be read
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="bottom_side">
            <div className="bottom_info">
              <div className="line"></div>
              <p>
                Select all required filters from within each category above and
                click <strong>‘Apply’</strong>.
              </p>
            </div>

            <div>
              <button className="btn-dash dark float-right tt">Apply</button>

              {isReviewFilters && (
                <button className="btn-dash outline float-right tt mr-4">
                  Save as dataset
                </button>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default LeftFilter
