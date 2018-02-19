import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_MENU
})

export const loaded = (menu) => ({
  type: actionTypes.MENU_LOADED,
  menu
})

export const add = (menu) => ({
  type: actionTypes.ADD_MENU,
  menu
})

export const addedSuccessfully = (menu) => ({
  type: actionTypes.MENU_ADDED_SUCCESSFULLY,
  menu
})

export const remove = (menu) => ({
  type: actionTypes.REMOVE_MENU,
  menu
})

export const removedSuccessfully = (menu) => ({
  type: actionTypes.MENU_REMOVED_SUCCESSFULLY,
  menu
})
