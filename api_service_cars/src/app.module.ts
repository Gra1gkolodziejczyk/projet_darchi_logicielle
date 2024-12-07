import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CarModule } from './cars/car.module';
import { CarController } from './cars/car.controller';
import { CarService } from './cars/car.service';
import { PrismaService } from './prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PrismaModule,
    CarModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jesuislesecretjwt', // Assurez-vous que la clé est identique à celle de l'auth-service
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: 'CAR_SERVICE',
        transport: Transport.TCP,
      },
    ]),
    ClientsModule.register([
      {
        name: 'RACE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 9004,
        },
      },
    ]),
  ],
  controllers: [CarController],
  providers: [CarService, PrismaService, JwtService],
})
export class AppModule {}
