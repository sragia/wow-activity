import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { CounterReducer } from './features/counter'
import { UserReducer } from './features/user'
import { rootEpics } from './features/epics'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  count: CounterReducer,
  user: UserReducer,
})

const epicMiddleware = createEpicMiddleware()

const store = createStore(rootReducer, applyMiddleware(epicMiddleware))

epicMiddleware.run(rootEpics)

export default store
