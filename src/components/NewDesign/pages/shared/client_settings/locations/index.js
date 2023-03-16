import React from "react"
import Floors from "../floors/index"
import Locations from "./locations"
import LocationGroups from "./location_groups"
import { useSelector } from "react-redux"
const LocationSettings = ({
  isMenuSub,
  isLocationDrawer,
  setLocationDrawer,
  isLocationGroupDrawer,
  setLocationGroupDrawer,
  locationRowData,
  setLocationRowData,
}) => {
  const locationGroups = useSelector(
    (store) => store.getClientLocations.data.filteredLocationGroupCount
  )
  const locations = useSelector(
    (store) => store.getClientLocations.data.filteredLocationCount
  )

  return (
    <>
      <div className="n__card hast__table mt-0">
        <div className="n__body">
          <h3 className="">
            {isMenuSub === "LocationsSub"
              ? "Locations"
              : isMenuSub === "LocationGroups"
              ? "Location groups"
              : isMenuSub === "Floors"
              ? "Floors"
              : ""}
          </h3>
          <span className="card_desc">
            Total:{" "}
            <strong>
              {isMenuSub === "LocationsSub"
                ? `${locations !== undefined ? locations : ""} locations`
                : isMenuSub === "LocationGroups"
                ? `${
                    locationGroups !== undefined ? locationGroups : ""
                  } location groups`
                : isMenuSub === "Floors"
                ? "floors"
                : ""}
            </strong>
          </span>

          <div className="row">
            <div className="col-lg-12">
              <div className="n_table respo">
                {isMenuSub === "LocationsSub" && (
                  <Locations
                    isLocationDrawer={isLocationDrawer}
                    setLocationDrawer={setLocationDrawer}
                    locationRowData={locationRowData}
                    setLocationRowData={setLocationRowData}
                  />
                )}

                {isMenuSub === "LocationGroups" && (
                  <LocationGroups
                    isLocationGroupDrawer={isLocationGroupDrawer}
                    setLocationGroupDrawer={setLocationGroupDrawer}
                  />
                )}
                {isMenuSub === "Floors" && <Floors />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LocationSettings
