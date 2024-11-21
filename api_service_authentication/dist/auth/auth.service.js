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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("./constant");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signIn(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException('Access denied');
        const passwordMatches = await bcrypt.compare(dto.hash, user.hash);
        if (!passwordMatches)
            throw new common_1.ForbiddenException('Access denied');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async signUp(dto) {
        const hash = await this.hashData(dto.hash);
        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
                firstname: dto.firstname,
                lastname: dto.lastname,
                age: dto.age,
            },
        });
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRefreshToken(newUser.id, tokens.refresh_token);
        return tokens;
    }
    async refreshToken(userId, refreshToken) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException('Access denied');
        const refreshTokenMatch = await bcrypt.compare(refreshToken, user.hashRt);
        if (!refreshTokenMatch)
            throw new common_1.ForbiddenException('Access denied');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async signOut(userId) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashRt: {
                    not: null,
                },
            },
            data: {
                hashRt: null,
            },
        });
    }
    async findUserById(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return user;
    }
    async updateRefreshToken(userId, refreshToken) {
        const hash = await this.hashData(refreshToken);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashRt: hash,
            },
        });
    }
    async hashData(data) {
        if (!data) {
            throw new Error('Data to hash cannot be empty.');
        }
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(data, salt);
    }
    async getTokens(userId, email) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ sub: userId, email }, {
                secret: constant_1.jwtConstants.secret,
                expiresIn: '1h',
            }),
            this.jwtService.signAsync({ sub: userId, email }, {
                secret: constant_1.jwtConstants.secret,
                expiresIn: '7d',
            }),
        ]);
        return { access_token: accessToken, refresh_token: refreshToken };
    }
    async validateAccessToken(token) {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: constant_1.jwtConstants.secret,
            });
            const user = await this.prisma.user.findUnique({
                where: {
                    id: decoded.sub,
                },
            });
            if (!user)
                throw new common_1.ForbiddenException('Invalid token or user not found');
            return user;
        }
        catch (error) {
            throw new common_1.ForbiddenException('Invalid or expired token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map