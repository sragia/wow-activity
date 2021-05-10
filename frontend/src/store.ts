import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { CounterReducer } from './features/counter'
import { UserReducer } from './features/user'
import { CharacterReducer } from './features/character'
import { rootEpics } from './features/epics'

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

const epicMiddleware = createEpicMiddleware()

const store = createStore(
  rootReducer(history),
  compose(applyMiddleware(routerMiddleware(history), epicMiddleware))
)

epicMiddleware.run(rootEpics)

export default store
