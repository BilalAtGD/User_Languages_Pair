import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "../../database/core/entities/accounts.entity";
import { AccountService } from "./account.service";
import { AccountsController } from "./account.controller";
import { TransactionModule } from './transaction/transaction.module';
import { User } from "../../database/core/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Account,User]), TransactionModule],
  providers:[AccountService],
  controllers:[AccountsController]
})
export class AccountModule {}
