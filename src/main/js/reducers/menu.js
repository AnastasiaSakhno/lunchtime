import * as actionTypes from '../actions/types'
import {removeCollectionProjection} from '../utils/api'
import {changeArchiveMethod} from './index'

export const initialState = []

const menus = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.MENU_LOADED:
    return removeCollectionProjection(action, 'menus')

  case actionTypes.MENU_ADDED_SUCCESSFULLY:
    return [
      ...state,
      action.menu
    ]

  case actionTypes.MENU_REMOVED_SUCCESSFULLY:
    return state.map((m) => changeArchiveMethod(m, action.menu.id))

  case actionTypes.MENU_RESTORED_SUCCESSFULLY:
    return state.map((m) => changeArchiveMethod(m, action.menu.id))

  default:
    return state
  }
}

export default menus
