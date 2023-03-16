import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { notification } from "antd"
import Tabs from "./Tabs"
const Languages = () => {
  const [langs, setLangs] = useState([])
  const [boxAll, setBoxAll] = useState("")
  const [boxSelected, setBoxSelected] = useState("")
  const [defaultLangId, setDefaultLangId] = useState(
    localStorage.getItem("selectedClientLang")
  )
  const [selectedLangsArr, setSelectedLangsArr] = useState(
    localStorage.getItem("selectedLangsArr")
      ? JSON.parse(localStorage.getItem("selectedLangsArr"))
      : []
  )
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")

  const getLangs = () => {
    let data = []
    axios
      .get("/client/languages")
      .then((res) => {
        data = res.data.result
        setLangs(data)
        localStorage.setItem("allLanguages", JSON.stringify(res.data.result))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getLangs()
  }, [])
  useEffect(() => {
    populateBoxAll(langs)
    populateBoxSelected(langs)
  }, [langs, defaultLangId, selectedLangsArr])

  const populateBoxAll = (e) => {
    let arr = e.map((item) => {
      return (
        <label className="fancy-checkbox min-w-168">
          <input
            onChange={handleCheck}
            type="checkbox"
            name="languages"
            value={item.id}
            checked={selectedLangsArr.includes(String(item.id))}
          />
          <span className="light-black">
            <i></i>
            {item.label}
          </span>
        </label>
      )
    })
    console.log(arr)
    setBoxAll(arr)
  }
  const populateBoxSelected = (e) => {
    let arr = e.map((item) => {
      return (
        <label className="fancy-radio min-w-168">
          <input
            onChange={handleRadio}
            type="radio"
            name="languages"
            checked={defaultLangId === String(item.id)}
            value={item.id}
          />
          <span className="light-black">
            <i></i>
            {item.label}
          </span>
        </label>
      )
    })
    console.log(arr)
    setBoxSelected(arr)
  }
  const handleRadio = (e) => {
    let { value } = e.target
    console.log(value)
    setDefaultLangId(value)
  }
  const handleCheck = (e) => {
    let { value } = e.target
    console.log(value)
    let arr = localStorage.getItem("selectedLangsArr")
      ? JSON.parse(localStorage.getItem("selectedLangsArr"))
      : []

    if (arr.includes(value)) {
      arr = arr.filter((item) => item !== value)
    } else {
      arr.push(value)
    }
    setSelectedLangsArr(arr)
    console.log(arr)
    localStorage.setItem("selectedLangsArr", JSON.stringify(arr))
    populateBoxAll(langs)
  }
  const save = () => {
    axios
      .put(`/admin/clients/${clientId}`, {
        defaultLanguageId: defaultLangId,
      })
      .then((res) => {
        notification.success({ message: "Default language has been changed" })
        localStorage.setItem(
          "selectedClientLang",
          res.data.result[0].default_language_id
        )
      })
      .catch((err) => {
        console.log(err)
        notification.warning({ message: "Default language could not change!" })
      })
  }
  return (
    <>
      <div className="container-fluid clients-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              <Tabs></Tabs>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title mt-4">Languages</h2>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <Link
                  to={"/translations?client_id=" + clientId}
                  className="btn btn-primary ml-3"
                  title=""
                >
                  Translations
                </Link>
              </div>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 mt--22">
            <div className="card">
              <div className="body">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12">
                    <div className="text-leftt light-black pb-20">
                      All languages
                    </div>

                    {boxAll}
                  </div>

                  <div className="col-lg-12 col-md-12 pt-40">
                    <div className="text-leftt light-black pb-20">
                      Default language
                    </div>

                    {boxSelected}
                  </div>

                  <div className="col-lg-12 col-md-12 mt-5">
                    <Link
                      to="/clients"
                      className="btn btn-sm btn-default mr-1 float-l"
                    >
                      Cancel
                    </Link>{" "}
                    &nbsp;&nbsp;
                    <button
                      onClick={save}
                      className="btn btn-sm btn-primary mr-1 float-r"
                    >
                      Save
                    </button>
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
export default Languages
