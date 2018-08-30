import * as actionTypes from './types'

export const alertChanged = (alert) => ({
  type: actionTypes.ALERT_CHANGED,
  alert
})
