import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private client: ClientProxy;

  constructor(private jwtService: JwtService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 9002,
      },
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers?.authorization);
    console.log(request.headers);
    const token = request.headers?.authorization;

    if (!token) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: 'jesuislesecretjwt',
      });
      const userId = payload.sub;
      console.log(userId);
      const user = await firstValueFrom(this.client.send('USER_ID', userId));
      request.user = user;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
