import { CarDto } from '../dto/car.dto';
import { Body, Controller, Req, Post, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../guard/auth-guard';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(AuthGuard)
  @MessagePattern('CREATE_CAR')
  @Post('/create')
  async createCar(@Body() carDto: CarDto, @Req() req) {
    const userId = req.user.id;
    return this.carService.createCar(carDto, userId);
  }
}
