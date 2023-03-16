import Demographics from "../Admin/ClientManagement/Demographics"
import Departments from "../Admin/ClientManagement/Departments"
import Languages from "../Admin/ClientManagement/Languages"
import Locations from "../Admin/ClientManagement/Locations"
import MainClient from "../Admin/ClientManagement/Main"
import Translations from "../Admin/ClientManagement/Translations"
import Access from "../Admin/ClientManagement/Access"
import CreateCampaign from "../Admin/ClientManagement/CreateCampaign/CreateCampaignMain"
import UserManagement from "../Admin/UserManagement"

import IdentityProvider from "../Admin/ClientManagement/identityprovider"
import DomainVerify from "../Admin/ClientManagement/domainverify"

// Survey Management
import SurveyManagement from "../Admin/ClientManagement/SurveyManagement/survey_management"
import createSurvey from "../Admin/ClientManagement/SurveyManagement/create-survey/index"
import Surveys from "../Admin/ClientManagement/SurveyManagement/layouts/surveys"
// Campaign pages
import AllData from "../Admin/CampaignAllData"

import Client from "./Client"

// New pages
// New pages

// Analytics pages
import Analytics_Main from "../NewDesign/pages/shared/main/index"
import Analytics_Overview from "../NewDesign/pages/analytics/overview/index"
import Analytics_Results from "../NewDesign/pages/analytics/results/index"
import Custom_Filters from "../NewDesign/pages/analytics/custom/index"
import Surveys_Management from "../NewDesign/pages/analytics/survey_management/surveys"
import Create_Survey from "../NewDesign/pages/analytics/survey_management/create_survey/index"
import Modules_Analytics from "../NewDesign/pages/analytics/modules/index"

// Shared pages
import Clients_Management from "../NewDesign/pages/shared/clients/index"
import Client_Settings from "../NewDesign/pages/shared/client_settings/index"
import All_Settings from "../NewDesign/pages/shared/settings/index"
import Export_Data from "../NewDesign/pages/shared/export_data/index"
import Get_In_Touch from "../NewDesign/pages/shared/get_in_touch/index"
import Logs_Admin from "../NewDesign/pages/shared/logs/index"
import Translations_Admin from "../NewDesign/pages/shared/translations/index"

// Inside result pages
import Inside_Main from "../NewDesign/pages/shared/main/index"
import Campaigns_Management from "../NewDesign/pages/inside/campaign_management/campaigns"
import Create_Campaigns from "../NewDesign/pages/inside/campaign_management/create_campaign/index"

const routes = [
  {
    path: "/access",
    name: "access",
    exact: true,
    pageTitle: "Access",
    component: Access,
  },

  {
    path: "/create-campaign",
    name: "create-campaign",
    exact: true,
    pageTitle: "Create Campaign",
    component: CreateCampaign,
  },
  {
    path: "/all-data",
    name: "all-data",
    exact: true,
    pageTitle: "All Data",
    component: AllData,
  },
  {
    path: "/demographics",
    name: "demographics",
    exact: true,
    pageTitle: "Demographics",
    component: Demographics,
  },
  {
    path: "/departments",
    name: "departments",
    exact: true,
    pageTitle: "Departments",
    component: Departments,
  },
  {
    path: "/languages",
    name: "languages",
    exact: true,
    pageTitle: "Languages",
    component: Languages,
  },
  {
    path: "/locations",
    name: "locations",
    exact: true,
    pageTitle: "Locations",
    component: Locations,
  },
  {
    path: "/client-main",
    name: "client-main",
    exact: true,
    pageTitle: "Main Client",
    component: MainClient,
  },
  {
    path: "/translations",
    name: "translations",
    exact: true,
    pageTitle: "Translations",
    component: Translations,
  },
  {
    path: "/user-management",
    name: "user-management",
    exact: true,
    pageTitle: "User Management",
    component: UserManagement,
  },
  {
    path: "/identity-provider",
    name: "identity-provider",
    exact: true,
    pageTitle: "Identity Provider",
    component: IdentityProvider,
  },
  {
    path: "/domain-verify",
    name: "domain-verify",
    exact: true,
    pageTitle: "Domain Verification",
    component: DomainVerify,
  },
  {
    path: "/create-edit-survey",
    name: "create-edit-survey",
    exact: true,
    pageTitle: "Create/edit survey",
    component: createSurvey,
  },
  {
    path: "/survey-management",
    name: "survey-management",
    exact: true,
    pageTitle: "Survey Management",
    component: SurveyManagement,
  },
  {
    path: "/surveys",
    name: "surveys",
    exact: true,
    pageTitle: "Surveys",
    component: Surveys,
  },

  // NEW PAGES
  // NEW PAGES
  // NEW PAGES

  // Analytics
  {
    path: "/",
    name: "analytics-main",
    exact: true,
    pageTitle: "Analytics Main",
    component: Analytics_Main,
  },
  {
    path: "/analytics-overview",
    name: "analytics-overview",
    exact: true,
    pageTitle: "Analytics Overview",
    component: Analytics_Overview,
  },
  {
    path: "/analytics-results",
    name: "analytics-results",
    exact: true,
    pageTitle: "Analytics Results",
    component: Analytics_Results,
  },
  {
    path: "/surveys-management",
    name: "surveys-management",
    exact: true,
    pageTitle: "Surveys Management",
    component: Surveys_Management,
  },
  {
    path: "/custom-filters",
    name: "custom-filters",
    exact: true,
    pageTitle: "Custom Filters",
    component: Custom_Filters,
  },
  {
    path: "/create-survey",
    name: "create-survey",
    exact: true,
    pageTitle: "Create Survey",
    component: Create_Survey,
  },
  {
    path: "/modules-analytics",
    name: "modules-analytics",
    exact: true,
    pageTitle: "Modules Analytics",
    component: Modules_Analytics,
  },

  // Inside
  {
    path: "/inside-main",
    name: "inside-main",
    exact: true,
    pageTitle: "Inside Main",
    component: Inside_Main,
  },
  {
    path: "/campaign-management",
    name: "campaign-management",
    exact: true,
    pageTitle: "Campaigns Management",
    component: Campaigns_Management,
  },
  {
    path: "/create-campaigns",
    name: "create-campaigns",
    exact: true,
    pageTitle: "Create Campaigns",
    component: Create_Campaigns,
  },

  // Shared
  {
    path: "/clients-management",
    name: "clients-management",
    exact: true,
    pageTitle: "Clients Management",
    component: Clients_Management,
  },
  {
    path: "/client-settings",
    name: "client-settings",
    exact: true,
    pageTitle: "Client Settings",
    component: Client_Settings,
  },
  {
    path: "/get-in-touch",
    name: "get-in-touch",
    exact: true,
    pageTitle: "Get In Touch",
    component: Get_In_Touch,
  },
  {
    path: "/export-data",
    name: "export-data",
    exact: true,
    pageTitle: "Export Data",
    component: Export_Data,
  },
  {
    path: "/all-settings",
    name: "all-settings",
    exact: true,
    pageTitle: "All Settings",
    component: All_Settings,
  },
  {
    path: "/logs-admin",
    name: "logs-admin",
    exact: true,
    pageTitle: "Logs",
    component: Logs_Admin,
  },
  {
    path: "/translations-admin",
    name: "translations-admin",
    exact: true,
    pageTitle: "Translations",
    component: Translations_Admin,
  },

  ...Client.routes,
]

const metisMenu = [
  {
    id: 1,
    icon: "icont-regionxc",
    label: "Locations",
    to: "/",
  },
  {
    id: 2,
    icon: "icont-summaryxc",
    label: "Summary",
    to: "/results",
  },
  {
    id: 3,
    icon: "icont-experience-scorexc",
    label: "XP Score",
    to: "/organisation-xp-score",
  },
  {
    id: 4,
    icon: "icont-campaignsxc",
    label: "Campaigns",
    to: "/campaigns",
  },
  {
    id: 5,
    icon: "icont-employee-feedbackxc",
    label: "Comments",
    to: "/results-feedbacks",
  },
  {
    id: 6,
    icon: "icont-user-engagementxc",
    label: "Usage",
    to: "/wave-engagement",
  },
  {
    id: "logout-other",
    icon: "icont-logoutxc",
    label: "Logout",
    to: "/#login",
  },
  // {
  //   id: 8,
  //   icon: "icont-downloadxc",
  //   label: "Download",
  //   to: "/download",
  // },
  //...Client.metisMenu,
]

export default { routes, metisMenu }
