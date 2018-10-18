import * as actionTypes from '../actions/types'
import {updateStoreItemMethod} from './index'

export const initialState = []

const menus = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.MENU_LOADED:
    return action.menus

  case actionTypes.MENU_ADDED_SUCCESSFULLY:
    return [
      ...state,
      action.menu
    ]

  case actionTypes.MENU_UPDATED_SUCCESSFULLY:
    return state.map((m) => updateStoreItemMethod(m, action.menu))

  default:
    return state
  }
}

export default menus
