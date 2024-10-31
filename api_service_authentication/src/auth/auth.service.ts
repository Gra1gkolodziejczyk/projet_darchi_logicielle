import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User as PrismaUser } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  private client: ClientProxy;

  constructor(private prisma: PrismaService, private jwtService: JwtService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3000,
      },
    });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<PrismaUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.hash);

    if (!passwordMatches) return null;

    return user;
  }

  async getTokens(userId: number, email: string) {
    const accessToken = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: jwtConstants.secret,
          expiresIn: 60 * 15,
        },
      ),
    ]);
    return { access_token: accessToken };
  }

  hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  async signIn(dto: LoginDto): Promise<{ access_token: Awaited<string>[] }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new Error('Access denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatches) throw new Error('Access denied');

    return this.getTokens(user.id, user.email);
  }

  async signup(dto: RegisterDto): Promise<{ access_token: Awaited<string>[] }> {
    const hash = this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
        firstname: dto.firstname,
        lastname: dto.lastname,
        age: dto.age,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    return tokens;
  }
}
