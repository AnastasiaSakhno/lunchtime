import * as actionTypes from '../actions/types'
import { groupBy } from 'ramda'

export const initialState = []

const usersMenu = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.USERS_MENU_LOADED:
    let groupedByDate = groupBy(udm => udm.date)(action.data._embedded.userDayMenus)

    return [...groupedByDate]

  case actionTypes.USER_DAY_MENU_SUBMITTED_SUCCESSFULLY:
    const findMethod = (udm) =>
      udm.date === action.userDayMenu.date
      && udm.user.href === action.userDayMenu.user.href

    let found = state.find(findMethod)

    if(found) {
      return state.map((udm) => {
        if (findMethod(udm)) {
          return { ...udm }
        }
        return udm
      })
    }

    return [
      ...state,
      action.userDayMenu
    ]


  default:
    return state
  }
}

export default usersMenu
