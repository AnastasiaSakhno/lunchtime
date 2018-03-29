import * as actionTypes from '../actions/types'
import {removeCollectionProjection, removeProjection} from '../utils/api'

export const initialState = {}

const days = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.DAYS_LOADED:
    let data = removeCollectionProjection(action, 'days')
    return {
      ...state,
      startDate: action.startDate,
      data: data
    }

  case actionTypes.DAY_ADDED_SUCCESSFULLY:
    let added = removeProjection(action.userDayMenu)
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
        if (day.id === action.day.id) {
          return {
            ...day,
            closed: action.day.closed
          }
        }
        return day
      })
    }

  default:
    return state
  }
}

export default days
