import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Character } from './character.entity';
import {
  CharacterPayload,
  ECharacterStatus,
} from './interfaces/character.interface';
import { Cron } from '@nestjs/schedule';
import { BnetService } from '../bnet/bnet.service';
import { GearService } from '../gear/gear.service';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    private readonly bnetService: BnetService,
    private readonly gearService: GearService,
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
    return await this.characterRepository.findOne(id, {
      relations: ['gear', 'activities', 'profiles'],
    });
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

  async updateStatus(character: Character, status: ECharacterStatus) {
    return await this.characterRepository.save({
      ...character,
      status,
    });
  }

  async updateCharacterEquipment(character: Character) {
    const equip = await this.bnetService.getCharacterEquipment(
      character.name,
      character.realm,
    );
    const oldStatus = character.status;
    character = await this.updateStatus(
      character,
      ECharacterStatus.IN_PROGRESS,
    );

    try {
      const equippedItems = equip.equipped_items;
      for (const item of equippedItems) {
        character = await this.gearService.create(
          {
            itemId: item.item.id,
            ilvl: item.level.value,
            name: item.name,
            slot: item.slot.type,
            socketCount: item.sockets?.length || 0,
            bonusList: item.bonus_list,
            quality: item.quality.type,
            nameDescription: item.name_description?.display_string,
          },
          character,
        );

        character = await this.characterRepository.save(character);
      }

      await this.updateStatus(character, ECharacterStatus.READY);
    } catch (e) {
      console.log(
        'Error on adding gear, returning to previous status',
        character.id,
        e,
      );
      await this.updateStatus(character, oldStatus);
    }
  }

  @Cron('* * * * *')
  async updateCharacters() {
    const characters = await this.characterRepository.find({
      where: [
        {
          lastUpdated: LessThanOrEqual(
            new Date(new Date().getTime() - 60 * 60 * 1000),
          ),
        },
        {
          status: ECharacterStatus.NEW,
        },
      ],
      take: 5,
      relations: ['gear'],
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

      this.updateCharacterEquipment(character);

      this.edit(character, payload);
    });
  }
}
