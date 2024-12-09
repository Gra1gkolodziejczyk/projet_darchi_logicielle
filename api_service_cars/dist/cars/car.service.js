"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CarService = class CarService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCar(carDto) {
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
    async updateCar(carDto) {
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
    async deleteCar(id) {
        const car = await this.prisma.car.delete({
            where: { id },
        });
        return car;
    }
    async getCarById(id) {
        const car = await this.prisma.car.findUnique({
            where: { id },
        });
        return car;
    }
    async getAllCars() {
        const cars = await this.prisma.car.findMany();
        return cars;
    }
    async checkCar(carId) {
        try {
            const car = await this.prisma.car.findUnique({
                where: { id: carId },
            });
            return !!car;
        }
        catch {
            return false;
        }
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarService);
//# sourceMappingURL=car.service.js.map