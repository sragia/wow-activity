import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { CounterReducer } from './features/counter'
import { UserReducer } from './features/user'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  count: CounterReducer,
  user: UserReducer
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
