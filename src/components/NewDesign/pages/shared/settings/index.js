import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import LoaderPage from "../../../elements/loader_page"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import EditProfileSettings from "./account"
import TopClientActions from "../client_settings/_elements/top_actions"
import ChangePasswordSettings from "./password"
import AlertSettings from "./alerts"

const AllSettings = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])
  const [isMenu, setMenu] = useState("profile")
  const [isMenuSub, setMenuSub] = useState(null)

  const data_options = [
    {
      id: 2,
      label: "",
      options: ["Option 001…", "Option 002…", "Option 003…"],
    },
  ]

  return (
    <>
      <LoaderPage />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard
              isShow={false}
              mainTitle={"Settings"}
              mainURL={"/clients-management"}
              secondTitle={false}
            />
            <h1>Settings</h1>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="top__filter-dashboard b-t-b">
              {/* Left */}
              <div className="left__side">
                <div className="left__item">
                  <div className="n_menu_horizontal top iconic">
                    <a
                      onClick={() => setMenu("profile")}
                      href="#!"
                      className={`${isMenu === "profile" ? " active" : ""} `}
                    >
                      <span className="icn icon_a-editticon_a-"></span>
                      Edit profile
                    </a>
                    <a
                      onClick={() => {
                        setMenu("password")
                      }}
                      href="#!"
                      className={`${isMenu === "password" ? " active" : ""} `}
                    >
                      <span className="icn icon_a-passworddicon_a-"></span>
                      Change password
                    </a>
                    <a
                      onClick={() => {
                        setMenu("alert")
                      }}
                      href="#!"
                      className={`${isMenu === "alert" ? " active" : ""} `}
                    >
                      <span className="icn icon_a-alertssicon_a-"></span>
                      Alert settings
                    </a>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="right__side">
                <div className="right__item"></div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-3">
            <TopClientActions isMenu={isMenu} isMenuSub={isMenuSub} />
          </div>

          <div className={`col-lg-12`}>
            {isMenu === "profile" && (
              <EditProfileSettings data_options={data_options} />
            )}

            {isMenu === "password" && (
              <ChangePasswordSettings data_options={data_options} />
            )}

            {isMenu === "alert" && (
              <AlertSettings data_options={data_options} />
            )}
          </div>
          <div className="col-lg-12 divider-col">
            {/* <div className="l-divider"/> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default AllSettings
