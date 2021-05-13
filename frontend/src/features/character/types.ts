import { ICharacter } from '../../interfaces/character.interface'
import { StatusType } from '../global-types'
import { CharacterAction } from './actionTypes'

interface GetCharactersSuccessAction {
  type: typeof CharacterAction.GetCharactersSuccess
  payload: ICharacter[]
}

interface GetCharactersAction {
  type: typeof CharacterAction.GetCharacters
  payload: null
}

interface SetStatusAction {
  type: typeof CharacterAction.SetStatus
  payload: StatusType
}

interface AddCharacterAction {
  type: typeof CharacterAction.AddCharacter
  payload: { name: string; realm: string }
}

interface AddCharacterSuccessAction {
  type: typeof CharacterAction.AddCharacterSuccess
  payload: null
}

interface GetCharacterAction {
  type: typeof CharacterAction.GetCharacter
  payload: number
}

interface GetCharacterSuccessAction {
  type: typeof CharacterAction.GetCharacterSuccess
  payload: ICharacter
}

export type CharacterActionTypes =
  | GetCharactersSuccessAction
  | GetCharactersAction
  | SetStatusAction
  | AddCharacterAction
  | AddCharacterSuccessAction
  | GetCharacterAction
  | GetCharacterSuccessAction

export interface SystemState {
  character: {
    characters: ICharacter[]
    character: ICharacter
    status: StatusType
  }
}
