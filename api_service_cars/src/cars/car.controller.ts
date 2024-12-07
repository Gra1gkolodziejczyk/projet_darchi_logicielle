import { CarDto } from '../dto/car.dto';
import { Body, Controller, Get, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @MessagePattern('CREATE_CAR')
  async createCar(@Body() carDto: CarDto) {
    return this.carService.createCar(carDto);
  }

  @MessagePattern('UPDATE_CAR')
  @Put('/update/:id')
  updateCar(@Body() carDto: CarDto & { id: string }) {
    return this.carService.updateCar(carDto);
  }

  @MessagePattern('DELETE_CAR')
  deleteCar(id: string) {
    return this.carService.deleteCar(parseInt(id));
  }

  @MessagePattern('GET_CARS')
  @Get()
  getAllCars() {
    return this.carService.getAllCars();
  }

  @MessagePattern('GET_CAR_ID')
  getCarById(id: string) {
    return this.carService.getCarById(parseInt(id));
  }

  @MessagePattern('CHECK_CAR')
  async checkCar({ carId }: { carId: number }): Promise<boolean> {
    const car = await this.carService.checkCar(carId);
    return !!car;
  }
}
