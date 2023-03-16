export const reset = () => (dispatch) => {
  dispatch({
    type: "RESET_USER",
  })
}

export const fetchInit = () => (dispatch) => {
  dispatch({
    type: "FETCH_USER_INIT",
  })
}

export const fetchSuccess = (payload) => (dispatch) => {
  dispatch({
    type: "FETCH_USER_SUCCESS",
    payload,
  })
}

export const fetchFailure = () => (dispatch) => {
  dispatch({
    type: "FETCH_USER_FAILURE",
  })
}

export const tourActive = () => (dispatch) => {
  dispatch({
    type: "TOUR_ACTIVE",
  })
}

export const tourClosed = () => (dispatch) => {
  dispatch({
    type: "TOUR_CLOSED",
  })
}

export const tourComplete = () => (dispatch) => {
  dispatch({
    type: "TOUR_COMPLETED",
  })
}
export const setNotifications = (payload) => (dispatch) => {
  dispatch({
    type: "SET_NOTIFICATIONS",
    payload,
  })
}
