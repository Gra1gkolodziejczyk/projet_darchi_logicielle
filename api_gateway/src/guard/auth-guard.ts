import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
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

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers || !request.headers.authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    //try {
    //  const payload = this.jwtService.verify(token, {
    //    secret: 'jesuislesecretjwt',
    //  });
    //  request.user = payload;
    //  return true;
//
//
    //} catch (error) {
    //  throw new UnauthorizedException('Invalid or expired token');
    //}

    return this.client.send('VERIFY_TOKEN', {
      headers: request.headers
    })
    .pipe(
      tap((res) => {
        request.user = res
      }),
      map(() => true),
      catchError(() => of(false))
    )
  }
}
