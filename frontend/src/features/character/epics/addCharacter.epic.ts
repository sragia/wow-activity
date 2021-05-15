import { ofType } from 'redux-observable'
import { concat, of } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import api from '../../../api/api'
import { catchableAlert, catchableSignOut } from '../../ajax'
import { getAlertId } from '../../alerts'
import { AlertActions } from '../../alerts/actionTypes'
import { AlertType } from '../../alerts/alert.interface'
import { AlertMsg } from '../../alerts/types'
import { StatusType } from '../../global-types'
import { CharacterAction } from '../actionTypes'
import { CharMsg } from '../types'

export function addCharacterAction(action$: any) {
  return action$.pipe(
    ofType(CharacterAction.AddCharacter),
    mergeMap(({ payload }) => {
      const res = api.addCharacter({
        ...payload,
        realm: payload.realm.replace(' ', '-'),
      })
      return concat(
        of({ type: CharacterAction.SetStatus, payload: StatusType.PENDING }),
        res.pipe(
          map(() => {
            return of(
              AlertMsg(AlertActions.SetAlert, {
                text: `Successfully added ${payload.name}-${payload.realm}`,
                type: AlertType.SUCCESS,
                id: getAlertId(),
              }),
              CharMsg(CharacterAction.GetCharacters)
            )
          }),
          catchableAlert(() =>
            CharMsg(CharacterAction.SetStatus, StatusType.ERROR)
          ),
          catchableSignOut((err) =>
            CharMsg(CharacterAction.AddCharacterError, err)
          )
        )
      )
    })
  )
}
