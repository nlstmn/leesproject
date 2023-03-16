export const saveSurveyId = (state = { data: 0 }, action) => {
  switch (action.type) {
    case "SAVE_SURVEY_ID":
      return { ...state, data: action.payload.data }
    default:
      return state
  }
}

export const saveClientName = (state = { data: "" }, action) => {
  switch (action.type) {
    case "SAVE_CLIENT_NAME_FOR_SURVEY":
      return { ...state, data: action.payload.data }
    default:
      return state
  }
}
