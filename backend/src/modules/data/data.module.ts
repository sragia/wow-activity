import { Module } from '@nestjs/common';
import { ActivityModule } from '../activity/activity.module';
import { CharacterModule } from '../character/character.module';
import { GearModule } from '../gear/gear.module';
import { ProfileModule } from '../profile/profile.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [ActivityModule, GearModule, ProfileModule, CharacterModule],
  providers: [DataService],
  exports: [DataService],
  controllers: [DataController],
})
export class DataModule {}
