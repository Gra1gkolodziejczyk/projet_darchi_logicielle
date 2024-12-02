import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AuthGuard } from '../guard/auth-guard';
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

  @UseGuards(AuthGuard)
  @Post('/create')
  createCar(@Body() payload: CarDto, @Req() req) {
    return this.client.send('CREATE_CAR', { ...payload, userId: req.user.id });
  }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  updateCar(@Param('id') id: number, @Body() payload: CarDto, @Req() req) {
    return this.client.send('UPDATE_CAR', {
      id: id,
      ...payload,
      userId: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  deleteCar(@Param('id') id: number) {
    return this.client.send('DELETE_CAR', { id });
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getCarById(@Param('id') id: number) {
    return this.client.send('GET_CAR_ID', { id });
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllCars() {
    return this.client.send('GET_CARS', {});
  }
}
