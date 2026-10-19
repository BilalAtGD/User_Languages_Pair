import { Exclude, Expose } from "class-transformer";



@Exclude()
export class AccountResponseDto{

    @Expose()
    id: number
    @Expose()
    balance:number
    @Expose()
    type:string

    @Expose()
    createdAt:Date

    @Expose()
    updatedAt:Date

}