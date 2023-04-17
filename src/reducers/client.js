export const initialState = {
  enable_feedbacks: false,
  enable_questions: false,
  enable_xp: false,
  enable_inside: false,
}

export default function currentSessionUser(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CLIENT_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case "FETCH_CLIENT_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isError: false,
        lastFetched: Date.now(),
      }
    case "FETCH_CLIENT_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        lastFetched: null,
      }

    default:
      return {
        ...state,
      }
  }
}
