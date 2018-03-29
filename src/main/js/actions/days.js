import * as actionTypes from './types'

export const load = (startDate) => ({
  type: actionTypes.LOAD_DAYS,
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

export const loaded = ({startDate, days}) => ({
  type: actionTypes.DAYS_LOADED,
  startDate, days
})

export const add = (menu) => ({
  type: actionTypes.ADD_DAY,
  menu
})

export const addedSuccessfully = (menu) => ({
  type: actionTypes.DAY_ADDED_SUCCESSFULLY,
  menu
})

export const update = (menu) => ({
  type: actionTypes.UPDATE_DAY,
  menu
})

export const updatedSuccessfully = (menu) => ({
  type: actionTypes.DAY_UPDATED_SUCCESSFULLY,
  menu
})
