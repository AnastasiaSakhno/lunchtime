import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_USERS
})

export const loaded = (users) => ({
  type: actionTypes.USERS_LOADED,
  users
})
