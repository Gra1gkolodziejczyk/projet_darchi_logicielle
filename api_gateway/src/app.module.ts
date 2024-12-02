import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { CarController } from './car/car.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RaceController } from './race/race.controller';
import { RankingController } from './ranking/ranking.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
      },
      {
        name: 'CAR_SERVICE',
        transport: Transport.TCP,
      },
      {
        name: 'RACE_SERVICE',
        transport: Transport.TCP,
      },
      {
        name: 'RANKING_SERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [
    AuthController,
    CarController,
    RaceController,
    RankingController,
  ],
  providers: [JwtService],
})
export class AppModule {}
