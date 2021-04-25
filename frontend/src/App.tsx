import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { DashboardPage } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Logo } from './components/logo/Logo'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Logo />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
