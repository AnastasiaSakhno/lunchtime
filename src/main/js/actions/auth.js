import * as actionTypes from './types'

export const saveAuthData = (authToken) => ({
  type: actionTypes.SAVE_AUTH_DATA,
  authToken
})

export const loggedInSuccessfully = (data) => ({
  type: actionTypes.LOGGED_IN_SUCCESSFULLY,
  data
})

export const googleAuthFailed = (data) => ({
  type: actionTypes.GOOGLE_AUTH_FAILED,
  data
})

export const logout = () => ({
  type: actionTypes.LOGOUT
})

export const logoutSuccessfully = () => ({
  type: actionTypes.LOGOUT_SUCCESSFULLY
})
