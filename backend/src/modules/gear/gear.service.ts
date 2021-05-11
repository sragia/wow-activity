import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EActivityType } from '../activity/activity.interface';
import { ActivityService } from '../activity/activity.service';
import { Character } from '../character/character.entity';
import { Profile } from '../profile/profile.entity';
import { Gear } from './gear.entity';
import { IGearPayload } from './gear.interface';

@Injectable()
export class GearService {
  constructor(
    @InjectRepository(Gear)
    private readonly gearRepository: Repository<Gear>,
    private readonly activityService: ActivityService,
  ) {}

  getAlreadyStoredITem(
    payload: IGearPayload,
    character: Character,
  ): Gear | null {
    if (!character.gear) {
      return null;
    }
    const item = character.gear.find((g) => {
      if (g.itemId !== payload.itemId) {
        return false;
      }

      if (
        !payload.bonusList.every((bonusId) => g.bonusList.includes(bonusId))
      ) {
        return false;
      }

      // Different socket count
      if (payload.socketCount !== g.socketCount) {
        return false;
      }

      // Different ilvl
      if (payload.ilvl !== g.ilvl) {
        return false;
      }

      return true;
    });

    return item || null;
  }

  async create(
    payload: IGearPayload,
    character: Character,
  ): Promise<Character> {
    const storedItem = this.getAlreadyStoredITem(payload, character);
    if (storedItem) {
      return {
        ...character,
        equippedGear: {
          ...character.equippedGear,
          [storedItem.slot]: storedItem.id,
        },
      };
    } else {
      // New Item
      const gear = await this.gearRepository.save(
        this.gearRepository.create(payload),
      );
      this.activityService.create(
        {
          activityData: { gearId: gear.id },
          activityType: EActivityType.GEAR_ACQUIRE,
        },
        character,
      );

      try {
        if (character.equippedGear) {
          character.equippedGear[gear.slot] = gear.id;
        } else {
          character.equippedGear = {
            [gear.slot]: gear.id,
          };
        }

        return {
          ...character,
          gear: [...(character.gear || []), gear],
        };
      } catch (e) {
        console.error(e);
      }
    }
  }
}