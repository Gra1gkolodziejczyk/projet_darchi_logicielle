import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export default class RegisterDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  hash: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsInt()
  age: number;
}
