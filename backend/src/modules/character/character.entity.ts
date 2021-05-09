import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../profile/profile.entity";
import { ECovenant, TClass, TCovenant, TFaction } from "./interfaces/character.interface";

@Entity({
  name: 'characters'
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

  @ManyToMany(type => Profile, profile => profile.characters)
  @JoinTable()
  profiles: Profile[];
}