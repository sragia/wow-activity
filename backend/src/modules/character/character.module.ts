import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BnetModule } from '../bnet/bnet.module';
import { GearModule } from '../gear/gear.module';
import { ProfileModule } from '../profile/profile.module';
import { CharacterController } from './character.controller';
import { Character } from './character.entity';
import { CharacterService } from './character.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    ProfileModule,
    BnetModule,
    GearModule,
  ],
  providers: [CharacterService],
  exports: [CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
