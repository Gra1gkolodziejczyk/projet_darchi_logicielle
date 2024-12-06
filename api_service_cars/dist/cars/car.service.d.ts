import { PrismaService } from '../prisma/prisma.service';
import { CarDto } from '../dto/car.dto';
export declare class CarService {
    private prisma;
    constructor(prisma: PrismaService);
    createCar(carDto: CarDto): Promise<{
        userId: number;
        image: string;
        model: string;
        brand: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    updateCar(carDto: CarDto & {
        id: string;
    }): Promise<{
        userId: number;
        image: string;
        model: string;
        brand: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    deleteCar(id: number): Promise<{
        userId: number;
        image: string;
        model: string;
        brand: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    getCarById(id: number): Promise<{
        userId: number;
        image: string;
        model: string;
        brand: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    getAllCars(): Promise<{
        userId: number;
        image: string;
        model: string;
        brand: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
}
