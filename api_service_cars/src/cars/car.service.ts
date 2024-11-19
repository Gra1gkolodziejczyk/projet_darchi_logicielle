import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CarDto } from '../dto/car.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}
  async createCar(carDto: CarDto, userId = 1) {
    const car = await this.prisma.car.create({
      data: {
        userId: userId,
        model: carDto.model,
        brand: carDto.brand,
        color: carDto.color,
      },
    });
    return car;
  }
}
