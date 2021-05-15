import msgCreator, { ActionHandler, ActionTypeMap } from 'action-typed'
import { IActivityResult } from '../../interfaces/activities.interface'
import { characterMessages } from '../character/types'
import { StatusType } from '../global-types'
import { ActivitiesActions } from './actionTypes'

export const activitiesMessages = {
  [ActivitiesActions.GetActivities]: () => undefined,
  [ActivitiesActions.GetActivitiesSuccess]: (activities: IActivityResult[]) =>
    activities,
  [ActivitiesActions.SetStatus]: (status: StatusType) => status,
  [ActivitiesActions.GetActivitiesError]: (err: string) => err,
}

export const ActivitiesMsg = msgCreator(activitiesMessages)
export type ActivitiesHandler = ActionHandler<typeof activitiesMessages>
export type ActivitiesTypeMap = ActionTypeMap<typeof characterMessages>

export interface SystemState {
  activities: {
    activities: IActivityResult[]
    status: StatusType
  }
}
