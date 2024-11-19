import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AuthClientService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'AUTHENTICATION',
        port: 9002,
      },
    });
  }

  async validateToken(token: string) {
    return this.client.send('VALIDATE_TOKEN', token).toPromise();
  }
}
