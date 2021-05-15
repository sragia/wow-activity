import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { ConnectedRouter } from 'connected-react-router'

import { useDispatch } from 'react-redux'
import { DashboardPage } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Logo } from './components/logo/Logo'
import { history } from './store'
import { UserActions } from './features/user/actionTypes'

import './variables.global.scss'
import { Alert } from './components/alert/Alert'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: UserActions.Init })
  }, [])
  return (
    <BrowserRouter>
      <Logo />
      <Alert />
      <div className="container">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/dashboard" component={DashboardPage} />
          </Switch>
        </ConnectedRouter>
      </div>
    </BrowserRouter>
  )
}

export default App
