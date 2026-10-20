import { Exclude, Expose, Type } from 'class-transformer';


@Exclude()
export class UserLanguageResponse {
  @Expose()
  userId: number;

  @Expose()
  languageId: number;

}
