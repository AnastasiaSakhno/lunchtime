import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_USERS_MENU
})

export const loaded = ({ startDate, data }) => ({
  type: actionTypes.USERS_MENU_LOADED,
  startDate, data
})

export const submit = (userDayMenu) => ({
  type: actionTypes.SUBMIT_USER_DAY_MENU,
  userDayMenu
})

export const submittedSuccessfully = (userDayMenu) => ({
  type: actionTypes.USER_DAY_MENU_SUBMITTED_SUCCESSFULLY,
  userDayMenu
})
