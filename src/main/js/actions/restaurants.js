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

export const remove = (restaurant) => ({
  type: actionTypes.REMOVE_RESTAURANT,
  restaurant
})

export const removedSuccessfully = (restaurant) => ({
  type: actionTypes.RESTAURANT_REMOVED_SUCCESSFULLY,
  restaurant
})

export const restore = (restaurant) => ({
  type: actionTypes.RESTORE_RESTAURANT,
  restaurant
})

export const restoredSuccessfully = (restaurant) => ({
  type: actionTypes.RESTAURANT_RESTORED_SUCCESSFULLY,
  restaurant
})
