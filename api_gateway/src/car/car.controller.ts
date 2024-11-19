import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CarDto } from './dto';

@Controller('car')
export class CarController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 9003,
      },
    });
  }

  @Post('/create')
  async createCar(@Body() payload: CarDto, @Req() req) {
    return this.client.send('CREATE_CAR', payload);
  }
}
