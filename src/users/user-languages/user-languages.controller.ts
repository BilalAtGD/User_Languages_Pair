import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import express from 'express';
import { plainToInstance } from 'class-transformer';
import { UserLanguagesService } from './user-languages.service';
import { AssignLanguageDto } from './dto/assign-language.dto';
import { AuthGuard } from '../../guards/auth-guard';

import { UserLanguageResponse } from './dto/user-language-response.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users/:userId/user-languages')
export class UserLanguagesController {
  constructor(private readonly userLanguageService: UserLanguagesService) {}

  @Post()
  @ApiOperation({ description: 'Assign Language to a user' })
  @UseGuards(AuthGuard)
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() assignLanguageDto: AssignLanguageDto,
    @Req() req: express.Request,
  ): Promise<UserLanguageResponse> {
    

    const userLanguage = await this.userLanguageService.create(
      (req as any).user.userId,
      userId,
      assignLanguageDto,
    );
    return plainToInstance(UserLanguageResponse, userLanguage);
  }

  @Get()
  @ApiOperation({ description: 'Get all languages for a user' })
  @UseGuards(AuthGuard)
  async getAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: express.Request,
  ): Promise<UserLanguageResponse[]> {
    
    const userLanguages = await this.userLanguageService.getAll(userId,(req as any).user.userId);

    return plainToInstance(UserLanguageResponse, userLanguages);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get one user language pair' })
  @UseGuards(AuthGuard)
  async getOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) languageId: number,
    @Req() req: express.Request,
  ): Promise<UserLanguageResponse[]> {
    
    const userLanguages = await this.userLanguageService.getOne(
      userId,
      languageId,
      (req as any).user.userId,
    );

    return plainToInstance(UserLanguageResponse, userLanguages);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Delete one user language',
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) languageId: number,
    @Req() req: express.Request,
  ): Promise<void> {
   
    await this.userLanguageService.remove(userId, languageId,(req as any).user.userId);
  }
}
