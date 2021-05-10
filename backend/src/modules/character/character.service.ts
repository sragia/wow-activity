import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Character } from './character.entity';
import { CharacterPayload } from './interfaces/character.interface';
import { Cron } from '@nestjs/schedule';
import { BnetService } from '../bnet/bnet.service';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    private readonly bnetService: BnetService,
  ) {}

  async getCharacterByNameRealm(name: string, realm: string) {
    const char = await this.characterRepository.find({
      where: {
        name,
        realm,
      },
      relations: ['profiles'],
    });
    if (char) {
      return char[0];
    }

    return null;
  }

  async getCharacterById(id: number) {
    return await this.characterRepository.findOne(id);
  }

  async edit(character: Character, payload: CharacterPayload) {
    Object.keys(payload).forEach((key) => {
      character[key] = payload[key];
    });

    character.lastUpdated = new Date();

    return this.characterRepository.save(character);
  }

  async create(payload: CharacterPayload, user: Profile) {
    const character = await this.getCharacterByNameRealm(
      payload.name,
      payload.realm,
    );

    if (character) {
      if (character.profiles.find((prof) => prof.id === user.id)) {
        throw new NotAcceptableException(
          'The character already has been added for user',
        );
      }
      Object.keys(payload).forEach((key) => {
        character[key] = payload[key];
      });

      character.profiles.push(user);

      return this.characterRepository.save(character);
    } else {
      return this.characterRepository.save(
        this.characterRepository.create({
          ...payload,
          profiles: [user],
        }),
      );
    }
  }

  @Cron('* * * * *')
  async updateCharacters() {
    const characters = await this.characterRepository.find({
      where: {
        lastUpdated: LessThanOrEqual(
          new Date(new Date().getTime() - 4 * 60 * 60 * 1000),
        ),
      },
    });
    console.log(`[Character Update] Updating ${characters.length} characters`);
    characters.forEach(async (character) => {
      const bnetChar = await this.bnetService.getCharacter(
        character.name,
        character.realm,
      );
      const media = await this.bnetService.getCharacterMedia(
        character.name,
        character.realm,
      );
      const payload = {
        name: bnetChar.name,
        realm: bnetChar.realm.name,
        faction: bnetChar.faction.type,
        covenant: bnetChar.covenant_progress?.chosen_covenant?.id,
        guild: bnetChar.guild.name,
        level: bnetChar.level,
        class: bnetChar.character_class.name,
        spec: bnetChar.active_spec.name,
        race: bnetChar.race.name,
        achievementPoints: bnetChar.achievement_points,
        experience: bnetChar.experience,
        lastLogin: bnetChar.last_login_timestamp,
        avarageItemLevel: bnetChar.average_item_level,
        equippedItemLevel: bnetChar.equipped_item_level,
        imgUrl: media.assets?.find((asset) => asset.key === 'main')?.value,
      };

      this.edit(character, payload);
    });
  }
}
