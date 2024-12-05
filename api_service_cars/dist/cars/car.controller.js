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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const car_dto_1 = require("../dto/car.dto");
const common_1 = require("@nestjs/common");
const car_service_1 = require("./car.service");
const microservices_1 = require("@nestjs/microservices");
let CarController = class CarController {
    constructor(carService) {
        this.carService = carService;
    }
    async createCar(carDto) {
        return this.carService.createCar(carDto);
    }
    updateCar(carDto) {
        return this.carService.updateCar(carDto);
    }
    deleteCar(id) {
        return this.carService.deleteCar(parseInt(id));
    }
    getAllCars() {
        return this.carService.getAllCars();
    }
    getCarById(id) {
        return this.carService.getCarById(parseInt(id));
    }
};
exports.CarController = CarController;
__decorate([
    (0, microservices_1.MessagePattern)('CREATE_CAR'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.CarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "createCar", null);
__decorate([
    (0, microservices_1.MessagePattern)('UPDATE_CAR'),
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "updateCar", null);
__decorate([
    (0, microservices_1.MessagePattern)('DELETE_CAR'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "deleteCar", null);
__decorate([
    (0, microservices_1.MessagePattern)('GET_CARS'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarController.prototype, "getAllCars", null);
__decorate([
    (0, microservices_1.MessagePattern)('GET_CAR_ID'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "getCarById", null);
exports.CarController = CarController = __decorate([
    (0, common_1.Controller)('car'),
    __metadata("design:paramtypes", [car_service_1.CarService])
], CarController);
//# sourceMappingURL=car.controller.js.map