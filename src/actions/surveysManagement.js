export const saveSurveyId = (value) => {
  return {
    type: "SAVE_SURVEY_ID",
    payload: { data: value },
  }
}

export const saveClientName = (value) => {
  return {
    type: "SAVE_CLIENT_NAME_FOR_SURVEY",
    payload: { data: value },
  }
}

export const createNewSurvey = () => {
  return { type: "CREATE_NEW_SURVEY" }
}

export const editSurvey = () => {
  return { type: "EDIT_SURVEY" }
}
