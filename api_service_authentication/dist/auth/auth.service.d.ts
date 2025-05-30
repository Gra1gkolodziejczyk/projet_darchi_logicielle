import { PrismaService } from '../prisma/prisma.service';
import RegisterDto from '../dto/register.dto';
import { Tokens } from './types/token.type';
import { JwtService } from '@nestjs/jwt';
import LoginDto from '../dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signIn(dto: LoginDto): Promise<Tokens>;
    signUp(dto: RegisterDto): Promise<Tokens>;
    refreshToken(userId: number, refreshToken: string): Promise<Tokens>;
    signOut(userId: number): Promise<void>;
    findUserById(userId: number): Promise<{
        email: string;
        hash: string;
        firstname: string;
        lastname: string;
        age: number;
        id: number;
        hashRt: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    hashData(data: string): Promise<string>;
    getTokens(userId: number, email: string): Promise<Tokens>;
    validateAccessToken(token: string): Promise<any>;
    getUserById(userId: number): Promise<{
        email: string;
        hash: string;
        firstname: string;
        lastname: string;
        age: number;
        id: number;
        hashRt: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
