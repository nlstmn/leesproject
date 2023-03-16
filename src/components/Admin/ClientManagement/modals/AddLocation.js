import React, { useEffect, useState } from "react"
import { notification } from "antd"
import axios from "axios"
import FloorsModal from "./FloorsModal"
import { connect } from "react-redux"
import { DatePicker } from "antd"
import moment from "moment"
import { Tree, Tooltip } from "antd"

function AddLocation(props) {
  const [formData, setFormData] = useState({})
  const [selectedTab, setSelectedTab] = useState("location")
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")

  useEffect(() => {
    if (props?.selectedLocation?.key) {
      let d = props.selectedLocation
      let f = {
        id: props?.selectedLocation?.key,
        name: d.name,
        postCode: d.postCode ? d.postCode : "",
        numberOfFloors: d.numberOfFloors ? d.numberOfFloors : "",
        targetPopulation: d.targetPopulation,
        area: d.totalNetInterval ? d.totalNetInterval : "",
        country: d.countryShort,
        city: d.cityShort,
        region: d.region,
        location_id: d?.key,
        occupancy_mix: d.occupancy_mix ? d.occupancy_mix : "",
        building_location: d.building_location ? d.building_location : "",
        occupancy_status: d.occupancy_status ? d.occupancy_status : "",
        lat: d.lat ? d.lat : "",
        long: d.long ? d.long : "",
        floors: d.floors,
        region_id: d.region_id
          ? d.region_id
          : d.country_id
          ? props?.regionData?.countries?.filter(
              (o) => o.id === d.country_id
            )[0]?.region_id
          : null,
        country_id: d.country_id,
        city_id: d.city_id,
      }
      setFormData(f)
    } else {
      setFormData({
        name: "",
        postCode: "",
        numberOfFloors: "",
        targetPopulation: "",
        area: "",
        country: "",
        city: "",
        location_id: "",
        occupancy_mix: "",
        building_location: "",
        occupancy_status: "",
      })
    }
  }, [props])

  const change = (e) => {
    let { name, value } = e.target
    if (
      name === "numberOfFloors" ||
      name === "targetPopulation" ||
      name === "area"
    ) {
      value = parseInt(value) <= 0 ? "0" : value
    }
    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  const send = () => {
    if (
      formData.name &&
      formData.country_id &&
      (!props.inside_enabled || formData.targetPopulation)
    ) {
      if (props.locations.map((i) => i.name).includes(formData.name)) {
        notification.warning({ message: "Duplicated location" })
      } else {
        let data = {
          ...formData,
          country_id: parseInt(formData.country_id),
          region_id: parseInt(formData.region_id),
          city_id: parseInt(formData.city_id),
          language: localStorage.getItem("lang"),
        }
        axios
          .post(`/admin/clients/${clientId}/locations`, data)
          .then((res) => {
            notification.success({ message: "Location created" })

            props.close()
          })
          .catch((err) => {
            console.log(err)
            notification.warning({ message: "Could not post!" })
          })
      }
    } else {
      notification.warning({
        message:
          "Please fill required areas.(name,country,city,target population",
      })
    }
  }
  const edit = () => {
    if (formData.name && formData.country_id) {
      if (props.locations.map((i) => i.name).includes(formData.name)) {
        notification.warning({ message: "Duplicated location" })
      } else {
        let data = {
          ...formData,
          country_id: parseInt(formData.country_id),
          region_id: parseInt(formData.region_id),
          city_id: parseInt(formData.city_id),

          language: localStorage.getItem("lang"),
        }

        axios
          .put(`/admin/clients/${clientId}/locations/${formData.id}`, data)
          .then((res) => {
            notification.success({ message: "Location updated" })
            props.close()
          })
          .catch((err) => {
            console.log(err)
            notification.warning({ message: "Could not edit!" })
          })
      }
    } else {
      notification.open({ message: "Please fill required areas." })
    }
  }

  return (
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content modal-border-w py-2 px-2">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <h2 className="card-title mb-0">
                {props?.selectedLocation?.key
                  ? "Location:" + props?.selectedLocation?.name
                  : "Add new location"}
              </h2>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <button
              onClick={() => setSelectedTab("location")}
              className={`btn btn-sm btn-default mr-1 float-l ${
                selectedTab === "location" ? "active" : ""
              }`}
            >
              Location settings
            </button>
            {props.selectedLocation?.key && (
              <button
                onClick={() => setSelectedTab("floors")}
                className={`btn btn-sm btn-default mr-1 float-l ${
                  selectedTab === "floors" ? "active" : ""
                }`}
              >
                Floors
              </button>
            )}
          </div>
          <div className="col-lg-12 col-md-12">
            <hr />
          </div>
          {selectedTab === "location" ? (
            <>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={change}
                    placeholder="Location name "
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    name="region_id"
                    disabled
                    value={formData.region_id}
                    className="form-control show-tick"
                  >
                    <option>Region</option>
                    {props?.regionData?.regions?.map((i) => {
                      return <option value={i.id}>{i.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    onChange={(e) => {
                      setFormData((pre) => {
                        return {
                          ...pre,
                          country_id: e.target.value,
                          region_id: props?.regionData?.countries?.filter(
                            (i) => i.id === e.target.value
                          )[0]?.region_id,
                        }
                      })
                    }}
                    name="country_id"
                    value={formData.country_id}
                    className="form-control show-tick"
                  >
                    {props?.regionData?.countries?.map((i) => {
                      return <option value={i.id}>{i.label}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    onChange={change}
                    name="city_id"
                    className="form-control show-tick"
                    placeholder="Select Country First"
                  >
                    return <option>Select city</option>;
                    {props?.regionData?.cities
                      ?.filter((i) => (i.country_id = formData.country_id))
                      ?.map((i) => {
                        return <option value={i.id}>{i.label}</option>
                      })}
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Postcode "
                    name="postCode"
                    value={formData.postCode}
                    onChange={change}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-12"></div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <select
                    name="building_location"
                    onChange={change}
                    value={formData.building_location}
                    className="form-control show-tick"
                  >
                    <option value="">Building location</option>
                    <option value="Urban">Urban</option>
                    <option value="Suburban">Suburban</option>
                    <option value="Satellite business park">
                      Satellite business park
                    </option>
                    <option value="Rural">Rural</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <select
                    name="building_style"
                    onChange={change}
                    value={formData.building_style}
                    className="form-control show-tick"
                  >
                    <option>Building style</option>
                    {[
                      "Heritage",
                      "Pre 50s",
                      "50s - 80s",
                      "80s - 2000",
                      "Post millenium",
                      "Other",
                    ].map((o) => {
                      return <option value={o}>{o}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <select
                    name="occupancy_status"
                    onChange={change}
                    value={formData.occupancy_status}
                    className="form-control show-tick"
                  >
                    <option value="">Occupancy status</option>
                    <option value="Owned">Owned</option>
                    <option value="Leased">Leased</option>
                    <option value="Sublet">Sublet</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <select
                    name="occupancy_mix"
                    onChange={change}
                    value={formData.occupancy_mix}
                    className="form-control show-tick"
                  >
                    <option value="">Occupancy mix</option>
                    <option value="Sole occupiers">Sole occupiers</option>
                    <option value="Multiple occupants">
                      Multiple occupants
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              {props.inside_enabled && (
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Total area in m2"
                      name="area"
                      value={formData.area}
                      onChange={change}
                    ></input>
                  </div>
                </div>
              )}{" "}
              <div className="col-lg-6 col-md-6 col-sm-12">
                <Tooltip title="Date of organisation moved in">
                  <DatePicker
                    className="takvim-select top-takvim"
                    dropdownClassName="advanced_-picker"
                    readOnly
                    onChange={(a, b) => {
                      setFormData((pre) => {
                        return {
                          ...pre,
                          date_organisation_moved_in: b.splitDate(),
                        }
                      })
                    }}
                    showToday
                    //disabledDate={disabledDate}
                    format="YYYY-MM-DD"
                    defaultPickerValue={moment()}
                    value={moment(formData.date_organisation_moved_in)}
                  />
                </Tooltip>
              </div>{" "}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={change}
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <hr />
              </div>{" "}
              <div className="col-12 pt-40">
                <button
                  type="button"
                  data-dismiss="modal"
                  onClick={() =>
                    props?.selectedLocation?.key ? edit() : send()
                  }
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-default ml-2"
                  data-dismiss="modal"
                  onClick={() => props.close()}
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            props?.selectedLocation?.key && (
              <FloorsModal
                close={props.close}
                clientId={clientId}
                location_id={props?.selectedLocation?.key}
                data={props.selectedLocation.floors}
                refresh={props.refresh}
                locations={props.locations}
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  inside_enabled: state.client.enable_inside,
})

const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(AddLocation)
