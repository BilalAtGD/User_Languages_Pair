import { ModuleMetadata, Module } from '@nestjs/common';
import {} from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguagesController } from './language.controller';
import { Language } from '../database/core/entities/language.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguageService],
  controllers: [LanguagesController],
  exports: [LanguageService]
})
export class LanaguagesModule {}
