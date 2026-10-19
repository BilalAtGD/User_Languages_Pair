import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { LanguageResponseDto } from './dto/language-response.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { AuthGuard } from '../guards/auth-guard';

import { AdminGuard } from '../guards/admin-guard';
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languageService: LanguagesService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(
    @Body() createLanguage: CreateLanguageDto,
  ): Promise<LanguageResponseDto> {
    const language = await this.languageService.create(createLanguage);
    return plainToInstance(LanguageResponseDto, language);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll(): Promise<LanguageResponseDto[]> {
    const languages = await this.languageService.getAll();
    return plainToInstance(LanguageResponseDto, languages);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LanguageResponseDto> {
    const language = await this.languageService.getOne(id);
    return plainToInstance(LanguageResponseDto, language);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: UpdateLanguageDto,
  ): Promise<LanguageResponseDto> {
    const language = await this.languageService.update(id, updatedData);
    return plainToInstance(LanguageResponseDto, language);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.languageService.remove(id);
  }
}
