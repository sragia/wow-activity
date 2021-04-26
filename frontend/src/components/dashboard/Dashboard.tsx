import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import { Transition, CSSTransition } from 'react-transition-group'
import { Route } from 'react-router-dom'
import { selectors as userSelectors } from '../../features/user'

import styles from './styles.module.scss'
import './styles.global.scss'
import { Search } from './components/Search/Search'
import { Menu } from './components/Menu/Menu'
import { UserActions } from '../../features/user/actionTypes'
import { Characters } from './components/Characters/Characters'
import { Overview } from './components/Overview/Overview'

const duration = 400

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles: { [index: string]: any } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

const routes = [
  { path: '/dashboard/characters', name: 'characters', Component: Characters },
  { path: '/dashboard', name: 'overview', Component: Overview },
]

export const Dashboard = () => {
  const user = useSelector(userSelectors.getUser)
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch({ type: UserActions.Logout })
  }

  return (
    <>
      <Transition in={Boolean(user)} timeout={1000}>
        {(state: string) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div className={styles.dashboardWrapper}>
              {user && (
                <>
                  <div className={styles.nav}>
                    <span>logged</span>
                    <span className={styles.accent}>in</span>
                    <span>as</span>
                    <button
                      type="button"
                      onClick={() => setExpanded(!expanded)}
                      className={styles.username}
                    >
                      {user.username}
                    </button>
                    {expanded && (
                      <div className={styles.navDropdown}>
                        <button
                          type="button"
                          className={styles.option}
                          onClick={onLogout}
                        >
                          logout
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.body}>
                    <Search />
                    <div className={styles.content}>
                      <Menu />
                      {routes.map(({ path, Component }) => (
                        <Route key={path} exact path={path}>
                          {({ match }) => {
                            return (
                              <CSSTransition
                                in={match != null}
                                timeout={300}
                                classNames="switch"
                                unmountOnExit
                              >
                                <div
                                  className={['switch', styles.switch].join(
                                    ' '
                                  )}
                                >
                                  <Component />
                                </div>
                              </CSSTransition>
                            )
                          }}
                        </Route>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Transition>
      {!user && (
        <div className={styles.loader}>
          <Loader type="Bars" color="#FE5E41" height="50" width="50" />
        </div>
      )}
    </>
  )
}
