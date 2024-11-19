import { Body, Controller, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { LoginDto, RegisterDto } from './dto';

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
}
