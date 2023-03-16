export const fetchInit = () => (dispatch) => {
  dispatch({
    type: "FETCH_DEMOGRAPHICS_INIT",
  })
}

export const fetchSuccess = (payload) => (dispatch) => {
  dispatch({
    type: "FETCH_DEMOGRAPHICS_SUCCESS",
    payload,
  })
}

export const fetchFailure = () => (dispatch) => {
  dispatch({
    type: "FETCH_DEMOGRAPHICS_FAILURE",
  })
}

export const reset = () => (dispatch) => {
  dispatch({
    type: "RESET_DEMOGRAPHICS",
  })
}
