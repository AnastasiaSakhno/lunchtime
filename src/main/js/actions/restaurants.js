import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_RESTAURANTS
})

export const loaded = (restaurants) => ({
  type: actionTypes.RESTAURANTS_LOADED,
  restaurants
})

export const add = (restaurant) => ({
  type: actionTypes.ADD_RESTAURANT,
  restaurant
})

export const addedSuccessfully = (restaurant) => ({
  type: actionTypes.RESTAURANT_ADDED_SUCCESSFULLY,
  restaurant
})

export const update = (restaurant) => ({
  type: actionTypes.UPDATE_RESTAURANT,
  restaurant
})

export const updatedSuccessfully = (restaurant) => ({
  type: actionTypes.RESTAURANT_UPDATED_SUCCESSFULLY,
  restaurant
})
