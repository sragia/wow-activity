import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import axios from 'axios';

import oauth2 = require('simple-oauth2');

const BASE_ENDPOINT = 'https://{region}.api.blizzard.com';

const API_ENDPOINTS = {
  CHARACTER: '/profile/wow/character/{realm}/{name}',
  CHARACTER_MEDIA: '/profile/wow/character/{realm}/{name}/character-media',
  CHARACTER_EQUIPMENT: '/profile/wow/character/{realm}/{name}/equipment',
  ITEM_MEDIA: '/data/wow/media/item/{itemId}',
};

const DEFAULT_PARAMS = {
  locale: 'en_US',
  namespace: 'profile-eu',
};

@Injectable()
export class BnetService {
  client = null;
  token = null;

  constructor(private readonly config: ConfigService) {
    this.client = new oauth2.ClientCredentials({
      client: {
        id: config.get('BNET_CLIENT_ID'),
        secret: config.get('BNET_CLIENT_SECRET'),
      },
      auth: {
        tokenHost: 'https://eu.battle.net',
      },
    });
  }

  replaceVars(str: string, vars: { [index: string]: string }) {
    let res = str;
    Object.keys(vars).forEach((key) => {
      res = res.replace(`{${key}}`, vars[key].toLowerCase());
    });
    return res;
  }

  async getToken() {
    if (this.token === null || this.token.expired()) {
      const token = await this.client.getToken();
      this.token = this.client.createToken(token);
      return this.token.token.token.access_token; //YIKES
    }
    return this.token.token.token.access_token;
  }

  async getCharacter(name: string, realm: string, region = 'eu') {
    try {
      return (
        await this.fetch(
          this.replaceVars(API_ENDPOINTS.CHARACTER, {
            name,
            realm,
          }),
          region as 'eu' | 'us',
        )
      ).data;
    } catch (e) {
      return null;
    }
  }

  async getCharacterEquipment(name: string, realm: string, region = 'eu') {
    try {
      return (
        await this.fetch(
          this.replaceVars(API_ENDPOINTS.CHARACTER_EQUIPMENT, {
            name,
            realm,
          }),
          region as 'eu' | 'us',
        )
      ).data;
    } catch (e) {
      return null;
    }
  }

  async getCharacterMedia(name: string, realm: string, region = 'eu') {
    try {
      return (
        await this.fetch(
          this.replaceVars(API_ENDPOINTS.CHARACTER_MEDIA, {
            name,
            realm,
          }),
          region as 'eu' | 'us',
        )
      ).data;
    } catch (e) {
      return null;
    }
  }

  async getItemMedia(itemId: number) {
    try {
      return (
        await this.fetch(
          this.replaceVars(API_ENDPOINTS.ITEM_MEDIA, {
            itemId: itemId.toString(),
          }),
          'eu',
          'GET',
          {
            params: {
              locale: 'en_US',
              namespace: 'static-eu',
            },
          },
        )
      ).data;
    } catch (e) {
      return null;
    }
  }

  async fetch(uri: string, region: 'eu' | 'us', method = 'GET', options?: any) {
    const token = await this.getToken();
    const ret =  axios({
      url: `${this.replaceVars(BASE_ENDPOINT, { region })}${uri}`,
      method,
      params: DEFAULT_PARAMS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });
    console.log(ret);
    return ret;
  }
}
