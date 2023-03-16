export const fetchClientInit = () => (dispatch) => {
  dispatch({
    type: "FETCH_CLIENT_INIT",
  })
}

export const fetchClientSuccess = (payload) => (dispatch) => {
  console.log("redux", payload)
  dispatch({
    type: "FETCH_CLIENT_SUCCESS",
    payload,
  })
}

export const fetchClientFailure = () => (dispatch) => {
  dispatch({
    type: "FETCH_CLIENT_FAILURE",
  })
}
