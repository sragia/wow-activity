import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import styles from './styles.module.scss'

const MENU_ITEMS = [
  {
    name: <span>overview</span>,
    url: '/dashboard',
  },
  {
    name: <span>characters</span>,
    url: '/dashboard/characters',
  },
]

export const Menu = () => {
  const location = useLocation()
  return (
    <div className={styles.menuWrapper}>
      {MENU_ITEMS.map((item) => (
        <Link
          to={item.url}
          className={location.pathname === item.url ? styles.active : undefined}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
