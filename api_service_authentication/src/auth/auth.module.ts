import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    RefreshTokenStrategy,
    AccessTokenStrategy,
    JwtService,
    PrismaService,
  ],
})
export class AuthModule {}
