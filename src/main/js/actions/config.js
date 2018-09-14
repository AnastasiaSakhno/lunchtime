import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_CONFIG
})

export const loaded = (config) => ({
  type: actionTypes.CONFIG_LOADED,
  config
})
