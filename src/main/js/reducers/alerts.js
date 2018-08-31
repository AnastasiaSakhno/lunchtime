import * as actionTypes from '../actions/types'

export const initialState = { danger: null, warning: null, info: null, success: null }

const auth = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.ALERT_CHANGED:
    return { ...initialState, ...action.alert }

  default:
    return state
  }
}

export default auth
