import * as actionTypes from '../actions/types'
import {removeProjectionMembers} from '../utils/api'
import {formattedDate} from '../utils/date'

export const initialState = {
  wholeWeekDuplication: {
    active: false
  }
}

const findMethod = (udm, action) => udm.id === action.userDayMenu.id
const withFormattedDate = (udm) => ({
  ...udm,
  date: formattedDate(udm.date)
})

const usersMenu = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.USERS_MENU_LOADED:
    return {
      ...state,
      startDate: action.startDate,
      data: action.userDayMenus
    }

  case actionTypes.USER_DAY_MENU_UPDATED_SUCCESSFULLY:
    let updated = removeProjectionMembers(action.userDayMenu, ['user', 'menu'])
    return {
      ...state,
      data: state.data.map((udm) => {
        if (findMethod(udm, action)) {
          return withFormattedDate(updated)
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
    gotten = withFormattedDate(gotten)
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

  case actionTypes.USER_DAY_MENU_CHANGED:
    return {
      ...state,
      wholeWeekDuplication: {
        ...action.userDayMenu
      }
    }


  default:
    return state
  }
}

export default usersMenu
