import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  
} from 'typeorm';
import { Account } from './accounts.entity'; 



@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:"amount"})
  amount: number;

  
  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  
  @JoinColumn({ name: 'from_account_id' })
  fromAccount: Account;

  
  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  
  @JoinColumn({ name: 'to_account_id' })
  toAccount: Account;

  @CreateDateColumn({
    name:"created_at",
    type: 'timestamptz',
    precision:3
  })
  public createdAt: Date;
}
