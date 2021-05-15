import * as actionTypes from './actionTypes'
import * as selectors from './selectors'

let alertId = 0

export const getAlertId = () => {
  alertId += 1
  return alertId
}

export { default as AlertReducer } from './alertReducer'
export { actionTypes }
export { selectors }
