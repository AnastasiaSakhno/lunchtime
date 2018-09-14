import * as actionTypes from '../actions/types'

export const initialState = {}

const config = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CONFIG_LOADED:
    return action.config

  default:
    return state
  }
}

export default config
