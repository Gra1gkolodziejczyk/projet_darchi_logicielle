import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from '../dto/register.dto';
import { Tokens } from './types/token.type';
import LoginDto from '../dto/login.dto';
import { AccessTokenAuthGuard, RefreshTokenAuthGuard } from './guards';
import { GetCurrentUser, GetCurrentUserId } from './decorators';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/signin')
  @MessagePattern('AUTHENTICATED_USER')
  signIn(@Body() dto: LoginDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Post('/signup')
  @MessagePattern('USER_CREATED')
  signUp(@Body() dto: RegisterDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Post('/signout')
  @MessagePattern('SIGNED_OUT')
  signOut(@GetCurrentUserId() userId: number) {
    return this.authService.signOut(userId);
  }

  @UseGuards(AccessTokenAuthGuard)
  @MessagePattern('VERIFY_TOKEN')
  async verifyToken(@Payload() data: any) {
    return data.user;
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post('/refresh')
  @MessagePattern('REFRESHED_TOKEN')
  refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @MessagePattern('VALIDATE_TOKEN')
  validateToken(token: string): boolean {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      return decoded ? true : false;
    } catch (err) {
      console.error('Token validation failed:', err.message);
      return false;
    }
  }
}
