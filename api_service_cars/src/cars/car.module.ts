import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { AuthClientService } from '../auth/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [CarController],
  providers: [CarService, PrismaService, AuthClientService],
})
export class CarModule {}
