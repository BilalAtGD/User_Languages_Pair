import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateBalanceDto{
    
    @IsNumber()
    @IsNotEmpty()
    balance:number


}