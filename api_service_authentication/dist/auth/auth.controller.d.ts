import { AuthService } from './auth.service';
import RegisterDto from '../dto/register.dto';
import { Tokens } from './types/token.type';
import LoginDto from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    signIn(dto: LoginDto): Promise<Tokens>;
    signUp(dto: RegisterDto): Promise<Tokens>;
    signOut(userId: number): Promise<void>;
    verifyToken(data: any): Promise<any>;
    refreshToken(userId: number, refreshToken: string): Promise<Tokens>;
    validateToken(token: string): boolean;
    getUser(userId: number): any;
}
