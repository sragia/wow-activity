import { ofType } from 'redux-observable'
import { mergeMap, map, delay } from 'rxjs/operators'
import api from '../../../api/api'
import { catchableSignOut } from '../../ajax'
import { UserActions } from '../actionTypes'
import { UserMsg } from '../types'

export function getUserAction(action$: any) {
  return action$.pipe(
    ofType(UserActions.LoginSuccess),
    delay(1500),
    mergeMap(({ payload }) => {
      const res = api.profile(payload)
      return res.pipe(
        map((response) => {
          return {
            type: UserActions.SetUser,
            payload: response.response,
          }
        }),
        catchableSignOut((err) => UserMsg(UserActions.LoginError, err))
      )
    })
  )
}
