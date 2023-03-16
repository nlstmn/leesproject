import React, { useEffect, useState } from "react"

import TranslationTemplate from "./TranslationTemplate"
import axios from "axios"
import Tabs from "./Tabs"

const Translations = () => {
  const [transCategory, setTransCategory] = useState("locations")

  const getLanguages = () => {
    axios
      .get("/client/languages")
      .then((res) => {
        localStorage.setItem("allLanguages", JSON.stringify(res.data.result))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    //if not fetched, fetch
    !localStorage.getItem("allLanguages") && getLanguages()
  }, [])
  return (
    <>
      <div className="container-fluid clients-page">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              <Tabs></Tabs>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-7">
            <div className="card">
              <div className="body min-h-381">
                <h2 className="card-title mb-0">Translations</h2>

                <div className="row clearfix pt-20 pb-34">
                  <div className="col-lg-12 col-md-12">
                    <button
                      onClick={() => setTransCategory("locations")}
                      className={`btn btn-sm btn-default mr-1 float-l ${
                        transCategory === "locations" ? "active" : ""
                      }`}
                    >
                      Locations
                    </button>{" "}
                    &nbsp;&nbsp;
                    <button
                      onClick={() => setTransCategory("departments")}
                      className="btn btn-sm btn-default mr-1 float-l"
                    >
                      Departments
                    </button>
                  </div>

                  <div className="col-lg-12 col-md-12 pt-40">
                    <TranslationTemplate type={transCategory} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Translations
