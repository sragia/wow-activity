import { StatusType } from '../global-types'
import { ActivitiesActions } from './actionTypes'
import { ActivitiesHandler } from './types'

const initialState = {
  activities: [],
  status: StatusType.IDLE,
}

export default (state = initialState, action: ActivitiesHandler) => {
  switch (action.type) {
    case ActivitiesActions.GetActivitiesSuccess:
      return { ...state, activities: action.payload }
    case ActivitiesActions.SetStatus:
      return { ...state, status: action.payload }
    default:
      return state
  }
}
