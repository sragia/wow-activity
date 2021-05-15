import { ofType } from 'redux-observable'
import { concat, of } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import api from '../../../api/api'
import { catchableSignOut } from '../../ajax'
import { StatusType } from '../../global-types'
import { ActivitiesActions } from '../actionTypes'
import { ActivitiesMsg } from '../types'

export function getActivitiesAction(action$: any) {
  return action$.pipe(
    ofType(ActivitiesActions.GetActivities),
    mergeMap(() => {
      const res = api.getActivities()
      return concat(
        of({ type: ActivitiesActions.SetStatus, payload: StatusType.PENDING }),
        res.pipe(
          map((response) => {
            return ActivitiesMsg(
              ActivitiesActions.GetActivitiesSuccess,
              response.response
            )
          }),
          catchableSignOut((err) =>
            ActivitiesMsg(ActivitiesActions.GetActivitiesError, err)
          )
        ),
        of({ type: ActivitiesActions.SetStatus, payload: StatusType.SUCCESS })
      )
    })
  )
}
