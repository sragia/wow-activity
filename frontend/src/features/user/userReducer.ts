import { UserActions } from './actionTypes'
import { UserActionTypes } from './types'

const initialState = {
  user: null,
}

export default (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case UserActions.SetUser:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
