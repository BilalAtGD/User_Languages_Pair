import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateLanguageDto {

  @IsString()
  @IsNotEmpty()
  code: string;
}
