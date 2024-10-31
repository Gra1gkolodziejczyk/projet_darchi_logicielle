import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: LoginDto): Promise<{ access_token: Awaited<string>[] }> {
    return this.authService.signIn(dto);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(
    @Body() dto: RegisterDto,
  ): Promise<{ access_token: Awaited<string>[] }> {
    return this.authService.signIn(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    return this.authService.logout();
  }
}
