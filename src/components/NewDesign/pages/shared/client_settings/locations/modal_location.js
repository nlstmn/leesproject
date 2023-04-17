import { Modal, DatePicker } from "antd"
import React, { useState, useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm, useWatch } from "react-hook-form"
import {
  getCities,
  getCountries,
  getRegions,
  postNewLocation,
  updateLocation,
} from "../../../../../../actions/adminActions"
import { resetCities } from "../../../../../../actions/locations"

const ModalLocation = ({
  isLocationDrawer,
  setLocationDrawer,
  locationRowData,
  title,
  isLocationEdit,
  setLocationEdit,
}) => {
  const dispatch = useDispatch()
  const regionsList = useSelector((store) => store.getRegions.data)
  const countriesList = useSelector((store) => store.getCountries.data)
  const citiesList = useSelector((store) => store.getCities.data)
  const selectedClientId = useSelector(
    (store) => store.saveClientIdForSurveys.data
  )
  const menuIndex = useSelector((store) => store.saveMenuIndex.data)
  const [isMenu, setMenu] = useState("Locations")

  const [locationsInitialData, setLocationsInitialData] = useState({})

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
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

  let watchRegionId = watch("regionId")
  let watchCountryId = watch("countryId")
  let watchCityId = watch("cityId")
  let dateOfOrganization = watch("dateOrganisationMovedIn")

  useEffect(() => {
    dispatch(getRegions(1))
  }, [])

  useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      name: locationRowData.label,
      language: "en-GB",
      parentId: locationRowData.parentId,
      countryId: locationRowData.country_id,
      cityId: locationRowData.city_id,
      postCode: locationRowData.postCode,
      numberOfFloors: locationRowData.numberOfFloors,
      targetPopulation: null,
      occupancyStatus: locationRowData.occupancyStatus,
      area: locationRowData.area,
      occupancyMix: locationRowData.occupancyMix,
      buildingLocation: locationRowData.buildingLocation,
      regionId: locationRowData.region_id,
      lat: null,
      long: null,
      address: "",
      dateOrganisationMovedIn: locationRowData.dateOrganisationMovedIn,
      buildingStyle: null,
    }))
    console.log("LOCATION ROW DATA", locationRowData)
  }, [locationRowData])

  // If region list is changed reset cities data, first user
  // changes the country then, city area will be activated
  useEffect(() => {
    dispatch(resetCities())
    setValue("cityId", null)
  }, [watchRegionId])

  // Fetch Countries Data When Is Not Null
  useEffect(() => {
    watchRegionId !== null &&
      menuIndex === "Locations" &&
      dispatch(getCountries(selectedClientId, watchRegionId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchRegionId])

  // Fetch Cities Data When Country Id Is Not Null
  useEffect(() => {
    watchCountryId !== null &&
      menuIndex === "Locations" &&
      dispatch(getCities(selectedClientId, watchCountryId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCountryId])

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
                          className={`n__form_input ${
                            errors.regionId?.type === "required" &&
                            "border-danger"
                          }`}
                          name="regionId"
                          id="regionId"
                          {...register("regionId", {
                            required: "true",
                            valueAsNumber: true,
                          })}
                        >
                          {regionsList !== [] &&
                            regionsList.map((item) => (
                              <option value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                      {errors.regionId?.type === "required" && (
                        <small className="text-danger">
                          Region field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Country</span>
                      <div className="n__form_select">
                        <select
                          className={`n__form_input ${
                            errors.countryId?.type === "required" &&
                            "border-danger"
                          }`}
                          name="countryId"
                          id="countryId"
                          disabled={countriesList.length === 0}
                          {...register("countryId", {
                            required: "true",
                            valueAsNumber: true,
                          })}
                        >
                          {countriesList.map((item) => (
                            <option value={item.id}>{item.label}</option>
                          ))}
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                      {errors.countryId?.type === "required" && (
                        <small className="text-danger">
                          Country field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>City</span>
                      <div className="n__form_select">
                        <select
                          className={`n__form_input ${
                            errors.cityId?.type === "required" &&
                            "border-danger"
                          }`}
                          name="cityId"
                          id="cityId"
                          {...register("cityId", {
                            required: "true",
                            valueAsNumber: true,
                          })}
                          disabled={citiesList.length === 0}
                        >
                          {citiesList

                            .map((item) => (
                              <option value={item.id}>{item.label}</option>
                            ))
                            .sort((a, b) => {
                              return a.label - b.label
                            })}
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                      {errors.cityId?.type === "required" && (
                        <small className="text-danger">
                          City field is required
                        </small>
                      )}
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
                          className={`n__form_input ${
                            errors.buildingLocation?.type === "required" &&
                            "border-danger"
                          }`}
                          name="buildingLocation"
                          id="buildingLocation"
                          {...register("buildingLocation", {
                            required: "true",
                          })}
                        >
                          <option value="" disabled hidden selected>
                            Please select
                          </option>
                          <option value="Urban">Urban</option>
                          <option value="Suburban">Suburban</option>
                          <option value="Satellite business park">
                            Satellite business park
                          </option>
                          <option value="Rural">Rural</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                      {errors.buildingLocation?.type === "required" && (
                        <small className="text-danger">
                          Building location field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Building style</span>
                      <div className="n__form_select">
                        <select
                          className={`n__form_input ${
                            errors.buildingStyle?.type === "required" &&
                            "border-danger"
                          }`}
                          name="buildingStyle"
                          id="buildingStyle"
                          {...register("buildingStyle", { required: "true" })}
                        >
                          <option value="" disabled hidden selected>
                            Please select
                          </option>
                          {[
                            "Heritage",
                            "Pre 50s",
                            "50s - 80s",
                            "80s - 2000",
                            "Post millenium",
                            "Other",
                          ].map((item) => {
                            return <option value={item}>{item}</option>
                          })}
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                      {errors.buildingStyle?.type === "required" && (
                        <small className="text-danger">
                          Building style field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Occupancy status</span>
                      <div className="n__form_select">
                        <select
                          className={`n__form_input ${
                            errors.occupancyStatus?.type === "required" &&
                            "border-danger"
                          }`}
                          name="occupancyStatus"
                          id="occupancyStatus"
                          {...register("occupancyStatus", { required: "true" })}
                        >
                          <option value="" disabled hidden selected>
                            Please select
                          </option>
                          <option value="Owned">Owned</option>
                          <option value="Leased" selected>
                            Leased
                          </option>
                          <option value="Sublet">Sublet</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                      {errors.occupancyStatus?.type === "required" && (
                        <small className="text-danger">
                          Occupancy status field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Occupancy mix</span>
                      <div className="n__form_select">
                        <select
                          className={`n__form_input ${
                            errors.occupancyMix?.type === "required" &&
                            "border-danger"
                          }`}
                          name="occupancyMix"
                          id="occupancyMix"
                          {...register("occupancyMix", { required: "true" })}
                        >
                          <option value="" disabled hidden selected>
                            Please select
                          </option>
                          <option value="Sole occupiers">Sole occupiers</option>
                          <option value="Multiple occupants">
                            Multiple occupants
                          </option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                      {errors.occupancyMix?.type === "required" && (
                        <small className="text-danger">
                          Occupancy mix field is required
                        </small>
                      )}
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
                          name="dateOrganisationMovedIn"
                          className="w-100"
                          format={"DD / MM / YYYY"}
                          style={{ width: "100%" }}
                          getCalendarContainer={(triggerNode) => {
                            return triggerNode.parentNode
                          }}
                        />
                      </div>
                      {errors.dateOrganisationMovedIn?.type === "required" && (
                        <small className="text-danger">
                          Date field is required
                        </small>
                      )}
                    </label>
                  </div>
                </div>
                <div className="bottom_side d-flex justify-content-end mt-3">
                  <button
                    type="button"
                    className="n__btn outline icon mr-2"
                    onClick={() => {
                      setLocationDrawer(false)

                      reset()
                    }}
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
