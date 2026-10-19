import { Exclude, Expose, Type } from 'class-transformer';
import { LanguageResponseDto } from '../../../languages/dto/language-response.dto';

@Exclude()
export class UserLanguageResponse {
  @Expose()
  userId: number;

  @Expose()
  languageId: number;

  @Expose()
  @Type(() => LanguageResponseDto)
  language: LanguageResponseDto;
}
