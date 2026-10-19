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
import { UserLanguageService } from './user-language-service';
import { AssignLanguageDto } from './dto/assign-language-dto';
import { AuthGuard } from '../../guards/auth-guard';

import { UserLanguageResponse } from './dto/user-language-response-dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users/:userId/user-languages')
export class UserLanguagesController {
  constructor(private readonly userLanguageService: UserLanguageService) {}

  @Post()
  @ApiOperation({description:"Assign Language to a user"})
  @UseGuards(AuthGuard)
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() assignLanguageDto: AssignLanguageDto,
    @Req() req: express.Request,
  ): Promise<UserLanguageResponse> {
    const currentUser = (req as any).user;
    if (currentUser?.userId !== userId) {
      throw new BadRequestException(
        'You are not allowed to add language to this user',
      );
    }

    
    const userLanguage = await this.userLanguageService.create(
      userId,
      assignLanguageDto,
    );
    return plainToInstance(UserLanguageResponse, userLanguage);
  }

  @Get()
  @ApiOperation({description:"Get all languages for a user"})
  @UseGuards(AuthGuard)
  async getAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: express.Request,
  ): Promise<UserLanguageResponse[]> {
    const currentUser = (req as any).user;
    if (currentUser?.userId !== userId) {
      throw new BadRequestException(
        'You are not allowed to see languages of this user',
      );
    }
    const userLanguages = await this.userLanguageService.getAll(userId);
    
    return plainToInstance(UserLanguageResponse, userLanguages);
    
  }

  @Get(':id')
  @ApiOperation({description:"Get one user language pair"})
  @UseGuards(AuthGuard)
  async getOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) languageId: number,
    @Req() req: express.Request,
  ): Promise<UserLanguageResponse[]> {
    const currentUser = (req as any).user;
    if (currentUser?.userId !== userId) {
      throw new BadRequestException(
        'You are not allowed to see languages of this user',
      );
    }
    const userLanguages = await this.userLanguageService.getOne(userId,languageId);
    
    return plainToInstance(UserLanguageResponse, userLanguages);
  }

  @Delete(':id')
  @ApiOperation({
    description:"Delete one user language"
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) languageId: number,
    @Req() req: express.Request,
  ): Promise<void> {
    const currentUser = (req as any).user;
    if (currentUser?.userId !== userId) {
      throw new BadRequestException(
        'You are not allowed to delete language to this user',
      );
    }
    await this.userLanguageService.remove(userId, languageId);
  }
}


