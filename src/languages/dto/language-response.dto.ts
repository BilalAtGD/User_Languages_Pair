import { ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LanguageResponseDto {
  
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;
}
