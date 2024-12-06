import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class RaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsDate()
  date: string;
  @IsNotEmpty()
  @IsString()
  location: string;
}
