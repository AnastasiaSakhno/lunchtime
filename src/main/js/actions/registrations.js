import * as actionTypes from './types'

export const signup = (user) => ({
  type: actionTypes.SIGNUP,
  user
})

export const signupFailed = (status) => ({
  type: actionTypes.SIGNUP_FAILED,
  status
})
