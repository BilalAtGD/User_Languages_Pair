import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
  Patch,
  Body,
  Post,
  Delete,
 
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from '../../guards/auth-guard';
import { plainToInstance } from 'class-transformer';
import { AccountResponseDto } from './dto/account-response-dto';
import express from 'express';
import { UpdateBalanceDto } from './dto/balance-update-dto';
import { ApiOperation } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account-dto';

@Controller('/users/:userId/accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({description:"Get all accounts of user using his id"})
  async getAllByUserId(
    @Param('userId', ParseIntPipe) userId: number,

    @Req() req: express.Request,
  ): Promise<AccountResponseDto[]> {
    const account = await this.accountService.getAllByUserId(userId, (req as any).user.id);
    return plainToInstance(AccountResponseDto, account);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  async getOneById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,

    @Req() req: express.Request,
  ): Promise<AccountResponseDto> {
    const account = await this.accountService.getOneById(userId, (req as any).user.id,id);
    return plainToInstance(AccountResponseDto, account);
  }


  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({description:"Create account"})
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: express.Request,
    @Body() accountBody:CreateAccountDto
  ):Promise<void>{
    
    await this.accountService.create(userId, (req as any).user.userId,accountBody);
    

  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({description:"Update account by id"})
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) accountId: number,
    @Req() req: express.Request,
    @Body() updatedBalance: UpdateBalanceDto,
  ): Promise<AccountResponseDto> {
    
    const account = await this.accountService.update(userId, (req as any).user.userId, updatedBalance,accountId);
    return plainToInstance(AccountResponseDto, account);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({description:"Delete account by id"})
  async delete(
    @Param('userId',ParseIntPipe) userId:number,
    @Param('id',ParseIntPipe) accountId:number,
    @Req() req: express.Request,
  ):Promise<void>{
    await this.accountService.delete(userId,accountId,(req as any).user.userId);

  }
}
