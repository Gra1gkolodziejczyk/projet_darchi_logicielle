import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { RaceDto } from '../dto/race.dto';
import { Race } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

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
    try {
      const race = await this.prisma.race.update({
        where: { id: raceId, winnerId: null },
        data: {
          participants: {
            push: carId
          },
        },
      });
      return race;
    } catch {
      throw new RpcException("La course est déjà fini ou la course n'existe pas.")
    }
  }

  async startRace(raceId: number) {
    const participants = (await this.prisma.race.findUnique({
      where: { id: raceId }
    })).participants;

    if (participants.length < 2) {
      throw new RpcException("La course ne contient pas assez de participant.")
    }

    return await this.prisma.race.update({
      where: { id: raceId },
      data: {
        winnerId: participants[Math.floor(Math.random() * participants.length)]
      }
    })
  }
}
