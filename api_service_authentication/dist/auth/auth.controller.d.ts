import { AuthService } from './auth.service';
import RegisterDto from '../dto/register.dto';
import { Tokens } from './types/token.type';
import LoginDto from '../dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(dto: LoginDto): Promise<Tokens>;
    signUp(dto: RegisterDto): Promise<Tokens>;
    signOut(userId: number): Promise<void>;
    refreshToken(userId: number, refreshToken: string): Promise<Tokens>;
}
