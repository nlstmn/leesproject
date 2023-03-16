import React, { useEffect, useState } from "react"
import { notification, Drawer } from "antd"
import Tabs from "./Tabs"
import MultiSelect from "react-multi-select-component"
import axios from "axios"
import validator from "validator"
import { getNotificationManagementAction } from "../../../actions/adminActions"
import { useDispatch, useSelector } from "react-redux"
const NotificationManagement = () => {
  const dispatch = useDispatch()
  const { questions, locations, campaigns, notifications, data } = useSelector(
    (store) => store.getNotificationManagement
  )

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isChildrenModalVisible, setIsChildrenModalVisible] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState([])

  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [selectedCampaign, setSelectedCampaign] = useState()

  const [emails, setEmails] = useState([])
  const [email, setEmail] = useState("")
  const [modules, setModules] = useState([])
  const [selectedModules, setSelectedModules] = useState([])

  const [notificationType, SetNotificationType] = useState("admin_question")
  const [comparisonType, setComparisonType] = useState("Lower")
  const [score, setScore] = useState("")
  const [title, setTitle] = useState("")
  const [count, setCount] = useState("")
  const [selectedNotification, setSelectedNotification] = useState("")

  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    refreshData()
  }, [notificationType])

  useEffect(() => {
    console.log(campaigns, selectedCampaign)
    campaigns.length > 0 &&
      selectedCampaign &&
      setSelectedQuestions(
        campaigns.filter((i) => i.id === parseInt(selectedCampaign))[0]
          .questions
      )
  }, [selectedCampaign])

  useEffect(() => {
    let n = notifications.filter((i) => i.id === selectedNotification)[0]
    n && populateModalData(n)
  }, [selectedNotification])

  useEffect(() => {
    console.log(selectedLocations)
  }, [selectedLocations])

  function getData() {
    dispatch(getNotificationManagementAction({ clientId }))

    populateModules(data)
  }

  const populateModules = (questions) => {
    let arr = []
    questions.forEach((i) => {
      i.modules.forEach((m) => {
        m && arr.push(m)
      })
    })
    arr = [...new Set(arr)]
    setModules(arr)
  }

  const handleQuestion = (id) => {
    console.log(id)
    let arr = selectedQuestions
    if (arr.includes(id)) {
      arr = arr.filter((i) => i !== id)
    } else {
      arr.push(id)
    }
    console.log(arr)
    setSelectedQuestions([...arr])
  }

  const removeQuestion = (id) => {
    let arr = selectedQuestions
    arr = arr.filter((i) => i !== id)
    setSelectedQuestions([...arr])
  }

  const removeEmail = (e) => {
    let arr = emails
    arr = arr.filter((i) => i !== e)
    setEmails([...arr])
  }

  const addEmail = () => {
    if (validator.isEmail(email)) {
      let arr = emails
      arr.push(email)
      setEmails([...emails])
      setEmail("")
    } else {
      notification.warning({ message: "Please enter a correct email" })
    }
  }

  const send = () => {
    let data = {
      id: selectedNotification,
      questions: selectedQuestions,
      locations: selectedLocations.map((i) => i.value),
      title: title,
      score: score,
      respondent_count: count,
      emails: emails,
      comparisonType: comparisonType,
      notificationType: notificationType,
      campaign_id: selectedCampaign,
    }
    if (selectedLocations.length < 1) {
      notification.warning({
        message: "Please select at least one Location",
        placement: "topLeft",
      })
    } else if (emails.length < 1) {
      notification.warning({
        message: "Please enter at least one email",
        placement: "topLeft",
      })
    } else if (title.length < 3) {
      notification.warning({
        message: "Please enter a title",
        placement: "topLeft",
      })
    } else if (!count) {
      notification.warning({
        message: "Please enter responder count",
        placement: "topLeft",
      })
    } else if (!score) {
      notification.warning({
        message: "Please enter a threshould score (0-100)",
        placement: "topLeft",
      })
    } else if (
      notificationType === "admin_question" &&
      selectedQuestions.length < 1
    ) {
      notification.warning({
        message: "Please select at least one question",
        placement: "topLeft",
      })
    } else if (notificationType === "admin_campaign" && !selectedCampaign) {
      notification.warning({
        message: "Please select a campaign",
        placement: "topLeft",
      })
    } else {
      if (data.id) {
        console.log(data)
        axios
          .put(`/admin/clients/${clientId}/notifications/${data.id}`, data)
          .then((res) => {
            refreshData()
            getData()
            setIsModalVisible(false)
            notification.success({ message: "Notification rule updated" })
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        axios
          .post(`/admin/clients/${clientId}/notifications`, data)
          .then((res) => {
            refreshData()
            getData()
            setIsModalVisible(false)
            notification.success({ message: "Notification rule created" })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  const refreshData = () => {
    setSelectedNotification("")
    setSelectedLocations([])
    setSelectedModules()
    setSelectedQuestions([])
    setTitle("")
    setScore("")
    setCount("")
    setSelectedCampaign("")
    setEmails([])
  }

  const populateModalData = (n) => {
    console.log(n)
    let l = n.locations.map((i) => {
      return {
        value: i,
        label: locations.filter((p) => p.id === i)[0].label,
      }
    })
    setSelectedLocations(l)
    setSelectedQuestions(n.questions)
    setTitle(n.title)
    setScore(n.score)
    setCount(n.respondent_count)
    setSelectedCampaign(n.campaign_id)
    setEmails(n.emails)
    SetNotificationType(n.type)
  }

  const deleteNotification = (id) => {
    axios
      .delete(`/admin/clients/${clientId}/notifications/${id}`)
      .then((res) => {
        refreshData()
        getData()
        setIsModalVisible(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const toggleState = (id, state) => {
    axios
      .put(`/admin/clients/${clientId}/notifications/${id}`, { state: !state })
      .then((res) => {
        notification.success({ message: "State updated!" })
        getData()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Drawer
        className="dark--modal"
        title="Add / edit notification"
        width={1300}
        closable={false}
        onClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
      >
        <div className="row clearfix">
          <div className="col-lg-3 col-md-12">
            <div className="form-group">
              <select
                onChange={(e) => {
                  console.log(e.target.value)
                  SetNotificationType(e.target.value)
                }}
                className="form-control show-tick"
                value={notificationType}
              >
                <option value="admin_question">Question</option>
                <option value="admin_campaign">Campaign</option>
                <option value="admin_xp">Xp</option>
                <option value="admin_feedback">Feedback</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="form-group">
              {/* bildirim adı */}
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                className="form-control"
                placeholder="Rule title"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="form-group">
              <div className="input-group">
                {/* respondent number */}
                <input
                  onChange={(e) =>
                    setCount(e.target.value <= 1 ? 1 : e.target.value)
                  }
                  value={count}
                  min={1}
                  type="number"
                  className="form-control"
                  placeholder="Respondent count "
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="form-group">
              <div className="input-group">
                {/* kaçın altına düşerse bildirim gelsin */}
                <div className="input-group-prepend">
                  {/* <span className="input-group-text">%</span> */}
                  <select
                    value={comparisonType}
                    onChange={(e) => setComparisonType(e.target.value)}
                  >
                    <option value="Lower">Lower</option>
                    <option value="Higher">Higher</option>
                  </select>
                </div>
                <input
                  onChange={(e) => {
                    setScore(e.target.value <= 1 ? 1 : e.target.value)
                  }}
                  value={score}
                  type="number"
                  className="form-control"
                  placeholder="Score Threshold"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="form-group text-leftt">
              {/* hangi lokasyon(lar) için */}
              <MultiSelect
                options={locations.map((i) => {
                  return { value: i.id, label: i.label }
                })}
                value={selectedLocations}
                disableSearch={false}
                hasSelectAll={true}
                onChange={setSelectedLocations}
                maxSelectedItems={2}
                labelledBy={"Select location(s)"}
                overrideStrings={{
                  allItemsAreSelected: "(All)",
                  clearSearch: "Clear search",
                  noOptions: "No options",
                  search: "Search",
                  selectAll: "(All)",
                  selectSomeItems: "Select location(s)",
                }}
              />
            </div>
          </div>
          {notificationType === "admin_campaign" && (
            <div className="col-lg-3 col-md-12">
              <div className="form-group">
                <select
                  onChange={(e) => {
                    console.log(e.target.value)
                    setSelectedCampaign(e.target.value)
                  }}
                  value={selectedCampaign}
                  className="form-control show-tick"
                >
                  <option>Select campaign</option>
                  {campaigns &&
                    campaigns.map((item) => {
                      return <option value={item.id}>{item.title}</option>
                    })}
                </select>
              </div>
            </div>
          )}

          <div className="col-lg-12">
            <hr />
          </div>

          {/* Bildirim kimlere gönderilecek */}

          {/* Eklendi - sil butonu */}
          {emails.map((i) => {
            return (
              <div className="col-lg-12 col-md-12 multiple--add-location d-flex">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    value={i}
                    disabled
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeEmail(i)}
                  className="btn btn-sm btn-default add--q"
                  title="Delete"
                >
                  <i className="iconx-trash"></i>
                </button>
              </div>
            )
          })}

          {/* Boş - yenisini ekle butonu  */}
          <div className="col-lg-12 col-md-12 multiple--add-location d-flex">
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email: (Who will be notified?)"
              />
            </div>
            <button
              type="button"
              onClick={() => addEmail()}
              className="btn btn-sm btn-default add--q"
              title="Add"
            >
              <i className="iconx-plus1"></i>
            </button>
          </div>

          <div className="col-lg-12">
            <hr />
          </div>

          {(notificationType === "admin_question" ||
            notificationType === "admin_campaign") && (
            <div className="col-md-12 col-sm-12">
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                  {/* yeni soru ekle */}
                  <button
                    type="button"
                    onClick={() => setIsChildrenModalVisible(true)}
                    className="btn btn-sm btn-primary add--q mt-2 mb-2"
                    title="Delete"
                  >
                    Add new question
                  </button>

                  {/* eklenen - seçilen sorular */}
                  <div className="table-responsive">
                    <table className="table table-hover table-custom spacing5">
                      <thead>
                        <tr>
                          <th>Question(s)</th>
                          <th className="text-right">Type</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions &&
                          selectedQuestions.length > 0 &&
                          selectedQuestions.map((q) => {
                            return (
                              <tr>
                                <td>
                                  <div className="d-flex text-left">
                                    <div>
                                      <p className="mb-0">
                                        {questions.filter(
                                          (i) => i.id === q
                                        )[0] &&
                                          questions.filter((i) => i.id === q)[0]
                                            .heading}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-right">
                                  <p className="mb-0">
                                    {questions.filter((i) => i.id === q)[0] &&
                                      questions
                                        .filter((i) => i.id === q)[0]
                                        .modules.toString()}
                                  </p>
                                </td>
                                <td className="text-right">
                                  <button
                                    onClick={() => {
                                      removeQuestion(q)
                                    }}
                                    type="button"
                                    className="btn btn-sm btn-default"
                                    title="Delete"
                                  >
                                    <i className="iconx-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="dual--screen-bottom">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => setIsModalVisible(false)}
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              send()
            }}
            className="btn btn-sm btn-primary"
            style={{ marginLeft: "15px" }}
          >
            Save
          </button>
        </div>

        {(notificationType === "admin_question" ||
          notificationType === "admin_campaign") && (
          <Drawer
            title="Select question(s)"
            width={500}
            closable={false}
            onClose={() => setIsChildrenModalVisible(false)}
            visible={isChildrenModalVisible}
          >
            <div className="row clearfix">
              <div className="col-md-12 col-sm-12">
                <div className="form-group">
                  {/* modül seç */}
                  <select
                    onChange={(e) => setSelectedModules(e.target.value)}
                    className="form-control"
                  >
                    <option>Select Module</option>
                    {modules &&
                      modules.map((i) => {
                        return <option value={i}>{i}</option>
                      })}
                  </select>
                </div>

                <hr />

                {/* Sadece aktif questionlar gösterilecek */}

                <div className="questions--list-s">
                  {/* başlık */}

                  <div className="text-leftt light-black pb-20 pt--40">
                    {selectedModules}
                  </div>
                  {/* başlığa ait liste */}
                  {questions &&
                    questions
                      .filter((i) => i.modules.includes(selectedModules))
                      .map((i) => {
                        return (
                          <label className="fancy-checkbox">
                            <input
                              checked={selectedQuestions.includes(i.id)}
                              onChange={() => handleQuestion(i.id)}
                              type="checkbox"
                              name="questions"
                            />
                            <span className="light-black">{i.heading}</span>
                          </label>
                        )
                      })}
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
        )}
      </Drawer>

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
                <h2 className="card-title mt-4">Notification Management</h2>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <button
                  onClick={() => {
                    refreshData()
                    setIsModalVisible(true)
                  }}
                  type="button"
                  className="btn btn-primary bigger-_btn ml-3"
                >
                  New notification rule
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 mt--22">
            <div className="card">
              <div className="body">
                <div className="row clearfix pt-40 pb-34">
                  {/* eklenen bildirimler */}
                  {notifications &&
                    notifications.map((i) => {
                      return (
                        <div className="col-lg-3 col-md-6">
                          <div className="card">
                            <div className="body noti-rule--body">
                              <div className="d-flex">
                                {/* noti title */}
                                <div className="m-0 text-left alarm--title">
                                  {i.title}
                                </div>
                                <div className="ml-auto">
                                  <label className="switch">
                                    <input
                                      type="checkbox"
                                      checked={i.enabled}
                                      onChange={() => {
                                        toggleState(i.id, i.enabled)
                                      }}
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </div>
                              </div>
                              <div className="bottom-_-infos">
                                <div className="text-muted dp--block mt-2">
                                  {/* kaçın altına düşerse  */}
                                  <ul className="noti-_ul mb-0">
                                    <li> Type: {i.type} </li>
                                    <li> Notify: </li>
                                    {i.emails.map((email) => {
                                      return <li>{email}</li>
                                    })}
                                    <li>
                                      when {i.respondent_count} users answer
                                      score
                                    </li>
                                    <li>
                                      {" " + i.comparison_type} then %{i.score}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="d-flex mt-2">
                                <div className="ml-auto">
                                  {/* düzenle */}
                                  <a
                                    onClick={() => {
                                      setSelectedNotification(i.id)
                                      setIsModalVisible(true)
                                    }}
                                    className="left--btn-icon cursorp"
                                  >
                                    <i className="iconx-edit-2"></i>
                                  </a>
                                </div>
                                <div>
                                  {/* sil */}
                                  <a
                                    onClick={() =>
                                      window.confirm(
                                        "Are you sure to delete that notification?"
                                      ) && deleteNotification(i.id)
                                    }
                                    className="right--btn-icon cursorp"
                                  >
                                    <i className="iconx-trash"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default NotificationManagement
