import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Account } from '../../database/core/entities/account.entity';

import { UpdateBalanceDto } from './dto/balance-update.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { errorCodes } from '../../utils/db-errors';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async getAllByUserId(userId: number, id: number): Promise<Account[]> {
    if (userId !== id) {
      throw new BadRequestException(
        'You are not allowed to see this user account',
      );
    }

    const accounts = await this.accountRepository.find({
      where: { userId },
    });

    if (!accounts.length) {
      throw new BadRequestException(
        `No accounts exists for this user-id: ${userId} `,
      );
    }

    return accounts;
  }
  async getOneById(
    userId: number,
    userIdFromToken: number,
    accountId: number,
  ): Promise<Account> {
    if (userId !== userIdFromToken) {
      throw new BadRequestException(
        'You are not allowed to see this user account',
      );
    }

    const account = await this.accountRepository.findOne({
      where: { userId, id: accountId },
    });

    if (!account) {
      throw new BadRequestException(
        `No accounts exists with this account-id: ${accountId} `,
      );
    }

    return account;
  }
  async create(
    userId: number,
    authIdFromToken: number,
    accountBody: CreateAccountDto,
  ) {
    if (userId !== authIdFromToken) {
      throw new BadRequestException(
        `You are not allowed to add account to this user id ${userId}`,
      );
    }

    const newAccount = this.accountRepository.create({
      balance: 0,
      type: accountBody.type,
      userId,
    });
    try {
      return await this.accountRepository.save(newAccount);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        const driverError = e.driverError as { code?: string };
        if (driverError.code == errorCodes.DUPLICATE_REQUEST) {
          throw new HttpException(
            'Account of this type for this specific user already exists',
            HttpStatus.CONFLICT,
          );
        }

        throw new HttpException(
          'Some error has happened',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new Error("Failed Request");
    }
  }
  async update(
    userId: number,
    userIdFromToken: number,
    updated: UpdateBalanceDto,
    accountId: number,
  ): Promise<Account> {
    if (userId !== userIdFromToken) {
      throw new BadRequestException(
        'You are not allowed to change this user account balance',
      );
    }

    const account = await this.accountRepository.findOne({
      where: { userId, id: accountId },
    });

    if (!account) {
      throw new NotFoundException(
        `You have no account in our system with account-id ${accountId}`,
      );
    }

    account.balance = updated.balance;
    try {
      return this.accountRepository.save(account);
    } catch {
      throw new Error('Internal Server Error');
    }
  }
  async delete(
    userId: number,
    accountId: number,
    userIdFromToken: number,
  ): Promise<void> {
    if (userId != userIdFromToken) {
      throw new BadRequestException(
        "You are not allowed to delete this user's account",
      );
    }
    const account = await this.accountRepository.findOne({
      where: { id: accountId, userId },
    });
    if (!account) {
      throw new NotFoundException(`You have no account with ${accountId}`);
    }
    await this.accountRepository.delete(accountId);
  }
}
