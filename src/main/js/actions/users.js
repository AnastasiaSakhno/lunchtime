import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_USERS
})

export const loaded = (users) => ({
  type: actionTypes.USERS_LOADED,
  users
})

export const add = (user) => ({
  type: actionTypes.ADD_USER,
  user
})

export const addedSuccessfully = (user) => ({
  type: actionTypes.USER_ADDED_SUCCESSFULLY,
  user
})
