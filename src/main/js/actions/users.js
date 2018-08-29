import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_USERS
})

export const loaded = (users) => ({
  type: actionTypes.USERS_LOADED,
  users
})

export const update = (user) => ({
  type: actionTypes.UPDATE_USER,
  user
})

export const updatedSuccessfully = (user) => ({
  type: actionTypes.USER_UPDATED_SUCCESSFULLY,
  user
})
