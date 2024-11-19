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
        port: 9002,
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

  async getTokens(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        secret: jwtConstants.secret,
        expiresIn: '15m', // 15 minutes
      },
    );
    return { access_token: accessToken };
  }

  async hashData(data: string): Promise<string> {
    if (!data) {
      throw new Error('Data to hash cannot be empty.');
    }
    const salt = await bcrypt.genSalt(10); // Génère un sel asynchrone
    return bcrypt.hash(data, salt); // Hachage asynchrone
  }

  async signIn(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatches) {
      throw new Error('Invalid credentials.');
    }

    const tokens = await this.getTokens(user.id, user.email);
    return tokens;
  }

  async signup(dto: RegisterDto): Promise<{ access_token: string }> {
    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
        firstname: dto.firstname,
        lastname: dto.lastname,
        age: dto.age,
      },
    });

    return this.getTokens(newUser.id, newUser.email);
  }
}
