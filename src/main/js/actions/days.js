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

export const add = (day) => ({
  type: actionTypes.ADD_DAY,
  day
})

export const addedSuccessfully = (day) => ({
  type: actionTypes.DAY_ADDED_SUCCESSFULLY,
  day
})

export const update = (day) => ({
  type: actionTypes.UPDATE_DAY,
  day
})

export const updatedSuccessfully = (day) => ({
  type: actionTypes.DAY_UPDATED_SUCCESSFULLY,
  day
})
