import * as actionTypes from '../actions/types'

import {removeCollectionProjection} from '../utils/api'

export const initialState = []

const users = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.USERS_LOADED:
    let usersList = removeCollectionProjection(action, 'users')
    return [...usersList]

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
