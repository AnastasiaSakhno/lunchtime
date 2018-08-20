import * as actionTypes from '../actions/types'

import {removeCollectionProjection} from '../utils/api'

export const initialState = []

const users = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.USERS_LOADED:
    let usersList = removeCollectionProjection(action, 'users')
    return [...usersList]

  default:
    return state
  }
}

export default users
