import * as actionTypes from '../actions/types'

export const initialState = []

const users = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.USERS_LOADED:
    return [...action.users._embedded.users]

  case actionTypes.USER_ADDED_SUCCESSFULLY:
    return [
      ...state,
      action.user
    ]

  default:
    return state
  }
}

export default users
