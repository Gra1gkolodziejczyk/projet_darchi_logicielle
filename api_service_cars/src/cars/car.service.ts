import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CarDto } from '../dto/car.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}
  async createCar(carDto: CarDto) {
    const car = await this.prisma.car.create({
      data: {
        userId: carDto.userId,
        model: carDto.model,
        brand: carDto.brand,
        color: carDto.color,
        image: carDto.image,
      },
    });
    return car;
  }

  async updateCar(carDto: CarDto & { id: string }) {
    const car = await this.prisma.car.update({
      where: { id: parseInt(carDto.id), userId: carDto.userId },
      data: {
        image: carDto.image,
        userId: carDto.userId,
        model: carDto.model,
        brand: carDto.brand,
        color: carDto.color,
      },
    });
    return car;
  }

  async deleteCar(id: number) {
    const car = await this.prisma.car.delete({
      where: { id },
    });
    return car;
  }

  async getCarById(id: number) {
    const car = await this.prisma.car.findUnique({
      where: { id },
    });
    return car;
  }

  async getAllCars() {
    const cars = await this.prisma.car.findMany();
    return cars;
  }

  async checkCar(carId: number): Promise<boolean> {
    const car = await this.prisma.car.findUnique({
      where: { id: carId },
    });

    // Retourne true si la voiture existe, sinon false
    return !!car;
  }
}
