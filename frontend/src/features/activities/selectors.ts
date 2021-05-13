import { SystemState } from './types'

export const getActivities = (state: SystemState) => state.activities.activities

export const getActivitiesStatus = (state: SystemState) =>
  state.activities.status
