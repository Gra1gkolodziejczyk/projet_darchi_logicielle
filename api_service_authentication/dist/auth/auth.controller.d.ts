import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(dto: LoginDto): Promise<{
        access_token: Awaited<string>[];
    }>;
    signup(dto: RegisterDto): Promise<{
        access_token: Awaited<string>[];
    }>;
}
