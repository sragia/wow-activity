import { combineEpics } from 'redux-observable'
import { login } from './user/epics/login.epic'

export const rootEpics = combineEpics(login)
