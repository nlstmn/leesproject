import Clients from "../Leesman/Clients"
import CampaignsSummary from "../Admin/CampaignAllData"
import Campaigns from "../Client/Campaigns"
import HelpDesk from "../Admin/ClientManagement/HelpDesk"
import NotificationManagement from "../Admin/ClientManagement/NotificationManagement"
import Questions from "../Admin/ClientManagement/Questions"
import Tags from "../Admin/ClientManagement/Tags"
import Logs from "../Leesman/Logs"
import Migration from "../Leesman/Migration"

import Admin from "./Admin"
import SurveySpecificDashboard from "../Admin/ClientManagement/SurveyManagement/layouts/SurveySpecificDashboard"

const routes = [
  {
    path: "/clients",
    name: "clients",
    exact: true,
    pageTitle: "Clients",
    component: Clients,
  },
  {
    path: "/all-campaigns",
    name: "all-campaigns",
    exact: true,
    pageTitle: "Campaigns Summary",
    component: CampaignsSummary,
  },
  {
    path: "/campaigns-management",
    name: "campaigns-management",
    exact: true,
    pageTitle: "All Campaigns",
    component: Campaigns,
  },
  {
    path: "/helpdesk",
    name: "helpdesk",
    exact: true,
    pageTitle: "HelpDesk",
    component: HelpDesk,
  },
  {
    path: "/notification-management",
    name: "Notification Management",
    exact: true,
    pageTitle: "Notification Management",
    component: NotificationManagement,
  },
  {
    path: "/questions",
    name: "questions",
    exact: true,
    pageTitle: "Questions",
    component: Questions,
  },
  {
    path: "/tags",
    name: "tags",
    exact: true,
    pageTitle: "Tags",
    component: Tags,
  },
  {
    path: "/logs",
    name: "logs",
    exact: true,
    pageTitle: "Logs",
    component: Logs,
  },
  {
    path: "/migration",
    name: "migration",
    exact: true,
    pageTitle: "Migration",
    component: Migration,
  },
  {
    path: "/survey-details",
    name: "Survey Details",
    exact: true,
    pageTitle: "Survey Details",
    component: SurveySpecificDashboard,
  },
  ...Admin.routes,
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
    to: "/all-campaigns",
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
]

export default { routes, metisMenu }
