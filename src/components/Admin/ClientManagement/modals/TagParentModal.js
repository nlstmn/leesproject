import React, { useEffect, useState } from "react"
import axios from "axios"
import MultiSelect from "react-multi-select-component"

export default function ModuleModal({ themes, selectedParent, scope, close }) {
  const [formData, setFormData] = useState([])
  const [selectedThemes, setSelectedThemes] = useState([])

  useEffect(() => {
    console.log(selectedParent)
    setFormData({ label: selectedParent.label })
  }, [selectedParent])

  function change(e) {
    const { name, value } = e.target
    setFormData((pre) => {
      return { ...pre, [name]: value }
    })
  }

  function send() {
    let d = {}

    if (scope === "all") {
      d = {
        ...formData,
        client_id: null,
        selectedThemes: selectedThemes.map((i) => i.value),
        type: "parent",
      }
    } else {
      d = {
        ...formData,
        client_id: localStorage.getItem("selectedClientId"),
        selectedThemes: selectedThemes.map((i) => i.value),
        type: "parent",
      }
    }

    if (selectedParent.id) {
      axios
        .put(
          `/admin/clients/${
            localStorage.getItem("selectedClientId")
              ? localStorage.getItem("selectedClientId")
              : "0"
          }/tags/${selectedParent.id}`,
          d
        )
        .then((res) => {
          setFormData({ label: "" })
          setSelectedThemes([])
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
          setSelectedThemes([])
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
              {selectedParent.id
                ? "Edit parent tag label"
                : "Create new parent tag"}
            </label>
            <div className="form-group">
              <input
                type="text"
                value={formData.label}
                onChange={change}
                name="label"
                className="form-control"
                placeholder="Parent tag label"
              />
            </div>
          </div>
          {!selectedParent.id && (
            <div className="col-lg-12 col-md-12 col-sm-12">
              <label className="text-leftt light-black">Select theme(s)</label>
              <MultiSelect
                options={themes.map((i) => {
                  return {
                    value: i.id,
                    label: i.label,
                  }
                })}
                value={selectedThemes}
                disableSearch={false}
                hasSelectAll={true}
                onChange={setSelectedThemes}
                maxSelectedItems={2}
                labelledBy={"Select themes"}
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
          )}
        </div>

        <div className="row clearfix">
          <div className="col-12 pt-20">
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
