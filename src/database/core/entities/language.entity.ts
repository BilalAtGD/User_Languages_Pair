import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserLanguage } from './user-language.entity';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'code' })
  code: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    precision: 3,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    precision: 3,
  })
  updatedAt: Date;

  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.language)
  userLanguages: UserLanguage[];
}
