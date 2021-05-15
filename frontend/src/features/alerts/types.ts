import msgCreator, { ActionHandler, ActionTypeMap } from 'action-typed'
import { AlertActions } from './actionTypes'
import { IAlert } from './alert.interface'

export const alertMessages = {
  [AlertActions.SetAlert]: (alert: IAlert) => alert,
  [AlertActions.ClearAlerts]: () => undefined,
  [AlertActions.DismissAlert]: (id: number) => id,
}

export const AlertMsg = msgCreator(alertMessages)
export type AlertHandler = ActionHandler<typeof alertMessages>
export type AlertTypeMap = ActionTypeMap<typeof alertMessages>

export interface SystemState {
  alerts: {
    alerts: IAlert[]
  }
}
