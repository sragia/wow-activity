import { combineEpics } from 'redux-observable'
import { loginAction } from './user/epics/login.epic'
import { getUserAction } from './user/epics/getuser.epic'

export const rootEpics = combineEpics(loginAction, getUserAction)
