import React from 'react'

import styles from './styles.module.scss'

export const Characters = () => {
  // const [characters, setCharacters] = useState([])

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <button type="button">
          add<span className={styles.accent}>character</span>
        </button>
      </div>
    </div>
  )
}
