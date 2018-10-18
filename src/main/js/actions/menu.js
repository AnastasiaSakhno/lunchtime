import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_MENU
})

export const loaded = (menus) => ({
  type: actionTypes.MENU_LOADED,
  menus
})

export const add = (menu) => ({
  type: actionTypes.ADD_MENU,
  menu
})

export const addedSuccessfully = (menu) => ({
  type: actionTypes.MENU_ADDED_SUCCESSFULLY,
  menu
})

export const update = (menu) => ({
  type: actionTypes.UPDATE_MENU,
  menu
})

export const updatedSuccessfully = (menu) => ({
  type: actionTypes.MENU_UPDATED_SUCCESSFULLY,
  menu
})
