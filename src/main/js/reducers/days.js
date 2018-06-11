import * as actionTypes from '../actions/types'
import {removeCollectionProjection, removeProjection} from '../utils/api'

export const initialState = {}

const findMethod = (day, action) => day.id === action.day.id

const days = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.DAYS_LOADED:
    let data = removeCollectionProjection(action, 'days')
    return {
      ...state,
      startDate: action.startDate,
      data: data
    }

  case actionTypes.DAY_ADDED_SUCCESSFULLY:
    let added = removeProjection(action.day)
    return {
      ...state,
      data: [
        ...state.data,
        added
      ]
    }

  case actionTypes.DAY_UPDATED_SUCCESSFULLY:
    return {
      ...state,
      data: state.data.map((day) => {
        if (findMethod(day, action)) {
          return {
            ...day,
            closed: action.day.closed
          }
        }
        return day
      })
    }

  case actionTypes.DAY_GOTTEN_SUCCESSFULLY:
    let gotten = removeProjection(action.day)
    let found = state.data.find((day) => findMethod(day, action))

    if(found) {
      return {
        ...state,
        data: state.data.map((day) => {
          if (findMethod(day, action)) {
            return gotten
          }
          return day
        })
      }
    }
    return {
      ...state,
      data: [
        ...state.data,
        gotten
      ]
    }

  default:
    return state
  }
}

export default days
