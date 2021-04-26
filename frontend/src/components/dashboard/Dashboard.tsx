import React from 'react'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import { Transition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import { selectors as userSelectors } from '../../features/user'

import styles from './styles.module.scss'
import { Search } from './components/Search/Search'
import { Menu } from './components/Menu/Menu'

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

export const Dashboard = () => {
  const user = useSelector(userSelectors.getUser)

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
                    <span className={styles.username}>{user.username}</span>
                  </div>
                  <div className={styles.body}>
                    <Search />
                    <div className={styles.content}>
                      <Menu />
                      <Switch>
                        <Route path="/dashboard/characters" exact />
                      </Switch>
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
