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
  | 'SHIRT';

export type TGearQuality = 'EPIC' | 'RARE' | 'COMMON';

export interface IGearPayload {
  name: string;
  slot: TGearSlot;
  itemId: number;
  ilvl: number;
  socketCount: number;
  bonusList: string[];
  quality: TGearQuality;
  nameDescription: string;
}
