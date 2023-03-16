const leesmanClient = (
  state = {
    loading: false,
    data: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Client_Request":
      return {
        loading: true,
        ...state,
      }
    case "Client_Success":
      return {
        loading: false,
        ...state,
        data: action.payload,
      }
    case "Client_Failed":
      return {
        loading: false,
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const leesmanLogs = (
  state = {
    loading: false,
    logs: [],
    bufferLogs: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Logs_Request":
      return {
        loading: true,
        ...state,
      }
    case "Logs_Success":
      return {
        loading: false,
        ...state,
        logs: action.payload.logs,
        bufferLogs: action.payload.bufferLogs,
      }
    case "Logs_Failed":
      return {
        loading: false,
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const leesmanMigration = (
  state = {
    loading: false,
    allData: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "Migration_Request":
      return {
        loading: true,
        ...state,
      }
    case "Migration_Success":
      return {
        loading: false,
        ...state,
        allData: action.payload.allData,
      }
    case "Migration_Failed":
      return {
        loading: false,
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export { leesmanClient, leesmanLogs, leesmanMigration }
