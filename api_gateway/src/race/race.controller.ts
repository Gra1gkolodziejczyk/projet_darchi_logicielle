import {Body, Controller, ForbiddenException, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AuthGuard } from '../guard/auth-guard';
import {CarDto} from "../car/dto";
import {RaceDto} from "./dto";

@Controller('race')
export class RaceController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 9004,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllRaces() {
    return this.client.send('GET_ALL_RACES', {});
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getRaceById(@Param('id') id: number) {
    return this.client.send('GET_RACE_ID', id);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createRace(@Body() payload: RaceDto, @Req() req) {
    const user = req.user;
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    return this.client.send('CREATE_RACE', { ...payload });
  }
}
