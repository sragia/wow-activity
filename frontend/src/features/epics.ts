import { combineEpics } from 'redux-observable'
import { loginAction } from './user/epics/login.epic'
import { getUserAction } from './user/epics/getuser.epic'
import { initUser } from './user/epics/init.epic'
import { logoutUser } from './user/epics/logout.epic'
import { getCharactersAction } from './character/epics/getCharacters.epic'
import { addCharacterAction } from './character/epics/addCharacter.epic'

export const rootEpics = combineEpics(
  loginAction,
  getUserAction,
  initUser,
  logoutUser,
  getCharactersAction,
  addCharacterAction
)
