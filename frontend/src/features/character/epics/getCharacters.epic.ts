import { ofType } from 'redux-observable'
import { concat, of } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import api from '../../../api/api'
import { catchableSignOut } from '../../ajax'
import { StatusType } from '../../global-types'
import { CharacterAction } from '../actionTypes'
import { CharMsg } from '../types'

export function getCharactersAction(action$: any) {
  return action$.pipe(
    ofType(CharacterAction.GetCharacters),
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
          }),
          catchableSignOut((err) =>
            CharMsg(CharacterAction.AddCharacterError, err)
          )
        ),
        of({ type: CharacterAction.SetStatus, payload: StatusType.SUCCESS })
      )
    })
  )
}
