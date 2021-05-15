import { StatusType } from '../global-types'
import { CharacterAction } from './actionTypes'
import { CharHandler } from './types'

const initialState = {
  characters: [],
  status: StatusType.IDLE,
  character: null,
}

export default (state = initialState, action: CharHandler) => {
  switch (action.type) {
    case CharacterAction.GetCharactersSuccess:
      return { ...state, characters: action.payload }
    case CharacterAction.SetStatus:
      return { ...state, status: action.payload }
    case CharacterAction.GetCharacterSuccess:
      return { ...state, character: action.payload }
    case CharacterAction.RemoveCharacterSuccess:
      return {
        ...state,
        characters: action.payload,
        status: StatusType.SUCCESS,
      }
    default:
      return state
  }
}
