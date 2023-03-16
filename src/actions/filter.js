export const setFilter = (payload) => (dispatch) => {
  dispatch({
    type: "SET_FILTER",
    payload,
  })
}

export const removeFilter = (payload) => (dispatch) => {
  dispatch({
    type: "REMOVE_FILTER",
    payload,
  })
}
