import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { EnumMember, EnumType } from 'typescript';
import { AccountType } from '../../enums/account-types.enum';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name : "balance"})
  balance: number;

  @CreateDateColumn({
    name:"created_at",
    type: 'timestamptz',
    precision:3
  })
  createdAt: Date;

  @UpdateDateColumn({
    name:"updated_at",
    type: 'timestamptz',
    precision:3
  })
  updatedAt: Date;

  @Column({type:"enum",
    enum:AccountType,
    default:AccountType.CURRENT
  })
  type:AccountType
  
  @Column({ name: 'user_id' })
  userId:number

  @ManyToOne(() => User, (user) => user.account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
