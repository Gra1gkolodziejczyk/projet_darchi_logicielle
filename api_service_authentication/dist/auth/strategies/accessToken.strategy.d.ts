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
        id: number;
        email: string;
        firstname: string;
        lastname: string;
        hash: string;
        hashRt: string | null;
        age: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
