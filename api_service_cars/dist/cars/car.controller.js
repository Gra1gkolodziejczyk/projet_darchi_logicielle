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
    async createCar(carDto, req) {
        return this.carService.createCar(carDto);
    }
};
exports.CarController = CarController;
__decorate([
    (0, microservices_1.MessagePattern)('CREATE_CAR'),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.CarDto, Object]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "createCar", null);
exports.CarController = CarController = __decorate([
    (0, common_1.Controller)('car'),
    __metadata("design:paramtypes", [car_service_1.CarService])
], CarController);
//# sourceMappingURL=car.controller.js.map