import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('AUTHENTICATED_USER')
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: LoginDto): Promise<{ access_token: Awaited<string>[] }> {
    return this.authService.signIn(dto);
  }

  @MessagePattern('USER_CREATED')
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(
    @Body() dto: RegisterDto,
  ): Promise<{ access_token: Awaited<string>[] }> {
    return this.authService.signup(dto);
  }
}
