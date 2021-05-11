export enum EActivityType {
  GEAR_ACQUIRE = 'gear_acquire',
}

export interface IGearActivityData {
  gearId: number;
}

export interface IActivityPayload {
  activityType: EActivityType;
  activityData: IGearActivityData;
}
