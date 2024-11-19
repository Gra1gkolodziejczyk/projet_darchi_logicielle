import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  hash: string;
}
