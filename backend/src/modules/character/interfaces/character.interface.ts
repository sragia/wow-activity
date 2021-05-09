export type TFaction = 'ALLIANCE' | 'HORDE'

export type TCovenant = 'Kyrian' | 'Venthyr' | 'Night Fae' | 'Necrolord';

export type TClass = 'Warrior' | 'Paladin' | 'Hunter' | 'Rogue' | 'Priest' | 'Shaman' | 'Mage' | 'Warlock' | 'Monk' | 'Druid' | 'Demon Hunter' | 'Death Knight';

export enum ECovenant {
  'Kyrian',
  'Venthyr',
  'Night Fae',
  'Necrolord'
}


export interface CharacterPayload {
  id?: number,
  name: string,
  realm: string;
  faction: TFaction,
  covenant?: ECovenant,
  guild?: string;
  level: number;
  class: TClass,
  spec: string;
  race: string;
  achievementPoints?: number;
  experience?: number;
  lastLogin?: string;
  avarageItemLevel: number;
  equippedItemLevel: number;
}