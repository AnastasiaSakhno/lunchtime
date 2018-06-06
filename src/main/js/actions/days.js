import * as actionTypes from './types'

export const load = (startDate) => ({
  type: actionTypes.LOAD_DAYS,
  startDate
})

export const loadNextWeek = (startDate) => ({
  type: actionTypes.LOAD_NEXT_WEEK_DAYS,
  startDate
})

export const loadPrevWeek = (startDate) => ({
  type: actionTypes.LOAD_PREV_WEEK_DAYS,
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

export const gottenSuccessfully = (day) => ({
  type: actionTypes.DAY_GOTTEN_SUCCESSFULLY,
  day
})

export const addedSuccessfully = (day) => ({
  type: actionTypes.DAY_ADDED_SUCCESSFULLY,
  day
})

export const get = (day) => ({
  type: actionTypes.GET_DAY,
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
