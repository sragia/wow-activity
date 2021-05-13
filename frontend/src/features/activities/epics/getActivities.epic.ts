import { concat, of } from 'rxjs'
import { mergeMap, filter, map } from 'rxjs/operators'
import api from '../../../api/api'
import { StatusType } from '../../global-types'
import { ActivitiesActions } from '../actionTypes'
import { ActivitiesActionType } from '../types'

export function getActivitiesAction(action$: any) {
  return action$.pipe(
    filter(
      (action: ActivitiesActionType) =>
        action.type === ActivitiesActions.GetActivities
    ),
    mergeMap(() => {
      const res = api.getActivities()
      return concat(
        of({ type: ActivitiesActions.SetStatus, payload: StatusType.PENDING }),
        res.pipe(
          map((response) => {
            return {
              type: ActivitiesActions.GetActivitiesSuccess,
              payload: response.response,
            }
          })
        ),
        of({ type: ActivitiesActions.SetStatus, payload: StatusType.SUCCESS })
      )
    })
  )
}
