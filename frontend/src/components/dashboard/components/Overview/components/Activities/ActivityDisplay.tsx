import { DateTime } from 'luxon'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  getClassColor,
  getClassOppositeColor,
} from '../../../../../../helpers/color'
import { getColorByQuality, getIlvlColor } from '../../../../../../helpers/ilvl'
import { IActivityResult } from '../../../../../../interfaces/activities.interface'
import { EActivityType } from '../../../../../../interfaces/character.interface'
import { prepareWowheadItem } from '../../../../../../helpers/items'

import styles from './styles.module.scss'

interface Props {
  activity: IActivityResult
}

const LABELS = {
  [EActivityType.GEAR_ACQUIRE]: 'Gear Acquired',
}

const ContentDisplay = ({ activity }: { activity: IActivityResult }) => {
  switch (activity.activity.activityType) {
    case EActivityType.GEAR_ACQUIRE:
      return (
        <div className={styles.gearAcquire}>
          <a
            href="#item"
            className={styles.gearName}
            style={{ color: getColorByQuality(activity.gear!.quality) }}
            data-wowhead={prepareWowheadItem(activity.gear!)}
          >
            {activity.gear!.name}
          </a>
          <span
            className={styles.gearIlvl}
            style={{ backgroundColor: getIlvlColor(activity.gear!.ilvl) }}
          >
            {activity.gear!.ilvl}
          </span>
        </div>
      )
    default:
      return <span>NYI</span>
  }
}

export const ActivityDisplay = ({ activity }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles.itemHeader}>
        <Link to={`/dashboard/character/${activity.character.id}`}>
          <span
            className={styles.itemCharacterName}
            style={{
              backgroundColor: getClassColor(activity.character.class),
              color: getClassOppositeColor(activity.character.class),
            }}
          >
            {activity.character.name}
          </span>
          <span className={styles.itemCharacterRealm}>
            {activity.character.realm}
          </span>
        </Link>
        <span className={styles.itemLabel}>
          {LABELS[activity.activity.activityType]}
        </span>
      </div>
      <ContentDisplay activity={activity} />
      <div className={styles.itemFooter}>
        <span className={styles.dateTime}>
          {DateTime.fromISO(
            activity.createdAt || new Date().toISOString()
          ).toLocaleString(DateTime.DATETIME_SHORT)}
        </span>
      </div>
    </div>
  )
}
