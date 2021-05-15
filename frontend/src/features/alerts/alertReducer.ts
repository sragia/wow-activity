import { AlertActions } from './actionTypes'
import { IAlert } from './alert.interface'
import { AlertHandler } from './types'

const initialState = {
  alerts: [],
}

let alertId = 0

export default (state = initialState, action: AlertHandler) => {
  switch (action.type) {
    case AlertActions.SetAlert:
      alertId += 1
      return {
        ...state,
        alerts: [
          ...state.alerts,
          { ...(action.payload as IAlert), id: alertId },
        ],
      }
    case AlertActions.DismissAlert:
      return {
        ...state,
        alerts: state.alerts.filter((a: IAlert) => a.id !== action.payload),
      }
    case AlertActions.ClearAlerts:
      return { ...state, alerts: [] }
    default:
      return state
  }
}
