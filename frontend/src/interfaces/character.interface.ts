export type TFaction = 'ALLIANCE' | 'HORDE'

export type TCovenant = 'Kyrian' | 'Venthyr' | 'Night Fae' | 'Necrolord'

export type TClass =
  | 'Warrior'
  | 'Paladin'
  | 'Hunter'
  | 'Rogue'
  | 'Priest'
  | 'Shaman'
  | 'Mage'
  | 'Warlock'
  | 'Monk'
  | 'Druid'
  | 'Demon Hunter'
  | 'Death Knight'

export enum ECovenant {
  'IGNORE',
  'Kyrian',
  'Venthyr',
  'Night Fae',
  'Necrolord',
}

export enum ECharacterStatus {
  NEW = 'new',
  READY = 'ready',
  IN_PROGRESS = 'in_progress',
}

export type TGearSlot =
  | 'HEAD'
  | 'NECK'
  | 'SHOULDER'
  | 'CHEST'
  | 'WAIST'
  | 'LEGS'
  | 'FEET'
  | 'WRIST'
  | 'HANDS'
  | 'FINGER_1'
  | 'FINGER_2'
  | 'TRINKET_1'
  | 'TRINKET_2'
  | 'BACK'
  | 'MAIN_HAND'
  | 'OFF_HAND'
  | 'SHIRT'

export type TGearQuality = 'EPIC' | 'RARE' | 'COMMON'

export interface IGear {
  id: number
  name: string
  slot: TGearSlot
  createdAt: string
  itemId: number
  ilvl: number
  socketCount: number
  bonusList?: string[]
  quality: TGearQuality
  nameDescription?: string
  iconUrl?: string
}

export enum EActivityType {
  GEAR_ACQUIRE = 'gear_acquire',
}

export interface IGearActivityData {
  gearId: number
}

export interface IActivity {
  id: number
  activityType: EActivityType
  activityData: IGearActivityData
  createdAt: string
}

export interface ICharacter {
  id: number
  name: string
  realm: string
  faction: TFaction
  covenant: ECovenant
  guild: string
  level: number
  class: TClass
  spec: string
  race: string
  achievementPoints: number
  experience: number
  lastLogin: string
  avarageItemLevel: number
  equippedItemLevel: number
  status: ECharacterStatus
  lastUpdated: string
  equippedGear?: { [index: string]: number }
  gear?: IGear[]
  imgUrl?: string
  activities: IActivity[]
}
