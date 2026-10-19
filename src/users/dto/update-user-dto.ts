import { IsString,IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  
  
  @IsString()
  @IsNotEmpty()
  
  name: string;

}
