// Rate XP Score Wizard
import RateXP from "../Responder/WizardXP/MultiStepForm"
// Answer a question Wizard
import AnswerQuestion from "../Responder/WizardQuestion/MultiStepForm"
// Feedback Wizard
import GiveFeedback from "../Responder/WizardFeedback/MultiStepForm"
// Profile Setup Wizard
import Setup from "../Responder/WizardSetup/MultiStepForm"

// Account
import Account from "../Shared/Account/Account"
import Password from "../Shared/Account/Password"
import Alerts from "../Shared/Account/Alerts"

const routes = [
  {
    path: "/rate-my-xp",
    name: "rate-my-xp",
    exact: true,
    pageTitle: "Rate your XP",
    component: RateXP,
  },
  {
    path: "/answer-question",
    name: "answer-question",
    exact: true,
    pageTitle: "Answer Question",
    component: AnswerQuestion,
  },
  {
    path: "/share-thinking",
    name: "share-thinking",
    exact: true,
    pageTitle: "Give Feedback",
    component: GiveFeedback,
  },
  {
    path: "/setup",
    name: "setup",
    exact: true,
    pageTitle: "Profile Setup",
    component: Setup,
  },
  {
    path: "/my-account",
    name: "my-account",
    exact: true,
    pageTitle: "Account",
    component: Account,
  },
  {
    path: "/change-password",
    name: "change-password",
    exact: true,
    pageTitle: "Password",
    component: Password,
  },
  {
    path: "/alert-settings",
    name: "alert-settings",
    exact: true,
    pageTitle: "Alerts",
    component: Alerts,
  },
]

const metisMenu = [
  {
    id: 1,
    icon: "iconl-leesman-home",
    label: "Home",
    to: "/",
  },
  {
    id: 2,
    icon: "iconl-leesman-account",
    label: "My profile",
    to: "/my-account",
  },
  {
    id: "logout-responder",
    icon: "iconl-leesman-logout",
    label: "Logout",
    to: "/#login",
  },
  {
    id: "responder-ghost-link",
    icon: "",
    label: "",
    to: "/",
  },
]

export default { routes, metisMenu }
