"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const passport_jwt_1 = require("passport-jwt");
const constant_1 = require("../constant");
let RefreshTokenStrategy = class RefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: constant_1.jwtConstants.secret,
            passReqToCallback: true,
        });
    }
    async validate(req, payload) {
        console.log(req.headers);
        console.log(req.headers.authorization);
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new common_1.ForbiddenException('Authorization header is missing');
        }
        const refreshToken = authHeader.replace('Bearer', '').trim();
        if (!refreshToken) {
            throw new common_1.ForbiddenException('Refresh token missing');
        }
        return {
            userId: payload.sub,
            email: payload.email,
            refreshToken,
        };
    }
};
exports.RefreshTokenStrategy = RefreshTokenStrategy;
exports.RefreshTokenStrategy = RefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RefreshTokenStrategy);
//# sourceMappingURL=refreshToken.strategy.js.map