import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import express from 'express';
import { TransactionService } from './transactions.service';
import { TransactionCreateDto } from './dto/transaction-create.dto';
import { plainToInstance } from 'class-transformer';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { AuthGuard } from '../../../guards/auth-guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users/:userId/accounts/:accountId/transactions/')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post()
  @ApiOperation({ description: 'Create a transaction' })
  @UseGuards(AuthGuard)
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('accountId', ParseIntPipe) accountId: number,
    @Req() req: express.Request,
    @Body() transactionRequest: TransactionCreateDto,
  ) {
    const transaction = await this.transactionService.create(
      userId,
      accountId,
      req,
      transactionRequest,
    );
    return plainToInstance(TransactionResponseDto, transaction);
  }
  @Get()
  @ApiOperation({ description: 'Get all tranactions for an account' })
  @UseGuards(AuthGuard)
  async getAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('accountId', ParseIntPipe) accountId: number,
    @Req() req: express.Request,
  ): Promise<TransactionResponseDto[]> {
    const transactions = await this.transactionService.getAll(
      userId,
      accountId,
      req,
    );
    return plainToInstance(TransactionResponseDto, transactions);
  }
  @Get(':toAccountId')
  @ApiOperation({ description: 'Get all tranactions with a specfic account' })
  @UseGuards(AuthGuard)
  async getOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('toAccountId', ParseIntPipe) toAccountId: number,

    @Req() req: express.Request,
  ): Promise<TransactionResponseDto[]> {
    const transactions = await this.transactionService.getOne(
      userId,
      accountId,
      req,
      toAccountId,
    );
    return plainToInstance(TransactionResponseDto, transactions);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: express.Request,
  ): Promise<void> {
    await this.transactionService.delete(
      userId,
      accountId,
      id,
      (req as any).user.userId,
    );
  }
}
