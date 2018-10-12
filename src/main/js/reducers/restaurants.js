import * as actionTypes from '../actions/types'
import {updateStoreItemMethod} from './index'

export const initialState = []

const restaurants = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.RESTAURANTS_LOADED:
    return action.restaurants._embedded.restaurants

  case actionTypes.RESTAURANT_ADDED_SUCCESSFULLY:
    return [
      ...state,
      action.restaurant
    ]

  case actionTypes.RESTAURANT_REMOVED_SUCCESSFULLY:
    return state.map((r) => updateStoreItemMethod(r, action.restaurant))

  case actionTypes.RESTAURANT_RESTORED_SUCCESSFULLY:
    return state.map((r) => updateStoreItemMethod(r, action.restaurant))

  default:
    return state
  }
}

export default restaurants
