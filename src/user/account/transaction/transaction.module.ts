import { Module } from '@nestjs/common';
import { TransactionsController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../../../database/core/entities/transactions.entity';
import { Account } from '../../../database/core/entities/accounts.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction,Account])],
  controllers: [TransactionsController],
  providers: [TransactionService]
})
export class TransactionModule {}
