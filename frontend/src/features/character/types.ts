import msgCreator, { ActionHandler, ActionTypeMap } from 'action-typed'
import { ICharacter } from '../../interfaces/character.interface'
import { StatusType } from '../global-types'
import { CharacterAction } from './actionTypes'

export const characterMessages = {
  [CharacterAction.AddCharacter]: (name: string, realm: string) => ({
    name,
    realm,
  }),
  [CharacterAction.AddCharacterSuccess]: () => undefined,
  [CharacterAction.AddCharacterError]: (err: string) => err,
  [CharacterAction.GetCharacter]: (id: number) => id,
  [CharacterAction.GetCharacterError]: (err: string) => err,
  [CharacterAction.GetCharacterSuccess]: (character: ICharacter) => character,
  [CharacterAction.GetCharacters]: () => undefined,
  [CharacterAction.GetCharactersSuccess]: (characters: ICharacter[]) =>
    characters,
  [CharacterAction.GetCharacterError]: (err: string) => err,
  [CharacterAction.SetStatus]: (status: StatusType) => status,
}

export const CharMsg = msgCreator(characterMessages)
export type CharHandler = ActionHandler<typeof characterMessages>
export type CharTypeMap = ActionTypeMap<typeof characterMessages>

export interface SystemState {
  character: {
    characters: ICharacter[]
    character: ICharacter
    status: StatusType
  }
}
