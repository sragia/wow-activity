import { mergeMap, filter, map } from 'rxjs/operators'
import api from '../../../api/api'
import { UserActions } from '../actionTypes'
import { UserActionTypes } from '../types'

export function loginAction(action$: any) {
  return action$.pipe(
    filter((action: UserActionTypes) => action.type === UserActions.Login),
    mergeMap(({ payload }) => {
      const res = api.login(payload.username, payload.password)
      return res.pipe(
        map((response) => {
          return {
            type: UserActions.LoginSuccess,
            payload: { ...response.response, username: payload.username },
          }
        })
      )
    })
  )
}
