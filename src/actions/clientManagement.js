export const saveClientIdForSurveys = (value) => {
  return {
    type: "Save_Client_Id_For_Surveys",
    payload: { data: value },
  }
}

export const saveMenuIndex = (value) => {
  return {
    type: "Save_Menu_Index",
    payload: { data: value },
  }
}

export const saveMenuIndexSub = (value) => {
  return {
    type: "Save_Menu_Index_Sub",
    payload: { data: value },
  }
}

export const saveRowData = (rowData) => {
  return {
    type: "Save_Row_Data",
    payload: { data: rowData },
  }
}

export const initRowData = () => {
  return { type: "Reset_Init_Data" }
}

export const createNewClient = () => {
  return { type: "Create_New_Client" }
}

export const editClient = () => {
  return { type: "Edit_Client" }
}
