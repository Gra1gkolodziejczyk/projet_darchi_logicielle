import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CarDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
