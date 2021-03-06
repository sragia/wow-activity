import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from '../activity/activity.module';
import { BnetModule } from '../bnet/bnet.module';
import { CharacterModule } from '../character/character.module';
import { Gear } from './gear.entity';
import { GearService } from './gear.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gear]), ActivityModule, BnetModule],
  providers: [GearService],
  exports: [GearService],
  controllers: [],
})
export class GearModule {}
