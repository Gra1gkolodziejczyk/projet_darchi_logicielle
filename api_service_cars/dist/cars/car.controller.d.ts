import { CarDto } from '../dto/car.dto';
import { CarService } from './car.service';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
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
