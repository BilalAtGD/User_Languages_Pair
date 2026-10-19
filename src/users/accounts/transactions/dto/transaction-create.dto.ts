import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  
 
  toAccountId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
