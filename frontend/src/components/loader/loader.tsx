import React from 'react'
import { Transition } from 'react-transition-group'

import Loader from 'react-loader-spinner'
import clsx from 'clsx'
import styles from './styles.module.scss'

interface Props {
  show: boolean
  duration: number
  overlay?: boolean
  barColor?: string
}

export const Loading = ({ show, duration, overlay, barColor }: Props) => {
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

  return (
    <Transition in={show} timeout={duration}>
      {(state: string) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div
            className={clsx({
              [styles.loader]: true,
              [styles.overlay]: overlay,
            })}
          >
            <Loader type="Bars" color={barColor} height="50" width="50" />
          </div>
        </div>
      )}
    </Transition>
  )
}

Loading.defaultProps = {
  overlay: false,
  barColor: '#FE5E41',
}
