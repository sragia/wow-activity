import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Character } from './character.entity';
import { CharacterPayload } from './interfaces/character.interface';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
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
}
