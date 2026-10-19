import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLanguage } from '../../database/core/entities/user-languages.entity';
import { UserLanguageService } from './user-language-service';
import { UserLanguagesController } from './user-language-controller';
import { Language } from '../../database/core/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLanguage,Language])],
  providers: [UserLanguageService],
  controllers: [UserLanguagesController],
  
})
export class UserLanguagesModule {}

