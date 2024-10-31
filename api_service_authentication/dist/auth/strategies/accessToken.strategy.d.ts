import { Strategy } from 'passport-jwt';
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor();
    validate(payload: Record<string, string>): Promise<{
        userId: string;
        email: string;
    }>;
}
export {};
