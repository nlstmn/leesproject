import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer"
import { persistStore, persistReducer } from "redux-persist" // imports from redux-persist
import storage from "redux-persist/lib/storage" // defaults to localStorage for web

const persistConfig = {
  // configuration object for redux-persist
  key: "leesman@@112233",
  storage, // define which storage to use
  blacklist: ["getClientIndustry", "getSurveyMetrics"],
  // Custom save
  // blacklist: ['isLogged'], // navigation will not be persisted
  // whitelist: ['isForgot'] // only navigation will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
  //composeEnhancers(applyMiddleware(thunk, logger)) // add any middlewares here
  composeEnhancers(applyMiddleware(thunk)) // add any middlewares here
)

const persistor = persistStore(store) // used to create the persisted store, persistor will be used in the next step

export { store, persistor }
