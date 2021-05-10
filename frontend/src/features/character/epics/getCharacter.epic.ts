import { concat, of } from 'rxjs'
import { mergeMap, filter, map } from 'rxjs/operators'
import api from '../../../api/api'
import { StatusType } from '../../global-types'
import { CharacterAction } from '../actionTypes'
import { CharacterActionTypes } from '../types'

export function getCharacterAction(action$: any) {
  return action$.pipe(
    filter(
      (action: CharacterActionTypes) =>
        action.type === CharacterAction.GetCharacter
    ),
    mergeMap(({ payload }) => {
      const res = api.getCharacter(payload)
      return concat(
        of({ type: CharacterAction.SetStatus, payload: StatusType.PENDING }),
        res.pipe(
          map((response) => {
            return {
              type: CharacterAction.GetCharacterSuccess,
              payload: response.response,
            }
          })
        ),
        of({ type: CharacterAction.SetStatus, payload: StatusType.SUCCESS })
      )
    })
  )
}
