import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../database/core/entities/account.entity';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TransactionsModule } from './transactions/transactions.module';
import { User } from '../../database/core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User]), TransactionsModule],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
