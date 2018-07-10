import * as actionTypes from '../actions/types'

export const initialState = { error: null, email: null, fullName: null, token: null }

const auth = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.LOGIN_FAILED:
    return { ...state, error: action.error }

  case actionTypes.LOGGED_IN_SUCCESSFULLY:
    return { ...state, token: action.data.token, email: action.data.email, fullName: action.data.fullName }

  default:
    return state
  }
}

export default auth
