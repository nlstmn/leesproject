import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { DatePicker, Space, Table, Button, Input } from "antd"
import DeleteModal from "../../../elements/modal_delete"
import DrawerSections from "./sections/drawer_sections"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import TopModulesActions from "./_elements/top_actions"
import LoaderPage from "../../../elements/loader_page"
import SectionsSettings from "./sections/index"
import DrawerPages from "./pages/drawer_pages"
import PagesSettings from "./pages/index"
import DrawerQuestions from "./questions/drawer_questions"
import QuestionsSettings from "./questions/index"
import DrawerDependency from "./dependencies/drawer_dependency"
import DependencySettings from "./dependencies/index"
import DrawerAddItems from "./_elements/drawer_add_items"

const ModulesAnalytics = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  const [deleteModal, setDeleteModal] = useState(false)

  const [isMenu, setMenu] = useState("Sections")
  const [isMenuSub, setMenuSub] = useState(null)
  const [isDrawerSections, setDrawerSections] = useState(false)
  const [isDrawerPages, setDrawerPages] = useState(false)
  const [isDrawerQuestions, setDrawerQuestions] = useState(false)
  const [isDrawerDependency, setDrawerDependency] = useState(false)
  const [isDrawerAddItems, setDrawerAddItems] = useState(false)

  return (
    <>
      <LoaderPage />

      <DeleteModal
        visibleDatasetModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />

      <DrawerSections
        isDrawerSections={isDrawerSections}
        setDrawerSections={setDrawerSections}
        title={"Section settings"}
        setDrawerAddItems={setDrawerAddItems}
      />

      <DrawerPages
        isDrawerPages={isDrawerPages}
        setDrawerPages={setDrawerPages}
        title={"Page settings"}
        setDrawerAddItems={setDrawerAddItems}
      />

      <DrawerQuestions
        isDrawerQuestions={isDrawerQuestions}
        setDrawerQuestions={setDrawerQuestions}
        title={"Question settings"}
      />

      <DrawerDependency
        isDrawerDependency={isDrawerDependency}
        setDrawerDependency={setDrawerDependency}
        title={"Dependency settings"}
      />

      <DrawerAddItems
        isDrawerAddItems={isDrawerAddItems}
        setDrawerAddItems={setDrawerAddItems}
        title={"Select items"}
      />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard isShow={false} />
            <h1>Analytics Modules</h1>
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
                        setMenu("Sections")
                        setMenuSub("")
                      }}
                      href="#!"
                      className={`${isMenu === "Sections" ? " active" : ""} `}
                    >
                      Sections
                    </a>
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
                    {/* <a onClick={()=>{setMenu("Dependencies");setMenuSub("")}} href="#!" className={`${isMenu === "Dependencies" ? " active" : ""} `}>Dependencies</a> */}

                    {/* <a onClick={()=>setMenu("Admin setup")} href="#!" className={`${isMenu === "Admin setup" ? " active" : ""} `}>Admin setup</a>
                      <a onClick={()=>setMenu("Admin tailoring")} href="#!" className={`${isMenu === "Admin tailoring" ? " active" : ""} `}>Admin tailoring</a>
                      <a onClick={()=>setMenu("IT compatibility")} href="#!" className={`${isMenu === "IT compatibility" ? " active" : ""} `}>IT compatibility</a>
                      <a onClick={()=>setMenu("Languages")} href="#!" className={`${isMenu === "Languages" ? " active" : ""} `}>Languages</a>
                      <a onClick={()=>setMenu("Locations")} href="#!" className={`${isMenu === "Locations" ? " active" : ""} `}>Locations</a>
                      <a onClick={()=>setMenu("Floors")} href="#!" className={`${isMenu === "Floors" ? " active" : ""} `}>Floors</a>
                      <a onClick={()=>setMenu("Departments")} href="#!" className={`${isMenu === "Departments" ? " active" : ""} `}>Departments</a> */}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="right__side">
                <div className="right__item"></div>
              </div>
            </div>
          </div>

          {/* SUB MENU */}

          {/* {isMenu === "Summary" && (
            <div className="col-lg-12 mt-1">
              <div className="n_menu_horizontal top bottom">
                <a onClick={()=>setMenuSub("Quaternary 1")} href="#!" className={`${isMenuSub === "Quaternary 1" ? " active" : ""} `}>Quaternary 1</a>
                <a onClick={()=>setMenuSub("Quaternary 2")} href="#!" className={`${isMenuSub === "Quaternary 2" ? " active" : ""} `}>Quaternary 2</a>
                <a onClick={()=>setMenuSub("Quaternary 3")} href="#!" className={`${isMenuSub === "Quaternary 3" ? " active" : ""} `}>Quaternary 3</a>
                <a onClick={()=>setMenuSub("Quaternary 4")} href="#!" className={`${isMenuSub === "Quaternary 4" ? " active" : ""} `}>Quaternary 4</a>
                <a onClick={()=>setMenuSub("Quaternary 5")} href="#!" className={`${isMenuSub === "Quaternary 5" ? " active" : ""} `}>Quaternary 5</a>
                <a onClick={()=>setMenuSub("Quaternary 6")} href="#!" className={`${isMenuSub === "Quaternary 6" ? " active" : ""} `}>Quaternary 6</a>
                <a onClick={()=>setMenuSub("Quaternary 7")} href="#!" className={`${isMenuSub === "Quaternary 7" ? " active" : ""} `}>Quaternary 7</a>
              </div>
            </div>
          )} */}

          {/* SUB MENU */}

          <div className="col-lg-12 mt-3">
            <TopModulesActions
              isMenu={isMenu}
              isMenuSub={isMenuSub}
              setDrawerSections={setDrawerSections}
              setDrawerPages={setDrawerPages}
              setDrawerQuestions={setDrawerQuestions}
              setDrawerDependency={setDrawerDependency}
              isDrawerAddItems={isDrawerAddItems}
              setDrawerAddItems={setDrawerAddItems}
            />
          </div>

          <div
            className={`${
              isMenu === "Departments" ? "col-lg-6" : "col-lg-12"
            } `}
          >
            {isMenu === "Sections" && (
              <SectionsSettings
                setMenu={setMenu}
                setMenuSub={setMenuSub}
                isMenu={isMenu}
                isMenuSub={isMenuSub}
                isDrawerSections={isDrawerSections}
                setDrawerSections={setDrawerSections}
              />
            )}

            {isMenu === "Pages" && (
              <PagesSettings
                setMenu={setMenu}
                setMenuSub={setMenuSub}
                isMenu={isMenu}
                isMenuSub={isMenuSub}
                isDrawerPages={isDrawerPages}
                setDrawerPages={setDrawerPages}
              />
            )}

            {isMenu === "Questions" && (
              <QuestionsSettings
                setMenu={setMenu}
                setMenuSub={setMenuSub}
                isMenu={isMenu}
                isMenuSub={isMenuSub}
                isDrawerQuestions={isDrawerQuestions}
                setDrawerQuestions={setDrawerQuestions}
              />
            )}

            {isMenu === "Dependencies" && (
              <DependencySettings
                setMenu={setMenu}
                setMenuSub={setMenuSub}
                isMenu={isMenu}
                isMenuSub={isMenuSub}
                isDrawerDependency={isDrawerDependency}
                setDrawerDependency={setDrawerDependency}
              />
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

export default ModulesAnalytics
