import * as actionTypes from '../actions/types'
import {removeCollectionProjection, removeProjection} from '../utils/api'

export const initialState = []

const authorities = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.AUTHORITIES_LOADED:
    return removeCollectionProjection(action, 'authorities')

  default:
    return state
  }
}

export default authorities
