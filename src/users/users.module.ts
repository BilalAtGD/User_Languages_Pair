import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../database/core/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLanguagesModule } from './user_languages/user-languages.module';

import { AccountsModule } from './accounts/accounts.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserLanguagesModule,
    AccountsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
