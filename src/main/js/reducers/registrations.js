import * as actionTypes from '../actions/types'

export const initialState = {error: null}

const errorMessage = (status) => {
  switch (status) {
  case 409:
    return 'User already exists'

  default:
    return 'Server error'
  }
}

const registrations = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SIGNUP_SUCCESS:
    return {...state, error: null}

  case actionTypes.SIGNUP_FAILED:
    return {...state, error: errorMessage(action.status)}

  default:
    return state
  }
}

export default registrations
