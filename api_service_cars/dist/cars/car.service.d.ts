import { PrismaService } from '../prisma/prisma.service';
import { CarDto } from '../dto/car.dto';
export declare class CarService {
    private prisma;
    constructor(prisma: PrismaService);
    createCar(carDto: CarDto): Promise<{
        userId: number;
        model: string;
        brand: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
