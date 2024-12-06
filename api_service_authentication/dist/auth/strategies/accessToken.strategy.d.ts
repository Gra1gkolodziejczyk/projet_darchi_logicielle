import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
type JwtPayload = {
    sub: number;
    email: string;
};
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<{
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
export {};
