import { PrismaService } from '../prisma/prisma.service';
import { CarDto } from '../dto/car.dto';
export declare class CarService {
    private prisma;
    constructor(prisma: PrismaService);
    createCar(carDto: CarDto, userId: number): Promise<{
        model: string;
        brand: string;
        color: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
