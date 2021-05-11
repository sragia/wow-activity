import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../character/character.entity';
import { Profile } from '../profile/profile.entity';
import { Activity } from './activity.entity';
import { IActivityPayload } from './activity.interface';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async create(payload: IActivityPayload, profile: Character) {
    return this.activityRepository.save(
      this.activityRepository.create({
        ...payload,
        profile,
      }),
    );
  }
}
