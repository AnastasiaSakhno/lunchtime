import * as actionTypes from './types'

export const load = (startDate) => ({
  type: actionTypes.LOAD_USERS_MENU,
  startDate
})

export const loadNextWeek = (startDate) => ({
  type: actionTypes.LOAD_NEXT_WEEK,
  startDate
})

export const loadPrevWeek = (startDate) => ({
  type: actionTypes.LOAD_PREV_WEEK,
  startDate
})

export const loaded = ({startDate, userDayMenus}) => ({
  type: actionTypes.USERS_MENU_LOADED,
  startDate, userDayMenus
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

export const updateOut = (userDayMenu) => ({
  type: actionTypes.UPDATE_USER_DAY_MENU_OUT,
  userDayMenu
})

export const outUpdatedSuccessfully = (userDayMenu) => ({
  type: actionTypes.USER_DAY_MENU_OUT_UPDATEED_SUCCESSFULLY,
  userDayMenu
})
