import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ClientList from "./ClientList"

import ImportExport from "../common/ImportExport"
import { customfilter } from "../../util/functions"
import { clientActions } from "../../actions/leesmanActions"
import { useSelector, useDispatch } from "react-redux"
const Clients = () => {
  const dispatch = useDispatch()
  const { isLoading, data, error } = useSelector((store) => store.leesmanClient)
  const [clients, setClients] = useState([])
  const [show, setShow] = useState(
    localStorage.getItem("showClients")
      ? JSON.parse(localStorage.getItem("showClients"))
      : true
  )
  const [buffer, setBuffer] = useState([])
  const [val, setVal] = useState([])

  const getData = () => {
    dispatch(clientActions())
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    //making data ready to component
    let arr = []
    if (data) {
      arr = data.map((item) => {
        return {
          key: item.id,
          name: item.name,
          refNo: item.client_ref_no,
          website: item.website,
          industry: item.industry,
          userCount: item.user_count,
          locationCount: item.location_count,
          weeklyXp: item.xp_score ? item.xp_score.toFixed(1) : "",
        }
      })
    }
    setClients(arr)
    setBuffer(arr)
  }, [data])

  useEffect(() => {
    customfilter(
      val,
      clients,
      [
        "key",
        "name",
        "refNo",
        "website",
        "industry",
        "userCount",
        "weeklyXp",
        "locationCount",
      ],
      setBuffer
    )
  }, [val])

  const change = (e) => {
    const { value } = e.target
    setVal(value)
  }
  useEffect(() => {
    console.log(show)
  }, [show])
  return (
    <>
      <div className="container-fluid new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title">Clients</h2>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <label className="fancy-checkbox mb-0">
                  <input
                    checked={show}
                    onChange={() => {
                      setShow(!show)
                      localStorage.setItem("showClients", JSON.stringify(!show))
                    }}
                    type="checkbox"
                    name="modules"
                  />
                  <span className="light-black">
                    <strong>More information</strong>
                  </span>
                </label>

                <Link
                  to="/client-main"
                  onClick={() => {
                    localStorage.removeItem("selectedClientId")
                    localStorage.removeItem("selectedClientLang")
                  }}
                  className="btn btn-primary ml-3"
                  title=""
                >
                  Create client
                </Link>
                <ImportExport
                  refresh={getData}
                  type="client"
                  data={buffer}
                  import={false}
                  export={true}
                />

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
                  {/* yeni arama */}
                  <input
                    type="text"
                    value={val}
                    onChange={change}
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <ClientList show={show} data={buffer} loading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Clients
