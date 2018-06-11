import * as actionTypes from '../actions/types'
import {removeCollectionProjection, removeProjectionMembers} from '../utils/api'

export const initialState = {}

const findMethod = (udm, action) => udm.id === action.userDayMenu.id

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
    let added = removeProjectionMembers(action.userDayMenu, ['user', 'menu'])
    return {
      ...state,
      data: [
        ...state.data,
        added
      ]
    }

  case actionTypes.USER_DAY_MENU_UPDATED_SUCCESSFULLY:
    let updated = removeProjectionMembers(action.userDayMenu, ['user', 'menu'])
    return {
      ...state,
      data: state.data.map((udm) => {
        if (findMethod(udm, action)) {
          return updated
        }
        return udm
      })
    }

  case actionTypes.USER_DAY_MENU_OUT_UPDATED_SUCCESSFULLY:
    return {
      ...state,
      data: state.data.map((udm) => {
        if (findMethod(udm, action)) {
          return {
            ...udm,
            out: action.userDayMenu.out
          }
        }
        return udm
      })
    }

  case actionTypes.USER_DAY_MENU_GOTTEN_SUCCESSFULLY:
    let gotten = removeProjectionMembers(action.userDayMenu, ['user', 'menu'])
    let found = state.data.find((udm) => findMethod(udm, action))

    if (found) {
      return {
        ...state,
        data: state.data.map((udm) => {
          if (findMethod(udm, action)) {
            return gotten
          }
          return udm
        })
      }
    }
    return {
      ...state,
      data: [
        ...state.data,
        gotten
      ]
    }


  default:
    return state
  }
}

export default usersMenu
