import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import { getIlvlColor } from '../../../../../../helpers/ilvl'
import { ICharacter } from '../../../../../../interfaces/character.interface'

import styles from './styles.module.scss'

type Props = {
  char: ICharacter
}

export const CharacterTableRow = ({ char }: Props) => (
  <div className={styles.item}>
    <div className={styles.nameCol}>
      <span
        className={[
          styles.name,
          styles[char.class.replace(' ', '').toLowerCase()],
        ].join(' ')}
      >
        {char.name}
      </span>
      {char.realm}
    </div>
    <div className={styles.ilvlCol}>
      <span
        className={styles.equippedIlvl}
        style={{ backgroundColor: getIlvlColor(char.equippedItemLevel) }}
      >
        {char.equippedItemLevel}
      </span>
      <span className={styles.avarageIlvl}>{char.avarageItemLevel}</span>
    </div>
    <div className={styles.guildCol}>
      <span>{char.guild}</span>
    </div>
    <div className={styles.statusCol}>
      <span
        className={clsx(
          styles.statusDisplay,
          styles[`statusDisplay--${char.status}`]
        )}
      >
        {char.status.replace('_', ' ')}
      </span>
    </div>
    <div className={styles.viewCol}>
      <Link to={`/dashboard/character/${char.id}`} className={styles.viewLink}>
        <span>view</span>
      </Link>
    </div>
  </div>
)
