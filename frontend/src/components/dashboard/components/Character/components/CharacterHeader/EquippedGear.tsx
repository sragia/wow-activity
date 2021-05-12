import React from 'react'
import { getColorByQuality } from '../../../../../../helpers/ilvl'
import { ICharacter } from '../../../../../../interfaces/character.interface'

import styles from './styles.module.scss'

interface Props {
  character: ICharacter
}

const GEAR_ORDER = [
  [
    // Col 1
    'HEAD',
    'NECK',
    'SHOULDER',
    'BACK',
    'CHEST',
    'WRIST',
    'MAIN_HAND',
    'OFF_HAND',
  ],
  [
    // Col 2
    'HANDS',
    'WAIST',
    'LEGS',
    'FEET',
    'FINGER_1',
    'FINGER_2',
    'TRINKET_1',
    'TRINKET_2',
  ],
]

const ItemDisplay = ({
  slot,
  character,
}: {
  slot: string
  character: ICharacter
}) => {
  const item = character.gear?.find(
    (g) => g.id === character.equippedGear![slot]
  )
  if (!item) {
    return null
  }

  return (
    <div className={styles.gearItem}>
      {item.socketCount > 0 &&
        [...Array(item.socketCount)].map((i) => (
          <span className={styles.gem} key={i} title="Socket" />
        ))}
      <span
        className={styles.gearName}
        style={{ backgroundColor: getColorByQuality(item.quality) }}
      >
        {item.name}
      </span>
      <span
        className={styles.itemIlvl}
        style={{
          backgroundColor: getColorByQuality(item.quality),
        }}
      >
        {item.ilvl}
      </span>
    </div>
  )
}

export const EquippedGear = ({ character }: Props) => {
  const gear = character.equippedGear
  if (!gear) {
    return null
  }

  return (
    <div className={styles.gearWrapper}>
      {GEAR_ORDER.map((col) => (
        <div className={styles.gearColumn} key={col.join(',')}>
          {col.map((slot) => (
            <div className={styles.item} key={slot}>
              <span className={styles.gearLabel}>{slot.replace('_', ' ')}</span>
              <ItemDisplay slot={slot} character={character} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
