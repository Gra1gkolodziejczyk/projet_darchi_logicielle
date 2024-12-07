import { Body, Controller, Get, Post, Put } from '@nestjs/common';
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
  getRaceById(id: string) {
    return this.raceService.getRaceById(parseInt(id));
  }

  @MessagePattern('CREATE_RACE')
  @Post('/create')
  async createRace(@Body() raceDto: RaceDto) {
    return this.raceService.createRace(raceDto);
  }

  @MessagePattern('UPDATE_RACE')
  @Put('/update/:id')
  updateRace(@Body() raceDto: RaceDto & { id: string }) {
    return this.raceService.updateRace(raceDto);
  }

  @MessagePattern('DELETE_RACE')
  deleteRace(id: string) {
    return this.raceService.deleteRace(parseInt(id));
  }

  // @MessagePattern('ADD_PARTICIPANT')
  // @Post('/:raceId/participants')
  // async addParticipant(@Body() carId: string, raceId: string) {
  //   return this.raceService.addParticipant(parseInt(raceId), parseInt(carId));
  // }
}
