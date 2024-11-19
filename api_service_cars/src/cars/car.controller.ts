import { CarDto } from '../dto/car.dto';
import { Body, Controller, Req, UseGuards, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @MessagePattern('CREATE_CAR')
  // @UseGuards()
  @Post('/create')
  async createCar(@Body() carDto: CarDto, @Req() req) {
    // const userId = this.req.user.id;
    return this.carService.createCar(carDto);
  }
}
