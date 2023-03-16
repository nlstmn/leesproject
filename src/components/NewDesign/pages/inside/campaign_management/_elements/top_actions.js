import React, { useState, useEffect, useRef, useLayoutEffect } from "react"

const TopCampaignActions = ({ isMenu, isMenuSub }) => {
  return (
    <>
      <div className="top__filter-dashboard b-t-b">
        {/* Left */}
        <div className="left__side">
          {isMenu !== "Summary" ? (
            <>
              <div className="left__item">
                <button className="n__btn dark icon">Save</button>
              </div>
              <div className="left__item">
                <button className="n__btn outline icon">Cancel</button>
              </div>
              <div className="h_divider qq"></div>
            </>
          ) : (
            <>
              <div className="left__item">
                <button className="n__btn dark icon">Launch campaign</button>
              </div>
              <div className="left__item">
                <button className="n__btn outline icon">Draft</button>
              </div>
              <div className="h_divider qq"></div>
              <div className="left__item">
                <button className="btn-dash drop has-icn">
                  Update cache
                  <span className="iconx-sync"></span>
                </button>
              </div>
              <div className="left__item">
                <button className="btn-dash drop has-icn">
                  Delete cache
                  <span className="cxv-delete-l-icn"></span>
                </button>
              </div>
              <div className="h_divider qq"></div>
              <div className="left__item">
                <button className="btn-dash drop has-icn">
                  Export summary
                  <span className="cxv-export-l-icn"></span>
                </button>
              </div>
            </>
          )}
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

export default TopCampaignActions
