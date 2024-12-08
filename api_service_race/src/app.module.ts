import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RaceModule } from './race/race.module';
import { RaceController } from './race/race.controller';
import { RaceService } from './race/race.service';
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
    RaceModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jesuislesecretjwt', // Assurez-vous que la clé est identique à celle de l'auth-service
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: 'RACE_SERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [RaceController],
  providers: [RaceService, PrismaService, JwtService],
})
export class AppModule {}
