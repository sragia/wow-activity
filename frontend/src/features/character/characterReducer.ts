import { StatusType } from '../global-types'
import { CharacterAction } from './actionTypes'
import { CharacterActionTypes } from './types'

const initialState = {
  characters: [],
  status: StatusType.IDLE,
  character: null,
}

export default (state = initialState, action: CharacterActionTypes) => {
  switch (action.type) {
    case CharacterAction.GetCharactersSuccess:
      return { ...state, characters: action.payload }
    case CharacterAction.SetStatus:
      return { ...state, status: action.payload }
    case CharacterAction.GetCharacterSuccess:
      return { ...state, character: action.payload }
    default:
      return state
  }
}
