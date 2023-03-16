export const initialState = {
  isLoading: true,
  isError: false,
  email: "",
  user: {
    attributes: {},
  },
  role: null,
  permissions: [],
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "STORE_EMAIL":
      return {
        ...state,
        email: action.payload,
      }
    case "FETCH_USER_DATA_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case "FETCH_USER_DATA_SUCCESS":
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isError: false,
      }
    case "FETCH_USER_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case "RESET_USER_DATA":
      return {
        ...state,
        user: initialState.user,
        role: initialState.role,
        permissions: initialState.permissions,
      }
    default:
      return {
        ...state,
      }
  }
}
