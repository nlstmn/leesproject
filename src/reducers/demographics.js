export const initialState = {
  isLoading: false,
  isError: false,
  lastFetched: null,
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DEMOGRAPHICS_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case "FETCH_DEMOGRAPHICS_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isError: false,
        lastFetched: Date.now(),
      }
    case "FETCH_DEMOGRAPHICS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        lastFetched: null,
      }
    case "RESET_DEMOGRAPHICS":
      return {
        ...initialState,
      }
    default:
      return {
        ...state,
      }
  }
}
