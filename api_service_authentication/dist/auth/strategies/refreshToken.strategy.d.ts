import { Strategy } from 'passport-local';
import { Request } from 'express';
type JwtPayload = {
    sub: string;
    email: string;
};
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(req: Request, payload: JwtPayload): Promise<{
        userId: string;
        email: string;
        refreshToken: string;
    }>;
}
export {};
