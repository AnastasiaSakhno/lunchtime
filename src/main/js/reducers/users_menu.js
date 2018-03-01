import * as actionTypes from '../actions/types'

export const initialState = {}

const usersMenu = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USERS_MENU_LOADED:
      return {
        ...state,
        startDate: action.startDate,
        data: action.data
      }

    case actionTypes.USER_DAY_MENU_SUBMITTED_SUCCESSFULLY:
      const findMethod = (udm) =>
        udm.date === action.userDayMenu.date
        && udm.user.href === action.userDayMenu.user.href

      let found = state.find(findMethod)

      if (found) {
        return state.map((udm) => {
          if (findMethod(udm)) {
            return {...udm}
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
