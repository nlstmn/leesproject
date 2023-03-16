export const campaignDetailsReducer = (
  state = {
    loading: false,
    data: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Request_Data":
      return {
        loading: true,
      }
    case "Success_Data":
      return {
        loading: false,
        data: action.data,
      }
    case "Data_Failed":
      return {
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const campaignsGraf = (
  state = {
    isLoading: false,
    graphs: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Data_Request":
      return {
        ...state,
        isLoading: true,
      }
    case "Data_Success":
      return {
        ...state,
        isLoading: false,
        graphs: action.graphs,
      }
    case "Data_Fail":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const campaignsReducer = (
  state = {
    isLoading: false,
    campaigns: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Data_Request":
      return {
        ...state,
        isLoading: true,
      }
    case "Data_Success":
      return {
        ...state,
        isLoading: false,
        campaigns: action.campaigns,
      }
    case "Data_Fail":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const bufferCampaignsReducer = (
  state = {
    isLoading: false,
    bufferCampaigns: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Data_Request":
      return {
        ...state,
        isLoading: true,
      }
    case "Data_Success":
      return {
        ...state,
        isLoading: false,
        bufferCampaigns: action.bufferCampaigns,
      }
    case "Data_Fail":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const feedbackCommentsViewReducer = (
  state = {
    isLoading: false,
    userFeedback: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Data_Request":
      return {
        ...state,
        isLoading: true,
      }
    case "Data_Success":
      return {
        ...state,
        isLoading: false,
        userFeedback: action.userFeedback,
      }
    case "Data_Fail":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const feedbackJoinDataViewReducer = (
  state = {
    isLoading: false,
    joinData: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Data_Request":
      return {
        ...state,
        isLoading: true,
      }
    case "Data_Success":
      return {
        ...state,
        isLoading: false,
        joinData: action.joinData,
      }
    case "Data_Fail":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const feedbackClientDataViewReducer = (
  state = {
    isLoading: false,
    clientData: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Data_Request":
      return {
        ...state,
        isLoading: true,
      }
    case "Data_Success":
      return {
        ...state,
        isLoading: false,
        clientData: action.clientData,
      }
    case "Data_Fail":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const feedBackResult = (
  state = {
    isLoading: false,
    isScoreData: "",
    locationBreakDownData: "",
    commentsNumber: [],
    donutData: "",
    highAndLows: [],
    dataAvailable: "",
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "FeedbackResult_Request":
      return {
        ...state,
        isLoading: true,
        isScoreData: "",
        locationBreakDownData: "",
        commentsNumber: [],
        donutData: "",
        highAndLows: [],
        dataAvailable: "",
      }
    case "FeedbackResult_Success":
      return {
        ...state,
        isLoading: false,
        isScoreData: action.payload,
        locationBreakDownData: action.payload,
        commentsNumber: action.payload,
        donutData: action.payload,
        highAndLows: action.payload,
        dataAvailable: action.payload,
      }
    case "FeedbackResult_Failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const feedBackThemeView = (
  state = {
    isLoading: false,
    scales: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "feedBackThemeView_Request":
      return {
        ...state,
        isLoading: true,
      }
    case "feedBackThemeView_Success":
      return {
        ...state,
        isLoading: false,
        scales: action.payload,
      }
    case "feedBackThemeView_Failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const regionsGlobal = (
  state = {
    data: [],
    isLoading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "RegionsGlobal_Request":
      return {
        ...state,
        isLoading: true,
      }
    case "RegionsGlobal_Success":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    case "RegionsGlobal_Failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const campaignClosedDetails = (
  state = {
    isLoading: false,
    data: [],
    commentData: [],
    stats: [],
    rates: [],
    basicBarData: [],
    heatData: [],
    heatBufferData: [],
    bufferRates: [],
    campaignDetails: [],
    basicBufferData: [],
    bufferCommentData: [],
    trends: [],
    bufferTrends: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "CampaignClosedDetails_Request":
      return {
        ...state,
        isLoading: true,
        data: [],
        commentData: [],
        stats: [],
        rates: [],
        basicBarData: [],
        heatData: [],
        heatBufferData: [],
        bufferRates: [],
        campaignDetails: [],
        basicBufferData: [],
        bufferCommentData: [],
        trends: [],
        bufferTrends: [],
      }
    case "CampaignClosedDetails_Success":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        commentData: action.payload,
        stats: action.payload,
        rates: action.payload,
        basicBarData: action.payload,
        heatData: action.payload,
        heatBufferData: action.payload,
        bufferRates: action.payload,
        campaignDetails: action.payload,
        basicBufferData: action.payload,
        bufferCommentData: action.payload,
        trends: action.payload,
        bufferTrends: action.payload,
      }
    case "CampaignClosedDetails_Failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const results = (
  state = {
    isLoading: false,
    campaignCharts: [],
    usage: [],
    comments: [],
    donut: [],
    avg: 0,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Results_Request":
      return {
        ...state,
        isLoading: true,
        campaignCharts: [],
        usage: [],
        comments: [],
        donut: [],
        avg: 0,
      }
    case "Results_Success":
      return {
        ...state,
        isLoading: false,
        campaignCharts: action.payload,
        usage: action.payload,
        comments: action.payload,
        donut: action.payload,
        avg: action.payload,
      }
    case "Results_Failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const waveEngagement = (
  state = {
    isLoading: false,
    activeUsersData: [],
    stats: [],
    locationBreakdownData: [],
    loginDaysData: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "WaveEngagement_Request":
      return {
        ...state,
        isLoading: true,
        activeUsersData: [],
        stats: [],
        locationBreakdownData: [],
        loginDaysData: [],
      }
    case "WaveEngagement_Success":
      return {
        ...state,
        isLoading: false,
        activeUsersData: action.payload,
        stats: action.payload,
        locationBreakdownData: action.payload,
        loginDaysData: action.payload,
      }
    case "WaveEngagement_Failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const xpScore = (
  state = {
    isLoading: true,
    avg: 0,
    donut: [],
    trends: [],
    comparisonCross: [],
    comparisonCrossData: [],
    comparisonCrossLine: [],
    comparisonCrossLineData: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "XpScore_Request":
      return {
        ...state,
        isLoading: true,
        avg: 0,
        donut: [],
        trends: [],
        comparisonCross: [],
        comparisonCrossData: [],
        comparisonCrossLine: [],
        comparisonCrossLineData: [],
      }
    case "XpScore_Success":
      return {
        ...state,
        isLoading: false,
        avg: 0,
        donut: action.payload,
        trends: action.payload,
        comparisonCross: action.payload,
        comparisonCrossData: action.payload,
        comparisonCrossLine: action.payload,
        comparisonCrossLineData: action.payload,
      }
    case "XpScore_Failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const newSurveyHomeReducer = (
  state = {
    allCountries: 0,
    countryByClientId: 0,
    allWorkplaces: 0,
    workplaceByClientId: 0,
    allEmployees: 0,
    employeeByClientId: 0,
    generalLMI: 0,
    LMIByClientId: null,
    generalHLMI: null,
    HLMIByClientId: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "newSurveyHome_Request":
      return state
    case "newSurveyHome_Success":
      return {
        ...state,
        allCountries: action.payload.allCountries,
        countryByClientId: action.payload.countryByClientId,
        allWorkplaces: action.payload.allWorkplaces,
        workplaceByClientId: action.payload.workplaceByClientId,
        allEmployees: action.payload.allEmployees,
        employeeByClientId: action.payload.employeeByClientId,
        generalLMI: action.payload.generalLMI,
        LMIByClientId: action.payload.LMIByClientId,
        generalHLMI: action.payload.generalHLMI,
        HLMIByClientId: action.payload.HLMIByClientId,
        error: null,
      }
    case "newSurveyHome_Failed":
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
