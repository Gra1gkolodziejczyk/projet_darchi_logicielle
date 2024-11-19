import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CarModule } from './cars/car.module';
import { CarController } from './cars/car.controller';
import { CarService } from './cars/car.service';
import { PrismaService } from './prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthClientService } from './auth/auth.service';

@Module({
  imports: [
    PrismaModule,
    CarModule,
    ClientsModule.register([
      {
        name: 'CAR_SERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [CarController],
  providers: [CarService, PrismaService, AuthClientService],
})
export class AppModule {}
