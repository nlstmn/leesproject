import React, { useState, useEffect, useRef, useLayoutEffect } from "react"

const TopModulesActions = ({
  isMenu,
  isMenuSub,
  setDrawerSections,
  setDrawerPages,
  setDrawerQuestions,
  setDrawerDependency,
}) => {
  return (
    <>
      <div className="top__filter-dashboard b-t-b">
        {/* Left */}
        <div className="left__side">
          <div className="left__item">
            <button className="n__btn dark icon">Save</button>
          </div>
          <div className="left__item">
            <button className="n__btn outline icon">Cancel</button>
          </div>
          <div className="h_divider qq"></div>

          {isMenu === "Sections" && (
            <>
              <div className="left__item">
                <button
                  className="btn-dash drop has-icn"
                  onClick={() => setDrawerSections(true)}
                >
                  Add new section
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
            </>
          )}

          {isMenu === "Pages" && (
            <>
              <div className="left__item">
                <button
                  className="btn-dash drop has-icn"
                  onClick={() => setDrawerPages(true)}
                >
                  Add new page
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
            </>
          )}

          {isMenu === "Questions" && (
            <>
              <div className="left__item">
                <button
                  className="btn-dash drop has-icn"
                  onClick={() => setDrawerQuestions(true)}
                >
                  Add/Edit question
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
            </>
          )}

          {isMenu === "Dependencies" && (
            <>
              <div className="left__item">
                <button
                  className="btn-dash drop has-icn"
                  onClick={() => setDrawerDependency(true)}
                >
                  Add new dependency
                  <span className="cxv-create-l-icn"></span>
                </button>
              </div>
            </>
          )}

          <div className="h_divider qq"></div>

          <div className="left__item">
            <div className="n_input_control has_icon">
              <span className="cxv-search-l-icn icn"></span>
              <input
                placeholder="Search"
                type="text"
                className="n_input"
              ></input>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="right__side">
          <div className="right__item">{/* Right item */}</div>
          <div className="h_divider"></div>
        </div>
      </div>
    </>
  )
}

export default TopModulesActions
