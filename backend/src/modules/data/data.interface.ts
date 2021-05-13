import { Activity } from '../activity/activity.entity';
import { Character } from '../character/character.entity';
import { Gear } from '../gear/gear.entity';

export interface IActivityResult {
  activity: Activity;
  gear?: Gear;
  character: Character;
  createdAt: Date;
}
