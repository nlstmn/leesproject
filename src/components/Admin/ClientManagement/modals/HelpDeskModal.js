import React, { useEffect, useState } from "react"
import MultiSelect from "react-multi-select-component"
import { notification } from "antd"
import axios from "axios"
import validator from "validator"
export default function HelpDeskModal(props) {
  const [inputList, setInputList] = useState([{ email: "" }])
  const [selectedThemes, setSelectedThemes] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [title, setTitle] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [email, setEmail] = useState("")
  const [emails, setEmails] = useState([])
  useEffect(() => {
    console.log(props.data)
    console.log(props.editData)
    if (props.editData.emails && props.editData.emails.length > 0) {
      setIsEdit(props.editData.id)
      let edit = props.editData
      setSelectedThemes(
        edit.themes.map((item) => {
          return {
            value: item,
            label: props.data.themes.filter((i) => i.id === item)[0].label,
          }
        })
      )
      setSelectedLocations(
        edit.locations.map((item) => {
          return {
            value: item,
            label: props.data.locations.filter((i) => i.id === item)[0].label,
          }
        })
      )
      setInputList(
        edit.emails.map((item) => {
          return { email: item }
        })
      )
      setTitle(edit.title)
    } else {
      setTitle("")
      setSelectedThemes([])
      setSelectedLocations([])
      setInputList([{ email: "" }])
      setIsEdit(false)
    }
  }, [props])
  useEffect(() => {
    console.log(inputList, selectedThemes, selectedLocations, title)
  }, [inputList, selectedThemes, selectedLocations, title])
  useEffect(() => {
    console.log(isEdit)
  }, [isEdit])

  const dataThemes = props.data.themes
    ? props.data.themes.map((item) => {
        return { label: item.label, value: item.id }
      })
    : []

  const dataLocations = props.data.locations
    ? props.data.locations.map((item) => {
        return { label: item.label, value: item.id }
      })
    : []

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
  function send() {
    if (title.length < 1) {
      notification.warning({ message: "Please select a title" })
    } else if (selectedLocations.length < 1) {
      notification.warning({ message: "Please select a location" })
    } else if (selectedThemes.length < 1) {
      notification.warning({ message: "Please select a theme" })
    } else if (emails.length < 1) {
      notification.warning({ message: "Please provide at least 1 email" })
    } else {
      let data = {
        emails: emails,
        themes: selectedThemes.map((i) => i.value),
        locations: selectedLocations.map((i) => i.value),
        title: title,
      }
      if (!isEdit) {
        console.log("insert", isEdit)
        axios
          .post(
            "/admin/clients/" +
              localStorage.getItem("selectedClientId") +
              "/helpdesk",
            data
          )
          .then((res) => {
            props.close()
          })
          .catch((err) => console.log(err))
      } else {
        console.log("edit", isEdit)
        axios
          .put(
            "/admin/clients/" +
              localStorage.getItem("selectedClientId") +
              "/helpdesk/" +
              isEdit,
            data
          )
          .then((res) => {
            props.close()
          })
          .catch((err) => console.log(err))
      }
    }
  }

  return (
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content" style={{ padding: "15px" }}>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <h2 className="card-title mb-0">HelpDesk edit/update</h2>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12">
            <label className="light-black" style={{ marginBottom: "15px" }}>
              HelpDesk
            </label>
            <div className="form-group">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                className="form-control"
                placeholder="HelpDesk title "
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group text-leftt">
              <label className="text-leftt light-black">Select theme(s)</label>
              <MultiSelect
                options={dataThemes}
                value={selectedThemes}
                disableSearch={false}
                hasSelectAll={true}
                onChange={setSelectedThemes}
                maxSelectedItems={2}
                labelledBy={"Select theme(s)"}
                overrideStrings={{
                  allItemsAreSelected: "(All)",
                  clearSearch: "Clear search",
                  noOptions: "No options",
                  search: "Search",
                  selectAll: "(All)",
                  selectSomeItems: "Select theme(s)",
                }}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="form-group text-leftt">
              <label className="text-leftt light-black">
                Select location(s)
              </label>
              <MultiSelect
                options={dataLocations}
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
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 pt-20">
            <label className="light-black" style={{ marginBottom: "25px" }}>
              Send email to multiple or single recipients
            </label>
            {inputList.map((x, i) => {
              return (
                <>
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
                </>
              )
            })}
          </div>

          <div className="col-12 pt-40">
            <button
              type="button"
              data-dismiss="modal"
              onClick={() => send()}
              className="btn btn-sm btn-primary"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              data-dismiss="modal"
              onClick={() => props.close()}
              style={{ marginLeft: "15px" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
