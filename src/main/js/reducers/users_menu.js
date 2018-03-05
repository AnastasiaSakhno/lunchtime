import * as actionTypes from '../actions/types'

export const initialState = {}

const usersMenu = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.USERS_MENU_LOADED:
    return {
      ...state,
      startDate: action.startDate,
      data: action.data._embedded.userDayMenus
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
          return {
            ...udm,
            menu: {
              _links: {
                self: {
                  href: action.userDayMenu.menu
                }
              }
            }
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
