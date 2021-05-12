import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../character/character.entity';
import { TGearQuality, TGearSlot } from './gear.interface';

@Entity({
  name: 'gear',
})
export class Gear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slot: TGearSlot;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column()
  itemId: number;

  @Column()
  ilvl: number;

  @Column({ default: 0 })
  socketCount: number;

  @Column('simple-array', { nullable: true })
  bonusList?: string[];

  @Column()
  quality: TGearQuality;

  @Column({ nullable: true })
  iconUrl?: string;

  @Column({ nullable: true })
  nameDescription?: string;

  @ManyToOne((type) => Character, (profile) => profile.gear)
  owner: Character;
}
