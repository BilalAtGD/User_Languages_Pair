import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../database/core/entities/account.entity';

import { UpdateBalanceDto } from './dto/balance-update.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { User } from '../../database/core/entities/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getAllByUserId(userId: number, id: number): Promise<Account[]> {
    if (userId !== id) {
      throw new BadRequestException(
        'You are not allowed to see this user account',
      );
    }

    const accounts = await this.accountRepository.find({
      where: { user: { id: userId } },
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
      where: { user: { id: userId }, id: accountId },
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

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} was not found`);
    }

    const newAccount = this.accountRepository.create({
      balance: 0,
      type: accountBody.type,
      user: user,
    });
    try {
      await this.accountRepository.save(newAccount);
    } catch (err) {
      throw new BadRequestException(
        `That account is not being created as due to following DB constraint ${err}`,
      );
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
      where: { user: { id: userId }, id: accountId },
    });

    if (!account) {
      throw new NotFoundException(
        `You have no account in our system with account-id ${accountId}`,
      );
    }

    account.balance = updated.balance;
    return this.accountRepository.save(account);
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
      where: { id: accountId, user: { id: userId } },
    });
    if (!account) {
      throw new NotFoundException(`You have no account with ${accountId}`);
    }
    await this.accountRepository.delete(accountId);
  }
}
