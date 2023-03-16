import React, { useEffect, useState } from "react"
import axios from "axios"

export default function ModuleModal({ parents, selectedTag, scope, close }) {
  const [formData, setFormData] = useState([])

  useEffect(() => {
    setFormData({
      id: selectedTag.id,
      label: selectedTag.tag_label,
      parent_id: selectedTag.parent_id,
    })
  }, [selectedTag])

  function change(e) {
    const { name, value } = e.target

    setFormData((pre) => {
      return { ...pre, [name]: value }
    })
  }

  function send() {
    let d = {}

    if (scope === "all") {
      d = { ...formData, type: "tag", client_id: null }
    } else {
      d = {
        ...formData,
        type: "tag",
        client_id: localStorage.getItem("selectedClientId"),
      }
    }

    if (formData.id) {
      axios
        .put(
          `/admin/clients/${
            localStorage.getItem("selectedClientId")
              ? localStorage.getItem("selectedClientId")
              : "0"
          }/tags/${formData.id}`,
          d
        )
        .then((res) => {
          setFormData({ label: "" })
          close()
        })
        .catch((err) => console.log(err))
    } else {
      axios
        .post(
          `/admin/clients/${
            localStorage.getItem("selectedClientId")
              ? localStorage.getItem("selectedClientId")
              : "0"
          }/tags`,
          d
        )
        .then((res) => {
          setFormData({ label: "" })
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
              {formData.id ? "Edit tag label" : "Create new tag"}
            </label>
            <div className="form-group">
              <input
                type="text"
                value={formData.label}
                onChange={change}
                name="label"
                className="form-control"
                placeholder="Tag label"
              />
            </div>
          </div>
          {!formData.id && (
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="form-group">
                <select
                  value={formData.parent_id}
                  onChange={change}
                  name="parent_id"
                  className="form-control show-tick"
                >
                  <option>Select parent tag</option>
                  {parents &&
                    parents.map((i) => {
                      return <option value={i.id}>{i.label}</option>
                    })}
                </select>
              </div>
            </div>
          )}
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
