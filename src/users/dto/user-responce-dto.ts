import { Exclude, Expose, Transform } from 'class-transformer';



@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  
}
