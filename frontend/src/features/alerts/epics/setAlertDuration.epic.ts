import { ofType } from 'redux-observable'
import { EMPTY, of } from 'rxjs'
import { delay, filter, mergeMap } from 'rxjs/operators'
import { AlertActions } from '../actionTypes'
import { AlertMsg } from '../types'

export function setAlertDurationEpic(action$: any) {
  return action$.pipe(
    ofType(AlertActions.SetAlert),
    filter((action: any) => Boolean(action.payload.duration)),
    mergeMap(({ payload }) => {
      if (payload.duration) {
        return of(AlertMsg(AlertActions.DismissAlert, payload.id)).pipe(
          delay(payload.duration)
        )
      }
      return EMPTY
    })
  )
}
