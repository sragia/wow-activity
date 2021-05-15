import { of } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'
import { push } from 'connected-react-router'
import { ofType } from 'redux-observable'
import api from '../../../api/api'
import { UserActions } from '../actionTypes'

// Tries to get user profile
export function initUser(action$: any) {
  return action$.pipe(
    ofType(UserActions.Init),
    mergeMap(() => {
      const res = api.selfProfile()
      return res.pipe(
        mergeMap((response) => {
          if (window.location.pathname === '/') {
            return of(
              {
                type: UserActions.SetUser,
                payload: response.response,
              },
              push('/dashboard')
            )
          }
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
