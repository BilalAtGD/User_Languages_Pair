import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {

  /**
   * **Constraints:** Name must have at least 3 characters.
   * @example Bilal
   */
  @IsString()
  @Length(3, 100) // Changed to specify a min of 3 and max of 100
  @IsNotEmpty()
  name: string;

  /**
   * The primary email address of the user
   * @example bilal@example.com
   */
  @ApiProperty({
    description: "The primary email address of the user",
    example: "bilal@example.com"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * The account password
   * @example SecureP@ss123
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
