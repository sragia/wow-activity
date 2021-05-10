import { concat, of } from 'rxjs'
import { mergeMap, filter, map } from 'rxjs/operators'
import api from '../../../api/api'
import { StatusType } from '../../global-types'
import { CharacterAction } from '../actionTypes'
import { CharacterActionTypes } from '../types'

export function addCharacterAction(action$: any) {
  return action$.pipe(
    filter(
      (action: CharacterActionTypes) =>
        action.type === CharacterAction.AddCharacter
    ),
    mergeMap(({ payload }) => {
      const res = api.addCharacter({
        ...payload,
        realm: payload.realm.replace(' ', '-'),
      })
      return concat(
        of({ type: CharacterAction.SetStatus, payload: StatusType.PENDING }),
        res.pipe(
          map(() => {
            return {
              type: CharacterAction.GetCharacters,
            }
          })
        )
      )
    })
  )
}
