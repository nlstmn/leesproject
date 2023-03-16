export const initialState = {
  data: {},
}

export default function filter(state = initialState, action) {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        data: action.payload,
      }
    case "REMOVE_FILTER":
      return {
        ...state,
        data: {},
      }

    default:
      return {
        ...state,
      }
  }
}
