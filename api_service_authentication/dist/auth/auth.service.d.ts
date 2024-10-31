import { LoginDto } from '../dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User as PrismaUser } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private client;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<PrismaUser | null>;
    getTokens(userId: number, email: string): Promise<{
        access_token: [string];
    }>;
    hashData(data: string): string;
    signIn(dto: LoginDto): Promise<{
        access_token: Awaited<string>[];
    }>;
    signup(dto: RegisterDto): Promise<{
        access_token: Awaited<string>[];
    }>;
}
