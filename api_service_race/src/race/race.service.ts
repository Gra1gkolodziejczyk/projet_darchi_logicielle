import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { RaceDto } from '../dto/race.dto';
import { Race } from '@prisma/client';

@Injectable()
export class RaceService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAllRaces() {
    const races = await this.prisma.race.findMany();
    return races;
  }

  async getRaceById(id: number) {
    const race = await this.prisma.race.findUnique({
      where: { id },
    });
    return race;
  }

  async updateRace(raceDto: RaceDto & { id: string }) {
    const race = await this.prisma.race.update({
      where: { id: parseInt(raceDto.id) },
      data: {
        name: raceDto.name,
        date: raceDto.date,
        location: raceDto.location,
      },
    });
    return race;
  }

  async createRace(raceDto: RaceDto) {
    const race = await this.prisma.race.create({
      data: {
        name: raceDto.name,
        date: raceDto.date,
        location: raceDto.location,
      },
    });
    return race;
  }

  async deleteRace(id: number) {
    const race = await this.prisma.race.delete({
      where: { id },
    });
    return race;
  }

  async addParticipant(raceId: number, carId: number): Promise<Race> {
    const race = await this.prisma.race.update({
      where: { id: raceId },
      data: {
        participants: {
          push: carId
        },
      },
    });
    return race;
  }
}
