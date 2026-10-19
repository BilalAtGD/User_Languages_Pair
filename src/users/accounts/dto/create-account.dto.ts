import { IsEnum, IsNotEmpty } from "class-validator";
import { AccountType } from "../../../database/enums/account-types.enum";

export class CreateAccountDto{
    @IsNotEmpty()
    @IsEnum(
        AccountType,
        {
            message:"Account type can only be current, saving or islamic"
        }
    )
    type:AccountType
}