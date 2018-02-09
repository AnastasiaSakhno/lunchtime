import * as actionTypes from '../actions/types'

const initialState = { token: null, email: null, full_name: null }

const auth = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...action }

    case actionTypes.LOGOUT_SUCCESS:
      return initialState

    default:
      return state
  }
}

export default auth
