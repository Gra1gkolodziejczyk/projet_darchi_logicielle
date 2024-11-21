"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const car_module_1 = require("./cars/car.module");
const car_controller_1 = require("./cars/car.controller");
const car_service_1 = require("./cars/car.service");
const prisma_service_1 = require("./prisma/prisma.service");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const process = require("process");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            }),
            prisma_module_1.PrismaModule,
            car_module_1.CarModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'jesuislesecretjwt',
                signOptions: { expiresIn: '1h' },
            }),
            microservices_1.ClientsModule.register([
                {
                    name: 'CAR_SERVICE',
                    transport: microservices_1.Transport.TCP,
                },
            ]),
        ],
        controllers: [car_controller_1.CarController],
        providers: [car_service_1.CarService, prisma_service_1.PrismaService, jwt_1.JwtService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map