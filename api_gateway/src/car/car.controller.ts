import {Body, Controller, Post, Req, UseFilters, UseGuards} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CarDto } from './dto';
import { AuthGuard } from '../guard/auth-guard';
import { ExceptionFilter } from '../filters/rpc-exception.filter';

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

  @UseGuards(AuthGuard)
  @UseFilters(new ExceptionFilter())
  @Post('/create')
  createCar(@Body() payload: CarDto, @Req() req) {
    const user = req.user.sub;
    return this.client.send('CREATE_CAR', { ...payload, userId: user });
  }
}
