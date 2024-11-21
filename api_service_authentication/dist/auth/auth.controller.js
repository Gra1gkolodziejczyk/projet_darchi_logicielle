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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("../dto/register.dto");
const login_dto_1 = require("../dto/login.dto");
const guards_1 = require("./guards");
const decorators_1 = require("./decorators");
const microservices_1 = require("@nestjs/microservices");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("./constant");
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    signIn(dto) {
        return this.authService.signIn(dto);
    }
    signUp(dto) {
        return this.authService.signUp(dto);
    }
    signOut(userId) {
        return this.authService.signOut(userId);
    }
    async verifyToken(data) {
        return data.user;
    }
    refreshToken(userId, refreshToken) {
        return this.authService.refreshToken(userId, refreshToken);
    }
    validateToken(token) {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: constant_1.jwtConstants.secret,
            });
            return decoded ? true : false;
        }
        catch (err) {
            console.error('Token validation failed:', err.message);
            return false;
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/signin'),
    (0, microservices_1.MessagePattern)('AUTHENTICATED_USER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/signup'),
    (0, microservices_1.MessagePattern)('USER_CREATED'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AccessTokenAuthGuard),
    (0, common_1.Post)('/signout'),
    (0, microservices_1.MessagePattern)('SIGNED_OUT'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AccessTokenAuthGuard),
    (0, microservices_1.MessagePattern)('VERIFY_TOKEN'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RefreshTokenAuthGuard),
    (0, common_1.Post)('/refresh'),
    (0, microservices_1.MessagePattern)('REFRESHED_TOKEN'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, decorators_1.GetCurrentUser)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, microservices_1.MessagePattern)('VALIDATE_TOKEN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Boolean)
], AuthController.prototype, "validateToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map