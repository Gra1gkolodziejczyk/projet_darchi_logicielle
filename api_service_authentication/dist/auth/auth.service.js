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
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("./constant");
const microservices_1 = require("@nestjs/microservices");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.TCP,
            options: {
                host: 'localhost',
                port: 9002,
            },
        });
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user)
            return null;
        const passwordMatches = await bcrypt.compare(password, user.hash);
        if (!passwordMatches)
            return null;
        return user;
    }
    async getTokens(userId, email) {
        const accessToken = await this.jwtService.signAsync({ sub: userId, email }, {
            secret: constant_1.jwtConstants.secret,
            expiresIn: '15m',
        });
        return { access_token: accessToken };
    }
    async hashData(data) {
        if (!data) {
            throw new Error('Data to hash cannot be empty.');
        }
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(data, salt);
    }
    async signIn(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new Error('User not found.');
        }
        const passwordMatches = await bcrypt.compare(dto.password, user.hash);
        if (!passwordMatches) {
            throw new Error('Invalid credentials.');
        }
        const tokens = await this.getTokens(user.id, user.email);
        return tokens;
    }
    async signup(dto) {
        const hash = await this.hashData(dto.password);
        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
                firstname: dto.firstname,
                lastname: dto.lastname,
                age: dto.age,
            },
        });
        return this.getTokens(newUser.id, newUser.email);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map