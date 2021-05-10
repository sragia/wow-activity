import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import {
  getClassColor,
  getClassOppositeColor,
  getCovenantColor,
  getRandomColor,
} from '../../../../../../helpers/color'
import { getIlvlColor } from '../../../../../../helpers/ilvl'
import {
  ECovenant,
  ICharacter,
} from '../../../../../../interfaces/character.interface'

import styles from './styles.module.scss'

type Props = {
  character?: ICharacter
}

let handleInterval: any

export const CharacterHeader = ({ character }: Props) => {
  const [color, setColor] = useState('#F1F2ED')
  useEffect(() => {
    handleInterval = setInterval(() => {
      setColor(getRandomColor())
    }, 1000)
    return () => {
      clearInterval(handleInterval)
    }
  }, [])

  return (
    <div className={styles.header}>
      {character?.imgUrl && (
        <div
          className={styles.colImg}
          style={{
            boxShadow: `-4px -4px 0 0 #080708, -7px -7px 0 0 ${getClassColor(
              character.class
            )}`,
          }}
        >
          <img src={character?.imgUrl} alt="character" />
        </div>
      )}
      <div className={styles.colOne}>
        <h3>
          <span
            className={clsx(styles.name)}
            style={{
              backgroundColor: getClassColor(character?.class),
              boxShadow: `-3px -3px 0 0 ${color}`,
              color: getClassOppositeColor(character?.class),
            }}
          >
            {character?.name}
          </span>
          <span>{character?.realm}</span>
        </h3>
        <div className={styles.guild}>
          <span>{`<${character?.guild}>`}</span>
        </div>
        <div className={styles.class}>
          <span>{character?.spec}</span>
          <span
            className={clsx(styles.className)}
            style={{
              backgroundColor: getClassColor(character?.class),
              color: getClassOppositeColor(character?.class),
            }}
          >
            {character?.class}
          </span>
        </div>
        {character?.covenant && (
          <div>
            <span>Covenant</span>
            <span
              className={clsx(styles.covenant)}
              style={{
                backgroundColor: getCovenantColor(character?.covenant),
              }}
            >
              {ECovenant[character?.covenant]}
            </span>
          </div>
        )}
        <div className={styles.ilvl}>
          <span>Item Level</span>
          <span
            className={styles.equippedIlvl}
            style={{
              backgroundColor: getIlvlColor(character?.equippedItemLevel || 0),
            }}
          >
            {character?.equippedItemLevel}
          </span>
          <span>{character?.avarageItemLevel}</span>
        </div>
        <div>
          <span>Last login</span>
          <span className={styles.lastLogin}>
            {DateTime.fromMillis(
              parseInt(character?.lastLogin || '0', 10)
            ).toLocaleString(DateTime.DATETIME_MED)}
          </span>
        </div>
      </div>
    </div>
  )
}

CharacterHeader.defaultProps = {
  character: null,
}
