import * as actionTypes from './types'

export const saveAuthData = (authToken) => ({
  type: actionTypes.SAVE_AUTH_DATA,
  authToken
})

export const login = (user) => ({
  type: actionTypes.LOGIN,
  user
})

export const loggedInSuccessfully = (data) => ({
  type: actionTypes.LOGIN_SUCCESS,
  data
})

export const loginFailed = (error) => ({
  type: actionTypes.LOGIN_FAILED,
  error
})

export const googleAuthSuccessfully = (data) => ({
  type: actionTypes.GOOGLE_AUTH_SUCCESSFULLY,
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

export const signup = (user) => ({
  type: actionTypes.SIGNUP,
  user
})

export const signupFailed = (status) => ({
  type: actionTypes.SIGNUP_FAILED,
  status
})
