import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import LoaderPage from "../../../../elements/loader_page"
import BreadcrumbDashboard from "../../../../elements/breadcrumb_dashboard"
import DeleteModal from "../../../../elements/modal_delete"
import TopCampaignActions from "../_elements/top_actions"
import GeneralSettings from "./general/index"
import CModulesSettings from "./modules/index"
import DemographicsSettings from "../../../shared/client_settings/demographics/index"
import TargetSettings from "./target_responders/index"
import SummarySettings from "./summary/index"

const CreateSurveyCampaign = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  const [deleteModal, setDeleteModal] = useState(false)

  const [isMenu, setMenu] = useState("Summary")
  const [isMenuSub, setMenuSub] = useState(null)

  const goTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  return (
    <>
      <LoaderPage />

      <DeleteModal
        visibleDatasetModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard
              isShow={true}
              mainTitle={"Campaign management"}
              mainURL={"/campaign-management"}
              secondTitle={"Create new campaign ― Client X"}
              secondURL={"/create-campaigns"}
            />
            <h1>Create new campaign ― Client X</h1>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="top__filter-dashboard b-t-b">
              {/* Left */}
              <div className="left__side">
                <div className="left__item">
                  <div className="n_menu_horizontal top">
                    <a
                      onClick={() => {
                        setMenu("Summary")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${isMenu === "Summary" ? " active" : ""} `}
                    >
                      Summary
                    </a>
                    <a
                      onClick={() => {
                        setMenu("General")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${isMenu === "General" ? " active" : ""} `}
                    >
                      General
                    </a>
                    <a
                      onClick={() => {
                        setMenu("Campaign modules")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${
                        isMenu === "Campaign modules" ? " active" : ""
                      } `}
                    >
                      Campaign modules
                    </a>
                    <a
                      onClick={() => {
                        setMenu("Demographics")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${
                        isMenu === "Demographics" ? " active" : ""
                      } `}
                    >
                      Demographics
                    </a>
                    <a
                      onClick={() => {
                        setMenu("Target")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${isMenu === "Target" ? " active" : ""} `}
                    >
                      Target responders
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
            <TopCampaignActions isMenu={isMenu} isMenuSub={isMenuSub} />
          </div>

          <div className={`col-lg-12`}>
            {isMenu === "Summary" && (
              <SummarySettings
                setMenu={setMenu}
                setMenuSub={setMenuSub}
                isMenu={isMenu}
                isMenuSub={isMenuSub}
                goTop={goTop}
              />
            )}

            {isMenu === "General" && <GeneralSettings />}

            {isMenu === "Campaign modules" && <CModulesSettings />}

            {isMenu === "Demographics" && <DemographicsSettings />}

            {isMenu === "Target" && <TargetSettings />}
          </div>
          <div className="col-lg-12 divider-col">
            {/* <div className="l-divider"/> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateSurveyCampaign
