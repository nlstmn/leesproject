const initialState = {
  isSearchbar: false,
  isNotificationbar: false,
  themeColor: "theme-leesman",
  bgImage: "home-image",
  fontStyle: "font-source-sans",
  lightVersion: false,
  loginBackground: false,
  isSetLogout: false,
  RtlVersion: false,
  offcanvas: false,
  horizontalMenu: false,
  miniSidebar: false,
  miniHover: false,
  miniSideMenuOn: false,
  openFullScreen: false,
  isOneTimeLoader: true,
  isStart: false,
  isLoader: false,
  isInfo: false,
  isSubmitted: false,
  isPage: 1,
  isSurveyTab: "translations",
  isCreateSurvey: false,
  selectedSurveyId: 0,
  surveyAnswers: [],
  isMenu: null,
  isChangeModule: "Surveys",
  // is3DotMenu: false,
  // isDropDownMenu: false,
  // isProfileMenu: false,
  // isPagesMenu: false,
  // isMailMenu: false,
  // isNotificationMenu: false,
  // isLanguageMenu: false,
  // isAuthMenu: false,
  // isToggleLeftBar: false,
  // isToggleRightBar: false,
  // isOpenSettingBar: false,
  // themeColor: 'cyan',
  // isDarkMode: false,
  // isDarkHeader: false,
  // isFixNavbar: false,
  // isMinSidebar: false,
  // isDarkSidebar: false,
  // isIconColor: false,
  // isGradientColor: true,
  // isBoxShadow: false,
  // isBoxLayout: false,
  // isRtl: false,
  // isMenuGrid: false,
  // isFont: "font-muli",
  // isSubMenuIcon: "list-a",
  // isMenuIcon: "list-c"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_MINI_SIDE_MENU_ON":
      return {
        ...state,
        miniSideMenuOn: action.payload,
      }
    case "SET_MINI_HOVER":
      return {
        ...state,
        miniHover: action.payload,
      }
    case "SET_LOGOUT":
      return {
        ...state,
        isSetLogout: action.payload,
      }
    case "SET_MENU_SIDEBAR":
      return {
        ...state,
        miniSidebar: action.payload,
      }
    case "TOGGLE_SEARCH_BAR":
      return {
        ...state,
        isSearchbar: action.payload,
      }
    case "TOGGLE_NOTIFICATION_BAR":
      return {
        ...state,
        isNotificationbar: action.payload,
      }
    case "SET_HORIZONTAL_MENU":
      return {
        ...state,
        horizontalMenu: action.payload,
      }
    case "SET_THEME_COLOR":
      return {
        ...state,
        themeColor: action.payload,
      }
    case "SET_FONT_STYLE":
      return {
        ...state,
        fontStyle: action.payload,
      }
    case "SET_LIGHT_THEME":
      return {
        ...state,
        lightVersion: action.payload,
      }
    case "SET_RTL_VERSION":
      return {
        ...state,
        RtlVersion: action.payload,
      }
    case "SET_OFF_CANVAS":
      return {
        ...state,
        offcanvas: action.payload,
      }
    case "SET_BG_IMAGE":
      return {
        ...state,
        bgImage: action.payload,
      }
    case "SET_LOGIN_BG":
      return {
        ...state,
        loginBackground: action.payload,
      }
    case "SET_FULL_SCREEN":
      return {
        ...state,
        openFullScreen: action.payload,
      }
    case "SET_ONE_TIME_LOADER":
      return {
        ...state,
        isOneTimeLoader: action.payload,
      }
    case "SET_START_SURVEY":
      return {
        ...state,
        isStart: action.payload,
      }
    case "SET_LOADER_SURVEY":
      return {
        ...state,
        isLoader: action.payload,
      }

    case "SET_INFO_SURVEY":
      return {
        ...state,
        isInfo: action.payload,
      }

    case "SET_SUBMITTED_SURVEY":
      return {
        ...state,
        isSubmitted: action.payload,
      }

    case "SET_PAGE_SURVEY":
      return {
        ...state,
        isPage: action.payload,
      }

    case "SET_SURVEY_TAB":
      return {
        ...state,
        isSurveyTab: action.payload,
      }

    case "SET_CREATE_SURVEY":
      return {
        ...state,
        isCreateSurvey: action.payload,
      }
    case "SET_SURVEY_ID":
      return {
        ...state,
        selectedSurveyId: action.payload,
      }
    case "SET_SURVEY_ANSWERS":
      return {
        ...state,
        surveyAnswers: action.payload,
      }
    case "SET_MENU":
      return {
        ...state,
        isMenu: action.payload,
      }
    case "SET_CHANGE_MODULE":
      return {
        ...state,
        isChangeModule: action.payload,
      }
    default:
      return state
  }
}
