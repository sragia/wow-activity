import { SystemState } from './types'

export const getCharacters = (state: SystemState) => state.character.characters

export const getStatus = (state: SystemState) => state.character.status
