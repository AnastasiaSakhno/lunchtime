import * as actionTypes from '../actions/types'

export const initialState = []

const restaurants = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.RESTAURANTS_LOADED:
    return [...action.restaurants._embedded.restaurants]

  case actionTypes.RESTAURANT_ADDED_SUCCESSFULLY:
    return [
      ...state,
      action.restaurant
    ]

  case actionTypes.RESTAURANT_REMOVED_SUCCESSFULLY:
    return state.map((restaurant) => {
      if (restaurant.id === action.restaurant.id) {
        return { ...restaurant, archive: true }
      }
      return restaurant
    })

  default:
    return state
  }
}

export default restaurants
