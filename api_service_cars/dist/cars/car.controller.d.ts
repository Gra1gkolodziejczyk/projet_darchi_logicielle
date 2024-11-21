import { CarDto } from '../dto/car.dto';
import { CarService } from './car.service';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    createCar(carDto: CarDto, req: any): Promise<{
        model: string;
        brand: string;
        color: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
