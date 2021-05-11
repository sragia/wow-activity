import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../character/character.entity';
import { EActivityType, IGearActivityData } from './activity.interface';

@Entity({
  name: 'activities',
})
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activityType: EActivityType;

  @Column('simple-json')
  activityData: IGearActivityData;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne((type) => Character, (profile) => profile.activities)
  profile: Character;
}
