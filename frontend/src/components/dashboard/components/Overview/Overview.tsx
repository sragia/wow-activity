import React from 'react'
import { Activities } from './components/Activities/Activities'

import styles from './styles.module.scss'

export const Overview = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <Activities />
      </div>
    </div>
  )
}
