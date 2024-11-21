import { CarDto } from '../dto/car.dto';
import { Body, Controller, Req, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CarService } from './car.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @MessagePattern('CREATE_CAR')
  @Post('/create')
  async createCar(@Body() carDto: CarDto) {
    return this.carService.createCar(carDto);
  }
}
