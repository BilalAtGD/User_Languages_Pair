import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../database/core/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLanguagesModule } from './user_language/user-language-module';

import { AccountModule } from './account/account.module';
import { Account } from '../database/core/entities/accounts.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User]),UserLanguagesModule,AccountModule],
  providers: [UserService],
  controllers: [UsersController],


  
})
export class UserModule {}
