import { mergeMap, filter, map, delay } from 'rxjs/operators'
import api from '../../../api/api'
import { UserActions } from '../actionTypes'
import { UserActionTypes } from '../types'

export function getUserAction(action$: any) {
  return action$.pipe(
    filter(
      (action: UserActionTypes) => action.type === UserActions.LoginSuccess
    ),
    delay(1500),
    mergeMap(({ payload }) => {
      const res = api.profile(payload.username)
      return res.pipe(
        map((response) => {
          return {
            type: UserActions.SetUser,
            payload: response.response,
          }
        })
      )
    })
  )
}
