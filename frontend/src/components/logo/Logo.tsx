import React, { useEffect, useState } from 'react'
import { getRandomColor, InverseColor } from '../../helpers/color'

import styles from './styles.module.scss'

export const Logo = () => {
  const [color, setColor] = useState('#F1F2ED')

  useEffect(() => {
    setInterval(() => {
      setColor(getRandomColor())
    }, 1000)
  }, [])

  return (
    <div className={styles.logoWrapper}>
      <span className={styles.page}>wowactivity</span>
      <span
        className={styles.logo}
        style={{ backgroundColor: color, color: InverseColor(color) }}
      >
        sragia
      </span>
      <span>com</span>
    </div>
  )
}
