import { of } from 'rxjs'
import { mergeMap, filter, catchError } from 'rxjs/operators'
import { push } from 'connected-react-router'
import api from '../../../api/api'
import { UserActions } from '../actionTypes'
import { UserActionTypes } from '../types'

// Tries to get user profile
export function logoutUser(action$: any) {
  return action$.pipe(
    filter((action: UserActionTypes) => action.type === UserActions.Logout),
    mergeMap(() => {
      const res = api.logout()
      return res.pipe(
        mergeMap(() => {
          return of(
            {
              type: UserActions.SetUser,
              payload: null,
            },
            {
              type: UserActions.LogoutSuccess,
            },
            push('/')
          )
        }),
        catchError(() => {
          // do nothing
          return of({ type: UserActions.InitError })
        })
      )
    })
  )
}
