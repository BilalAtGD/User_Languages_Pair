import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { Transaction } from '../../../database/core/entities/transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Account } from '../../../database/core/entities/accounts.entity';

import { TransactionCreateDto } from './dto/transaction-create-dto';


@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly tranactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly dataSource: DataSource,
  ) {}
  async create(
    userId: number,
    accountId: number,
    @Req() req: Express.Request,
    transactionRequest: TransactionCreateDto,
  ): Promise<Transaction> {
    const currentUser = (req as any).user;
    if (currentUser?.userId !== userId) {
      throw new BadRequestException(
        'You are not allowed to change this user account balance',
      );
    }

    const fromAccount = await this.accountRepository.findOne({
      where: { user: { id: userId }, id: accountId },
    });
    if (!fromAccount) {
      throw new BadRequestException('This user has no access to this account');
    }

    const toAccount = await this.accountRepository.findOne({
      where: { id: transactionRequest.toAccountId },
    });

    if (!toAccount) {
      throw new NotFoundException(
        'The requested transaction account not found',
      );
    }
    if (fromAccount.balance < transactionRequest.amount) {
      throw new BadRequestException('Insufficient');
    }

    fromAccount.balance = fromAccount.balance - transactionRequest.amount;
    toAccount.balance = toAccount.balance + transactionRequest.amount;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(Account, fromAccount);
      await queryRunner.manager.save(Account, toAccount);

      const transaction = queryRunner.manager.create(Transaction, {
        fromAccount,
        toAccount,
        amount: transactionRequest.amount,
      });

      const savedTransaction = await queryRunner.manager.save(
        Transaction,
        transaction,
      );

      await queryRunner.commitTransaction();

      return savedTransaction;
    } catch (err) {
      console.log(err)
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await queryRunner.release();
    }
  }
  async getAll(
    userId: number,
    accountId: number,
    @Req() req: Express.Request,
  ): Promise<Transaction[]> {
    const currentUser = (req as any).user;

    if (currentUser?.userId !== userId) {
      throw new BadRequestException(
        'You are not allowed to see this user account tranactions',
      );
    }

    const fromAccount = await this.accountRepository.findOne({
      where: { user: { id: userId }, id: accountId },
    });

    if (!fromAccount) {
      throw new BadRequestException('This user has no access to this account');
    }
    return this.tranactionRepository.find({
      where: { fromAccount: { id: accountId } },
    });
  }
  async getOne(
    userId: number,
    accountId: number,
    @Req() req: Express.Request,
    toAccountId: number,
  ): Promise<Transaction[]> {
    const currentUser = (req as any).user;
    if (currentUser?.userId !== userId) {
      throw new BadRequestException(
        'You are not allowed to change this user account balance',
      );
    }

    const fromAccount = await this.tranactionRepository.findOne({
      where: { fromAccount: { id: userId }, id: accountId },
    });

    if (!fromAccount) {
      throw new BadRequestException('This user has no access to this account');
    }
    return this.tranactionRepository.find({
      where: {
        fromAccount: { id: accountId },
        toAccount: { id: toAccountId },
      },
    });
  }
  async delete(userId:number,accountId:number,transactionId:number,userIdFromToken: number):Promise<void>{
    if (userId !== userIdFromToken) {
      throw new BadRequestException(
        'You are not allowed to delete this user account transaction',
      );
    }

    const account = await this.accountRepository.findOne({
        where: { user: { id: userId }, id: accountId },
    });

    if (!account) {
      throw new NotFoundException(`You have no account in our system with account-id ${accountId}`);
    }
    const transaction=await this.tranactionRepository.findOne({
      where:{fromAccount : {id:accountId}}
    })
    if(!transaction){
      throw new NotFoundException(`Transaction with id ${transactionId} not present in your account`)
    }
    await this.tranactionRepository.delete(transaction)

  }
}
