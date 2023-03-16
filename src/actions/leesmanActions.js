import axios from "axios"

export const clientActions = () => async (dispatch) => {
  dispatch({ type: "Client_Request" })
  try {
    const { data } = await axios.get("/admin/clients")
    dispatch({ type: "Client_Success", payload: data })
  } catch (error) {
    dispatch({ type: "Client_Failed", payload: error })
  }
}

export const leesmanLogsAction = () => async (dispatch) => {
  dispatch({ type: "Logs_Request" })
  try {
    const { data } = await axios.get("/admin/clients/0/logs")
    dispatch({
      type: "Logs_Success",
      payload: {
        logs: data,
        bufferLogs: data,
      },
    })
  } catch (error) {
    dispatch({ type: "Logs_Failed", payload: error })
  }
}

export const leesmanMigrationAction = () => async (dispatch) => {
  dispatch({ type: "Migration_Request" })
  try {
    const { data } = await axios.get("/migration")
    dispatch({
      type: "Migration_Success",
      payload: {
        allData: data,
      },
    })
  } catch (error) {
    dispatch({ type: "Migration_Failed", payload: error })
  }
}
