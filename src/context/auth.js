import React, { useReducer, useEffect, useState } from "react"

import { notification } from "antd"
import Auth from "@aws-amplify/auth"
import API from "@aws-amplify/api"
import axios from "axios"
import { persistor } from "../store"
import authReducer, { initialState } from "../reducers/auth"

const AuthContext = React.createContext()

function AuthProvider({ children }, props) {
  const state = useAuth()

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const fetchUser = async () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("FETCHED USER", user.signInUserSession)
        const role =
          user.signInUserSession && user.signInUserSession.idToken.payload.role
        const perm_list =
          user.signInUserSession &&
          user.signInUserSession.idToken.payload.permissions
        axiosSetDefaults(
          `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
          `${user.signInUserSession.idToken.jwtToken}`
        )

        dispatch({
          type: "FETCH_USER_DATA_SUCCESS",
          payload: {
            user,
            role,
            permissions: perm_list ? perm_list.split(" ") : null,
          },
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: "FETCH_USER_DATA_FAILURE" })
      })
  }

  useEffect(() => {
    dispatch({ type: "FETCH_USER_DATA_INIT" })
    fetchUser()
  }, [])

  const storeEmail = (email) => {
    dispatch({
      type: "STORE_EMAIL",
      payload: email,
    })
  }

  const signOut = () => {
    return Auth.signOut()
      .then(() => {
        sessionStorage.removeItem("selectedLocationType")
        sessionStorage.removeItem("selectedLocationId")
        sessionStorage.removeItem("selectedLocationName")
        sessionStorage.removeItem("client")
        sessionStorage.removeItem("filterData")
        localStorage.clear()
        sessionStorage.clear()
        persistor.pause()
        persistor.flush().then(() => persistor.purge())
        dispatch({ type: "RESET_USER_DATA" })
      })
      .catch((err) => {
        console.error("Error signing out user ", err)
      })
  }

  const signIn = (email, password, remember, info) => {
    Auth.configure({
      storage: remember ? localStorage : sessionStorage,
    })
    return Auth.signIn(email, password, info) // user, password, additional info passed to lambda triggers
      .then((user) => {
        if (!user.challengeName) {
          const role =
            user.signInUserSession &&
            user.signInUserSession.idToken.payload.role
          const perm_list =
            user.signInUserSession &&
            user.signInUserSession.idToken.payload.permissions

          axiosSetDefaults(
            `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
            `${user.signInUserSession.idToken.jwtToken}`
          )

          console.log({
            user,
            role,
            permissions: perm_list ? perm_list.split(" ") : null,
          })
          dispatch({
            type: "FETCH_USER_DATA_SUCCESS",
            payload: {
              user,
              role,
              permissions: perm_list ? perm_list.split(" ") : null,
            },
          })
        } else {
          dispatch({
            type: "FETCH_USER_DATA_SUCCESS",
            payload: { user },
          })
        }
        return user
      })
  }

  const signUp = (email, password, inviteCode) => {
    return Auth.signUp({
      username: email,
      password,
      clientMetadata: {
        inviteCode,
      },
    })
  }
  const federatedLogin = (email) => {
    API.get("CoreAPI", "/auth/identityprovider", {
      queryStringParameters: {
        IdpIdentifier: email.split("@")[1],
      },
    })
      .then((res) => {
        if (!res.result || !res.result.providerName) {
          notification.error({
            message: "No corporate login configured for your email",
          })
        } else {
          Auth.federatedSignIn({ provider: res.result.providerName }).catch(
            console.error
          )
        }
      })
      .catch(console.error)
  }
  const forgotPassword = (email) => {
    return Auth.forgotPassword(email)
  }
  const forgotPasswordSubmit = (email, code, password) => {
    return Auth.forgotPasswordSubmit(email, code, password)
  }
  const completeNewPassword = (password) => {
    return Auth.completeNewPassword(state.user, password).then(() =>
      fetchUser()
    )
  }
  const changePassword = (oldPassword, newPassword) => {
    return Auth.changePassword(state.user, oldPassword, newPassword)
  }
  const resendSignUp = (email) => {
    return Auth.resendSignUp(email)
  }
  return {
    ...state,
    storeEmail,
    signOut,
    signIn,
    signUp,
    federatedLogin,
    forgotPassword,
    forgotPasswordSubmit,
    completeNewPassword,
    resendSignUp,
    changePassword,
  }
}
const bucketName =
  process.env[`REACT_APP_s3_${process.env.REACT_APP_ENVIRONMENT}_bucket_name`]
console.log("Bucketname", bucketName)
const amplifyConfig = {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_AWS_REGION || "eu-west-1",

    // Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,

    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID,

    // Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    oauth: {
      domain: process.env.REACT_APP_AUTH_DOMAIN,
      scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: process.env.REACT_APP_APP_HOST,
      redirectSignOut: process.env.REACT_APP_APP_HOST,
      responseType: "code",
    },
  },
  Storage: {
    AWSS3: {
      bucket: bucketName, //REQUIRED -  Amazon S3 bucket name
      region: "eu-west-1", //OPTIONAL -  Amazon service region
    },
  },
  API: {
    endpoints: [
      {
        name: "CoreAPI",
        endpoint: process.env.REACT_APP_API_URL,
        custom_header: () => {
          return Auth.currentSession()
            .then((user) => ({
              Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
              // Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
            }))
            .catch((e) => {
              console.error(e)
              return {}
            })
          // return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
        },
      },
    ],
  },
}
const axiosSetDefaults = (token, idToken) => {
  axios.defaults.headers.common["Authorization"] = idToken
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"
  axios.defaults.headers.post["Access-Control-Allow-Methods"] =
    "POST,GET,OPTIONS,DELETE,PUT"
  axios.defaults.headers.post["Content-Type"] = "application/json"
}
export default AuthProvider

export { amplifyConfig, AuthContext }
