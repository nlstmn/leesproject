const rowDataInit = {
  name: null,
  client_id: null,
  client_ref_no: null,
  invite_code: null,
}

export const saveClientIdForSurveys = (state = { data: 0 }, action) => {
  switch (action.type) {
    case "Save_Client_Id_For_Surveys":
      return { ...state, data: action.payload.data }
    default:
      return state
  }
}

export const saveMenuIndex = (state = { data: "Main" }, action) => {
  switch (action.type) {
    case "Save_Menu_Index":
      return { ...state, data: action.payload.data }
    default:
      return state
  }
}

export const saveMenuIndexSub = (state = { data: null }, action) => {
  switch (action.type) {
    case "Save_Menu_Index_Sub":
      return { ...state, data: action.payload.data }
    default:
      return state
  }
}

export const saveRowData = (state = rowDataInit, action) => {
  switch (action.type) {
    case "Save_Row_Data":
      return { ...state, data: action.payload.data }
    case "Reset_Init_Data":
      return { ...state, data: rowDataInit }
    default:
      return state
  }
}

// Create New Client (true), Edit Client (false)
export const saveEditOrCreateClient = (state = { data: false }, action) => {
  switch (action.type) {
    case "Create_New_Client":
      return { ...state, data: true }
    case "Edit_Client":
      return { ...state, data: false }
    default:
      return state
  }
}
