import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { CounterReducer } from './features/counter'
import { UserReducer } from './features/user'
import { CharacterReducer } from './features/character'
import { rootEpics } from './features/epics'
import { UserActions } from './features/user/actionTypes'

/* eslint-disable import/no-extraneous-dependencies */
export const history = createBrowserHistory()
/* Create root reducer, containing all features of the application */
const rootReducer = (his: any) =>
  combineReducers({
    count: CounterReducer,
    user: UserReducer,
    character: CharacterReducer,
    router: connectRouter(his),
  })

const resetEnhancer = (rootRed: any) => (state: any, action: any) => {
  if (action.type !== UserActions.LogoutSuccess) {
    return rootRed(state, action)
  }

  const newState = rootRed(undefined, {})
  newState.routed = state.router
  return newState
}

const epicMiddleware = createEpicMiddleware()

const store = createStore(
  resetEnhancer(rootReducer(history)),
  compose(applyMiddleware(routerMiddleware(history), epicMiddleware))
)

epicMiddleware.run(rootEpics)

export default store
