import Results from "../Client/Results"
import RegionsGlobal from "../Client/RegionsGlobal"
import Campaigns from "../Client/Campaigns"
import FeedbackResults from "../Client/FeedbackResults"
import FeedbackDataView from "../Client/FeedbackDataView"
import FeedbackCommentsView from "../Client/FeedbackCommentsView"
import FeedbackThemeView from "../Client/FeedbackThemeView"
import WaveEngagement from "../Client/WaveEngagement"
import OrganisationXPScore from "../Client/XPScore"
import DownloadPage from "../Shared/Download"

import Responder from "./Responder"
import ResponderHome from "../Responder/Home"
import SpecificCampaignDetails from "../Client/campaignSpecificDashboards/index"

const routes = [
  {
    path: "/results",
    name: "results",
    exact: true,
    pageTitle: "Results",
    component: Results,
  },
  {
    path: "/test",
    name: "global",
    exact: true,
    pageTitle: "Regions Global",
    component: RegionsGlobal,
  },
  {
    path: "/wave-engagement",
    name: "wave-engagement",
    exact: true,
    pageTitle: "Usage",
    component: WaveEngagement,
  },
  {
    path: "/organisation-xp-score",
    name: "organisation-xp-score",
    exact: true,
    pageTitle: "Organisation XP Score",
    component: OrganisationXPScore,
  },
  {
    path: "/campaigns",
    name: "campaigns",
    exact: true,
    pageTitle: "Campaigns",
    component: Campaigns,
  },
  {
    path: "/campaign-details",
    name: "campaign-details",
    exact: true,
    pageTitle: "Campaign Details",
    component: SpecificCampaignDetails,
  },
  {
    path: "/results-feedbacks",
    name: "results-feedbacks",
    exact: true,
    pageTitle: "Feedback Results",
    component: FeedbackResults,
  },
  {
    path: "/feedback-data-view",
    name: "feedback-data-view",
    exact: true,
    pageTitle: "Feedback Data View",
    component: FeedbackDataView,
  },
  {
    path: "/feedback-comments-view",
    name: "feedback-comments-view",
    exact: true,
    pageTitle: "Feedback Comments View",
    component: FeedbackCommentsView,
  },
  {
    path: "/feedback-theme-view",
    name: "feedback-theme-view",
    exact: true,
    pageTitle: "FeedbackThemeView",
    component: FeedbackThemeView,
  },
  {
    path: "/download",
    name: "download",
    exact: true,
    pageTitle: "Download Page",
    component: DownloadPage,
  },
  {
    path: "/responder-home",
    name: "responder-home",
    exact: true,
    pageTitle: "Responder Home",
    component: ResponderHome,
  },
  ...Responder.routes,
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

  //...Responder.metisMenu,
]

export default { routes, metisMenu }
