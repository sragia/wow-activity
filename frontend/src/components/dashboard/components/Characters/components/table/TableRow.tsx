import clsx from 'clsx'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CharacterAction } from '../../../../../../features/character/actionTypes'
import { CharMsg } from '../../../../../../features/character/types'
import { getIlvlColor } from '../../../../../../helpers/ilvl'
import { ICharacter } from '../../../../../../interfaces/character.interface'

import styles from './styles.module.scss'

type Props = {
  char: ICharacter
}

export const CharacterTableRow = ({ char }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const removeCharacter = () => {
    dispatch(CharMsg(CharacterAction.RemoveCharacter, char.id))
  }

  return (
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
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={clsx({
            [styles.moreBtn]: true,
            [styles.expanded]: expanded,
          })}
        >
          <svg width="24" height="20" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13.25 8.75L9.75 12L13.25 15.25"
            />
          </svg>
        </button>
        {expanded && (
          <button
            type="button"
            onClick={removeCharacter}
            className={styles.removeBtn}
          >
            <span>remove</span>
          </button>
        )}
        <Link
          className={styles.viewLink}
          to={`/dashboard/character/${char.id}`}
        >
          <span>view</span>
        </Link>
      </div>
    </div>
  )
}
