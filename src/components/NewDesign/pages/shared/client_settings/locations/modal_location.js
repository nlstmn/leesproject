import { Modal, DatePicker } from "antd"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import {
  postNewLocation,
  updateLocation,
} from "../../../../../../actions/adminActions"

const ModalLocation = ({
  isLocationDrawer,
  setLocationDrawer,
  locationRowData,
  title,
  isLocationEdit,
  setLocationEdit,
}) => {
  const dispatch = useDispatch()
  const selectedClientId = useSelector(
    (store) => store.saveClientIdForSurveys.data
  )
  const [isMenu, setMenu] = useState("Locations")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      language: "en-GB",
      parentId: null,
      countryId: null,
      cityId: null,
      postCode: null,
      numberOfFloors: null,
      targetPopulation: null,
      occupancyStatus: null,
      area: null,
      occupancyMix: "",
      buildingLocation: "",
      regionId: null,
      lat: null,
      long: null,
      address: "",
      dateOrganisationMovedIn: null,
      buildingStyle: null,
    },
  })

  useEffect(() => {
    let backToDefaultVals = {
      name: isLocationEdit ? locationRowData.label : "",
      language: "en-GB",
      regionId: isLocationEdit ? locationRowData.region_id : null,
      parentId: null,
      countryId: null,
      cityId: null,
      postCode: null,
      numberOfFloors: null,
      targetPopulation: null,
      occupancyStatus: null,
      area: null,
      occupancyMix: "",
      buildingLocation: "",
      lat: null,
      long: null,
      address: "",
      dateOrganisationMovedIn: null,
      buildingStyle: null,
    }
    reset({ ...backToDefaultVals })
  }, [locationRowData, isLocationEdit])

  return (
    <>
      <Modal
        className="filter_drawer small right_filter"
        onCancel={() => {
          setLocationDrawer(false)
          console.log("CANCEL BUTTON IS WORKING")
        }}
        visible={isLocationDrawer}
        closeIcon={
          <button
            onClick={() => {
              setLocationDrawer(false)
            }}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>
        }
        footer={null}
      >
        <div className="n_drawer_body">
          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <div className="n_menu_horizontal top">
                <a
                  onClick={() => setMenu("Locations")}
                  href="#!"
                  className={`${isMenu === "Locations" ? " active" : ""} `}
                >
                  Locations
                </a>
                <a
                  onClick={() => setMenu("Floors")}
                  href="#!"
                  className={`${isMenu === "Floors" ? " active" : ""} `}
                >
                  Floors
                </a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>
            {isMenu === "Locations" ? (
              <form
                className="w-100 row"
                onSubmit={handleSubmit((data) => {
                  const locationData = { locationData: data }
                  !isLocationEdit
                    ? dispatch(postNewLocation(selectedClientId, locationData))
                    : dispatch(updateLocation(selectedClientId, locationData))
                })}
              >
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Location name</span>
                      <input
                        type="text"
                        name="name"
                        className={`n__form_input ${
                          errors.name?.type === "required" && "border-danger"
                        }`}
                        {...register("name", { required: "true" })}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors.name?.type === "required" && (
                        <small className="text-danger">
                          Name field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Region</span>
                      <div className="n__form_select">
                        <select
                          name="regionId"
                          id="regionId"
                          {...register("regionId", { valueAsNumber: true })}
                        >
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Country</span>
                      <div className="n__form_select">
                        <select
                          name="countryId"
                          id="countryId"
                          {...register("countryId", { valueAsNumber: true })}
                        >
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>City</span>
                      <div className="n__form_select">
                        <select
                          name="cityId"
                          id="cityId"
                          {...register("cityId")}
                        >
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label" htmlFor="postCode">
                      <span>Postcode</span>
                      <input
                        type="text"
                        name="postCode"
                        id="postCode"
                        className={`n__form_input ${
                          errors.postCode?.type === "required" &&
                          "border-danger"
                        }`}
                        {...register("postCode", {
                          required: "true",
                          valueAsNumber: true,
                        })}
                        aria-invalid={errors.postCode ? "true" : "false"}
                      />
                      {errors.postCode?.type === "required" && (
                        <small className="text-danger">
                          Postcode field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label" htmlFor="numberOfFloors">
                      <span>Number of floor</span>
                      <input
                        type="number"
                        name="numberOfFloors"
                        className={`n__form_input ${
                          errors.numberOfFloors?.type === "required" &&
                          "border-danger"
                        }`}
                        {...register("numberOfFloors", { required: "true" })}
                        aria-invalid={errors.numberOfFloors ? "true" : "false"}
                      />
                      {errors.numberOfFloors?.type === "required" && (
                        <small className="text-danger">
                          Number of floor field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Building location</span>
                      <div className="n__form_select">
                        <select
                          name="buildingLocation"
                          id="buildingLocation"
                          {...register("buildingLocation")}
                        >
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Building style</span>
                      <div className="n__form_select">
                        <select
                          name="buildingStyle"
                          id="buildingStyle"
                          {...register("buildingStyle")}
                        >
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Occupancy status</span>
                      <div className="n__form_select">
                        <select
                          name="occupancyStatus"
                          id="occupancyStatus"
                          {...register("occupancyStatus")}
                        >
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Occupancy mix</span>
                      <div className="n__form_select">
                        <select
                          name="occupancyMix"
                          id="occupancyMix"
                          {...register("occupancyMix")}
                        >
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Total area (m2)</span>
                      <input
                        type="number"
                        name="area"
                        id="area"
                        className={`n__form_input w-100 ${
                          errors.area?.type && "border-danger"
                        }`}
                        {...register("area", {
                          valueAsNumber: true,
                          required: "true",
                        })}
                        aria-invalid={errors.area ? "true" : "false"}
                      />
                      {errors.area?.type === "required" && (
                        <small className="text-danger">
                          Total area field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Date of organisation moved in</span>
                      <div className="n_calendar_select">
                        <DatePicker
                          className="w-100"
                          format={"DD / MM / YYYY"}
                          style={{ width: "100%" }}
                          getCalendarContainer={(triggerNode) => {
                            return triggerNode.parentNode
                          }}
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="bottom_side d-flex justify-content-end mt-3">
                  <button
                    type="button"
                    className="n__btn outline icon mr-2"
                    onClick={() => setLocationDrawer(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="n__btn dark icon">
                    Apply
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* ADD NEW */}
                <div className="col-lg-6">
                  <div className="n__form_control input_has_btn">
                    <label className="n__form_label">
                      <span>Add new floor</span>

                      <div className="group">
                        <input
                          type="text"
                          name="name"
                          className="n__form_input"
                          placeholder="Floor label..."
                        />
                        <button className="iconic__btn" title="Add">
                          <span className="iconx-plus1"></span>
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_divider">
                    <div className="n__divider"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <h5 className="d_sub_title">Added floors</h5>
                </div>

                {/* ITEMS */}
                {/* Item 1 */}
                <div className="col-lg-6">
                  <div className="n__form_control input_has_btn">
                    <label className="n__form_label">
                      <div className="group">
                        <input
                          type="text"
                          name="name"
                          className="n__form_input"
                          defaultValue="Floor 1..."
                        />
                        <button className="iconic__btn" title="Delete">
                          <span className="iconx-minus1"></span>
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
                {/* Item 1 */}
                <div className="col-lg-6">
                  <div className="n__form_control input_has_btn">
                    <label className="n__form_label">
                      <div className="group">
                        <input
                          type="text"
                          name="name"
                          className="n__form_input"
                          defaultValue="Floor 2..."
                        />
                        <button className="iconic__btn" title="Delete">
                          <span className="iconx-minus1"></span>
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="bottom_side d-flex justify-content-end mt-3">
                  <button
                    className="n__btn outline icon mr-2"
                    onClick={() => setLocationDrawer(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="n__btn dark icon"
                    onClick={() => setLocationDrawer(false)}
                  >
                    Apply
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {/* TODO: style default buttons */}
      </Modal>
    </>
  )
}

export default ModalLocation
