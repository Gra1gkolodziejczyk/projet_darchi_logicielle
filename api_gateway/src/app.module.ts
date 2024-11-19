import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import {CarController} from "./car/car.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
      },
      {
        name: 'CAR_SERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [AuthController, CarController],
  providers: [],
})
export class AppModule {}
