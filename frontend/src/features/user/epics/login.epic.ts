import { of } from 'rxjs'
import { mergeMap, filter } from 'rxjs/operators'
import api from '../../../api/api'
import { UserActions } from '../actionTypes'
import { UserActionTypes } from '../types'

export function login(action$: any) {
  return action$.pipe(
    filter((action: UserActionTypes) => action.type === UserActions.Login),
    mergeMap(async ({ payload }) => {
      const res = await api.login(payload.username, payload.password)
      console.log(res)
      return of({ type: UserActions.LoginSuccess, payload: {} })
    })
  )
}
