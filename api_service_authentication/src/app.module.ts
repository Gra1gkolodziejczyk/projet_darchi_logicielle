import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    JwtModule,
    ClientsModule.register([
      {
        name: 'Authentication',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3000,
        },
      },
    ]),],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class AppModule {}
