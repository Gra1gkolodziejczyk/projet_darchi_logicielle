import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';

@Module({
  imports: [PrismaModule],
  controllers: [RaceController],
  providers: [RaceService, PrismaService, JwtService],
})
export class RaceModule {}
