import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  hash: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  hash: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  lastname: string;

  @IsNotEmpty()
  @IsInt()
  age: number;
}
