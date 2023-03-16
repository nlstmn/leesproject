import React, { useEffect, useLayoutEffect, useState } from "react"
import axios from "axios"
import { notification } from "antd"
import ImportExport from "../../../common/ImportExport"
export default function FloorsModal({
  clientId,
  close,
  location_id,
  data,
  refresh,
  locations,
}) {
  const [newFloorLabel, setNewFloorLabel] = useState("")
  const [floors, setFloors] = useState(data)
  useLayoutEffect(() => {
    setFloors(locations.filter((i) => i.key === location_id)[0].floors)
  }, [JSON.stringify(locations)])

  function sendAllFloors() {
    return Promise.all(
      floors.map((i) => {
        return sendFloor(i.id)
      })
    )
  }
  useEffect(() => {
    setFloors(data)
  }, [data])

  function sendFloor(id) {
    if (
      data
        .map((i) => i.label)
        .includes(floors.filter((i) => i.id === id)[0]?.label)
    ) {
      notification.warning({ message: "Floor already exists" })
    } else {
      let data = {
        label: floors.filter((i) => i.id === id)[0]?.label,
        lang_id: 12,
      }

      axios
        .put(`/admin/clients/${clientId}/locations/${id}/translations`, [data])
        .then((res) => {
          refresh()
          notification.success({ message: "Floors updated" })
        })
        .catch((err) => console.log(err))
    }
  }
  function sendNewFloor() {
    if (floors.map((i) => i.label).includes(newFloorLabel)) {
      notification.warning({ message: "Floor already exists" })
    } else {
      const data = {
        parent_id: location_id,
        name: newFloorLabel,
        language: "en-GB",
      }
      axios
        .post(`/admin/clients/${clientId}/locations`, data)
        .then((res) => {
          setNewFloorLabel("")
          refresh()
          notification.success({ message: "New floor created" })
        })
        .catch((err) => console.log(err))
    }
  }
  function changeFloors(id, label) {
    let buffer = floors
    if (buffer.map((i) => i.id).includes(id)) {
      buffer = buffer.filter((i) => i.id !== id)
      buffer.push({ id: id, label: label })
    } else {
      buffer.push({ id: id, label: label })
    }
    setFloors(buffer?.sort((a, b) => a.id - b.id))
  }
  return (
    <>
      <ImportExport
        import={true}
        export={true}
        refresh={refresh}
        type="floors"
        clientId={clientId}
        locationId={location_id}
        data={floors.map((i) => {
          return { floor: i.label }
        })}
        additionalClasses={["floor-_Add"]}
        allData={floors}
      />
      <div className="col-lg-8 col-md-8 col-sm-12 floor-_Add">
        <div className="form-group w-100">
          <lable>Floor label</lable>
          <input
            type="text"
            onChange={(e) => {
              setNewFloorLabel(e.target.value)
            }}
            className="form-control"
            placeholder="Add new floor"
            value={newFloorLabel}
          />
        </div>
        <button
          type="button"
          onClick={sendNewFloor}
          className="btn btn-sm btn-primary"
        >
          Add
        </button>
      </div>
      {floors?.length > 0 &&
        floors
          ?.sort((a, b) => {
            return a.id - b.id
          })
          .map((i) => {
            return (
              <div className="col-lg-8 col-md-8 col-sm-12 floor-_Add">
                <div className="form-group w-100">
                  <lable>&nbsp;&nbsp;&nbsp;</lable>
                  <input
                    type="text"
                    value={i.label}
                    onChange={(e) => changeFloors(i.id, e.target.value)}
                    className="form-control"
                    placeholder="Floor label"
                  />
                </div>{" "}
                <button
                  type="button"
                  onClick={() => {
                    sendFloor(i.id)
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </button>
              </div>
            )
          })}
      <div className="col-12 pt-40">
        <button
          type="button"
          data-dismiss="modal"
          onClick={() => {
            sendAllFloors()
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
    </>
  )
}
