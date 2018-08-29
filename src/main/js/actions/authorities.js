import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_AUTHORITIES
})

export const loaded = (authorities) => ({
  type: actionTypes.AUTHORITIES_LOADED,
  authorities
})
