import { ICharacter } from '../../interfaces/character.interface'
import { StatusType } from '../global-types';
import { CharacterAction } from './actionTypes'

interface GetCharactersSuccessAction {
  type: typeof CharacterAction.GetCharactersSuccess
  payload: ICharacter[]
}

interface GetCharactersAction {
  type: typeof CharacterAction.GetCharacters,
  payload: null
}

interface SetStatusAction {
  type: typeof CharacterAction.SetStatus,
  payload: StatusType
}

interface AddCharacterAction {
  type: typeof CharacterAction.SetStatus,
  payload: { name: string, realm: string }
}

interface AddCharacterSuccessAction {
  type: typeof CharacterAction.SetStatus,
  payload: null
}

export type CharacterActionTypes =
  GetCharactersSuccessAction |
  GetCharactersAction |
  SetStatusAction |
  AddCharacterAction |
  AddCharacterSuccessAction

export interface SystemState {
  character: {
    characters: ICharacter[];
    status: StatusType;
  }
}
