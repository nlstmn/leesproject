import React, { useEffect, useState } from "react"
import axios from "axios"
import ProgressBar from "react-customizable-progressbar"
import moment from "moment"
import BasicBar from "../../../../common/charts/basicBarChart"
import ImportExport from "../../../../common/ImportExport"
import { Table } from "antd"
export default function SurveySpecificDashboard() {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const survey_id = params.get("survey_id")
    ? params.get("survey_id")
    : window.history.back()
  console.log(survey_id)
  const [data, setData] = useState([])
  const [calcs, setCalcs] = useState([])
  const [buffer, setBuffer] = useState([])
  const [categoryType, setCategoryType] = useState("scale")
  const [selectedPage, setSelectedPage] = useState("")

  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    console.log(selectedPage)
    setBuffer(calcs?.filter((i) => i.page === selectedPage))
  }, [selectedPage])

  const getData = () => {
    let data = {
      page: "surveys",
      survey_id: survey_id,
    }
    axios
      .post(`/metrics`, data)
      .then((res) => {
        setData(res.data)
        setCalcs(res.data.calc)
        setBuffer(res.data.calc)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      {" "}
      <div className="row text-center campaigns-details">
        <div className="col-12 col-xl-3 col-lg-12 col-md-12 pt-20">
          <p className="campaign-details-text">
            Survey title: {data?.survey?.title}
            <br />
            Description:{data?.survey?.description}
            <br />
            Status:{data?.survey?.status}
            <br />
            Number of users: {data?.survey?.users_count}
            <br />
            Completed users: {data?.survey?.completed_users_count}
            <br />
            Subdomain: {data?.survey?.subdomain}
          </p>
        </div>
        <div className="col-12 col-xl-9 col-lg-12 col-md-12 pt-20">
          <div className="row headline-stat-closed">
            <div className="col-lg-2 col-sm-12 max-h-200">
              <h4 className="font-16r text-white  text-leftt">
                {data?.survey?.target_population}
              </h4>
              <label className="mb-0  text-leftt">Target Population</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200">
              <h4 className="font-16r text-white  text-leftt">
                {parseFloat(data?.stats?.collaboration).toFixed(1) + "%"}
              </h4>
              <label className="mb-0  text-leftt">Collaboration</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200">
              <h4 className="font-16r text-white  text-leftt">
                {parseFloat(data?.stats?.community).toFixed(1) + "%"}
              </h4>
              <label className="mb-0  text-leftt">Community</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200">
              <h4 className="font-16r text-white  text-leftt">
                {parseFloat(data?.stats?.formal).toFixed(1) + "%"}
              </h4>
              <label className="mb-0  text-leftt">Formal</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200">
              <h4 className="font-16r text-white  text-leftt">
                {parseFloat(data?.stats?.individual).toFixed(1) + "%"}
              </h4>
              <label className="mb-0  text-leftt">Individual</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200">
              <h4 className="font-16r text-white  text-leftt">
                {parseFloat(data?.stats?.leesman_plus_lmi).toFixed(1) + "%"}
              </h4>
              <label className="mb-0  text-leftt">Leesman_plus_lmi</label>
            </div>

            {/* <div className="col-lg-4 col-sm-12 max-h-200 ">
                        <h4 className="font-16r text-white  text-leftt">{data && data?.stats && data?.response_rate + "%"}</h4>
                        <label className="mb-0  text-leftt">Response rate</label>
                      </div> */}
            <div className="col-lg-2 col-sm-12 max-h-200 pt-40">
              <h4 className="font-16r text-white  text-leftt">
                {parseFloat(data?.survey?.response_rate).toFixed(1) + "%"}
              </h4>
              <label className="mb-0  text-leftt">Response rate</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200 pt-40">
              <h4 className="font-16r text-white  text-leftt">
                {parseFloat(data?.stats?.pride).toFixed(1) + "%"}
              </h4>
              <label className="mb-0  text-leftt">Pride</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200 pt-40">
              <h4 className="font-16r text-white  text-leftt">
                {parseFloat(data?.stats?.productivity).toFixed(1) + "%"}
              </h4>
              <label className="mb-0  text-leftt">Productivity</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200 pt-40">
              <h4 className="font-16r text-white  text-leftt">
                {data?.stats?.demo}
              </h4>
              <label className="mb-0  text-leftt">Demo</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200 pt-40">
              <h4 className="font-16r text-white  text-leftt">
                {moment(data?.survey?.start_date).format("DD MMM YY")}
              </h4>
              <label className="mb-0  text-leftt">Start date</label>
            </div>
            <div className="col-lg-2 col-sm-12 max-h-200 pt-40">
              <h4 className="font-16r text-white  text-leftt">
                {moment(data?.survey?.end_date).format("DD MMM YY")}
              </h4>
              <label className="mb-0  text-leftt">End date</label>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-9 col-lg-12 col-md-12 pt-20">
          <div className="row headline-stat-closed">
            <label className="mb-0  text-leftt">
              Calculation based on answers
            </label>
            {data?.lmi?.map((i) => {
              return (
                <div className="col-lg-2 col-sm-12 max-h-200">
                  <h4 className="font-16r text-white  text-leftt">
                    {parseFloat(i.lmi_score).toFixed(2) || "No data"}
                  </h4>
                  <label className="mb-0  text-leftt">
                    {i.lmi_type + " lmi"}
                  </label>
                </div>
              )
            })}
          </div>
          <div className="row headline-stat-closed">
            <label className="mb-0  text-leftt">
              Calculation based on responders
            </label>

            <div className="col-lg-2 col-sm-12 max-h-200">
              <h4 className="font-16r text-white  text-leftt">
                {parseFloat(data?.lmi_by_responders).toFixed(2)}
              </h4>
              <label className="mb-0  text-leftt">office lmi</label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <ul className="nav">
          <li>
            <ImportExport
              type="survey"
              import={false}
              export={true}
              data={data.raw}
            ></ImportExport>{" "}
          </li>
          <li className="nav-item mr--8 category-margin">
            <a
              className={`btn btn-default btn-block chartcategory-btn ${
                categoryType === "scale" ? "active" : ""
              }`}
              onClick={() => {
                setCategoryType("scale")
                setBuffer(calcs)
              }}
            >
              Scale
            </a>
          </li>
          <li className="nav-item mr--8 category-margin">
            <a
              className={`btn btn-default btn-block chartcategory-btn ${
                categoryType === "opt_scale" ? "active" : ""
              }`}
              onClick={() => {
                setCategoryType("opt_scale")
                setBuffer(calcs)
              }}
            >
              Opt_scale
            </a>
          </li>

          <li className="nav-item mr--8 category-margin">
            <a
              className={`btn btn-default btn-block chartcategory-btn ${
                categoryType === "dropdown" ? "active" : ""
              }`}
              onClick={() => {
                setCategoryType("dropdown")
                setBuffer(calcs)
              }}
            >
              Dropdown
            </a>
          </li>
          <li className="nav-item mr--8 category-margin">
            <a
              className={`btn btn-default btn-block chartcategory-btn ${
                categoryType === "department" ? "active" : ""
              }`}
              onClick={() => {
                setCategoryType("department")
                setBuffer(calcs)
              }}
            >
              Department
            </a>
          </li>
          <li className="nav-item mr--8 category-margin">
            <a
              className={`btn btn-default btn-block chartcategory-btn ${
                categoryType === "location" ? "active" : ""
              }`}
              onClick={() => {
                setCategoryType("location")
                setBuffer(calcs)
              }}
            >
              Location
            </a>
          </li>
        </ul>
        <label className="mb-0  text-leftt">Survey pages</label>
        {data?.calc?.length && (
          <ul className="nav">
            <li className="nav-item mr--8 category-margin">
              <a
                className={`btn btn-default btn-block chartcategory-btn ${
                  selectedPage === "" ? "active" : ""
                }`}
                onClick={() => {
                  setBuffer(calcs)
                }}
              >
                All pages
              </a>
            </li>
            {[
              ...new Set(
                data?.calc
                  ?.filter((i) => i.type === categoryType)
                  .map((i) => i.page)
              ),
            ]?.map((p) => {
              return (
                <li className="nav-item mr--8 category-margin">
                  <a
                    className={`btn btn-default btn-block chartcategory-btn ${
                      selectedPage === p ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedPage(p)
                    }}
                  >
                    {p}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container-fluid clients-page dd new-2022_class">
        <div className="block-header">
          {categoryType === "scale" && (
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                <BasicBar
                  data={{
                    calc: {
                      categories: buffer
                        ?.filter((i) => i.type === "scale")
                        .map((i) => i.question),
                      series: buffer
                        ?.filter((i) => i.type === "scale")
                        .map((i) => i.calc),
                    },
                  }}
                ></BasicBar>
              </div>
            </div>
          )}
          {categoryType === "opt_scale" && (
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                <BasicBar
                  data={{
                    calc: {
                      categories: buffer
                        ?.filter((i) => i.type === "opt_scale")
                        .map((i) => i.question),
                      series: buffer
                        ?.filter((i) => i.type === "opt_scale")
                        .map((i) => i.calc),
                    },
                  }}
                ></BasicBar>
              </div>
            </div>
          )}
          {categoryType === "dropdown" && (
            <div className="row clearfix">
              {buffer
                ?.filter((i) => i.type === "dropdown")
                ?.map((d) => {
                  return (
                    <>
                      <div className="col-lg-6 col-md-6">
                        <BasicBar data={d} orderBy="positivity"></BasicBar>
                      </div>
                    </>
                  )
                })}
            </div>
          )}
          {categoryType === "department" && (
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                <Table
                  dataSource={data?.locationDepartmentBreakdown?.departments}
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Lmi",
                      dataIndex: "lmi",
                      key: "lmi",
                    },
                    {
                      title: "Count",
                      dataIndex: "count",
                      key: "count",
                    },
                  ]}
                />
              </div>
            </div>
          )}{" "}
          {categoryType === "location" && (
            <div className="row clearfix">
              {" "}
              <div className="col-lg-12 col-md-12">
                <Table
                  dataSource={data?.locationDepartmentBreakdown?.locations}
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Lmi",
                      dataIndex: "lmi",
                      key: "lmi",
                    },
                    {
                      title: "Count",
                      dataIndex: "count",
                      key: "count",
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
