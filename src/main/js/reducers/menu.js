import * as actionTypes from '../actions/types'
import {removeCollectionProjection} from '../utils/api'

export const initialState = []

const menus = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.MENU_LOADED:
    let menu = removeCollectionProjection(action, 'menus')
    return [...menu]

  case actionTypes.MENU_ADDED_SUCCESSFULLY:
    return [
      ...state,
      action.menu
    ]

  case actionTypes.MENU_REMOVED_SUCCESSFULLY:
    return state.map((menu) => {
      if (menu.id === action.menu.id) {
        return { ...menu, archive: true }
      }
      return menu
    })

  default:
    return state
  }
}

export default menus
