import { concat, of } from 'rxjs'
import { mergeMap, filter, map, delay } from 'rxjs/operators'
import api from '../../../api/api'
import { StatusType } from '../../global-types'
import { CharacterAction } from '../actionTypes'
import { CharacterActionTypes } from '../types'

export function getCharactersAction(action$: any) {
  return action$.pipe(
    filter(
      (action: CharacterActionTypes) =>
        action.type === CharacterAction.GetCharacters
    ),
    delay(1000), // TODO: Remove
    mergeMap(() => {
      const res = api.getCharacters()
      return concat(
        of({ type: CharacterAction.SetStatus, payload: StatusType.PENDING }),
        res.pipe(
          map((response) => {
            return {
              type: CharacterAction.GetCharactersSuccess,
              payload: response.response,
            }
          })
        ),
        of({ type: CharacterAction.SetStatus, payload: StatusType.SUCCESS })
      )
    })
  )
}
