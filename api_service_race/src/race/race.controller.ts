import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import { RaceService } from './race.service';
import { MessagePattern } from '@nestjs/microservices';
import { RaceDto } from '../dto/race.dto';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @MessagePattern('GET_ALL_RACES')
  @Get()
  getAllRaces() {
    return this.raceService.getAllRaces();
  }

  @MessagePattern('GET_RACE_ID')
  @Get()
  getRaceById(id: number) {
    return this.raceService.getRaceById(id);
  }

  @MessagePattern('CREATE_RACE')
  @Post('/create')
  async createRace(@Body() raceDto: RaceDto) {
    return this.raceService.createRace(raceDto);
  }

  @MessagePattern('UPDATE_RACE')
  @Put('/update/:id')
  updateRace(@Body() raceDto: RaceDto & { id: number }) {
    return this.raceService.updateRace(raceDto);
  }

  @MessagePattern('DELETE_RACE')
  deleteRace(id: string) {
    return this.raceService.deleteRace(parseInt(id));
  }
}
