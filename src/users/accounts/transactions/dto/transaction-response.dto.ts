import { Exclude, Expose } from "class-transformer";
@Exclude()
export class TransactionResponseDto{
    @Expose()
    amount:number

    @Expose()
    fromAccountId:number

    @Expose()
    toAccountId:number

    @Expose()
    createdAt:Date
}