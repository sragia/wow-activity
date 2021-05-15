import { push } from 'connected-react-router'
import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import api from '../../../api/api'
import { catchableAlert } from '../../ajax'
import { UserActions } from '../actionTypes'
import { UserMsg } from '../types'

export function loginAction(action$: any) {
  return action$.pipe(
    ofType(UserActions.Login),
    mergeMap(({ payload }) => {
      const res = api.login(payload.username, payload.password)
      return res.pipe(
        mergeMap(() => {
          return of(
            UserMsg(UserActions.LoginSuccess, payload.username),
            push('/dashboard')
          )
        }),
        catchableAlert((err) => UserMsg(UserActions.LoginError, err))
      )
    })
  )
}
