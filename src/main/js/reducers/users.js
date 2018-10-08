import * as actionTypes from '../actions/types'

export const initialState = []

const users = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.USERS_LOADED:
    return action.users

  case actionTypes.USER_UPDATED_SUCCESSFULLY:
    return state.map((user) => {
      if (user.id === action.user.id) {
        return action.user
      }
      return user
    })

  default:
    return state
  }
}

export default users
