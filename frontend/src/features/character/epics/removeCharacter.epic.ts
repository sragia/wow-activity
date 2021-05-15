import { ofType } from 'redux-observable'
import { concat, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import api from '../../../api/api'
import { catchableAlert, catchableSignOut } from '../../ajax'
import { getAlertId } from '../../alerts'
import { AlertActions } from '../../alerts/actionTypes'
import { AlertType } from '../../alerts/alert.interface'
import { AlertMsg } from '../../alerts/types'
import { StatusType } from '../../global-types'
import { CharacterAction } from '../actionTypes'
import { CharMsg } from '../types'

export function removeCharacterAction(action$: any) {
  return action$.pipe(
    ofType(CharacterAction.RemoveCharacter),
    mergeMap(({ payload }) => {
      const res = api.removeCharacter(payload)
      return concat(
        of({ type: CharacterAction.SetStatus, payload: StatusType.PENDING }),
        res.pipe(
          mergeMap((result) => {
            return of(
              AlertMsg(AlertActions.SetAlert, {
                text: `Successfully removed character`,
                type: AlertType.SUCCESS,
                duration: 3000,
                id: getAlertId(),
              }),
              CharMsg(CharacterAction.RemoveCharacterSuccess, result.response)
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
