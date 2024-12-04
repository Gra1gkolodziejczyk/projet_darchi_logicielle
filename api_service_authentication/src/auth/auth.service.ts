import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import RegisterDto from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/token.type';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import LoginDto from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(dto: LoginDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    const passwordMatches = await bcrypt.compare(dto.hash, user.hash);

    if (!user || !passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signUp(dto: RegisterDto): Promise<Tokens> {
    const hash = await this.hashData(dto.hash);

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
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Access denied');

    const refreshTokenMatch = await bcrypt.compare(refreshToken, user.hashRt);

    if (!refreshTokenMatch) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signOut(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
  }

  async findUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }

  async hashData(data: string): Promise<string> {
    if (!data) {
      throw new Error('Data to hash cannot be empty.');
    }
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: jwtConstants.secret,
          expiresIn: '1h', // 1 heure
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: jwtConstants.secret,
          expiresIn: '7d', // 7 jours
        },
      ),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async validateAccessToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });

      // Cherche l'utilisateur dans la BDD en fonction du "sub" (userId)
      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.sub,
        },
      });

      if (!user)
        throw new ForbiddenException('Invalid token or user not found');
      return user; // retourne l'utilisateur si tout est valide
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
