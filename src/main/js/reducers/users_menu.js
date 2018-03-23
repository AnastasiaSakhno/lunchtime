import * as actionTypes from '../actions/types'
import {removeCollectionProjection} from '../utils/api'

export const initialState = {}

const usersMenu = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.USERS_MENU_LOADED:
    let data = removeCollectionProjection(action, 'userDayMenus', ['user', 'menu'])
    return {
      ...state,
      startDate: action.startDate,
      data: data
    }

  case actionTypes.USER_DAY_MENU_ADDED_SUCCESSFULLY:
    return {
      ...state,
      data: [
        ...state.data,
        action.userDayMenu
      ]
    }

  case actionTypes.USER_DAY_MENU_UPDATEED_SUCCESSFULLY:
    return {
      ...state,
      data: state.data.map((udm) => {
        if (udm.id === action.userDayMenu.id) {
          return action.userDayMenu
        }
        return udm
      })
    }

  case actionTypes.USER_DAY_MENU_OUT_UPDATEED_SUCCESSFULLY:
    return {
      ...state,
      data: state.data.map((udm) => {
        if (udm.id === action.userDayMenu.id) {
          return {
            ...udm,
            out: action.userDayMenu.out
          }
        }
        return udm
      })
    }


  default:
    return state
  }
}

export default usersMenu
