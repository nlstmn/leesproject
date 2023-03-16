import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { DatePicker, Space, Table, Button, Input } from "antd"
import LoaderPage from "../../../elements/loader_page"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import DeleteModal from "../../../elements/modal_delete"
import TranslationsTable from "./table/index"
import TopTranslationsActions from "./_elements/top_actions"
import DrawerEditTranslation from "./_elements/drawer_edit"

const CreateSurvey = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  const [deleteModal, setDeleteModal] = useState(false)

  const [isMenu, setMenu] = useState("Pages")
  const [isMenuSub, setMenuSub] = useState(null)
  const [isDrawerEditTranslation, setDrawerEditTranslation] = useState(false)

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

      <DrawerEditTranslation
        isDrawerEditTranslation={isDrawerEditTranslation}
        setDrawerEditTranslation={setDrawerEditTranslation}
        title={"Edit"}
      />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard isShow={false} />
            <h1>Translation management</h1>
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
                        setMenu("Pages")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${isMenu === "Pages" ? " active" : ""} `}
                    >
                      Pages
                    </a>
                    <a
                      onClick={() => {
                        setMenu("Questions")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${isMenu === "Questions" ? " active" : ""} `}
                    >
                      Questions
                    </a>
                    <a
                      onClick={() => {
                        setMenu("Options")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${isMenu === "Options" ? " active" : ""} `}
                    >
                      Options
                    </a>
                    <a
                      onClick={() => {
                        setMenu("Survey UI")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${isMenu === "Survey UI" ? " active" : ""} `}
                    >
                      Survey UI
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
            <TopTranslationsActions isMenu={isMenu} isMenuSub={isMenuSub} />
          </div>

          <div
            className={`${isMenu === "Survey" ? "col-lg-12" : "col-lg-12"} `}
          >
            <TranslationsTable
              setMenu={setMenu}
              setMenuSub={setMenuSub}
              isMenu={isMenu}
              isMenuSub={isMenuSub}
              goTop={goTop}
              isDrawerEditTranslation={isDrawerEditTranslation}
              setDrawerEditTranslation={setDrawerEditTranslation}
            />
          </div>
          <div className="col-lg-12 divider-col">
            {/* <div className="l-divider"/> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateSurvey
