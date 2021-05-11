import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Activity } from '../activity/activity.entity';
import { Gear } from '../gear/gear.entity';
import { TGearSlot } from '../gear/gear.interface';
import { Profile } from '../profile/profile.entity';
import {
  ECharacterStatus,
  ECovenant,
  TClass,
  TCovenant,
  TFaction,
} from './interfaces/character.interface';

@Entity({
  name: 'characters',
})
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  realm: string;

  @Column()
  faction: TFaction;

  @Column({ nullable: true })
  covenant: ECovenant;

  @Column({ nullable: true })
  guild: string;

  @Column()
  level: number;

  @Column()
  class: TClass;

  @Column()
  spec: string;

  @Column()
  race: string;

  @Column({ nullable: true })
  achievementPoints: number;

  @Column({ nullable: true })
  experience: number;

  @Column({ nullable: true })
  lastLogin: string;

  @Column()
  avarageItemLevel: number;

  @Column()
  equippedItemLevel: number;

  @Column({ nullable: true, default: ECharacterStatus.NEW })
  status: ECharacterStatus;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  lastUpdated: Date;

  @ManyToMany((type) => Profile, (profile) => profile.characters)
  @JoinTable()
  profiles: Profile[];

  @Column('simple-json', { nullable: true })
  equippedGear?: { [index: string]: number };

  @OneToMany((type) => Gear, (gear) => gear.owner)
  gear: Gear[];

  @OneToMany((type) => Activity, (activity) => activity.profile)
  activities: Activity[];
}
