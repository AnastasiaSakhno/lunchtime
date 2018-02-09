import * as actionTypes from './types'

export const login = (user) => ({
  type: actionTypes.LOGIN,
  user
})

export const loginSuccess = (user, data) => ({
  type: actionTypes.LOGIN_SUCCESS,
  user, data
})

export const logout = () => ({
  type: actionTypes.LOGOUT
})

export const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
})
