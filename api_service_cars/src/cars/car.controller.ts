import { CarDto } from '../dto/car.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CarService } from './car.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @MessagePattern('CREATE_CAR')
  @Post('/create')
  async createCar(@Body() carDto: CarDto) {
    return this.carService.createCar(carDto);
  }

  @MessagePattern('UPDATE_CAR')
  @Put('/update/:id')
  updateCar(@Param('id') id: number, @Body() carDto: CarDto) {
    return this.carService.updateCar(id, carDto);
  }

  @MessagePattern('DELETE_CAR')
  @Delete('/delete/:id')
  deleteCar(@Param('id') id: number) {
    return this.carService.deleteCar(id);
  }

  @MessagePattern('GET_CARS')
  @Get()
  getAllCars() {
    return this.carService.getAllCars();
  }

  @MessagePattern('GET_CAR_ID')
  @Get('/:id')
  getCarById(@Param('id') id: number) {
    return this.carService.getCarById(id);
  }
}
