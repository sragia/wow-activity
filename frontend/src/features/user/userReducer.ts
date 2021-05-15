import { UserActions } from './actionTypes'
import { UserHandler } from './types'

const initialState = {
  user: null,
}

export default (state = initialState, action: UserHandler) => {
  switch (action.type) {
    case UserActions.SetUser:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
