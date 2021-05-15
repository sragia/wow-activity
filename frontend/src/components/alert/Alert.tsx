import clsx from 'clsx'
import React, { CSSProperties } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Transition } from 'react-transition-group'
import { selectors } from '../../features/alerts'
import { AlertActions } from '../../features/alerts/actionTypes'
import { IAlert } from '../../features/alerts/alert.interface'
import { AlertMsg } from '../../features/alerts/types'

import styles from './styles.module.scss'

const duration = 200

const defaultStyle: CSSProperties = {
  position: 'fixed',
  top: -200,
  margin: '0 auto',
  opacity: 0,
  transform: 'translateX(-50%)',
  left: '50%',
  zIndex: 99990,
}

const transitionStyles: { [index: string]: CSSProperties } = {
  entering: {},
  entered: {
    top: 20,
    opacity: 1,
    transition: `all ${duration}ms ease-in-out`,
  },
  exiting: {
    top: -50,
    opacity: 0,
    transition: `all ${duration}ms ease-in-out`,
  },
  exited: {
    opacity: 0,
    top: -50,
  },
  unmounted: {
    opacity: 0,
    pointerEvents: 'none',
  },
}

export const Alert = () => {
  const alerts = useSelector(selectors.getAlerts)
  const dispatch = useDispatch()
  const hideAlert = (alert: IAlert) => {
    return () => dispatch(AlertMsg(AlertActions.DismissAlert, alert.id!))
  }

  return (
    <Transition in={Boolean(alerts.length)} timeout={duration}>
      {(state) => {
        return (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {alerts.map((alert) => (
              <div
                className={clsx(styles.alertItem, styles[alert.type])}
                key={alert.id}
              >
                <span>{alert.text}</span>
                <button type="button" onClick={hideAlert(alert)}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.25 6.75L6.75 17.25"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.75 6.75L17.25 17.25"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )
      }}
    </Transition>
  )
}
