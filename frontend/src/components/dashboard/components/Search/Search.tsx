import React, { useState } from 'react'

import styles from './styles.module.scss'

export const Search = () => {
  const [value, setValue] = useState<string>('')
  const onChange = ({ target }: any) => {
    setValue(target.value)
  }

  const onClick = () => {
    // console.log(value)
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.input}>
        <button type="button" onClick={onClick} className={styles.searchBtn}>
          search
        </button>
        <input onChange={onChange} />
        {!value && (
          <span className={styles.placeholder}>
            character<span className={styles.phBlock}>name</span>
          </span>
        )}
      </div>
    </div>
  )
}
