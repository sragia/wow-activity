import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors } from '../../../../../../features/activities'
import { ActivitiesActions } from '../../../../../../features/activities/actionTypes'
import { StatusType } from '../../../../../../features/global-types'
import { Loading } from '../../../../../loader/loader'
import { ActivityDisplay } from './ActivityDisplay'

import styles from './styles.module.scss'

export const Activities = () => {
  const dispatch = useDispatch()
  const activities = useSelector(selectors.getActivities)
  const status = useSelector(selectors.getActivitiesStatus)
  useEffect(() => {
    dispatch({ type: ActivitiesActions.GetActivities })
  }, [])

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>character activities</span>
      <Loading show={status === StatusType.PENDING} overlay duration={300} />
      <div className={styles.activitiesContainer}>
        {activities
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          })
          .map((a) => (
            <ActivityDisplay activity={a} key={a.activity.id} />
          ))}
      </div>
    </div>
  )
}
