import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  OneToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserLanguage } from './user-language.entity';
import { Account } from './account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'role', default: 'User' })
  role: string;

  @Column({ name: 'password' })
  password: string;

  @OneToMany(() => UserLanguage, (userLanguage) => userLanguage.user)
  userLanguages: UserLanguage[];

  @OneToMany(() => Account, (account) => account.user)
  account: Account[];

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
}
