import React, { useState } from "react"
import { Drawer } from "antd"

const Dependencies = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isChildrenModalVisible, setIsChildrenModalVisible] = useState(false)

  const [isValueSelection, setValueSelection] = useState("")
  const [setValueType] = useState("")
  const [setValueMultiType] = useState("")

  const [isConditionType, setConditionType] = useState("")

  const [setTargetSelection] = useState("")
  const [setTargetType] = useState("")

  return (
    <>
      <Drawer
        className="dark--modal"
        title="Conditional logic"
        width={800}
        closable={true}
        onClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
      >
        <div className="row clearfix dependency-_sections">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="header">
                <h2>VALUE</h2>
              </div>
              <div className="body">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12">
                    <small className="dp-s-info">Selection</small>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="selection"
                        value="single"
                        id="single"
                        onChange={(e) => setValueSelection(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Single select
                      </span>
                    </label>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="selection"
                        value="multi"
                        id="multi"
                        onChange={(e) => setValueSelection(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Multi select
                      </span>
                    </label>
                  </div>

                  {isValueSelection === "multi" && (
                    <div className="col-lg-12 col-md-12 mt-3">
                      <small className="dp-s-info">If multi select</small>
                      <label className="fancy-radio">
                        <input
                          type="radio"
                          name="multi"
                          value="addition"
                          id="addition"
                          onChange={(e) => setValueMultiType(e.target.value)}
                        />
                        <span className="light-black">
                          <i></i>
                          Addition
                        </span>
                      </label>
                      <label className="fancy-radio">
                        <input
                          type="radio"
                          name="multi"
                          value="subtraction"
                          id="subtraction"
                          onChange={(e) => setValueMultiType(e.target.value)}
                        />
                        <span className="light-black">
                          <i></i>
                          Subtraction
                        </span>
                      </label>
                    </div>
                  )}

                  <div className="col-lg-12 col-md-12 mt-3">
                    <small className="dp-s-info">Type</small>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="type"
                        value="section"
                        id="section"
                        onChange={(e) => setValueType(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Section
                      </span>
                    </label>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="type"
                        value="page"
                        id="page"
                        onChange={(e) => setValueType(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Page
                      </span>
                    </label>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="type"
                        value="question"
                        id="question"
                        onChange={(e) => setValueType(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Question
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-12 col-md-12 mt-3">
                    <small className="dp-s-info">Select value(s)</small>
                    <button
                      onClick={() => setIsChildrenModalVisible(true)}
                      className="btn btn-outline-default btn-sm mt-0"
                    >
                      Select value(s)
                    </button>

                    <ul className="selected-_languages dp">
                      <li>
                        <span className="iconx-circle-with-cross"></span>
                        Item 1
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="header">
                <h2>RULE</h2>
              </div>
              <div className="body">
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 mt-3">
                    <small className="dp-s-info">Condition</small>
                    <div className="form-group">
                      <select
                        className="form-control"
                        onChange={(e) => setConditionType(e.target.value)}
                      >
                        <option value="">Please select</option>
                        <option value="Selected">If selected</option>
                        <option value="Not Selected">If not selected</option>
                        <option value="Greater">Greater than</option>
                        <option value="Lower">Lower than</option>
                      </select>
                    </div>

                    {isConditionType === "Greater" ||
                    isConditionType === "Lower" ? (
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Type value."
                          name="value"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 mt-3">
                    <small className="dp-s-info">Action</small>
                    <div className="form-group">
                      <select className="form-control">
                        <option>Please select</option>
                        <option>(Order) Before that(s)</option>
                        <option>(Order) After that(s)</option>
                        <option>(Hide) Hide that(s)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="header">
                <h2>TARGET</h2>
              </div>
              <div className="body">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12">
                    <small className="dp-s-info">Selection</small>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="selectionTarget"
                        value="single1"
                        id="single1"
                        onChange={(e) => setTargetSelection(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Single select
                      </span>
                    </label>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="selectionTarget"
                        value="multi2"
                        id="multi2"
                        onChange={(e) => setTargetSelection(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Multi select
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-12 col-md-12 mt-3">
                    <small className="dp-s-info">Type</small>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="typeTarget"
                        value="section2"
                        id="section2"
                        onChange={(e) => setTargetType(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Section
                      </span>
                    </label>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="typeTarget"
                        value="page2"
                        id="page2"
                        onChange={(e) => setTargetType(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Page
                      </span>
                    </label>
                    <label className="fancy-radio">
                      <input
                        type="radio"
                        name="typeTarget"
                        value="question2"
                        id="question2"
                        onChange={(e) => setTargetType(e.target.value)}
                      />
                      <span className="light-black">
                        <i></i>
                        Question
                      </span>
                    </label>
                  </div>
                  <div className="col-lg-12 col-md-12 mt-3">
                    <small className="dp-s-info">Select value(s)</small>
                    <button
                      onClick={() => setIsChildrenModalVisible(true)}
                      className="btn btn-outline-default btn-sm mt-0"
                    >
                      Select value(s)
                    </button>

                    <ul className="selected-_languages dp">
                      <li>
                        <span className="iconx-circle-with-cross"></span>
                        Item 3
                      </li>
                      <li>
                        <span className="iconx-circle-with-cross"></span>
                        Item 4
                      </li>
                      <li>
                        <span className="iconx-circle-with-cross"></span>
                        Item 5
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dual--screen-bottom">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => setIsModalVisible(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => setIsModalVisible(false)}
            className="btn btn-sm btn-primary"
            style={{ marginLeft: "15px" }}
          >
            Add
          </button>
        </div>

        <Drawer
          title="Select items"
          width={500}
          closable={true}
          onClose={() => setIsChildrenModalVisible(false)}
          visible={isChildrenModalVisible}
        >
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <div className="form-group">
                {/* modül seç */}
                <select className="form-control">
                  <option>Select Module</option>
                  <option value="Technology">Technology</option>
                  <option value="Formal Meetings">Formal Meetings</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Impact">Impact</option>
                  <option value="FM Services">FM Services</option>
                  <option value="Design and Layout">Design and Layout</option>
                  <option value="Super Drivers">Super Drivers</option>
                  <option value="IEQ">IEQ</option>
                  <option value="Individual work">Individual work</option>
                  <option value="Wellbeing">Wellbeing</option>
                  <option value="Conversations">Conversations</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Return to Office">Return to Office</option>
                  <option value="Test Module">Test Module</option>
                </select>
              </div>

              <hr />

              {/* Sadece aktif questionlar gösterilecek */}

              <div className="questions--list-s">
                {/* başlık */}

                <div className="text-leftt light-black pb-20 pt--40">
                  Formal Meetings
                </div>

                {isValueSelection === "multi" ? (
                  <>
                    {/* Multi ise checkbox */}
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="questions" />
                      <span className="light-black">Item 1</span>
                    </label>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="questions" />
                      <span className="light-black">Item 2</span>
                    </label>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="questions" />
                      <span className="light-black">Item 3</span>
                    </label>
                  </>
                ) : (
                  <>
                    {/* Single ise radio */}
                    <label className="fancy-radio">
                      <input type="radio" name="items" />
                      <span className="light-black">
                        <i></i>
                        Item 1
                      </span>
                    </label>
                    <label className="fancy-radio">
                      <input type="radio" name="items" />
                      <span className="light-black">
                        <i></i>
                        Item 2
                      </span>
                    </label>
                    <label className="fancy-radio">
                      <input type="radio" name="items" />
                      <span className="light-black">
                        <i></i>
                        Item 3
                      </span>
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="dual--screen-bottom">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => setIsChildrenModalVisible(false)}
            >
              Close
            </button>
          </div>
        </Drawer>
      </Drawer>

      <div className="row clearfix">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row mb-4 page-__header">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h2 className="card-title">Dependencies</h2>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
              <a
                className="btn btn-primary bigger-_btn ml-3"
                href="#!"
                onClick={() => setIsModalVisible(true)}
              >
                New dependency
              </a>

              <div className="form-group mb-0 ml-3 top-_new-form">
                <select name="section_id" className="form-control show-tick">
                  <option value="">Section</option>
                  <option value="">Page</option>
                  <option value="">Question</option>
                </select>
              </div>

              <div className="input-group ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row clearfix">
            <div className="col-md-6">
              <div className="card">
                <article className="media body mb-0">
                  <div className="media-body">
                    <div className="content">
                      <p className="h5 mb-3">
                        ID #226
                        <a className="sector-_tag float-right" href="#">
                          <span className="ant-tag">Section</span>
                        </a>
                      </p>
                      <div className="d-flex justify-content-start mb-3">
                        <div className="mr-5">
                          <label className="mb-0">
                            <strong>Value</strong>
                          </label>
                          <br />

                          <small className="text-muted">Multi select</small>
                          <br />
                          <small className="text-muted">Section</small>
                          <br />
                          <small className="text-muted">
                            <strong>Items:</strong> Section 1, Section 2,
                            Section 3
                          </small>
                        </div>
                        <div className="mr-5">
                          <label className="mb-0">
                            <strong>Rule</strong>
                          </label>
                          <br />

                          <small className="text-muted">
                            Greater than - 50
                          </small>
                          <br />
                          <small className="text-muted">
                            (Order) Before that(s)
                          </small>
                        </div>
                        <div>
                          <label className="mb-0">
                            <strong>Target</strong>
                          </label>
                          <br />

                          <small className="text-muted">Single select</small>
                          <br />
                          <small className="text-muted">Section</small>
                          <br />
                          <small className="text-muted">
                            <strong>Items:</strong> Section 15
                          </small>
                        </div>
                      </div>
                    </div>
                    <nav className="d-flex text-muted">
                      <a
                        href="#!"
                        onClick={() => setIsModalVisible(true)}
                        className="icon mr-3"
                      >
                        <i className="iconx-edit1"></i>
                      </a>
                      <a href="#!" className="icon mr-3">
                        <i className="iconx-trash"></i>
                      </a>

                      <span className="text-danger ml-auto mr--10">
                        Private
                      </span>
                    </nav>
                  </div>
                </article>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <article className="media body mb-0">
                  <div className="media-body">
                    <div className="content">
                      <p className="h5 mb-3">
                        ID #227
                        <a className="sector-_tag float-right">
                          <span className="ant-tag">Page</span>
                        </a>
                      </p>
                      <div className="d-flex justify-content-start mb-3">
                        <div className="mr-5">
                          <label className="mb-0">
                            <strong>Value</strong>
                          </label>
                          <br />

                          <small className="text-muted">Single select</small>
                          <br />
                          <small className="text-muted">Page</small>
                          <br />
                          <small className="text-muted">
                            <strong>Items:</strong> Page 6
                          </small>
                        </div>
                        <div className="mr-5">
                          <label className="mb-0">
                            <strong>Rule</strong>
                          </label>
                          <br />

                          <small className="text-muted">If selected</small>
                          <br />
                          <small className="text-muted">
                            (Hide) Hide that(s)
                          </small>
                        </div>
                        <div>
                          <label className="mb-0">
                            <strong>Target</strong>
                          </label>
                          <br />

                          <small className="text-muted">Single select</small>
                          <br />
                          <small className="text-muted">Page</small>
                          <br />
                          <small className="text-muted">
                            <strong>Items:</strong> Page 22
                          </small>
                        </div>
                      </div>
                    </div>
                    <nav className="d-flex text-muted">
                      <a
                        href="#!"
                        onClick={() => setIsModalVisible(true)}
                        className="icon mr-3"
                      >
                        <i className="iconx-edit1"></i>
                      </a>
                      <a href="#!" className="icon mr-3">
                        <i className="iconx-trash"></i>
                      </a>

                      <span className="text-success ml-auto mr--10">
                        Public
                      </span>
                    </nav>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dependencies
