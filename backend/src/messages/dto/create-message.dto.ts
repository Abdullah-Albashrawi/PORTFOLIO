import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Message must be at least 5 characters long' })
  message: string;
}
