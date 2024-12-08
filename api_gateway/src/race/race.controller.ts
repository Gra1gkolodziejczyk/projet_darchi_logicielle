import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AuthGuard } from '../guard/auth-guard';
import { RaceDto } from './dto';
import { catchError, firstValueFrom, of } from 'rxjs';

@Controller('race')
export class RaceController {
  private client: ClientProxy;
  private clientCar: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 9004,
      },
    });
    this.clientCar = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 9003,
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

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  updateCar(@Param('id') id: number, @Body() payload: RaceDto, @Req() req) {
    return this.client.send('UPDATE_RACE', {
      id: id,
      ...payload,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  deleteRace(@Param('id') id: number) {
    return this.client.send('DELETE_RACE', id);
  }

  @UseGuards(AuthGuard)
  @Post('/:raceId/participants')
  async addParticipant(
    @Param('raceId') raceId: number,
    @Body('carId') carId: number,
    @Req() req,
  ) {
    const user = req.user;
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const carExists = await firstValueFrom(this.clientCar.send<boolean>('CHECK_CAR', { carId }));
    
    if (!carExists) {
      throw new BadRequestException("La voiture n'existe pas.");
    }

    return this.client.send('ADD_PARTICIPANT', { raceId, carId })
      .pipe(
        catchError(val => of({ error: val.error }))
      );
  }

  @UseGuards(AuthGuard)
  @Post('/:raceId/start')
  async startRace(
    @Param('raceId') raceId: number
  ) {
    return this.client.send('START_RACE', raceId)
      .pipe(
        catchError(val => of({ error: val.message }))
      );
  }
}
