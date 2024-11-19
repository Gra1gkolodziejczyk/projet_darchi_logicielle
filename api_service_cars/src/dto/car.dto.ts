import { IsNotEmpty, IsString } from 'class-validator';
export class CarDto {
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
