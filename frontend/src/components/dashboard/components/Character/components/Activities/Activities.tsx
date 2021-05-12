import { DateTime } from 'luxon'
import React from 'react'
import {
  getColorByDescription,
  getColorByQuality,
  getIlvlColor,
} from '../../../../../../helpers/ilvl'
import {
  EActivityType,
  IActivity,
  ICharacter,
} from '../../../../../../interfaces/character.interface'

import styles from './styles.module.scss'

interface Props {
  character: ICharacter
}

const ActivityDisplay = ({
  activity,
  character,
}: {
  activity: IActivity
  character: ICharacter
}) => {
  switch (activity.activityType) {
    case EActivityType.GEAR_ACQUIRE:
      /* eslint-disable no-case-declarations */
      const item = character.gear?.find(
        (g) => g.id === activity.activityData.gearId
      )
      return (
        <div className={styles.activity}>
          <span className={styles.activityLabel}>Gear acquired</span>
          <div className={styles.itemInfo}>
            <div className={styles.itemContent}>
              {item?.iconUrl && (
                <div className={styles.itemImg}>
                  <img
                    src={item.iconUrl}
                    style={{ borderColor: getColorByQuality(item.quality) }}
                    alt="icon-img"
                  />
                </div>
              )}
              <div>
                <span
                  className={styles.itemName}
                  style={{ color: getColorByQuality(item?.quality!) }}
                >
                  {item?.name}
                </span>
                <div className={styles.itemDetails}>
                  <span
                    className={styles.itemLevel}
                    style={{ backgroundColor: getIlvlColor(item?.ilvl!) }}
                  >
                    {item?.ilvl}
                  </span>
                  {item?.nameDescription && (
                    <span
                      className={styles.nameDescription}
                      style={{
                        backgroundColor: getColorByDescription(
                          item?.nameDescription
                        ),
                      }}
                    >
                      {item?.nameDescription}
                    </span>
                  )}
                  <span className={styles.itemSlot}>
                    {item?.slot.replace('_', ' ')}
                  </span>
                  {(item?.socketCount && (
                    <span className={styles.itemSocket}>
                      Sockets <span>{item?.socketCount}</span>
                    </span>
                  )) ||
                    null}
                </div>
              </div>
            </div>
            <div className={styles.dateTime}>
              <span>
                {DateTime.fromISO(
                  item?.createdAt || new Date().toISOString()
                ).toLocaleString(DateTime.DATETIME_SHORT)}
              </span>
            </div>
          </div>
        </div>
      )
    default:
      // Unimplemented activity
      return null
  }
}

export const Activites = ({ character }: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>activities</span>
      <div className={styles.activities}>
        {character?.activities
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          })
          .map((activity) => (
            <ActivityDisplay
              key={activity.id}
              activity={activity}
              character={character}
            />
          ))}
      </div>
    </div>
  )
}
