export const initialState = {
  isLoading: false,
  isError: false,
  tourActive: false,
  tourCompleted: false,
  lastFetched: null,
  notifications: null,
  client_id: null,
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "RESET_USER":
      return {
        ...initialState,
      }
    case "FETCH_USER_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isError: false,
        lastFetched: Date.now(),
      }
    case "FETCH_USER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        lastFetched: null,
      }
    case "TOUR_ACTIVE":
      return {
        ...state,
        tourActive: true,
      }
    case "TOUR_CLOSED":
      return {
        ...state,
        tourActive: false,
      }
    case "TOUR_COMPLETED":
      return {
        ...state,
        tourActive: false,
        tourCompleted: true,
      }
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      }

    default:
      return {
        ...state,
      }
  }
}
