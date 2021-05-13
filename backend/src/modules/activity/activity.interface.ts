import { Character } from '../character/character.entity';
import { Gear } from '../gear/gear.entity';
import { Activity } from './activity.entity';

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
