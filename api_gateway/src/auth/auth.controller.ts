import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { LoginDto, RegisterDto } from './dto';
import { AuthGuard } from '../guard/auth-guard';

@Controller('auth')
export class AuthController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 9002,
      },
    });
  }

  @Post('login')
  async signIn(@Body() payload: LoginDto) {
    return this.client.send('AUTHENTICATED_USER', payload);
  }

  @Post('register')
  async signUp(@Body() payload: RegisterDto) {
    return this.client.send('USER_CREATED', payload);
  }

  @Post('signout')
  async signOut(@Body() userId: number) {
    return this.client.send('SIGNED_OUT', userId);
  }

  @Post('refreshToken')
  async refreshToken(@Body() refreshToken: string) {
    return this.client.send('REFRESHED_TOKEN', refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    return req.user.id;
  }
}
