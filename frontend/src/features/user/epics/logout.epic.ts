import { of } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'
import { push } from 'connected-react-router'
import { ofType } from 'redux-observable'
import api from '../../../api/api'
import { UserActions } from '../actionTypes'

// Tries to get user profile
export function logoutUser(action$: any) {
  return action$.pipe(
    ofType(UserActions.Logout),
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
