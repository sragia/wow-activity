import { of } from 'rxjs'
import { mergeMap, filter, catchError } from 'rxjs/operators'
import { push } from 'connected-react-router'
import api from '../../../api/api'
import { UserActions } from '../actionTypes'
import { UserActionTypes } from '../types'

// Tries to get user profile
export function initUser(action$: any) {
  return action$.pipe(
    filter((action: UserActionTypes) => action.type === UserActions.Init),
    mergeMap(() => {
      const res = api.selfProfile()
      return res.pipe(
        mergeMap((response) => {
          return of({
            type: UserActions.SetUser,
            payload: response.response,
          })
        }),
        catchError(() => {
          // do nothing
          return of({ type: UserActions.InitError }, push('/'))
        })
      )
    })
  )
}
