import * as actionTypes from '../actions/types'

export const initialState = { error: null, email: null, token: null }

const auth = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.LOGIN_SUCCESS:
    return { ...state, error: null }

  case actionTypes.LOGIN_FAILED:
    return { ...state, error: action.error }

  case actionTypes.GOOGLE_AUTH_SUCCESSFULLY:
    return { ...state, token: action.data.token, email: action.data.email }

  default:
    return state
  }
}

export default auth
