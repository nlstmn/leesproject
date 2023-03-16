import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Upload, message, Button, notification, Space } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { connect } from "react-redux"
import axios from "axios"
import Tabs from "./Tabs"
import { fetchClientSuccess } from "../../../actions/client"
import { useSelector } from "react-redux"
const Main = ({ fetchClientSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    language: localStorage.getItem("lang"),
  })
  const [industries, setIndustries] = useState(<option>Fetching...</option>)
  const [renderTabs, setRenderTabs] = useState(false)

  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const history = useHistory()

  useEffect(() => {
    getData()
  }, [])
  function getData() {
    if (clientId) {
      axios.get(`/admin/clients/${clientId}`).then((res) => {
        console.log(res.data)
        fetchClientSuccess(res.data.result[0])
        let u = res.data.result[0]
        if (u && u.name) {
          let arr = {
            name: u.name,
            website: u.website,
            clientRefNo: u.client_ref_no,
            industry: u.industry_id,
            invite_code: u.invite_code,
            enable_feedbacks: u.enable_feedbacks,
            enable_questions: u.enable_questions,
            enable_inside: u.enable_inside,
            enable_xp: u.enable_xp,
            question_validity_period: u.question_validity_period,
          }
          setFormData(arr)
        } else {
          history.push("/client-main")
        }
      })
    }
    axios.get("/client/industries").then((res_) => {
      populateIndustries(res_.data.result)
    })
  }
  function populateIndustries(arr) {
    console.log(arr)
    let populated = arr?.sortAlphabetically("name").map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      )
    })
    console.log(populated)
    setIndustries(populated)
  }

  function change(e) {
    const { name, value } = e.target
    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }
  function handleChange(e) {
    const { name, value } = e.target

    setFormData((pre) => {
      return {
        ...pre,
        industry: value,
      }
    })
  }
  function NewClient() {
    if (formData.name === "" || !formData.clientRefNo) {
      notification.open({ message: "Please enter client name and ref no" })
    } else if (!formData.industry) {
      notification.warning({ message: "Please select industry" })
    } else {
      if (clientId) {
        axios
          .put(`/admin/clients/${clientId}`, formData)
          .then((res) => {
            notification.success({
              message: "Client Edited",
            })
            getData()
          })
          .catch((err) => {
            notification.warning({ message: "Couldn't update the client" })
          })
      } else {
        axios
          .post("/admin/clients", {
            ...formData,
            ...{ language: localStorage.getItem("lang") },
          })
          .then((res) => {
            let client_id = res.data.result[0].id

            localStorage.setItem("selectedClientId", client_id)
            localStorage.setItem("selectedClientLang", 12)

            setRenderTabs(true)
            notification.success({
              message: "New Client Registered.",
            })
            history.push(`client-main?client_id=${client_id}`)
            //getData();
          })
          .catch((err) => {
            notification.warning({ message: "Please enter all needed data" })
          })
      }
    }
  }

  return (
    <>
      <div className="container-fluid clients-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>

              <Tabs render={renderTabs}></Tabs>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title mt-4">Main</h2>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-7 mt--22">
            <div className="card">
              <div className="body">
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Client Name"
                        name="name"
                        value={formData.name}
                        onChange={change}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Client Ref No "
                        name="clientRefNo"
                        value={formData.clientRefNo}
                        onChange={change}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Website"
                        name="website"
                        value={formData.website}
                        onChange={change}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <select
                        value={formData.industry}
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option>Please select industry</option>
                        {industries}
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Upload Logo</Button>
                      </Upload>
                    </div>
                  </div> */}
                  <div className="col-lg-6 col-md-6">
                    <Space>
                      <span className="light-black">
                        Question validity period (days):
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Question validity period (days)"
                        name="question_validity_period"
                        value={formData.question_validity_period}
                        onChange={change}
                      />
                    </Space>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <label className="fancy-checkbox min-w-168">
                      <input
                        onChange={() => {
                          setFormData((pre) => {
                            return {
                              ...pre,
                              enable_inside: !formData.enable_inside,
                            }
                          })
                        }}
                        checked={formData.enable_inside}
                        type="checkbox"
                      />
                      <span className="light-black">
                        <i></i>
                        Inside
                      </span>
                    </label>{" "}
                    {formData.enable_inside && (
                      <>
                        <label className="fancy-checkbox min-w-168">
                          <input
                            checked={formData.enable_feedbacks}
                            onChange={() => {
                              setFormData((pre) => {
                                return {
                                  ...pre,
                                  enable_feedbacks: !formData.enable_feedbacks,
                                }
                              })
                            }}
                            type="checkbox"
                          />
                          <span className="light-black">
                            <i></i>
                            Feedbacks
                          </span>
                        </label>
                        <label className="fancy-checkbox min-w-168">
                          <input
                            checked={formData.enable_questions}
                            onChange={() => {
                              setFormData((pre) => {
                                return {
                                  ...pre,
                                  enable_questions: !formData.enable_questions,
                                }
                              })
                            }}
                            type="checkbox"
                          />
                          <span className="light-black">
                            <i></i>
                            Questions
                          </span>
                        </label>
                        <label className="fancy-checkbox min-w-168">
                          <input
                            onChange={() => {
                              setFormData((pre) => {
                                return {
                                  ...pre,
                                  enable_xp: !formData.enable_xp,
                                }
                              })
                            }}
                            checked={formData.enable_xp}
                            type="checkbox"
                          />
                          <span className="light-black">
                            <i></i>
                            Xp
                          </span>
                        </label>{" "}
                      </>
                    )}
                  </div>
                  {formData.invite_code && (
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group mt-2 mb-0">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              window.location.origin +
                                "/signup?invite_code=" +
                                formData.invite_code
                            )
                            notification.success({
                              message: "Invite link copied to clipboard!",
                            })
                          }}
                        >
                          Invite link
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-12 col-md-12 mt-5">
                    <Link
                      to="/clients"
                      className="btn btn-sm btn-default mr-1 float-l"
                    >
                      Cancel
                    </Link>{" "}
                    &nbsp;&nbsp;
                    <button
                      onClick={NewClient}
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  fetchClientSuccess: (e) => dispatch(fetchClientSuccess(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Main)
