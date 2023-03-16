import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import CustomSelect from "../../../elements/custom_select"
import LoaderPage from "../../../elements/loader_page"

const GetInTouch = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  const select_items = [
    {
      id: 1,
      options: [
        "Type of query",
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]

  return (
    <>
      <LoaderPage />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard isShow={false} />
            <h1>Get in touch</h1>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="form__sc">
              <p>
                This is dummy text. It is intended to be read but it has no
                meaning. Used as a simulation of actual copy, using ordinary
                words with normal letter frequencies, it cannot deceive the eye
                or brain.
              </p>
              <div className="form__cnt">
                {select_items.map((item, i, arr) => (
                  <CustomSelect item={item} i={i} arr={arr} />
                ))}

                <input
                  placeholder="Subject of query…"
                  type="text"
                  className="n_input"
                ></input>

                <textarea
                  placeholder="Query content…"
                  type="text"
                  className="n_input"
                ></textarea>

                <button className="btn-dash dark">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GetInTouch
