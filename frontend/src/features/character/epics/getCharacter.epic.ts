import { ofType } from 'redux-observable'
import { concat, of } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import api from '../../../api/api'
import { catchableSignOut } from '../../ajax'
import { StatusType } from '../../global-types'
import { CharacterAction } from '../actionTypes'
import { CharMsg } from '../types'

export function getCharacterAction(action$: any) {
  return action$.pipe(
    ofType(CharacterAction.GetCharacter),
    mergeMap(({ payload }) => {
      const res = api.getCharacter(payload)
      return concat(
        of({ type: CharacterAction.SetStatus, payload: StatusType.PENDING }),
        res.pipe(
          map((response) => {
            return CharMsg(
              CharacterAction.GetCharacterSuccess,
              response.response
            )
          }),
          catchableSignOut((err) =>
            CharMsg(CharacterAction.GetCharacterError, err)
          )
        ),
        of({ type: CharacterAction.SetStatus, payload: StatusType.SUCCESS })
      )
    })
  )
}
