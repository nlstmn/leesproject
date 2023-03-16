import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import CustomSelect from "../../../../elements/custom_select"

const TopTranslationsActions = ({ isMenu, isMenuSub }) => {
  const filterTypes = [
    {
      id: 1,
      options: ["All", "Inside", "Analytics"],
    },
  ]

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

          <div className="left__item">
            {filterTypes.map((item, i, arr) => (
              <CustomSelect item={item} i={i} arr={arr} />
            ))}
          </div>

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

export default TopTranslationsActions
