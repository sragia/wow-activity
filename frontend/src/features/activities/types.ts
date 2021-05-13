import { IActivityResult } from '../../interfaces/activities.interface'
import { ICharacter } from '../../interfaces/character.interface'
import { StatusType } from '../global-types'
import { ActivitiesActions } from './actionTypes'

interface GetActivitiesSuccessAction {
  type: typeof ActivitiesActions.GetActivitiesSuccess
  payload: IActivityResult[]
}

export type ActivitiesActionType = GetActivitiesSuccessAction

export interface SystemState {
  activities: {
    activities: IActivityResult[]
    status: StatusType
  }
}
