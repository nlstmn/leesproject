import React, { useEffect, useState } from "react"
import axios from "axios"
import { notification } from "antd"

export default function ModuleModal({ selected, scope, close, type }) {
  const [formData, setFormData] = useState([])
  const search = window.location.search
  const params = new URLSearchParams(search)
  const urlParam = params.get("client_id")
  const clientId = urlParam ? urlParam : 0
  useEffect(() => {
    console.log(selected)
    setFormData((pre) => {
      return {
        ...pre,
        id: selected.id,
        name: selected.name,
      }
    })
  }, [selected, type])

  function change(e) {
    const { name, value } = e.target
    console.log(name, value)
    setFormData((pre) => {
      return { ...pre, [name]: value }
    })
  }

  function send() {
    let d = {}
    console.log(scope)
    if (scope === "all") {
      d = { ...formData, client_id: null }
    } else {
      d = { ...formData, client_id: clientId }
    }

    console.log(formData)
    if (formData.id) {
      axios
        .put(`/admin/clients/${clientId}/${type}/${formData.id}`, d)
        .then((res) => {
          notification.success({ message: "Updated successfully" })
          close()
        })
        .catch((err) => console.log(err))
    } else {
      axios
        .post(`/admin/clients/${clientId}/${type}`, d)
        .then((res) => {
          notification.success({ message: "Created successfully" })
          close()
        })
        .catch((err) => console.log(err))
    }
  }
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content" style={{ padding: "15px" }}>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <label className="light-black" style={{ marginBottom: "15px" }}>
              {(formData.id ? "Update " : "Create ") +
                type.slice(0, -1).capitalize()}
            </label>
            <div className="form-group">
              <input
                type="text"
                value={formData.name}
                onChange={change}
                name="name"
                className="form-control"
                placeholder={type.slice(0, -1).capitalize() + " name"}
              />
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-12 pt-10">
            <button
              type="button"
              data-dismiss="modal"
              onClick={() => {
                send()
              }}
              className="btn btn-sm btn-primary"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              data-dismiss="modal"
              onClick={() => close()}
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
