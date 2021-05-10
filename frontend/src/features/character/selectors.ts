import { SystemState } from './types'

export const getCharacters = (state: SystemState) => state.character.characters

export const getStatus = (state: SystemState) => state.character.status

export const getCharacter = (state: SystemState) => state.character.character
