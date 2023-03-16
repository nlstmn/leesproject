import React, { useState } from "react"
import { Link } from "react-router-dom"
import LocationsList from "./LocationsList"
import LocationGroupList from "./LocationGroupList"
import FloorList from "./FloorList"
import Tabs from "./Tabs"
const Locations = () => {
  const [tab, setTab] = useState("locations")
  return (
    <>
      <div className="container-fluid clients-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              <Tabs></Tabs>
            </div>
          </div>
          <ul className="nav nav-tabs3 mt-4 mb-4">
            <li className="nav-item">
              <a
                className={`nav-link ${tab === "location_groups" && " active"}`}
                onClick={() => setTab("location_groups")}
                data-toggle="tab"
                href="#!"
              >
                Location groups
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${tab === "locations" && " active"}`}
                onClick={() => setTab("locations")}
                data-toggle="tab"
                href="#!"
              >
                Locations
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${tab === "floors" && " active"}`}
                onClick={() => setTab("floors")}
                data-toggle="tab"
                href="#!"
              >
                Floors
              </a>
            </li>
          </ul>
        </div>

        {tab === "locations" && <LocationsList />}
        {tab === "location_groups" && <LocationGroupList />}
        {tab === "floors" && <FloorList />}
      </div>
    </>
  )
}
export default Locations
