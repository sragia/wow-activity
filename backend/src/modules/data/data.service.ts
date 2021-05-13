import { Injectable } from '@nestjs/common';
import { Activity } from '../activity/activity.entity';
import { EActivityType } from '../activity/activity.interface';
import { ActivityService } from '../activity/activity.service';
import { CharacterService } from '../character/character.service';
import { GearService } from '../gear/gear.service';
import { Profile } from '../profile/profile.entity';
import { ProfileService } from '../profile/profile.service';
import { IActivityResult } from './data.interface';

@Injectable()
export class DataService {
  constructor(
    private readonly activityService: ActivityService,
    private readonly gearService: GearService,
    private readonly profileService: ProfileService,
    private readonly characterService: CharacterService,
  ) {}

  async getProfileActivities(profile: Profile): Promise<IActivityResult[]> {
    const characters = profile.characters;
    const data: IActivityResult[] = [];

    for (const character of characters) {
      const activities = await this.characterService.getCharacterActivities(
        character.id,
      );

      for (const activity of activities) {
        const payload: IActivityResult = {
          activity,
          character,
          createdAt: activity.createdAt,
        };

        if (activity.activityType === EActivityType.GEAR_ACQUIRE) {
          const gear = await this.gearService.getById(
            activity.activityData.gearId,
          );
          payload.gear = gear;
        }

        data.push(payload);
      }
    }

    return data;
  }
}
