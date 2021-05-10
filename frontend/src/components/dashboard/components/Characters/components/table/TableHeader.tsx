import React from 'react'

import styles from './styles.module.scss'

export const CharacterTableHeader = () => (
  <div className={styles.header}>
    <div className={styles.nameCol}>
      <span className={styles.col}>name</span>
    </div>
    <div className={styles.ilvlCol}>
      <span className={styles.col}>ilvl</span>
    </div>
    <div className={styles.guildCol}>
      <span className={styles.col}>guild</span>
    </div>
    <div className={styles.statusCol}>
      <span className={styles.col}>status</span>
    </div>
    <div className={styles.viewCol} />
  </div>
)
