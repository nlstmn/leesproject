import { DatePicker } from "antd"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import LoaderPage from "../../../elements/loader_page"
import DeleteModal from "../../../elements/modal_delete"
import DrawerImportExport from "../import_export/index"
import DemographicsSettings from "./demographics/index"
import DepartmentsSettings from "./departments/index"
import IdentitySettings from "./identity_provider/index"
import LanguageDrawer from "./languages/drawer_languages"
import TranslationsDrawer from "./languages/drawer_tranlations"
import LanguageSettings from "./languages/index"
import LocationModal from "./locations/modal_location"
import LocationGroupDrawer from "./locations/drawer_locationGroup"
import LocationSettings from "./locations/index"
import MainSettings from "./main/index"
import NotificationSettings from "./notifications/index"
import NotificationDrawer from "./notifications/notification_drawer"
import EmailsDrawer from "./notifications/_emails"
import QuestionsDrawer from "./notifications/_questions"
import UserDrawer from "./user_management/drawer_user"
import UserManagementSettings from "./user_management/index"
import VerificationSettings from "./verifications/index"
import TopClientActions from "./_elements/top_actions"
import {
  saveClientsMainSettingsAction,
  updateClientsMainSettingsAction,
} from "../../../../../actions/adminActions"
import {
  createNewClient,
  editClient,
  saveClientIdForSurveys,
  saveRowData,
} from "../../../../../actions/clientManagement"
import "react-toastify/dist/ReactToastify.css"
import SurveysSettings from "./surveys/index"

import {
  saveMenuIndex,
  saveMenuIndexSub,
} from "../../../../../actions/clientManagement"

const { RangePicker } = DatePicker

const treeData = [
  { name: "IT Manager" },
  {
    name: "Regional Manager",
    expanded: true,
    children: [{ name: "Branch Manager" }],
  },
]

const ClientSettings = () => {
  const dispatch = useDispatch()
  const { loading, response } = useSelector(
    (store) => store.saveClientsMainSettings
  )
  const isNewOrEdit = useSelector((store) => store.saveEditOrCreateClient.data)

  // Store Values Comes from Redux
  const clientIdForSurveys = useSelector(
    (store) => store.saveClientIdForSurveys.data
  )
  const clientMainSettings = useSelector(
    (store) => store.saveClientsMainSettings
  )
  const isMenuSubStoreVal = useSelector((store) => store.saveMenuIndexSub.data)
  const isMenuStoreVal = useSelector((store) => store.saveMenuIndex.data)

  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])
  const history = useHistory()

  const [isMenu, setMenu] = useState("Main")
  const [isMenuSub, setMenuSub] = useState(null)

  const [isLocationDrawer, setLocationDrawer] = useState(false)
  const [isLocationGroupDrawer, setLocationGroupDrawer] = useState(false)
  const [isLanguageDrawer, setLanguageDrawer] = useState(false)
  const [isTranslationsDrawer, setTranslationsDrawer] = useState(false)
  const [isUserDrawer, setUserDrawer] = useState(false)
  const [isNotificationDrawer, setNotificationDrawer] = useState(false)
  const [isEmailsDrawer, setEmailsDrawer] = useState(false)
  const [isQuestionsDrawer, setQuestionsDrawer] = useState(false)
  const [isImportExportDrawer, setImportExportDrawer] = useState(false)
  const [treeStruct, setTreeStruct] = useState([])
  // Hook for setting location type whether is new or edit. (new location=true,edit=false)
  const [isLocationEdit, setLocationEdit] = useState(false)

  // Main settings
  const [clientName, setClientName] = useState("")
  const [clientRefNo, setClientRefNo] = useState("")
  const [website, setWebsite] = useState("")
  const [checkedInside, setCheckedInside] = useState(false)
  const [checkedFeedbacks, setCheckedFeedbacks] = useState(false)
  const [checkedQuestions, setCheckedQuestions] = useState(false)
  const [checkedXp, setCheckedXp] = useState(false)
  const [savedMainSettings, setSavedMainSettings] = useState(false)
  const [clientIndustry, setClientIndustry] = useState(34)
  const [enableHybridFutureCheck, setEnableHybridFutureCheck] = useState(false)

  // Hooks for Locations Row Data
  const [locationRowData, setLocationRowData] = useState({})

  // Search Nestable
  const [searchString, setSearchString] = useState("")
  const [searchFocusIndex, setSearchFocusIndex] = useState(0)
  const [searchFoundCount, setSearchFoundCount] = useState(null)
  const customSearchMethod = ({ node, searchQuery }) =>
    searchQuery &&
    node.name &&
    node.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
  // || (node.subtitle && node.subtitle.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)

  const selectPrevMatch = () =>
    setSearchFocusIndex(
      searchFocusIndex !== null
        ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        : searchFoundCount - 1
    )

  const selectNextMatch = () =>
    setSearchFocusIndex(
      searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0
    )
  // Search Nestable

  const [istreeData, settreeData] = useState(treeData)
  const [deleteModal, setDeleteModal] = useState(false)

  // Search Parameters for "clientId"
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id") ? params.get("client_id") : 0
  const selectedClientId = useSelector(
    (store) => store.saveClientIdForSurveys.data
  )

  const onClickSave = async () => {
    if (isMenuStoreVal === "Main" && clientName && clientRefNo && isNewOrEdit) {
      dispatch(
        saveClientsMainSettingsAction(
          {
            name: clientName,
            industry: clientIndustry,
            website: website,
            language: "tr",
            clientRefNo: clientRefNo,
            inviteCode: "",
            enableFeedbacks: checkedFeedbacks,
            enableQuestions: checkedQuestions,
            enableXp: checkedXp,
            enableInside: checkedInside,
            enable_hybrid_future: enableHybridFutureCheck,
          },
          clientId
        )
      )

      setSavedMainSettings(true)
      // For clearing this topic: This is edit client because when we are creating new client, we're changing to edit mode...
      dispatch(editClient())
    } else if (
      isMenuStoreVal === "Main" &&
      clientName &&
      clientRefNo &&
      !isNewOrEdit
    ) {
      // When we are in the menu tab and we are updating and client information,
      // if the fields are not empty apply these rules
      dispatch(
        updateClientsMainSettingsAction(clientIdForSurveys, {
          name: clientName,
          industry: parseInt(clientIndustry),
          website: "",
          clientRefNo: clientRefNo,
          enableFeedbacks: checkedFeedbacks,
          enableQuestions: checkedQuestions,
          enableXp: false,
          enableInside: false,
          enableHybridFuture: enableHybridFutureCheck,
          hybridOrganizationName: "",
        })
      )
      dispatch(saveClientIdForSurveys(clientIdForSurveys))
      dispatch(
        saveRowData({
          client_id: clientIdForSurveys,
          name: clientName,
          industry: clientIndustry.toString(),
          language: "tr",
          client_ref_no: clientRefNo,
          inviteCode: "",
          enableFeedbacks: checkedFeedbacks,
          enableQuestions: checkedQuestions,
          enableXp: checkedXp,
          enableInside: checkedInside,
          clientId: selectedClientId,
          enableHybridFuture: enableHybridFutureCheck,
        })
      )
    } else if (isMenuStoreVal === "Departments") {
      // When the case is saving department values apply these functions
      window.alert("Department changes have been saved successfully")
    } else if (isMenuStoreVal === "Locations") {
      // When the case is saving department values apply these functions
      window.alert("Location changes have been saved successfully")
    } else if (isMenuStoreVal === "Surveys") {
      // When the case is saving surveys values apply these functions
      window.alert("Survey changes have been saved successfully")
    } else if (isMenuStoreVal === "Modules") {
      // When the case is saving modules' values apply these functions
      window.alert("Module changes have been saved successfully")
    } else if (isMenuStoreVal === "User management") {
      // When the case is saving user management values apply these functions
      window.alert("User management changes have been saved successfully")
    } else if (isMenuStoreVal === "Verifications") {
      // When the case is saving user management values apply these functions
      window.alert("Verifications changes have been saved successfully")
    } else if (isMenuStoreVal === "Identity provider") {
      // When the case is saving user management values apply these functions
      window.alert("Identity provider changes have been saved successfully")
    } else {
      toast.error("Please fill the required fields.")
    }
  }

  useEffect(() => {
    if (!loading && savedMainSettings) {
      toast.success("Saved successfully.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      })
      dispatch(
        saveClientIdForSurveys(
          clientMainSettings.response.data.insertedClientId
        )
      )
      dispatch(
        saveRowData({
          client_id: clientMainSettings.response.data.insertedClientId,
          name: clientName,
          industry: clientIndustry,
          client_ref_no: clientRefNo,
          language: "tr",
          clientRefNo: clientRefNo,
          inviteCode: "",
          enableFeedbacks: checkedFeedbacks,
          enableQuestions: checkedQuestions,
          enableXp: checkedXp,
          enableInside: checkedInside,
          clientId: selectedClientId,
        })
      )
    }
  }, [loading])

  const languagesSubMenu = (
    <div className="col-lg-12 mt-1">
      <div className="n_menu_horizontal sub bottom">
        <a
          onClick={() => {
            setMenuSub("Locations")
            dispatch(saveMenuIndexSub("Locations"))
          }}
          href="#!"
          className={`${isMenuSubStoreVal === "Locations" ? " active" : ""} `}
        >
          Locations
        </a>
        <a
          onClick={() => {
            dispatch(saveMenuIndexSub("Departments"))
          }}
          href="#!"
          className={`${isMenuSubStoreVal === "Departments" ? " active" : ""} `}
        >
          Departments
        </a>
      </div>
    </div>
  )

  return (
    <>
      <LoaderPage />

      <ToastContainer style={{ zIndex: 99999999 }} />

      <DeleteModal
        visibleDatasetModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />

      <NotificationDrawer
        isNotificationDrawer={isNotificationDrawer}
        setNotificationDrawer={setNotificationDrawer}
        setEmailsDrawer={setEmailsDrawer}
        setQuestionsDrawer={setQuestionsDrawer}
        setLocationGroupDrawer={setLocationGroupDrawer}
        title={"Notification settings"}
      />

      <LocationModal
        isLocationDrawer={isLocationDrawer}
        setLocationDrawer={setLocationDrawer}
        locationRowData={locationRowData}
        setLocationRowData={setLocationRowData}
        title={isLocationEdit === true ? "Edit location" : "New location"}
        isLocationEdit={isLocationEdit}
        setLocationEdit={setLocationEdit}
      />

      <LocationGroupDrawer
        isLocationGroupDrawer={isLocationGroupDrawer}
        setLocationGroupDrawer={setLocationGroupDrawer}
        title={"Locations list"}
      />

      <TranslationsDrawer
        isTranslationsDrawer={isTranslationsDrawer}
        setTranslationsDrawer={setTranslationsDrawer}
        setLanguageDrawer={setLanguageDrawer}
        title={"Translation settings"}
      />

      <LanguageDrawer
        isLanguageDrawer={isLanguageDrawer}
        setLanguageDrawer={setLanguageDrawer}
        title={"Language settings"}
      />

      <UserDrawer
        isUserDrawer={isUserDrawer}
        setUserDrawer={setUserDrawer}
        title={"New user"}
      />

      <EmailsDrawer
        isEmailsDrawer={isEmailsDrawer}
        setEmailsDrawer={setEmailsDrawer}
        title={"Add emails"}
      />

      <QuestionsDrawer
        isQuestionsDrawer={isQuestionsDrawer}
        setQuestionsDrawer={setQuestionsDrawer}
        title={"Select questions"}
      />

      <DrawerImportExport
        isImportExportDrawer={isImportExportDrawer}
        setImportExportDrawer={setImportExportDrawer}
        title={"Import - Export"}
      />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard
              isShow={true}
              mainTitle={"Client management"}
              mainURL={"/clients-management"}
              secondTitle={"Client settings"}
              secondURL={"/client-settings"}
            />
            <h1>{isNewOrEdit ? "Create new client" : "Client settings"}</h1>
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
                        dispatch(saveMenuIndex("Main"))
                      }}
                      href="#!"
                      className={`${
                        isMenuStoreVal === "Main" ? " active" : ""
                      } `}
                    >
                      Main
                    </a>
                    {!isNewOrEdit && (
                      <>
                        <a
                          onClick={() => {
                            dispatch(saveMenuIndex("Departments"))
                            dispatch(saveMenuIndexSub("Dropdown"))
                          }}
                          href="#!"
                          className={`${
                            isMenuStoreVal === "Departments" ? " active" : ""
                          } `}
                        >
                          Departments
                        </a>
                        <a
                          onClick={() => {
                            dispatch(saveMenuIndex("Locations"))
                            dispatch(saveMenuIndexSub("LocationsSub"))
                          }}
                          href="#!"
                          className={`${
                            isMenuStoreVal === "Locations" ? " active" : ""
                          } `}
                        >
                          Locations
                        </a>
                        <a
                          onClick={() => {
                            dispatch(saveMenuIndex("Surveys"))
                            dispatch(saveMenuIndexSub("SurveysSub"))
                          }}
                          href="#!"
                          className={`${
                            isMenuStoreVal === "Surveys" ? " active" : ""
                          } `}
                        >
                          Surveys
                        </a>
                        <a
                          onClick={() => {
                            dispatch(saveMenuIndex("Modules"))
                            dispatch(saveMenuIndexSub("ModulesSub"))
                          }}
                          href="#!"
                          className={`${
                            isMenuStoreVal === "Modules" ? " active" : ""
                          } `}
                        >
                          Modules
                        </a>
                        <a
                          onClick={() => {
                            dispatch(saveMenuIndex("User management"))
                          }}
                          href="#!"
                          className={`${
                            isMenuStoreVal === "User management"
                              ? " active"
                              : ""
                          } `}
                        >
                          User management
                        </a>
                        <a
                          onClick={() => {
                            dispatch(saveMenuIndex("Verifications"))
                            dispatch(saveMenuIndexSub("Domains"))
                          }}
                          href="#!"
                          className={`${
                            isMenuStoreVal === "Verifications" ? " active" : ""
                          } `}
                        >
                          Domain verification
                        </a>
                        <a
                          onClick={() => {
                            dispatch(saveMenuIndex("Identity provider"))
                            dispatch(saveMenuIndexSub("sso"))
                          }}
                          href="#!"
                          className={`${
                            isMenuStoreVal === "Identity provider"
                              ? " active"
                              : ""
                          } `}
                        >
                          Identity provider
                        </a>
                      </>
                    )}
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
          {isMenuStoreVal === "Departments" && (
            <div className="col-lg-12 mt-1">
              <div className="n_menu_horizontal sub bottom">
                <a
                  onClick={() => {
                    dispatch(saveMenuIndexSub("Dropdown"))
                  }}
                  href="#!"
                  className={`${
                    isMenuSubStoreVal === "Dropdown" ? " active" : ""
                  } `}
                >
                  Dropdown department list
                </a>
                <a
                  onClick={() => dispatch(saveMenuIndexSub("Cascading"))}
                  href="#!"
                  className={`${
                    isMenuSubStoreVal === "Cascading" ? " active" : ""
                  } `}
                >
                  Cascading department list
                </a>
              </div>
            </div>
          )}
          {isMenuStoreVal === "Locations" && (
            <div className="col-lg-12 mt-1">
              <div className="n_menu_horizontal sub bottom">
                <a
                  onClick={() => {
                    dispatch(saveMenuIndexSub("LocationsSub"))
                  }}
                  href="#!"
                  className={`${
                    isMenuSubStoreVal === "LocationsSub" ? " active" : ""
                  } `}
                >
                  Locations
                </a>
                <a
                  onClick={() => {
                    dispatch(saveMenuIndexSub("LocationGroups"))
                  }}
                  href="#!"
                  className={`${
                    isMenuSubStoreVal === "LocationGroups" ? " active" : ""
                  } `}
                >
                  Location groups
                </a>
                <a
                  onClick={() => {
                    dispatch(saveMenuIndexSub("Floors"))
                  }}
                  href="#!"
                  className={`${
                    isMenuSubStoreVal === "Floors" ? " active" : ""
                  } `}
                >
                  Floors
                </a>
              </div>
            </div>
          )}

          {isMenuStoreVal === "Verifications" && (
            <div className="col-lg-12 mt-1">
              <div className="n_menu_horizontal sub bottom">
                <a
                  onClick={() => {
                    dispatch(saveMenuIndexSub("Domains"))
                  }}
                  href="#!"
                  className={`${
                    isMenuSubStoreVal === "Domains" ? " active" : ""
                  } `}
                >
                  Domains
                </a>
                <a
                  onClick={() => dispatch(saveMenuIndexSub("Emails"))}
                  href="#!"
                  className={`${
                    isMenuSubStoreVal === "Emails" ? " active" : ""
                  } `}
                >
                  Emails
                </a>
              </div>
            </div>
          )}
          {isMenuStoreVal === "Identity provider" && (
            <div className="col-lg-12 mt-1">
              <div className="n_menu_horizontal sub bottom">
                <a
                  onClick={() => {
                    dispatch(saveMenuIndexSub("Departments"))
                    setMenuSub("sso")
                  }}
                  href="#!"
                  className={`${isMenuSub === "sso" ? " active" : ""} `}
                >
                  SSO
                </a>
              </div>
            </div>
          )}
          {/* SUB MENU */}
          <div
            className={`${
              isMenuStoreVal === "Main" ? "col-lg-6" : "col-lg-12"
            } `}
          >
            {isMenuStoreVal === "Main" && (
              <MainSettings
                {...{
                  clientName,
                  setClientName,
                  clientRefNo,
                  setClientRefNo,
                  website,
                  setWebsite,
                  checkedInside,
                  setCheckedInside,
                  checkedFeedbacks,
                  setCheckedFeedbacks,
                  checkedQuestions,
                  setCheckedQuestions,
                  checkedXp,
                  setCheckedXp,
                  clientIndustry,
                  setClientIndustry,
                  enableHybridFutureCheck,
                  setEnableHybridFutureCheck,
                }}
              />
            )}

            {isMenuStoreVal === "Departments" && (
              <DepartmentsSettings
                customSearchMethod={customSearchMethod}
                searchString={searchString}
                searchFocusIndex={searchFocusIndex}
                treeStruct={treeStruct}
                setTreeStruct={setTreeStruct}
                searchFinishCallback={(matches) => {
                  setSearchFoundCount(matches.length)
                  setSearchFocusIndex(
                    matches.length > 0 ? searchFocusIndex % matches.length : 0
                  )
                }}
                settreeData={settreeData}
                istreeData={istreeData}
                treeData={treeData}
                isMenuSub={isMenuSubStoreVal}
              />
            )}

            {isMenuStoreVal === "Locations" && (
              <LocationSettings
                setDeleteModal={setDeleteModal}
                deleteModal={deleteModal}
                isMenuSub={isMenuSubStoreVal}
                isLocationDrawer={isLocationDrawer}
                setLocationDrawer={setLocationDrawer}
                locationRowData={locationRowData}
                setLocationRowData={setLocationRowData}
                isLocationGroupDrawer={isLocationGroupDrawer}
                setLocationGroupDrawer={setLocationGroupDrawer}
                isLocationEdit={isLocationEdit}
                setLocationEdit={setLocationEdit}
              />
            )}
            {
              // Surveys Area Comes Here
              isMenuStoreVal === "Surveys" && <SurveysSettings />
            }
            {isMenuStoreVal === "Languages" && (
              <LanguageSettings
                setMenuSub={setMenuSub}
                isMenuSub={isMenuSub}
                languagesSubMenu={languagesSubMenu}
                isLanguageDrawer={isLanguageDrawer}
                setLanguageDrawer={setLanguageDrawer}
                isTranslationsDrawer={isTranslationsDrawer}
                setTranslationsDrawer={setTranslationsDrawer}
              />
            )}

            {isMenuStoreVal === "User management" && (
              <UserManagementSettings
                isUserDrawer={isUserDrawer}
                setUserDrawer={setUserDrawer}
              />
            )}

            {isMenuStoreVal === "Demographics" && <DemographicsSettings />}

            {isMenuStoreVal === "Verifications" && (
              <VerificationSettings isMenuSub={isMenuSubStoreVal} />
            )}

            {isMenuStoreVal === "Identity provider" && (
              <IdentitySettings isMenuSub={isMenuSubStoreVal} />
            )}

            {isMenuStoreVal === "Notifications" && (
              <NotificationSettings
                isNotificationDrawer={isNotificationDrawer}
                setNotificationDrawer={setNotificationDrawer}
              />
            )}
          </div>
          <div className="col-lg-12 divider-col">
            {/* <div className="l-divider"/> */}
          </div>
        </div>

        <TopClientActions
          isMenu={isMenuStoreVal}
          searchString={searchString}
          searchFocusIndex={searchFocusIndex}
          setSearchString={setSearchString}
          searchFoundCount={searchFoundCount}
          selectPrevMatch={selectPrevMatch}
          selectNextMatch={selectNextMatch}
          settreeData={settreeData}
          istreeData={istreeData}
          isMenuSub={isMenuSubStoreVal}
          isLocationDrawer={isLocationDrawer}
          setLocationDrawer={setLocationDrawer}
          isLocationGroupDrawer={isLocationGroupDrawer}
          setLocationGroupDrawer={setLocationGroupDrawer}
          isLanguageDrawer={isLanguageDrawer}
          setLanguageDrawer={setLanguageDrawer}
          isTranslationsDrawer={isTranslationsDrawer}
          setTranslationsDrawer={setTranslationsDrawer}
          isUserDrawer={isUserDrawer}
          setUserDrawer={setUserDrawer}
          isNotificationDrawer={isNotificationDrawer}
          setNotificationDrawer={setNotificationDrawer}
          isEmailsDrawer={isEmailsDrawer}
          setEmailsDrawer={setEmailsDrawer}
          isQuestionsDrawer={isQuestionsDrawer}
          setQuestionsDrawer={setQuestionsDrawer}
          isImportExportDrawer={isImportExportDrawer}
          setImportExportDrawer={setImportExportDrawer}
          isSaving={loading}
          onClickSave={onClickSave}
          isLocationEdit={isLocationEdit}
          setLocationEdit={setLocationEdit}
          treeStruct={treeStruct}
          setTreeStruct={setTreeStruct}
        />
      </div>
    </>
  )
}

export default ClientSettings
