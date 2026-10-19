import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignLanguageDto {

  @IsNumber()
  @IsNotEmpty()
  languageId: number;
}
