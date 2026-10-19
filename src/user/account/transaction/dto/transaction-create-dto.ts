import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class TransactionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  
 
  toAccountId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
