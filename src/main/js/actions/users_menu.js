import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_USERS_MENU
})

export const loaded = ({ startDate, data }) => ({
  type: actionTypes.USERS_MENU_LOADED,
  startDate, data
})

export const add = (userDayMenu) => ({
  type: actionTypes.ADD_USER_DAY_MENU,
  userDayMenu
})

export const addedSuccessfully = (userDayMenu) => ({
  type: actionTypes.USER_DAY_MENU_ADDED_SUCCESSFULLY,
  userDayMenu
})

export const update = (userDayMenu) => ({
  type: actionTypes.UPDATE_USER_DAY_MENU,
  userDayMenu
})

export const updatedSuccessfully = (userDayMenu) => ({
  type: actionTypes.USER_DAY_MENU_UPDATEED_SUCCESSFULLY,
  userDayMenu
})