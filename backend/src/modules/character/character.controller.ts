import { BadRequestException, Get, Param, Req } from '@nestjs/common';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BnetService } from '../bnet/bnet.service';
import { Character } from './character.entity';
import { CharacterService } from './character.service';
import { AddCharacterPayload } from './payload/add.character.payload';
import { Request } from 'express';
import { ProfileService } from '../profile/profile.service';

@ApiBearerAuth()
@ApiTags('character')
@Controller('api/character')
export class CharacterController {
  constructor(
    private readonly characterService: CharacterService,
    private readonly bnetService: BnetService,
    private readonly profileService: ProfileService,
  ) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Add Character Request Received' })
  @ApiResponse({ status: 400, description: 'Add Character Request Failed' })
  async addProfile(
    @Body() payload: AddCharacterPayload,
    @Req() request: Request,
  ): Promise<Character> {
    const character = await this.bnetService.getCharacter(
      payload.name,
      payload.realm,
      payload.region,
    );

    if (!character) {
      throw new BadRequestException('Couldnt find character');
    }
    const username = request.cookies?.username;

    const profile = await this.profileService.getByUsername(username);
    const media = await this.bnetService.getCharacterMedia(
      payload.name,
      payload.realm,
      payload.region,
    );

    return this.characterService.create(
      {
        name: character.name,
        realm: character.realm.name,
        faction: character.faction.type,
        covenant: character.covenant_progress?.chosen_covenant?.id,
        guild: character.guild.name,
        level: character.level,
        class: character.character_class.name,
        spec: character.active_spec.name,
        race: character.race.name,
        achievementPoints: character.achievement_points,
        experience: character.experience,
        lastLogin: character.last_login_timestamp,
        avarageItemLevel: character.average_item_level,
        equippedItemLevel: character.equipped_item_level,
        imgUrl: media.assets?.find((asset) => asset.key === 'main')?.value,
      },
      profile,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCharacters(@Req() request: Request): Promise<Character[]> {
    const username = request.cookies?.username;

    const profile = await this.profileService.getByUsername(username);

    return profile.characters;
  }

  @Post(':id/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteCharacterForUser(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<Character[]> {
    const username = request.cookies?.username;

    let profile = await this.profileService.getByUsername(username);
    profile = {
      ...profile,
      characters: profile.characters.filter(
        (char) => char.id !== parseInt(id, 10),
      ),
    };
    await this.profileService.save(profile);

    return profile.characters;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getCharacter(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<Character> {
    const username = request.cookies?.username;

    const profile = await this.profileService.getByUsername(username);
    const character = await this.characterService.getCharacterById(
      parseInt(id, 10),
    );
    if (
      !character ||
      !character.profiles.find((prof) => prof.id === profile.id)
    ) {
      throw new BadRequestException('Couldnt find character');
    }
    delete character.profiles;
    return character;
  }
}
