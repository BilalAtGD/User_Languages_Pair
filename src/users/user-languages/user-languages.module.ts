import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLanguage } from '../../database/core/entities/user-language.entity';
import { UserLanguagesService } from './user-languages.service';
import { UserLanguagesController } from './user-languages.controller';
import { Language } from '../../database/core/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLanguage, Language])],
  providers: [UserLanguagesService],
  controllers: [UserLanguagesController],
})
export class UserLanguagesModule {}
